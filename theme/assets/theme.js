/* Drapewell Discover theme script: hero slideshow, product options, cart drawer, card glow. */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  /* Motion (vanilla build of Framer Motion, assets/motion.js): springs for entrances and presses. CSS stays as the fallback. */
  var Mo = window.Motion, mo = !!(Mo && Mo.animate && !reduce);
  if (mo) document.documentElement.classList.add("mo");
  function clearStyle(el, props) { props.forEach(function (p) { el.style.removeProperty(p); }); }
  function enter(el, from, to, props, delay, spring) {
    /* set the start values first so there is no flash, then spring to the end values and hand control back to CSS */
    Object.keys(from).forEach(function (k) { el.style.setProperty(k, from[k]); });
    var done = function () { clearStyle(el, props); };
    Mo.animate(el, to, Object.assign({ type: "spring", stiffness: 170, damping: 21, delay: delay || 0 }, spring || {})).finished.then(done, done);
  }
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var money = function (cents) {
    try { return new Intl.NumberFormat(document.documentElement.lang || undefined, { style: "currency", currency: (window.Shopify && Shopify.currency && Shopify.currency.active) || "CAD" }).format(cents / 100); }
    catch (e) { return "$" + (cents / 100).toFixed(2); }
  };

  /* ---------- add-to-cart flight ---------- */
  function fly(img) {
    if (reduce || !img || !img.getBoundingClientRect || !img.src) return;
    var target = $$("[data-open-cart]").filter(function (e) { var r = e.getBoundingClientRect(); return r.width && r.height && r.bottom > 0 && r.top < innerHeight; })[0];
    if (!target || !img.animate) return;
    var a = img.getBoundingClientRect(), b = target.getBoundingClientRect();
    var c = document.createElement("img"); c.src = img.currentSrc || img.src; c.alt = ""; c.className = "fly";
    c.style.cssText = "left:" + a.left + "px;top:" + a.top + "px;width:" + a.width + "px;height:" + a.height + "px";
    document.body.appendChild(c);
    var dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    c.animate([{ transform: "translate(0,0) scale(1)", opacity: 1, borderRadius: "16px" }, { transform: "translate(" + dx + "px," + dy + "px) scale(0.05)", opacity: 0.25, borderRadius: "50%" }], { duration: 650, easing: "cubic-bezier(0.5, 0, 0.2, 1)" }).onfinish = function () { c.remove(); };
  }

  /* ---------- cart ---------- */
  var drawer = $("#cart-drawer");
  var cart = { items: [], total_price: 0, item_count: 0 };
  var lastCount = null;
  function paintCount() { $$("[data-cart-total]").forEach(function (el) { el.textContent = money(cart.total_price); }); $$("[data-cart-count]").forEach(function (el) { el.textContent = cart.item_count; if (lastCount !== null && cart.item_count > lastCount && !reduce) {
        if (mo) { Mo.animate(el, { scale: 1.5 }, { duration: 0.12, ease: "easeOut" }).finished.then(function () { Mo.animate(el, { scale: 1 }, { type: "spring", stiffness: 380, damping: 14 }); }); }
        else { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
      } }); lastCount = cart.item_count; }
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
    var ship = $(".ship", drawer);
    if (ship) {
      var goal = parseInt(ship.dataset.free, 10) || 0, left = goal - cart.total_price;
      ship.hidden = !cart.items.length || !goal;
      $("[data-ship-t]", ship).textContent = left > 0 ? money(left) + " " + ship.dataset.leftTxt : ship.dataset.doneTxt;
      $("[data-ship-i]", ship).style.setProperty("--p", Math.min(1, goal ? cart.total_price / goal : 0).toFixed(3));
      ship.classList.toggle("done", left <= 0);
    }
    var co = $("#cart-co", drawer); co.href = cart.items.length ? "/checkout" : "/cart"; co.setAttribute("aria-disabled", String(!cart.items.length));
    paintUpsell();
  }
  /* ---------- cart upsell: Shopify's related-product recommendations for the newest cart item ---------- */
  var upCache = {};
  function renderUp(list) {
    var sec = $("#cart-up"), ul = $("#cart-up-list"); if (!sec || !ul) return;
    var inCart = cart.items.map(function (i) { return i.product_id; });
    var show = list.filter(function (p) { return p.available && inCart.indexOf(p.id) < 0; }).slice(0, 3);
    sec.hidden = !show.length;
    var addTxt = sec.dataset.addTxt || "Add", chooseTxt = sec.dataset.chooseTxt || "Choose an option";
    ul.innerHTML = show.map(function (p) {
      var vs = (p.variants || []).filter(function (v) { return v.available; });
      var single = p.variants && p.variants.length === 1 && vs.length === 1;
      var lbl = esc(addTxt) + ": " + esc(p.title);
      var btn = single ? '<button type="button" class="up-add" data-up-add="' + vs[0].id + '" aria-label="' + lbl + '"><span aria-hidden="true">+</span></button>'
                       : '<button type="button" class="up-add" data-up-pick aria-expanded="false" aria-label="' + lbl + '"><span aria-hidden="true">+</span></button>';
      var pick = single ? "" : '<div class="up-pick"><select aria-label="' + esc(chooseTxt) + ": " + esc(p.title) + '">' + vs.map(function (v) { var vi = v.featured_image && (v.featured_image.src || v.featured_image); return '<option value="' + v.id + '"' + (vi ? ' data-img="' + esc(qimg(vi, 160)) + '"' : "") + ">" + esc(v.title || (v.options || []).join(" / ")) + (v.price != null && v.price !== p.price ? " — " + money(v.price) : "") + "</option>"; }).join("") + '</select><button type="button" class="up-go" data-up-confirm>' + esc(addTxt) + "</button></div>";
      return '<li class="up"><a class="up-th" href="' + esc(p.url) + '"><span class="ph">' + (p.featured_image ? '<img src="' + esc(qimg(p.featured_image, 160)) + '" alt="" loading="lazy">' : "") + '</span></a>' +
        '<div class="up-d"><a href="' + esc(p.url) + '">' + esc(p.title) + '</a><span>' + money(p.price) + "</span></div>" + btn + pick + "</li>";
    }).join("");
  }
  function paintUpsell() {
    var sec = $("#cart-up"); if (!sec) return;
    if (!cart.items.length) { sec.hidden = true; return; }
    var pid = cart.items[0].product_id;
    if (upCache[pid]) return renderUp(upCache[pid]);
    fetch("/recommendations/products.json?product_id=" + pid + "&limit=6&intent=related", { headers: { Accept: "application/json" } })
      .then(function (r) { return r.ok ? r.json() : { products: [] }; })
      .then(function (d) { upCache[pid] = d.products || []; if (cart.items[0] && cart.items[0].product_id === pid) renderUp(upCache[pid]); })
      .catch(function () {});
  }
  function loadCart() { return fetch("/cart.js", { headers: { Accept: "application/json" } }).then(function (r) { return r.json(); }).then(function (c) { cart = c; paintCart(); return c; }).catch(function () {}); }
  function openCart() {  /* also exposed for quick view */ if (!drawer || !drawer.showModal) { location.href = "/cart"; return; } loadCart().then(function () {
      if (drawer.open) return;
      var lines = mo ? $$(".line", drawer) : [];
      lines.forEach(function (l) { l.style.opacity = "0"; l.style.translate = "28px 0px"; });
      drawer.showModal();
      lines.forEach(function (l, i) { enter(l, { opacity: "0", translate: "28px 0px" }, { opacity: 1, translate: ["28px 0px", "0px 0px"] }, ["opacity", "translate"], 0.12 + i * 0.07); });
    }); }
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer || e.target.closest("[data-close-cart]")) return drawer.close();
      var ua = e.target.closest("[data-up-add]");
      if (ua) { ua.disabled = true; fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ id: ua.dataset.upAdd, quantity: 1 }) }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(loadCart).catch(function () { ua.disabled = false; }); return; }
      var up = e.target.closest("[data-up-pick]");
      if (up) { var row = up.closest(".up"), o = !row.classList.contains("open"); row.classList.toggle("open", o); up.setAttribute("aria-expanded", String(o)); if (o) { var sel = $("select", row); if (sel) sel.focus(); } return; }
      var uc = e.target.closest("[data-up-confirm]");
      if (uc) { var sv = $("select", uc.closest(".up")); if (!sv || !sv.value) return; uc.disabled = true; fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ id: sv.value, quantity: 1 }) }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(loadCart).catch(function () { uc.disabled = false; }); return; }
      var b = e.target.closest("[data-line]"); if (!b) return;
      fetch("/cart/change.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ id: b.dataset.line, quantity: parseInt(b.dataset.q, 10) }) })
        .then(function (r) { return r.json(); }).then(function (c) {
          cart = c; paintCart();
          /* emptied the cart: let the message show for a beat, then slide the drawer away */
          if (!c.items.length) setTimeout(function () { if (!cart.items.length && drawer.open) drawer.close(); }, reduce ? 400 : 1100);
        });
    });
  }
  /* upsell: show the chosen variant's own picture in the row */
  if (drawer) drawer.addEventListener("change", function (e) {
    var sel = e.target.closest && e.target.closest(".up-pick select"); if (!sel) return;
    var u = sel.selectedOptions[0] && sel.selectedOptions[0].dataset.img, im = $(".up-th img", sel.closest(".up")); if (!u || !im) return;
    if (reduce || !im.animate) { im.src = u; return; }
    var pre = new Image(); pre.onload = function () { im.animate([{ opacity: 1 }, { opacity: 0.15 }], { duration: 120, fill: "forwards" }).onfinish = function () { im.src = u; im.animate([{ opacity: 0.15 }, { opacity: 1 }], { duration: 260, fill: "forwards" }); }; }; pre.onerror = function () { im.src = u; }; pre.src = u;
  });
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
        .then(function () { fly($("[data-main-image] img")); addBtn.classList.add("is-ok"); addBtn.textContent = "Added ✓"; loadCart().then(function () { setTimeout(function () { addBtn.disabled = false; addBtn.classList.remove("is-ok"); addBtn.textContent = addLabel; openCart(); }, reduce ? 0 : 700); }); })
        .catch(function () { addBtn.disabled = false; msg.textContent = "Could not add that to the cart. Try again."; });
    });
    $$("[data-thumb]").forEach(function (b) { b.addEventListener("click", function () {
      swapMain(b.dataset.thumb);
      $$("[data-thumb]").forEach(function (x) { x.setAttribute("aria-current", String(x === b)); }); b.focus();
    }); });
    var fig = $("[data-main-image]");
    if (fig && fine) fig.addEventListener("pointermove", function (e) { var r = fig.getBoundingClientRect(); fig.style.setProperty("--zx", (((e.clientX - r.left) / r.width) * 100).toFixed(0) + "%"); fig.style.setProperty("--zy", (((e.clientY - r.top) / r.height) * 100).toFixed(0) + "%"); }, { passive: true });
    /* swipe the gallery on touch screens */
    var thumbBtns = $$("[data-thumb]");
    if (fig && thumbBtns.length > 1) {
      var gx = 0, gy = 0;
      fig.addEventListener("touchstart", function (e) { gx = e.touches[0].clientX; gy = e.touches[0].clientY; }, { passive: true });
      fig.addEventListener("touchend", function (e) {
        var t = e.changedTouches[0], dx = t.clientX - gx, dy = t.clientY - gy; if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
        var at = thumbBtns.findIndex(function (b) { return b.getAttribute("aria-current") === "true"; }), n = (at + (dx < 0 ? 1 : -1) + thumbBtns.length) % thumbBtns.length;
        fig.style.setProperty("--dir", dx < 0 ? 1 : -1); thumbBtns[n].click();
      }, { passive: true });
    }

    /* sticky add-to-cart bar (phones) */
    var sticky = $("[data-sticky]"), sBtn = $("[data-sticky-btn]"), sPrice = $("[data-sticky-price]");
    if (sticky && "IntersectionObserver" in window) {
      document.body.appendChild(sticky); /* out of any transformed ancestor so position:fixed stays on the viewport */
      var mirror = function () { sBtn.disabled = addBtn.disabled; sBtn.textContent = addBtn.textContent; sBtn.classList.toggle("is-ok", addBtn.classList.contains("is-ok")); sPrice.textContent = priceEl.textContent; };
      new MutationObserver(mirror).observe(form, { subtree: true, childList: true, attributes: true, characterData: true });
      new MutationObserver(mirror).observe(priceEl, { childList: true, characterData: true, subtree: true });
      new IntersectionObserver(function (en) { var e = en[0]; sticky.hidden = e.isIntersecting || e.boundingClientRect.top > 0; mirror(); }).observe(addBtn);
    }

    /* recently viewed */
    try {
      var KEY = "dw-recent", list = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(list)) list = [];
      var others = list.filter(function (x) { return x && x.h !== data.handle; });
      var me = { h: data.handle, t: data.title, i: data.featured_image || "", p: data.price };
      localStorage.setItem(KEY, JSON.stringify([me].concat(others).slice(0, 10)));
      var row = $("[data-recent-row]"), box = $("[data-recent]");
      if (row && others.length) {
        row.innerHTML = others.slice(0, 6).map(function (x) {
          return '<a class="mini-card" href="/products/' + esc(x.h) + '"><span class="ph">' + (x.i ? '<img src="' + esc(String(x.i).replace(/(\.[a-z]+)(\?|$)/i, "_300x$1$2")) + '" alt="" loading="lazy">' : "") + '</span><span class="t">' + esc(x.t) + '</span><span class="p">' + money(x.p) + "</span></a>";
        }).join("");
        box.hidden = false;
      }
    } catch (e) { /* storage blocked: skip */ }
    sync();
  }

  /* ---------- quick view ---------- */
  var quick = $("#quick"), qin = $("#quick-in");
  function qimg(src, w) { return String(src || "").replace(/(\.[a-z]+)(\?|$)/i, "_" + w + "x$1$2"); }
  function openQuick(handle) {
    if (!quick || !quick.showModal) { location.href = "/products/" + handle; return; }
    fetch("/products/" + encodeURIComponent(handle) + ".js", { headers: { Accept: "application/json" } }).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (p) {
      var names = (p.options || []).map(function (o) { return typeof o === "string" ? o : o.name; });
      var opt = function (v) { return v.options || [v.option1, v.option2, v.option3].filter(Boolean); };
      var plain = p.variants.length === 1 && names.length <= 1 && /default title/i.test(opt(p.variants[0])[0] || "");
      var first = p.variants.filter(function (v) { return v.available; })[0] || p.variants[0], pick = opt(first).slice();
      var groups = plain ? "" : names.map(function (n, gi) {
        var vals = []; p.variants.forEach(function (v) { var x = opt(v)[gi]; if (vals.indexOf(x) < 0) vals.push(x); });
        return '<fieldset class="opt-group"><legend>' + esc(n) + '</legend><div class="chips">' + vals.map(function (x) { return '<label class="chipb"><input type="radio" name="q-' + gi + '" value="' + esc(x) + '" data-qopt="' + gi + '"' + (pick[gi] === x ? " checked" : "") + "><span>" + esc(x) + "</span></label>"; }).join("") + "</div></fieldset>";
      }).join("");
      qin.innerHTML = '<div class="grab" data-grab aria-hidden="true"><i></i></div><button type="button" class="x" data-qclose aria-label="Close">Close</button>' +
        '<figure class="ph tall"><img data-qimg alt="" src="' + esc(qimg(p.featured_image, 800)) + '"></figure>' +
        '<div class="q-info"><h2>' + esc(p.title) + '</h2><p class="p-price" data-qprice></p>' + groups +
        '<button type="button" class="btn primary" data-qadd></button><p class="msg" data-qmsg role="status" aria-live="polite"></p>' +
        '<a class="more" href="' + esc(p.url) + '">View full details &rarr;</a></div>';
      var cur;
      var paint = function () {
        cur = p.variants.filter(function (v) { return opt(v).every(function (x, i) { return x === pick[i]; }); })[0];
        var b = $("[data-qadd]", qin), m = $("[data-qmsg]", qin);
        $("[data-qprice]", qin).textContent = cur ? money(cur.price) : "";
        b.disabled = !cur || !cur.available; b.textContent = !cur ? "Unavailable" : cur.available ? "Add to cart" : "Sold out"; m.textContent = cur ? "" : "That combination is not available.";
        if (cur && cur.featured_image && cur.featured_image.src) { var im = $("[data-qimg]", qin), u = qimg(cur.featured_image.src, 800); if (im.getAttribute("src") !== u) im.src = u; }
      };
      qin.onchange = function (e) { if (e.target.matches("[data-qopt]")) { pick[+e.target.dataset.qopt] = e.target.value; paint(); } };
      qin.onclick = function (e) {
        if (e.target.closest("[data-qclose]")) return quick.close();
        var b = e.target.closest("[data-qadd]"); if (!b || b.disabled) return;
        b.disabled = true;
        fetch("/cart/add.js", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ id: cur.id, quantity: 1 }) })
          .then(function (r) { if (!r.ok) throw 0; return r.json(); })
          .then(function () { var im = $("[data-qimg]", qin); fly(im); quick.close(); loadCart().then(function () { setTimeout(openCart, reduce ? 0 : 650); }); })
          .catch(function () { b.disabled = false; $("[data-qmsg]", qin).textContent = "Could not add that to the cart. Try again."; });
      };
      paint(); quick.showModal();
    }).catch(function () { location.href = "/products/" + handle; });
  }
  if (quick) {
    quick.addEventListener("click", function (e) { if (e.target === quick) quick.close(); });
    /* drag the grab handle down to dismiss (phones) */
    var qy = 0, qd = 0, dragging = false;
    quick.addEventListener("pointerdown", function (e) { if (!e.target.closest("[data-grab]")) return; dragging = true; qy = e.clientY; qd = 0; quick.style.transition = "none"; quick.setPointerCapture && quick.setPointerCapture(e.pointerId); });
    quick.addEventListener("pointermove", function (e) { if (!dragging) return; qd = Math.max(0, e.clientY - qy); quick.style.transform = "translateY(" + qd + "px)"; });
    var endDrag = function () { if (!dragging) return; dragging = false; quick.style.transition = ""; quick.style.transform = ""; if (qd > 110) quick.close(); };
    quick.addEventListener("pointerup", endDrag); quick.addEventListener("pointercancel", endDrag);
  }
  document.addEventListener("click", function (e) { var q = e.target.closest("[data-quick]"); if (q) { e.preventDefault(); openQuick(q.dataset.quick); } });


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
    function enterSlide(sl) {
      var copy = $$(".hero-copy.stagger > *", sl), art = $(".hero-art .ph", sl), price = $(".hero-price", sl);
      copy.forEach(function (el, i) { enter(el, { opacity: "0", translate: "0px 22px" }, { opacity: 1, translate: ["0px 22px", "0px 0px"] }, ["opacity", "translate"], 0.15 + i * 0.09, { stiffness: 150, damping: 20 }); });
      if (price) enter(price, { opacity: "0", translate: "0px 10px" }, { opacity: 1, translate: ["0px 10px", "0px 0px"] }, ["opacity", "translate"], 0.55);
      if (art) enter(art, { opacity: "0", "--hs": "0.9", "--hr": "3" }, { opacity: 1, "--hs": 1, "--hr": 0 }, ["opacity", "--hs", "--hr"], 0.1, { stiffness: 90, damping: 16 });
    }
    function show(i) {
      if (!slides.length) return; cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { var on = k === cur; s.classList.toggle("is-active", on); if (on) s.removeAttribute("aria-hidden"); else s.setAttribute("aria-hidden", "true"); $$("a", s).forEach(function (a) { a.tabIndex = on ? 0 : -1; }); });
      dots.forEach(function (d, k) { d.setAttribute("aria-pressed", String(k === cur)); });
      hero.style.setProperty("--hue", slides[cur].dataset.hue);
      if (mo) enterSlide(slides[cur]);
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
  if ("IntersectionObserver" in window && mo && Mo.inView) {
    /* Motion: cards spring up with a stagger across whatever batch scrolls into view together */
    var queue = [], raf = 0;
    var flush = function () {
      raf = 0;
      queue.splice(0).forEach(function (el, i) {
        Mo.animate(el, { opacity: [0, 1], translate: ["0px 28px", "0px 0px"] }, { type: "spring", stiffness: 170, damping: 21, delay: Math.min(i, 7) * 0.06 })
          .finished.then(function () { el.classList.add("in"); el.style.opacity = ""; el.style.translate = ""; }, function () { el.classList.add("in"); });
      });
    };
    Mo.inView(cards, function (el) {
      if (el.motionSeen) return;
      el.motionSeen = true; queue.push(el);
      if (!raf) raf = requestAnimationFrame(flush);
    }, { margin: "0px 0px -6% 0px" });
  } else if ("IntersectionObserver" in window && !reduce) {
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
  /* press feedback: a quick spring squash on buttons, chips and thumbnails (delegated, so it also covers the cart drawer and quick view) */
  if (mo) {
    var PRESS = ".btn, .cart-btn, .up-add, .chipb span, .thumbs button, .hero-dots button, [data-hero-prev], [data-hero-next], .q button";
    var held = null;
    var release = function () { if (!held) return; var el = held; held = null; Mo.animate(el, { scale: 1 }, { type: "spring", stiffness: 520, damping: 14 }); };
    document.addEventListener("pointerdown", function (e) {
      var el = e.target.closest && e.target.closest(PRESS);
      if (!el || el.disabled || el.getAttribute("aria-disabled") === "true") return;
      held = el; Mo.animate(el, { scale: 0.94 }, { type: "spring", stiffness: 700, damping: 28 });
    }, { passive: true });
    ["pointerup", "pointercancel", "dragend"].forEach(function (t) { document.addEventListener(t, release, { passive: true }); });
  }
  document.addEventListener("error", function (e) { if (e.target.tagName === "IMG") e.target.style.visibility = "hidden"; }, true);
})();
