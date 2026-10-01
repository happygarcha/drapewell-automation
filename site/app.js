/* Drapewell lookbook storefront.
   Navigation comes from menu.js (mirror of the live Shopify Main menu; the preview editor changes a
   browser-local copy only). Products load live from the store when the browser allows it, otherwise
   from the bundled snapshot (data.js, catalog.js). The cart is local; checkout opens the live store. */
document.documentElement.classList.add("js");
/* a photo that fails to load leaves its tinted frame, never a broken-image icon */
document.addEventListener("error", (e) => { if (e.target.tagName === "IMG") e.target.style.visibility = "hidden"; }, true);

const ROOM_LINES = {
  bathroom: "Shower curtains, rugs and small things that make the room feel put together.",
  bedroom: "Soft rugs and throws for the quiet corners of the room.",
  kitchen: "Linen and tools for the table and the counter.",
  "living-room": "Wall art and layers for the room you sit in most.",
  "pet-supplies": "Beds and mats for the smallest members of the house.",
  seasonal: "Autumn and Christmas pieces, ordered ahead of the season.",
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const money = (n) => `$${n.toFixed(2)}`;
const from = (p) => (p.variants.length > 1 && new Set(p.variants.map((v) => v.price)).size > 1 ? `From ${money(p.price)}` : money(p.price));
const pad = (n) => String(n).padStart(2, "0");

function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (_) { /* blocked */ } return null; }
function getMenu() {
  try { const s = JSON.parse(store("dw-menu-lookbook")); if (Array.isArray(s) && s.length) return s; } catch (_) { /* fall through */ }
  return window.DW_MENU.map((m) => ({ ...m }));
}
function saveMenu(m) { store("dw-menu-lookbook", JSON.stringify(m)); }
const rooms = (menu) => menu.filter((m) => m.type === "COLLECTION");
const snap = (handle) => window.DW_PRODUCTS.filter((p) => p.room === handle).map((p) => ({ handle: p.handle, title: p.name, name: p.name, room: p.room, price: p.price, tint: p.tint, images: [window.DW_CDN + p.img], variants: [{ id: null, title: "Default", price: p.price, available: true }], options: [] }));
const sized = (url, w) => (url ? `${url}${url.includes("?") ? "&" : "?"}width=${w}` : "");
const img = (p, w) => sized(p.images[0], w);
const productUrl = (p) => `product.html?handle=${encodeURIComponent(p.handle)}`;
const roomUrl = (h) => `room.html?room=${encodeURIComponent(h)}`;
const photo = (p, sizes) => `<img src="${img(p, 900)}" srcset="${img(p, 500)} 500w, ${img(p, 900)} 900w, ${img(p, 1400)} 1400w" sizes="${sizes}" alt="" loading="lazy" decoding="async">`;

function paintHeader(menu, current) {
  $("#mast-nav").innerHTML = menu.map((m) => {
    const href = m.type === "COLLECTION" ? roomUrl(m.handle) : m.type === "FRONTPAGE" ? "index.html" : `${window.DW_STORE}${m.url || ""}`;
    const cur = (m.type === "COLLECTION" && m.handle === current) ? ' aria-current="page"' : "";
    return `<a href="${esc(href)}"${cur}>${esc(m.title)}</a>`;
  }).join("");
}

function paintFooter() {
  const links = [["Shipping policy", "/pages/shipping-policy"], ["Refund policy", "/pages/refund-policy"], ["Terms of service", "/pages/terms-of-service"], ["Privacy policy", "/policies/privacy-policy"], ["Contact", "/pages/contact"]];
  $("#foot-links").innerHTML = links.map(([t, u]) => `<a href="${window.DW_STORE}${u}">${t}</a>`).join("");
}

function reveal() {
  const els = $$(".reveal:not(.in)");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach((e) => io.observe(e));
}

/* ---------- home ---------- */
function initHome() {
  let menu = getMenu();
  const data = {}; // room handle -> products (snapshot first, live when it arrives)
  const list = (h) => data[h] || (data[h] = snap(h));

  function render() {
    paintHeader(menu);
    const rs = rooms(menu);
    $("#index").innerHTML = rs.map((r, i) => `<li><a href="#room-${esc(r.handle)}"><span class="n">${pad(i + 1)}</span>${esc(r.title)}</a></li>`).join("");
    $("#spreads").innerHTML = rs.map((r, i) => {
      const ps = list(r.handle), lead = ps[0];
      return `<section class="spread" id="room-${esc(r.handle)}" aria-labelledby="h-${esc(r.handle)}">
        <figure class="plate reveal" ${lead ? `style="--tint:${lead.tint}"` : ""}>${lead ? `<a href="${productUrl(lead)}" aria-label="${esc(lead.name)}">${photo(lead, "(min-width: 900px) 58vw, 100vw")}</a><figcaption>${esc(lead.name)}</figcaption>` : ""}</figure>
        <div class="reveal">
          <p class="room-no">${pad(i + 1)}</p>
          <h2 id="h-${esc(r.handle)}">${esc(r.title)}</h2>
          <p class="room-line">${esc(ROOM_LINES[r.handle] || "New in the store.")}</p>
          ${ps.length ? `<ul class="room-list">${ps.slice(0, 4).map((p) => `<li><a href="${productUrl(p)}"><span class="thumb" style="--tint:${p.tint}"><img src="${img(p, 160)}" alt="" loading="lazy" decoding="async"></span><span class="t">${esc(p.name)}</span><span class="p">${from(p)}</span></a></li>`).join("")}</ul>
          <a class="more" href="${roomUrl(r.handle)}">See all ${ps.length} in ${esc(r.title)}</a>` : `<p class="empty">No products in this room yet.</p>`}
        </div></section>`;
    }).join("");
    renderEditor();
    reveal();
  }

  function renderEditor() {
    $("#menu-list").innerHTML = menu.map((m, i) => `<li><span class="m-title">${esc(m.title)}</span><span class="m-type">${m.type === "COLLECTION" ? "Room" : m.type === "PAGE" ? "Page" : "Link"}</span>
      <span class="m-actions"><button type="button" data-up="${i}" aria-label="Move ${esc(m.title)} up" ${i === 0 ? "disabled" : ""}>Up</button><button type="button" data-down="${i}" aria-label="Move ${esc(m.title)} down" ${i === menu.length - 1 ? "disabled" : ""}>Down</button><button type="button" data-remove="${i}" aria-label="Remove ${esc(m.title)}">Remove</button></span></li>`).join("");
  }

  $("#menu-list").addEventListener("click", (e) => {
    const t = e.target.closest("button"); if (!t) return;
    const n = (k) => parseInt(t.dataset[k], 10);
    if (t.dataset.remove !== undefined) menu.splice(n("remove"), 1);
    else if (t.dataset.up !== undefined) { const i = n("up"); [menu[i - 1], menu[i]] = [menu[i], menu[i - 1]]; }
    else if (t.dataset.down !== undefined) { const i = n("down"); [menu[i + 1], menu[i]] = [menu[i], menu[i + 1]]; }
    saveMenu(menu); render();
  });
  $("#menu-add").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("#m-title").value.trim(), note = $("#menu-note");
    if (!title) { note.textContent = "Give the menu item a title."; return; }
    const handle = slug($("#m-handle").value || title);
    if (menu.some((m) => m.handle === handle)) { note.textContent = `“${title}” is already in the menu.`; return; }
    const at = menu.findIndex((m) => m.type !== "COLLECTION" && m.type !== "FRONTPAGE");
    menu.splice(at === -1 ? menu.length : at, 0, { title, type: "COLLECTION", handle });
    saveMenu(menu); $("#menu-add").reset(); note.textContent = `Added “${title}”.`; render(); loadLive();
  });
  $("#menu-reset").addEventListener("click", () => { try { localStorage.removeItem("dw-menu-lookbook"); } catch (_) { /* ignore */ } menu = getMenu(); $("#menu-note").textContent = "Menu reset to the live Main menu."; render(); loadLive(); });

  /* upgrade each room to live data when the store answers */
  function loadLive() {
    rooms(menu).forEach((r) => window.DW.room(r.handle).then((ps) => { if (ps.length && ps[0].live) { data[r.handle] = ps; render(); setStatus(); } }));
  }
  function setStatus() { const s = $("#data-status"); if (s) s.textContent = "Showing live products from the store."; }

  const heroP = snap("bathroom")[0];
  $("#hero-plate").style.setProperty("--tint", heroP.tint);
  $("#hero-plate").innerHTML = `<a href="${productUrl(heroP)}" aria-label="${esc(heroP.name)}"><img src="${img(heroP, 900)}" srcset="${img(heroP, 600)} 600w, ${img(heroP, 1000)} 1000w, ${img(heroP, 1600)} 1600w" sizes="(min-width: 900px) 58vw, 100vw" alt="" decoding="async" fetchpriority="high"></a><figcaption>${esc(heroP.name)}</figcaption>`;
  paintFooter();
  render();
  loadLive();
}

/* ---------- room page ---------- */
async function initRoom() {
  const menu = getMenu();
  const handle = new URLSearchParams(location.search).get("room") || "bathroom";
  const r = rooms(menu).find((x) => x.handle === handle) || { title: handle.replace(/-/g, " "), handle };
  paintHeader(menu, handle);
  document.title = `${r.title} | Drapewell`;
  $("#room-title").textContent = r.title;
  paintFooter();
  const draw = (ps) => {
    $("#room-sub").textContent = ps.length ? `${ps.length} ${ps.length === 1 ? "piece" : "pieces"}. ${ROOM_LINES[handle] || ""}` : "No products in this room yet.";
    $("#grid").innerHTML = ps.map((p) => `<li class="card reveal"><a href="${productUrl(p)}"><figure class="plate" style="--tint:${p.tint}">${photo(p, "(min-width: 900px) 25vw, 50vw")}</figure><div class="row"><span class="t">${esc(p.name)}</span><span class="p">${from(p)}</span></div></a></li>`).join("");
    reveal();
  };
  draw(snap(handle));
  const live = await window.DW.room(handle);
  if (live.length && live[0].live) draw(live);
}

/* ---------- product page ---------- */
async function initProduct() {
  const menu = getMenu();
  paintHeader(menu);
  paintFooter();
  const handle = new URLSearchParams(location.search).get("handle");
  const p = await window.DW.product(handle);
  const main = $("#main"); main.removeAttribute("aria-busy");
  if (!p) { main.innerHTML = `<p class="empty">We could not find that product. <a href="index.html">Back to the rooms</a>.</p>`; return; }
  document.title = `${p.title} | Drapewell`;
  const back = rooms(menu).find((m) => m.handle === p.room);
  $("#crumb").innerHTML = `<a href="index.html">Rooms</a>${back ? ` / <a href="${roomUrl(back.handle)}">${esc(back.title)}</a>` : ""} / <span>${esc(p.name)}</span>`;

  let current = 0;
  const gallery = $("#gallery");
  const drawGallery = () => {
    gallery.innerHTML = `<figure class="plate" style="--tint:${p.tint}">${p.images[current] ? `<img src="${sized(p.images[current], 1200)}" alt="${esc(p.title)}" decoding="async">` : ""}</figure>` +
      (p.images.length > 1 ? `<ul class="thumbs">${p.images.slice(0, 6).map((u, i) => `<li><button type="button" data-i="${i}" aria-label="Photo ${i + 1}" aria-pressed="${i === current}"><img src="${sized(u, 160)}" alt="" loading="lazy"></button></li>`).join("")}</ul>` : "");
  };
  gallery.addEventListener("click", (e) => {
    const b = e.target.closest("[data-i]"); if (!b) return;
    current = +b.dataset.i; drawGallery();
    const again = $(`[data-i="${current}"]`, gallery); if (again) again.focus(); // keep keyboard focus after the redraw
  });
  drawGallery();

  $("#p-title").textContent = p.title;
  const sel = {}; p.options.forEach((o) => { sel[o.name] = ""; });
  const optsEl = $("#p-options");
  optsEl.innerHTML = p.options.map((o) => `<fieldset class="opt-group"><legend>${esc(o.name)}</legend><div class="chips">${o.values.map((v) => `<label class="chip"><input type="radio" name="o-${esc(o.name)}" value="${esc(v)}" data-o="${esc(o.name)}"><span>${esc(v)}</span></label>`).join("")}</div></fieldset>`).join("");

  if (p.options.length === 1) {
    p.options[0].values.forEach((val) => {
      const vs = p.variants.filter((v) => v.options && v.options[0] === val);
      if (vs.length && vs.every((v) => !v.available)) { const inp = $(`input[value="${CSS.escape(val)}"]`, optsEl); if (inp) { inp.disabled = true; inp.parentElement.title = "Sold out"; } }
    });
  }
  const priceEl = $("#p-price"), addEl = $("#add"), msg = $("#p-msg");
  let qty = 1;
  const chosen = () => {
    if (!p.options.length) return p.variants[0];
    const picks = p.options.map((o) => sel[o.name]);
    if (picks.some((x) => !x)) return null;
    return p.variants.find((v) => v.options && picks.every((x, i) => v.options[i] === x)) || null;
  };
  function sync() {
    const v = chosen();
    const missing = p.options.filter((o) => !sel[o.name]).map((o) => o.name.toLowerCase());
    priceEl.textContent = v ? money(v.price) : from(p);
    addEl.disabled = !v || !v.available;
    addEl.setAttribute("aria-disabled", String(addEl.disabled));
    msg.textContent = !v ? (missing.length ? `Choose ${missing.join(" and ")}.` : "That combination is not available.") : !v.available ? "Sold out." : "";
  }
  optsEl.addEventListener("change", (e) => { const r = e.target.closest("[data-o]"); if (r) { sel[r.dataset.o] = r.value; sync(); } });
  $("#less").addEventListener("click", () => { qty = Math.max(1, qty - 1); $("#qty").textContent = qty; });
  $("#more").addEventListener("click", () => { qty = Math.min(9, qty + 1); $("#qty").textContent = qty; });
  addEl.addEventListener("click", () => {
    const v = chosen(); if (!v || !v.available) return;
    window.DWCart.add({ handle: p.handle, title: p.title, variantId: v.id, variantTitle: v.title, price: v.price, qty, img: sized(p.images[0], 160) });
  });
  $("#p-desc").textContent = p.description || "";
  $("#p-desc").hidden = !p.description;
  $("#p-source").textContent = p.live ? "Live from the store." : "Offline snapshot: options and descriptions load when the store is reachable.";
  sync();
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "room") initRoom();
  if (page === "product") initProduct();
});
