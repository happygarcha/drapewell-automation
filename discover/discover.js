/* Drapewell Discover: a dense, dark discovery dashboard.
   Rooms come from the store menu (menu.js, or this browser's edited copy). Products load live when the
   store allows it, otherwise from the bundled snapshot. Checkout opens the live store. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const money = (n) => `$${n.toFixed(2)}`;
  const sized = (u, w) => (u ? `${u}${u.includes("?") ? "&" : "?"}width=${w}` : "");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function getMenu() {
    try { const s = JSON.parse(localStorage.getItem("dw-menu-lookbook")); if (Array.isArray(s) && s.length) return s; } catch (_) { /* fall through */ }
    return window.DW_MENU.map((m) => ({ ...m }));
  }
  const rooms = getMenu().filter((m) => m.type === "COLLECTION");
  const snap = (h) => window.DW_PRODUCTS.filter((p) => p.room === h).map((p) => ({ handle: p.handle, title: p.name, name: p.name, room: p.room, price: p.price, tint: p.tint, images: [window.DW_CDN + p.img], variants: [{ id: null, title: "Default", price: p.price, available: true }], options: [] }));
  const data = {}; rooms.forEach((r) => { data[r.handle] = snap(r.handle); });
  const roomTitle = (h) => (rooms.find((r) => r.handle === h) || { title: h }).title;

  let active = "all", sort = "featured", query = "";
  const all = () => { const seen = new Set(); const out = []; rooms.forEach((r) => (data[r.handle] || []).forEach((p) => { if (!seen.has(p.handle)) { seen.add(p.handle); out.push({ ...p, room: r.handle }); } })); return out; };

  const ph = (p, w) => `<figure class="ph" style="--tint:${p.tint}"><img src="${sized(p.images[0], w)}" alt="" loading="lazy" decoding="async"></figure>`;
  document.addEventListener("error", (e) => { if (e.target.tagName === "IMG") e.target.style.visibility = "hidden"; }, true);

  /* ---------- sidebar ---------- */
  function drawRooms() {
    const total = all().length;
    $("#rooms").innerHTML = `<li><button type="button" data-room="all" aria-pressed="${active === "all"}"><span>All rooms</span><span class="n">${total}</span></button></li>` +
      rooms.map((r) => `<li><button type="button" data-room="${esc(r.handle)}" aria-pressed="${active === r.handle}"><span>${esc(r.title)}</span><span class="n">${(data[r.handle] || []).length}</span></button></li>`).join("");
  }
  $("#rooms").addEventListener("click", (e) => { const b = e.target.closest("[data-room]"); if (!b) return; active = b.dataset.room; drawRooms(); drawFeed(); });
  $("#sort").addEventListener("click", (e) => { const b = e.target.closest("[data-sort]"); if (!b) return; sort = b.dataset.sort; $$("#sort button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); drawFeed(); });
  $("#q").addEventListener("input", (e) => { query = e.target.value.trim().toLowerCase(); drawFeed(); });

  /* ---------- feed ---------- */
  function visible() {
    let list = active === "all" ? all() : (data[active] || []).map((p) => ({ ...p, room: active }));
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query) || p.title.toLowerCase().includes(query));
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price); else if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }
  function drawFeed() {
    const list = visible();
    $("#feed-title").textContent = active === "all" ? "All rooms" : roomTitle(active);
    $("#feed-count").textContent = `${list.length} ${list.length === 1 ? "piece" : "pieces"}`;
    $("#feed").innerHTML = list.length ? list.map((p, i) => `<button type="button" class="card${i % 7 === 0 && list.length > 4 ? " wide" : ""}" style="--i:${Math.min(i, 14)}" data-open="${esc(p.handle)}"><span class="chip">${esc(roomTitle(p.room))}</span>${ph(p, i % 7 === 0 ? 900 : 600)}<span class="t">${esc(p.name)}</span><span class="p">${p.variants.length > 1 ? "From " : ""}${money(p.price)}</span></button>`).join("") : `<p class="empty">Nothing matches “${esc(query)}”. Try another word or room.</p>`;
  }
  $("#feed").addEventListener("pointermove", (e) => { if (!fine || reduce) return; const c = e.target.closest(".card"); if (!c) return; const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; c.style.setProperty("--mx", `${(x * 100).toFixed(0)}%`); c.style.setProperty("--my", `${(y * 100).toFixed(0)}%`); c.style.setProperty("--rx", `${((0.5 - y) * 6).toFixed(2)}deg`); c.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`); });
  $("#feed").addEventListener("pointerout", (e) => { const c = e.target.closest(".card"); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); } });

  /* ---------- right feeds ---------- */
  function drawMini() {
    const a = all();
    const mini = (p) => `<li><button type="button" data-open="${esc(p.handle)}"><figure class="ph" style="--tint:${p.tint}"><img src="${sized(p.images[0], 160)}" alt="" loading="lazy"></figure><span><span class="t">${esc(p.name)}</span><span class="p">${money(p.price)}</span></span></button></li>`;
    $("#fresh").innerHTML = [...a].reverse().slice(0, 4).map(mini).join("");
    $("#under").innerHTML = a.filter((p) => p.price < 20).slice(0, 4).map(mini).join("") || `<li class="fine">No pieces under $20 right now.</li>`;
  }

  /* ---------- hero: rotating featured pieces, neon hue per slide ---------- */
  const hues = [340, 200, 130, 300, 20, 250];
  let slides = [], cur = 0, timer = 0;
  function pickSlides() { slides = rooms.map((r) => (data[r.handle] || [])[0] && { ...data[r.handle][0], room: r.handle }).filter(Boolean).slice(0, 6); }
  function showSlide(i, instant) {
    if (!slides.length) return; cur = (i + slides.length) % slides.length; const p = slides[cur], hero = $("#hero");
    const apply = () => {
      hero.style.setProperty("--hue", hues[cur % hues.length]);
      $("#hero-room").textContent = roomTitle(p.room); $("#hero-title").textContent = p.name; $("#hero-sub").textContent = `Discover the ${roomTitle(p.room).toLowerCase()} edit: pieces chosen to work together.`;
      $("#hero-price").textContent = `${p.variants.length > 1 ? "From " : ""}${money(p.price)}`;
      const im = $("#hero-img"); $("#hero-ph").style.setProperty("--tint", p.tint); im.style.visibility = ""; im.src = sized(p.images[0], 900);
      $$("#hero-dots button").forEach((b, k) => b.setAttribute("aria-pressed", String(k === cur)));
      $("#hero-open").dataset.open = p.handle;
      const bar = $("#hero-prog"); bar.classList.remove("run"); void bar.offsetWidth; if (!reduce) bar.classList.add("run");
    };
    if (instant || reduce) { apply(); return; }
    hero.classList.add("swap"); setTimeout(() => { apply(); hero.classList.remove("swap"); }, 320);
  }
  let paused = false;
  function startTimer() { clearInterval(timer); if (paused || document.hidden) return; timer = setInterval(() => showSlide(cur + 1), reduce ? 9000 : 7000); }
  function drawHero() {
    pickSlides();
    $("#hero-dots").innerHTML = slides.map((p, i) => `<button type="button" data-slide="${i}" aria-label="Show ${esc(p.name)}" aria-pressed="${i === cur}"></button>`).join("");
    showSlide(Math.min(cur, Math.max(0, slides.length - 1)), true); startTimer();
  }
  const go = (n) => { showSlide(n); startTimer(); };
  $("#hero-dots").addEventListener("click", (e) => { const b = e.target.closest("[data-slide]"); if (b) go(+b.dataset.slide); });
  $("#hero-prev").addEventListener("click", () => go(cur - 1));
  $("#hero-next").addEventListener("click", () => go(cur + 1));
  $("#hero-pause").addEventListener("click", (e) => { paused = !paused; e.currentTarget.setAttribute("aria-pressed", String(paused)); e.currentTarget.textContent = paused ? "▶" : "❚❚"; e.currentTarget.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow"); const bar = $("#hero-prog"); bar.style.animationPlayState = paused ? "paused" : "running"; startTimer(); });
  /* swipe on touch screens */
  let sx = 0, sy = 0;
  $("#hero").addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  $("#hero").addEventListener("touchend", (e) => { const t = e.changedTouches[0]; const dx = t.clientX - sx, dy = t.clientY - sy; if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) go(cur + (dx < 0 ? 1 : -1)); }, { passive: true });
  document.addEventListener("visibilitychange", startTimer);
  $("#hero").addEventListener("pointermove", (e) => { if (reduce) return; const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--gx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(0)}%`); e.currentTarget.style.setProperty("--gy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(0)}%`); }, { passive: true });
  /* only a real mouse hovering pauses autoplay; touch never stops it */
  $("#hero").addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") clearInterval(timer); });
  $("#hero").addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") startTimer(); });

  /* ---------- detail panel ---------- */
  const panel = $("#panel");
  async function openProduct(handle) {
    const p = await window.DW.product(handle); if (!p) return;
    panel.showModal();
    $("#p-room").textContent = roomTitle(p.room || (all().find((x) => x.handle === handle) || {}).room || "");
    $("#p-title").textContent = p.title; $("#p-ph").style.setProperty("--tint", p.tint);
    const im = $("#p-img"); im.style.visibility = ""; im.src = sized(p.images[0], 1000);
    $("#p-desc").textContent = p.description || ""; $("#p-desc").hidden = !p.description;
    const sel = {}; p.options.forEach((o) => { sel[o.name] = ""; });
    const optsEl = $("#p-options");
    optsEl.innerHTML = p.options.map((o) => `<fieldset class="opt-group"><legend>${esc(o.name)}</legend><div class="chips">${o.values.map((v) => `<label class="chipb"><input type="radio" name="o-${esc(o.name)}" value="${esc(v)}" data-o="${esc(o.name)}"><span>${esc(v)}</span></label>`).join("")}</div></fieldset>`).join("");
    if (p.options.length === 1) p.options[0].values.forEach((val) => { const vs = p.variants.filter((v) => v.options && v.options[0] === val); if (vs.length && vs.every((v) => !v.available)) { const inp = $(`input[value="${CSS.escape(val)}"]`, optsEl); if (inp) inp.disabled = true; } });
    let qty = 1; $("#qty").textContent = 1;
    const from = p.variants.length > 1 && new Set(p.variants.map((v) => v.price)).size > 1;
    const chosen = () => { if (!p.options.length) return p.variants[0]; const picks = p.options.map((o) => sel[o.name]); if (picks.some((x) => !x)) return null; return p.variants.find((v) => v.options && picks.every((x, i) => v.options[i] === x)) || null; };
    const sync = () => { const v = chosen(); const missing = p.options.filter((o) => !sel[o.name]).map((o) => o.name.toLowerCase()); $("#p-price").textContent = v ? money(v.price) : `${from ? "From " : ""}${money(p.price)}`; $("#add").disabled = !v || !v.available; $("#p-msg").textContent = !v ? (missing.length ? `Choose ${missing.join(" and ")}.` : "That combination is not available.") : !v.available ? "Sold out." : ""; };
    optsEl.onchange = (e) => { const r = e.target.closest("[data-o]"); if (r) { sel[r.dataset.o] = r.value; sync(); } };
    $("#less").onclick = () => { qty = Math.max(1, qty - 1); $("#qty").textContent = qty; };
    $("#more").onclick = () => { qty = Math.min(9, qty + 1); $("#qty").textContent = qty; };
    $("#add").onclick = () => { const v = chosen(); if (!v || !v.available) return; panel.close(); window.DWCart.add({ handle: p.handle, title: p.title, variantId: v.id, variantTitle: v.title, price: v.price, qty, img: sized(p.images[0], 160) }); };
    sync();
  }
  document.addEventListener("click", (e) => { const o = e.target.closest("[data-open]"); if (o && o.dataset.open) openProduct(o.dataset.open); if (e.target === panel || e.target.closest("#panel [data-close]")) panel.close(); });

  /* ---------- live upgrade ---------- */
  function upgrade() {
    rooms.forEach((r) => window.DW.room(r.handle).then((ps) => { if (ps.length && ps[0].live) { data[r.handle] = ps; drawRooms(); drawFeed(); drawMini(); drawHero(); $("#data-status").textContent = "Showing live products from the store."; } }));
  }

  drawRooms(); drawFeed(); drawMini(); drawHero(); upgrade();
})();
