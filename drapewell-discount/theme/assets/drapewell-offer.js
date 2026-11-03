/* Drapewell additional 1% countdown (cart drawer and cart page only).
   The browser clock is never the authority: the server returns remainingSeconds, and the page counts down with the monotonic
   performance.now() clock and re-syncs with the server on a timer, on tab focus and when the cart changes. */
(function () {
  "use strict";
  var root = document.querySelector("[data-dwo-root]");
  if (!root || /^\/(checkouts?|account|orders)\b/.test(location.pathname)) return;

  var endpoint = root.getAttribute("data-dwo-endpoint") || "/apps/drapewell/offer";
  var textEl = root.querySelector("[data-dwo-text]");
  var fillEl = root.querySelector("[data-dwo-fill]");
  var ATTR = "drapewell_offer_id";
  var TOTAL_MS = 900 * 1000;
  var offerId = null;
  var endsAtMono = 0; // performance.now() value at which the window ends
  var tickTimer = null;
  var busy = false;
  var done = false; // the server said this cart's window is over: never ask again from this page

  function post(path, body) {
    return fetch(endpoint + path, { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", body: JSON.stringify(body) }).then(function (r) { return r.json(); });
  }
  function get(path) {
    return fetch(endpoint + path, { credentials: "same-origin", headers: { Accept: "application/json" } }).then(function (r) { return r.json(); });
  }
  function setAttribute(value) {
    var attrs = {}; attrs[ATTR] = value;
    return fetch("/cart/update.js", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ attributes: attrs }) }).catch(function () {});
  }
  function show(message, ended) {
    root.hidden = false;
    root.classList.toggle("dwo--ended", !!ended);
    textEl.textContent = message;
  }
  function hide() { root.hidden = true; }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function tick() {
    var left = Math.max(0, endsAtMono - performance.now());
    var s = Math.ceil(left / 1000);
    show("Additional 1% off applied. Ends in " + Math.floor(s / 60) + ":" + pad(s % 60) + ".", false);
    fillEl.style.transform = "scaleX(" + Math.min(1, left / TOTAL_MS) + ")";
    if (left <= 0) { stopTick(); sync(); }
  }
  function startTick(remainingSeconds) {
    endsAtMono = performance.now() + remainingSeconds * 1000;
    stopTick(); tick(); tickTimer = setInterval(tick, 1000);
  }
  function stopTick() { if (tickTimer) { clearInterval(tickTimer); tickTimer = null; } }

  function ended() {
    done = true;
    stopTick();
    show("The additional 1% offer has ended. Your other discounts still apply.", true);
    if (offerId) setAttribute("");
  }

  /* One function covers first load, refresh, other tabs, cart changes and tab focus: ask the server, then show what it says. */
  function sync() {
    if (busy || done) return; busy = true;
    fetch("/cart.js", { headers: { Accept: "application/json" } }).then(function (r) { return r.json(); }).then(function (cart) {
      if (offerId) {
        return get("/status?offer=" + encodeURIComponent(offerId)).then(function (st) {
          if (st && st.status === "active") { if (cart.attributes && cart.attributes[ATTR] !== offerId) setAttribute(offerId); startTick(st.remainingSeconds); }
          else ended();
        });
      }
      if (cart.attributes && cart.attributes[ATTR]) offerId = cart.attributes[ATTR]; // another tab or an earlier visit already started it
      if (offerId) { busy = false; return sync(); }
      if (cart.item_count < 2) { hide(); return null; } // cheap pre-check only; the server decides eligibility
      return post("/start", { cart: cart.token }).then(function (res) {
        if (res && res.status === "active") { offerId = res.offerId; setAttribute(offerId); startTick(res.remainingSeconds); }
        else if (res && res.status) { offerId = res.offerId; ended(); } // this cart already had its window
        else hide();
      });
    }).catch(function () {}).then(function () { busy = false; });
  }

  document.addEventListener("visibilitychange", function () { if (!document.hidden) sync(); });
  document.addEventListener("dwo:cart-changed", sync); // dispatch from the theme's cart code after add, remove or quantity changes
  setInterval(sync, 20000);
  sync();
})();
