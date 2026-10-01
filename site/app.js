/* Drapewell lookbook mockup. Static; no network calls except photo loads from the store CDN.
   Navigation comes from menu.js (mirror of the live Shopify Main menu). The preview editor
   changes a browser-local copy only; the live menu is edited in Shopify admin. */
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
const money = (n) => `From $${n.toFixed(2)}`;
const pad = (n) => String(n).padStart(2, "0");

function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (_) { /* blocked */ } return null; }
function getMenu() {
  try { const s = JSON.parse(store("dw-menu-lookbook")); if (Array.isArray(s) && s.length) return s; } catch (_) { /* fall through */ }
  return window.DW_MENU.map((m) => ({ ...m }));
}
function saveMenu(m) { store("dw-menu-lookbook", JSON.stringify(m)); }
const rooms = (menu) => menu.filter((m) => m.type === "COLLECTION");
const productsIn = (handle) => window.DW_PRODUCTS.filter((p) => p.room === handle);
const img = (p, w) => `${window.DW_CDN}${p.img}?width=${w}`;
const productUrl = (p) => `${window.DW_STORE}/products/${p.handle}`;
const roomUrl = (h) => `room.html?room=${encodeURIComponent(h)}`;
const photo = (p, sizes) => `<img src="${img(p, 900)}" srcset="${img(p, 500)} 500w, ${img(p, 900)} 900w, ${img(p, 1400)} 1400w" sizes="${sizes}" alt="" loading="lazy" decoding="async">`;

function paintNav(menu, current) {
  const nav = $("#mast-nav");
  nav.innerHTML = menu.map((m) => {
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
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach((e) => io.observe(e));
}

/* ---------- home ---------- */
function initHome() {
  let menu = getMenu();

  function render() {
    paintNav(menu);
    const rs = rooms(menu);
    $("#index").innerHTML = rs.map((r, i) => `<li><a href="#room-${esc(r.handle)}"><span class="n">${pad(i + 1)}</span>${esc(r.title)}</a></li>`).join("");
    $("#spreads").innerHTML = rs.map((r, i) => {
      const ps = productsIn(r.handle);
      const lead = ps[0];
      return `<section class="spread" id="room-${esc(r.handle)}" aria-labelledby="h-${esc(r.handle)}">
        <figure class="plate reveal" ${lead ? `style="--tint:${lead.tint}"` : ""}>${lead ? photo(lead, "(min-width: 900px) 58vw, 100vw") : ""}${lead ? `<figcaption>${esc(lead.name)}</figcaption>` : ""}</figure>
        <div class="reveal">
          <p class="room-no">${pad(i + 1)}</p>
          <h2 id="h-${esc(r.handle)}">${esc(r.title)}</h2>
          <p class="room-line">${esc(ROOM_LINES[r.handle] || "New in the store.")}</p>
          ${ps.length ? `<ul class="room-list">${ps.slice(0, 4).map((p) => `<li><a href="${productUrl(p)}"><span class="thumb" style="--tint:${p.tint}"><img src="${img(p, 160)}" alt="" loading="lazy" decoding="async"></span><span class="t">${esc(p.name)}</span><span class="p">${money(p.price)}</span></a></li>`).join("")}</ul>
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
    saveMenu(menu); $("#menu-add").reset(); note.textContent = `Added “${title}”.`; render();
  });
  $("#menu-reset").addEventListener("click", () => { try { localStorage.removeItem("dw-menu-lookbook"); } catch (_) { /* ignore */ } menu = getMenu(); $("#menu-note").textContent = "Menu reset to the live Main menu."; render(); });

  const heroP = window.DW_PRODUCTS[0];
  $("#hero-plate").style.setProperty("--tint", heroP.tint);
  $("#hero-plate").innerHTML = `<img src="${img(heroP, 900)}" srcset="${img(heroP, 600)} 600w, ${img(heroP, 1000)} 1000w, ${img(heroP, 1600)} 1600w" sizes="(min-width: 900px) 58vw, 100vw" alt="" decoding="async" fetchpriority="high"><figcaption>${esc(heroP.name)}</figcaption>`;
  paintFooter();
  render();
}

/* ---------- room page ---------- */
function initRoom() {
  const menu = getMenu();
  const handle = new URLSearchParams(location.search).get("room") || "bathroom";
  const r = rooms(menu).find((x) => x.handle === handle) || { title: handle.replace(/-/g, " "), handle };
  paintNav(menu, handle);
  document.title = `${r.title} | Drapewell`;
  $("#room-title").textContent = r.title;
  const ps = productsIn(handle);
  $("#room-sub").textContent = ps.length ? `${ps.length} ${ps.length === 1 ? "piece" : "pieces"}. ${ROOM_LINES[handle] || ""}` : "No products in this room yet.";
  $("#grid").innerHTML = ps.map((p) => `<li class="card reveal"><a href="${productUrl(p)}"><figure class="plate" style="--tint:${p.tint}">${photo(p, "(min-width: 900px) 25vw, 50vw")}</figure><div class="row"><span class="t">${esc(p.name)}</span><span class="p">${money(p.price)}</span></div></a></li>`).join("");
  paintFooter();
  reveal();
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "room") initRoom();
});
