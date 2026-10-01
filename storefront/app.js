/* Drapewell storefront mockup: a general-store catalog. Static, no network calls.
   All catalog content is SAMPLE data: names, specs and options are placeholders.
   There are no prices, stock levels or shipping claims.
   Navigation comes from menu.js (a mirror of the live Shopify Main menu); the
   in-page menu editor changes a browser-local copy only. */

/* line drawings: 120x120, ink strokes with one red spot each */
const ART = {
  drape: `<path d="M22 16h76"/><path d="M28 16c-4 30-4 60 0 90h22c-4-30-4-60 0-90M92 16c4 30 4 60 0 90H70c4-30 4-60 0-90"/><path d="M36 20v82M42 20v82M78 20v82M84 20v82"/><circle class="spot" cx="39" cy="62" r="5"/>`,
  cushion: `<path d="M20 26c24-8 56-8 80 0 6 22 6 46 0 68-24 8-56 8-80 0-6-22-6-46 0-68z"/><path d="M20 26l80 68M100 26L20 94"/><circle class="spot" cx="60" cy="60" r="6"/>`,
  rug: `<rect x="14" y="26" width="92" height="68" rx="2"/><rect x="24" y="36" width="72" height="48"/><path d="M34 60l13-14 13 14-13 14zM60 60l13-14 13 14-13 14z"/><circle class="spot" cx="60" cy="60" r="4"/><path d="M14 98v8M26 98v8M38 98v8M50 98v8M62 98v8M74 98v8M86 98v8M98 98v8"/>`,
  pan: `<path d="M24 52h58v38c0 6-4 10-10 10H34c-6 0-10-4-10-10z"/><path d="M82 62h26"/><path d="M22 52h62"/><path d="M30 46h46c0-8-8-12-23-12s-23 4-23 12z"/><circle class="spot" cx="53" cy="30" r="5"/>`,
  kettle: `<path d="M30 40h44l6 50c0 6-4 10-10 10H34c-6 0-10-4-10-10z"/><path d="M74 54c14-6 22 0 22 8M30 40c0-8 4-14 22-14s22 6 22 14"/><path d="M80 44l20-12"/><circle class="spot" cx="52" cy="20" r="5"/>`,
  jars: `<rect x="12" y="44" width="28" height="52" rx="3"/><rect x="46" y="34" width="28" height="62" rx="3"/><rect x="80" y="52" width="28" height="44" rx="3"/><path d="M12 44v-8h28v8M46 34v-8h28v8M80 52v-8h28v8"/><circle class="spot" cx="60" cy="68" r="5"/>`,
  curtain: `<path d="M20 20h80"/><circle cx="30" cy="20" r="3"/><circle cx="50" cy="20" r="3"/><circle cx="70" cy="20" r="3"/><circle cx="90" cy="20" r="3"/><path d="M24 24h72v68c-12 6-24-6-36 0s-24-6-36 0z"/><circle class="spot" cx="42" cy="82" r="5"/>`,
  pillow: `<path d="M18 40c24-10 60-10 84 0v40c-24 10-60 10-84 0z"/><path d="M30 52c18-6 42-6 60 0"/><circle class="spot" cx="60" cy="68" r="4"/>`,
  throw: `<rect x="20" y="40" width="80" height="44" rx="2"/><path d="M20 52h80M20 64h80M20 76h80M100 40v44"/><circle class="spot" cx="32" cy="62" r="4"/>`,
  bed: `<path d="M16 96L60 28l44 68z"/><path d="M44 96V70c0-10 32-10 32 0v26"/><circle class="spot" cx="60" cy="38" r="5"/>`,
  bowl: `<path d="M24 56h72c0 22-14 34-36 34S24 78 24 56z"/><path d="M20 56h80"/><circle class="spot" cx="60" cy="72" r="5"/>`,
  tree: `<circle cx="60" cy="60" r="40"/><circle cx="60" cy="60" r="8"/><path d="M60 52V20"/><circle class="spot" cx="88" cy="40" r="5"/>`,
  stocking: `<path d="M44 20h28v44l20 14c6 6 2 18-8 18H62c-10 0-18-6-18-18z"/><path d="M44 32h28"/><circle class="spot" cx="58" cy="26" r="3"/>`,
};

const ITEMS = [
  { no: "BTH-101", c: "bathroom", name: "Botanical shower curtain", spec: "Waterproof polyester. Sample sizes.", art: "curtain", opts: { label: "Size", values: ["Standard", "Extra long"] } },
  { no: "BTH-114", c: "bathroom", name: "3-piece toilet rug set", spec: "Non-slip backing.", art: "rug" },
  { no: "BTH-122", c: "bathroom", name: "Soap dispenser and toothbrush holder set", spec: "Matte finish.", art: "jars" },
  { no: "BED-201", c: "bedroom", name: "Pillowcase pair", spec: "Envelope closure.", art: "pillow", opts: { label: "Size", values: ["Standard", "Queen", "King"] } },
  { no: "BED-214", c: "bedroom", name: "Knit throw blanket", spec: "Fringed ends.", art: "throw" },
  { no: "KIT-301", c: "kitchen", name: "Enamel saucepan with lid", spec: "Oven-safe handle. Sample spec.", art: "pan" },
  { no: "KIT-312", c: "kitchen", name: "Pour-over kettle", spec: "Narrow spout, steel body.", art: "kettle" },
  { no: "KIT-325", c: "kitchen", name: "Stackable storage jars, set of 3", spec: "Airtight lids.", art: "jars" },
  { no: "LIV-401", c: "living-room", name: "Linen drape panel", spec: "Light-filtering, lined. Sample sizes.", art: "drape", opts: { label: "Drop, in", values: ["63", "84", "96", "108"] } },
  { no: "LIV-412", c: "living-room", name: "Velvet cushion cover", spec: "Hidden zip. Fits a standard insert.", art: "cushion", opts: { label: "Size, in", values: ["16", "18", "20"] } },
  { no: "LIV-428", c: "living-room", name: "Flatweave rug", spec: "Reversible, low pile.", art: "rug", opts: { label: "Size, ft", values: ["3×5", "5×8", "8×10"] } },
  { no: "PET-501", c: "pet-supplies", name: "Foldable cat tent bed", spec: "Washable cover.", art: "bed", opts: { label: "Size", values: ["Small", "Large"] } },
  { no: "PET-512", c: "pet-supplies", name: "Stainless pet bowl", spec: "Non-slip base.", art: "bowl" },
  { no: "SEA-601", c: "seasonal", name: "Christmas tree skirt", spec: "Embroidered edge.", art: "tree", opts: { label: "Diameter, in", values: ["36", "48"] } },
  { no: "SEA-612", c: "seasonal", name: "Knitted Christmas stocking", spec: "Cuff with loop.", art: "stocking" },
  { no: "SEA-624", c: "seasonal", name: "Embroidered cushion cover", spec: "Hidden zip.", art: "cushion" },
];

/* ---------- helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const slug = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function store(key, value) {
  try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch (_) { /* storage may be blocked */ }
  return null;
}
function cartCount() { return parseInt(store("dw-cart"), 10) || 0; }
function paintCart() { $$(".cart-count").forEach((el) => { el.textContent = cartCount(); }); }
function art(key) { return `<svg class="line-art" viewBox="0 0 120 120" aria-hidden="true">${ART[key]}</svg>`; }

/* menu: the live mirror, or this browser's edited copy */
function getMenu() {
  try { const saved = JSON.parse(store("dw-menu")); if (Array.isArray(saved) && saved.length) return saved; } catch (_) { /* fall through */ }
  return window.DW_MENU.map((m) => ({ ...m }));
}
function saveMenu(menu) { store("dw-menu", JSON.stringify(menu)); }
function resetMenu() { try { localStorage.removeItem("dw-menu"); } catch (_) { /* ignore */ } }
const collections = (menu) => menu.filter((m) => m.type === "COLLECTION");
const links = (menu) => menu.filter((m) => m.type !== "COLLECTION");
function paintMastLinks(menu) {
  const box = $("#mast-links");
  if (box) box.innerHTML = links(menu).map((m) => `<a href="${esc(m.url || "#")}">${esc(m.title)}</a>`).join("");
}

function itemRow(it) {
  return `<li class="item" data-no="${it.no}">
    <div class="item-art">${art(it.art)}</div>
    <div><span class="item-no">${it.no}</span></div>
    <div><h3><a href="product.html?no=${it.no}">${esc(it.name)}</a></h3><p class="spec">${esc(it.spec)}</p></div>
    <div class="item-foot">
      <span class="price">Price not set</span>
      ${it.opts ? `<a class="btn" href="product.html?no=${it.no}">Choose ${esc(it.opts.label.toLowerCase().replace(/, .*/, ""))}</a>` : `<button class="btn" type="button" data-add="${it.no}">Add to cart</button>`}
    </div>
    <p class="added" role="status" aria-live="polite"></p>
  </li>`;
}

function wireAdd(root) {
  root.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    store("dw-cart", String(cartCount() + 1));
    paintCart();
    $(".added", btn.closest(".item")).textContent = "Added 1. Mockup: no order is placed.";
  });
}

/* ---------- home ---------- */
function initHome() {
  const tabs = $("#tabs"), book = $("#depts"), editor = $("#editor");
  let menu = getMenu();
  let active = "all";

  function render() {
    const cols = collections(menu);
    if (active !== "all" && !cols.some((c) => c.handle === active)) active = "all";
    paintMastLinks(menu);
    tabs.innerHTML = [{ handle: "all", title: "All departments" }, ...cols].map((d) => `<button class="tab" type="button" data-tab="${esc(d.handle)}" aria-pressed="${d.handle === active}">${esc(d.title)}</button>`).join("") +
      `<button class="tab tab-edit" type="button" data-edit aria-expanded="${!editor.hidden}">Edit menu</button>`;
    book.innerHTML = cols.map((d) => {
      const rows = ITEMS.filter((i) => i.c === d.handle);
      return `<section class="dept" id="dept-${esc(d.handle)}" aria-labelledby="h-${esc(d.handle)}" ${active === "all" || active === d.handle ? "" : "hidden"}>
        <div class="dept-head"><h2 id="h-${esc(d.handle)}">${esc(d.title)}</h2><p>${rows.length} ${rows.length === 1 ? "item" : "items"}</p></div>
        ${rows.length ? `<ul class="items">${rows.map(itemRow).join("")}</ul>` : `<p class="empty">No items in this department yet.</p>`}
      </section>`;
    }).join("");
    renderEditor();
  }

  function renderEditor() {
    $("#menu-list").innerHTML = menu.map((m, i) => `<li>
      <span class="m-title">${esc(m.title)}</span><span class="m-type">${m.type === "COLLECTION" ? "Collection" : m.type === "PAGE" ? "Page" : "Link"}</span>
      <span class="m-actions">
        <button type="button" data-up="${i}" aria-label="Move ${esc(m.title)} up" ${i === 0 ? "disabled" : ""}>↑</button>
        <button type="button" data-down="${i}" aria-label="Move ${esc(m.title)} down" ${i === menu.length - 1 ? "disabled" : ""}>↓</button>
        <button type="button" data-remove="${i}" aria-label="Remove ${esc(m.title)}">Remove</button>
      </span></li>`).join("");
  }

  function turn(id) {
    active = id;
    $$("[data-tab]", tabs).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tab === id)));
    $$(".dept", book).forEach((s) => {
      const on = id === "all" || s.id === `dept-${id}`;
      s.hidden = !on;
      s.classList.remove("is-turning");
      if (on && id !== "all") { void s.offsetWidth; s.classList.add("is-turning"); }
    });
  }

  tabs.addEventListener("click", (e) => {
    if (e.target.closest("[data-edit]")) { editor.hidden = !editor.hidden; $("[data-edit]", tabs).setAttribute("aria-expanded", String(!editor.hidden)); return; }
    const b = e.target.closest("[data-tab]"); if (b) turn(b.dataset.tab);
  });
  wireAdd(book);

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
    const title = $("#m-title").value.trim();
    if (!title) { $("#menu-note").textContent = "Give the menu item a title."; return; }
    const handle = slug($("#m-handle").value || title);
    if (menu.some((m) => m.handle === handle)) { $("#menu-note").textContent = `“${title}” would duplicate an item already in the menu.`; return; }
    const at = menu.findIndex((m) => m.type !== "COLLECTION" && m.type !== "FRONTPAGE");
    menu.splice(at === -1 ? menu.length : at, 0, { title, type: "COLLECTION", handle });
    saveMenu(menu); $("#menu-add").reset(); $("#menu-note").textContent = `Added “${title}”.`; render();
  });
  $("#menu-reset").addEventListener("click", () => { resetMenu(); menu = getMenu(); $("#menu-note").textContent = "Menu reset to the live Main menu."; render(); });

  $("#lookup").addEventListener("submit", (e) => {
    e.preventDefault();
    const raw = $("#item-q").value.trim(), q = raw.toLowerCase();
    const note = $("#lookup-note");
    if (!q) { note.textContent = "Type an item number such as KIT-312, or part of a name."; return; }
    const hit = ITEMS.find((i) => i.no.toLowerCase() === q) || ITEMS.find((i) => i.name.toLowerCase().includes(q));
    if (hit) { location.href = `product.html?no=${hit.no}`; } else { note.textContent = `No item matching “${raw}” in this sample catalog.`; }
  });

  render();
}

/* ---------- product ---------- */
function initProduct() {
  const menu = getMenu();
  paintMastLinks(menu);
  const q = new URLSearchParams(location.search);
  const it = ITEMS.find((x) => x.no === q.get("no")) || ITEMS[0];
  const dept = collections(menu).find((c) => c.handle === it.c) || { title: it.c };
  document.title = `${it.name} | Drapewell`;
  $("#crumb-dept").textContent = dept.title;
  $("#crumb-dept").href = `index.html#dept-${it.c}`;
  $("#crumb-name").textContent = it.name;
  $("#plate").innerHTML = art(it.art);
  $("#no").textContent = `Item ${it.no}`;
  $("#title").textContent = it.name;
  $("#lede").textContent = it.spec;

  const optBox = $("#opt-group");
  if (it.opts) {
    $("#opt-h").textContent = it.opts.label;
    $("#opts").innerHTML = it.opts.values.map((v) => `<label class="opt"><input type="radio" name="opt" value="${esc(v)}"><span>${esc(v)}</span></label>`).join("");
  } else {
    optBox.hidden = true;
  }

  let qty = 1;
  const out = $("#qty"), add = $("#add"), status = $("#status");
  $("#less").addEventListener("click", () => { qty = Math.max(1, qty - 1); out.textContent = qty; });
  $("#more").addEventListener("click", () => { qty = Math.min(9, qty + 1); out.textContent = qty; });

  function sync() {
    const needs = !!it.opts && !$("input[name=opt]:checked", optBox);
    add.disabled = needs;
    add.setAttribute("aria-disabled", String(needs));
    if (needs) status.textContent = "";
  }
  optBox.addEventListener("change", sync);
  sync();

  add.addEventListener("click", () => {
    const chosen = $("input[name=opt]:checked", optBox);
    if (it.opts && !chosen) { status.textContent = `Choose ${it.opts.label.toLowerCase()} first.`; return; }
    store("dw-cart", String(cartCount() + qty));
    paintCart();
    status.textContent = `Added ${qty} × ${it.name}${chosen ? ` (${chosen.value})` : ""}. Mockup: no order is placed.`;
  });

  const same = ITEMS.filter((i) => i.c === it.c && i.no !== it.no);
  $("#also").innerHTML = same.length ? `<ul class="items">${same.map(itemRow).join("")}</ul>` : `<p class="empty">No other items in this department yet.</p>`;
  wireAdd($("#also"));
}

document.addEventListener("DOMContentLoaded", () => {
  paintCart();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "product") initProduct();
});
