/* Drapewell Discover theme script: hero slideshow, product options, cart drawer, card glow. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var money = function (cents) {
    try { return new Intl.NumberFormat(document.documentElement.lang || undefined, { style: "currency", currency: (window.Shopify && Shopify.currency && Shopify.currency.active) || "CAD" }).format(cents / 100); }
    catch (e) { return "$" + (cents / 100).toFixed(2); }
  };

  /* ---------- cart ---------- */
  var drawer = $("#cart-drawer");
  var cart = { items: [], total_price: 0, item_count: 0 };
  var lastCount = null;
  function paintCount() { $$("[data-cart-count]").forEach(function (el) { el.textContent = cart.item_count; if (lastCount !== null && cart.item_count > lastCount && !reduce) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); } }); lastCount = cart.item_count; }
  function paintCart() {
    paintCount();
    if (!drawer) return;
    var box = $("#cart-lines", drawer);
    box.innerHTML = cart.items.length ? cart.items.map(function (l, idx) {
      return '<div class="line" style="--n:' + idx + '"><div class="th">' + (l.image ? '<img src="' + esc(l.image.replace(/(\.[a-z]+)(\?|$)/i, "_160x$1$2")) + '" alt="" loading="lazy">' : "") + '</div>' +
        '<div class="d"><a href="' + esc(l.url) + '">' + esc(l.product_title) + '</a>' + (l.variant_title && l.variant_title !== "Default Title" ? "<span>" + esc(l.variant_title) + "</span>" : "") +
        '<div class="q"><button type="button" data-line="' + l.key + '" data-q="' + (l.quantity - 1) + '" aria-label="Fewer">−</button><output>' + l.quantity + '</output><button type="button" data-line="' + l.key + '" data-q="' + (l.quantity + 1) + '" aria-label="More">+</button><button type="button" class="rm" data-line="' + l.key + '" data-q="0">Remove</button></div></div>' +
        '<div class="pr">' + money(l.final_line_price) + "</div></div>";
    }).join("") : '<p class="empty">Your cart is empty.</p>';
    $("#cart-sub", drawer).textContent = money(cart.total_price);
    var co = $("#cart-co", drawer); co.href = cart.items.length ? "/checkout" : "/cart"; co.setAttribute("aria-disabled", String(!cart.items.length));
  }
  function loadCart() { return fetch("/cart.js", { headers: { Accept: "application/json" } }).then(function (r) { return r.json(); }).then(function (c) { cart = c; paintCart(); return c; }).catch(function () {}); }
  function openCart() { if (!drawer || !drawer.showModal) { location.href = "/cart"; return; } loadCart().then(function () { if (!drawer.open) drawer.showModal(); }); }
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer || e.target.closest("[data-close-cart]")) return drawer.close();
      var b = e.target.closest("[data-line]"); if (!b) return;
      fetch("/cart/change.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ id: b.dataset.line, quantity: parseInt(b.dataset.q, 10) }) })
        .then(function (r) { return r.json(); }).then(function (c) { cart = c; paintCart(); });
    });
  }
  document.addEventListener("click", function (e) { var t = e.target.closest("[data-open-cart]"); if (t) { e.preventDefault(); openCart(); } });
  loadCart();

  /* ---------- product page ---------- */
  var pdp = $("[data-product]");
  if (pdp) {
    var data = JSON.parse($("[data-product-json]").textContent);
    var form = $("#product-form"), idInput = $("[data-variant-id]", form), addBtn = $("[data-add]", form), msg = $("[data-msg]", form), priceEl = $("[data-price]");
    var qty = $("[data-qty-input]", form), out = $("[data-qty-out]", form);
    var addLabel = addBtn.textContent;
    function selected() { var vals = []; $$("[data-option]:checked", form).forEach(function (r) { vals[parseInt(r.dataset.option, 10) - 1] = r.value; }); return vals; }
    function find(vals) { return data.variants.filter(function (v) { return vals.every(function (x, i) { return x === undefined || v.options[i] === x; }); })[0]; }
    function swapMain(url) { var main = $("[data-main-image] img"), fig = $("[data-main-image]"); if (!main) return; if (reduce) { main.removeAttribute("srcset"); main.src = url; return; } fig.classList.add("swap"); setTimeout(function () { main.removeAttribute("srcset"); main.src = url; fig.classList.remove("swap"); }, 220); }
    function sync() {
      var vals = selected(); var need = data.options.length;
      var complete = vals.filter(Boolean).length === need;
      var v = complete ? find(vals) : null;
      if (!need) v = data.variants[0];
      if (v) { idInput.value = v.id; priceEl.textContent = money(v.price) + (v.compare_at_price > v.price ? "" : ""); addBtn.disabled = !v.available; addBtn.textContent = v.available ? addLabel : "Sold out"; msg.textContent = v.available ? "" : "Sold out."; }
      else { addBtn.disabled = !complete ? false : true; msg.textContent = complete ? "That combination is not available." : ""; if (complete) addBtn.disabled = true; }
      /* dim values that no variant offers given the other choices */
      $$(".opt-group", form).forEach(function (g, gi) {
        $$("[data-option]", g).forEach(function (inp) {
          var test = vals.slice(); test[gi] = inp.value;
          var ok = data.variants.some(function (x) { return test.every(function (y, i) { return y === undefined || x.options[i] === y; }) && x.available; });
          inp.parentElement.style.opacity = ok ? "" : "0.45";
        });
      });
      if (v && v.featured_image && v.featured_image.src) { var main = $("[data-main-image] img"); if (main && !main.src.includes(v.featured_image.src.split("?")[0].split("/").pop().split(".")[0])) { swapMain(v.featured_image.src.replace(/(\.[a-z]+)(\?|$)/i, "_1200x$1$2")); } }
    }
    form.addEventListener("change", function (e) { if (e.target.matches("[data-option]")) sync(); });
    $("[data-qty-less]", form).addEventListener("click", function () { qty.value = Math.max(1, +qty.value - 1); out.textContent = qty.value; });
    $("[data-qty-more]", form).addEventListener("click", function () { qty.value = Math.min(9, +qty.value + 1); out.textContent = qty.value; });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); if (addBtn.disabled) return;
      addBtn.disabled = true;
      fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ id: idInput.value, quantity: +qty.value }) })
        .then(function (r) { if (!r.ok) throw new Error("add failed"); return r.json(); })
        .then(function () { addBtn.classList.add("is-ok"); addBtn.textContent = "Added ✓"; loadCart().then(function () { setTimeout(function () { addBtn.disabled = false; addBtn.classList.remove("is-ok"); addBtn.textContent = addLabel; openCart(); }, reduce ? 0 : 700); }); })
        .catch(function () { addBtn.disabled = false; msg.textContent = "Could not add that to the cart. Try again."; });
    });
    $$("[data-thumb]").forEach(function (b) { b.addEventListener("click", function () {
      swapMain(b.dataset.thumb);
      $$("[data-thumb]").forEach(function (x) { x.setAttribute("aria-current", String(x === b)); }); b.focus();
    }); });
    var fig = $("[data-main-image]");
    if (fig && fine) fig.addEventListener("pointermove", function (e) { var r = fig.getBoundingClientRect(); fig.style.setProperty("--zx", (((e.clientX - r.left) / r.width) * 100).toFixed(0) + "%"); fig.style.setProperty("--zy", (((e.clientY - r.top) / r.height) * 100).toFixed(0) + "%"); }, { passive: true });
    sync();
  }


  /* ---------- room accordion ---------- */
  $$(".sub-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var li = btn.closest(".room"), open = !li.classList.contains("is-open");
      li.classList.toggle("is-open", open); btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- hero slideshow ---------- */
  var hero = $("[data-hero]");
  if (hero) {
    var slides = $$(".slide", hero), dots = $$("[data-go]", hero), bar = $("[data-hero-prog]", hero), pauseBtn = $("[data-hero-pause]", hero);
    var cur = 0, timer = 0, paused = false;
    function show(i) {
      if (!slides.length) return; cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { var on = k === cur; s.classList.toggle("is-active", on); if (on) s.removeAttribute("aria-hidden"); else s.setAttribute("aria-hidden", "true"); $$("a", s).forEach(function (a) { a.tabIndex = on ? 0 : -1; }); });
      dots.forEach(function (d, k) { d.setAttribute("aria-pressed", String(k === cur)); });
      hero.style.setProperty("--hue", slides[cur].dataset.hue);
      if (bar) { bar.classList.remove("run"); void bar.offsetWidth; if (!reduce) bar.classList.add("run"); }
    }
    function start() { clearInterval(timer); if (paused || document.hidden || slides.length < 2) return; timer = setInterval(function () { show(cur + 1); }, reduce ? 9000 : 7000); }
    function go(n) { show(n); start(); }
    dots.forEach(function (d) { d.addEventListener("click", function () { go(parseInt(d.dataset.go, 10)); }); });
    var prev = $("[data-hero-prev]", hero), next = $("[data-hero-next]", hero);
    if (prev) prev.addEventListener("click", function () { go(cur - 1); }); if (next) next.addEventListener("click", function () { go(cur + 1); });
    if (pauseBtn) pauseBtn.addEventListener("click", function () { paused = !paused; pauseBtn.setAttribute("aria-pressed", String(paused)); pauseBtn.textContent = paused ? "▶" : "❚❚"; pauseBtn.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow"); if (bar) bar.style.animationPlayState = paused ? "paused" : "running"; start(); });
    var sx = 0, sy = 0;
    hero.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    hero.addEventListener("touchend", function (e) { var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy; if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(cur + (dx < 0 ? 1 : -1)); }, { passive: true });
    document.addEventListener("visibilitychange", start);
    hero.addEventListener("pointermove", function (e) { if (reduce) return; var r = hero.getBoundingClientRect(); hero.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3)); hero.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3)); hero.style.setProperty("--gx", (((e.clientX - r.left) / r.width) * 100).toFixed(0) + "%"); hero.style.setProperty("--gy", (((e.clientY - r.top) / r.height) * 100).toFixed(0) + "%"); }, { passive: true });
    hero.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") clearInterval(timer); });
    hero.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") start(); });
    show(0); start();
  }

  /* ---------- card glow + tilt ---------- */
  if (fine && !reduce) {
    document.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest(".card"); if (!c) return;
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--mx", (x * 100).toFixed(0) + "%"); c.style.setProperty("--my", (y * 100).toFixed(0) + "%");
      c.style.setProperty("--rx", ((0.5 - y) * 6).toFixed(2) + "deg"); c.style.setProperty("--ry", ((x - 0.5) * 8).toFixed(2) + "deg");
    }, { passive: true });
    document.addEventListener("pointerout", function (e) { var c = e.target.closest && e.target.closest(".card"); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); } });
  }

  /* ---------- scroll reveal for cards, image shimmer, magnetic buttons ---------- */
  var cards = $$(".card");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }); }, { rootMargin: "0px 0px -6% 0px" });
    cards.forEach(function (c, i) { c.style.setProperty("--d", i % 6); io.observe(c); });
  } else { cards.forEach(function (c) { c.classList.add("in"); }); }

  function markLoaded(img) { var ph = img.closest(".ph"); if (ph) ph.classList.add("ld"); }
  $$(".ph img").forEach(function (img) { if (img.complete) markLoaded(img); });
  document.addEventListener("load", function (e) { if (e.target.tagName === "IMG") markLoaded(e.target); }, true);
  document.addEventListener("error", function (e) { if (e.target.tagName === "IMG") markLoaded(e.target); }, true);
  setTimeout(function () { $$(".ph:not(.ld)").forEach(function (p) { p.classList.add("ld"); }); }, 6000);

  if (fine && !reduce) {
    $$(".btn.primary, .cart-btn, .hero-actions .btn").forEach(function (b) { b.classList.add("magnet"); });
    document.addEventListener("pointermove", function (e) {
      $$(".magnet").forEach(function (el) {
        var r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = e.clientX - cx, dy = e.clientY - cy, reach = Math.max(r.width, r.height) * 0.8;
        if (Math.hypot(dx, dy) < reach) el.style.translate = (dx * 0.16).toFixed(1) + "px " + (dy * 0.24).toFixed(1) + "px"; else if (el.style.translate) el.style.translate = "";
      });
    }, { passive: true });
  }
  document.addEventListener("error", function (e) { if (e.target.tagName === "IMG") e.target.style.visibility = "hidden"; }, true);
})();
