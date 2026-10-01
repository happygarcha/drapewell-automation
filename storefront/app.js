/* Drapewell storefront mockup: a general-store catalog. Static, no network calls.
   All catalog content is SAMPLE data: names, specs and options are placeholders.
   There are no prices, stock levels or shipping claims. */

const DEPTS = [
  { id: "H", name: "Home textiles", blurb: "Drapes, cushions, rugs" },
  { id: "K", name: "Kitchen & home", blurb: "Cook, store, serve" },
  { id: "G", name: "Gadgets", blurb: "Cables, stands, mounts" },
  { id: "F", name: "Fashion", blurb: "Bags, hats, basics" },
];

/* line drawings: 120x120, ink strokes with one red spot each */
const ART = {
  drape: `<path d="M22 16h76"/><path d="M28 16c-4 30-4 60 0 90h22c-4-30-4-60 0-90M92 16c4 30 4 60 0 90H70c4-30 4-60 0-90"/><path d="M36 20v82M42 20v82M78 20v82M84 20v82"/><circle class="spot" cx="39" cy="62" r="5"/>`,
  cushion: `<path d="M20 26c24-8 56-8 80 0 6 22 6 46 0 68-24 8-56 8-80 0-6-22-6-46 0-68z"/><path d="M20 26l80 68M100 26L20 94"/><circle class="spot" cx="60" cy="60" r="6"/>`,
  rug: `<rect x="14" y="26" width="92" height="68" rx="2"/><rect x="24" y="36" width="72" height="48"/><path d="M34 60l13-14 13 14-13 14zM60 60l13-14 13 14-13 14z"/><circle class="spot" cx="60" cy="60" r="4"/><path d="M14 98v8M26 98v8M38 98v8M50 98v8M62 98v8M74 98v8M86 98v8M98 98v8"/>`,
  pan: `<path d="M24 52h58v38c0 6-4 10-10 10H34c-6 0-10-4-10-10z"/><path d="M82 62h26"/><path d="M22 52h62"/><path d="M30 46h46c0-8-8-12-23-12s-23 4-23 12z"/><circle class="spot" cx="53" cy="30" r="5"/>`,
  kettle: `<path d="M30 40h44l6 50c0 6-4 10-10 10H34c-6 0-10-4-10-10z"/><path d="M74 54c14-6 22 0 22 8M30 40c0-8 4-14 22-14s22 6 22 14"/><path d="M80 44l20-12"/><circle class="spot" cx="52" cy="20" r="5"/>`,
  jars: `<rect x="12" y="44" width="28" height="52" rx="3"/><rect x="46" y="34" width="28" height="62" rx="3"/><rect x="80" y="52" width="28" height="44" rx="3"/><path d="M12 44v-8h28v8M46 34v-8h28v8M80 52v-8h28v8"/><circle class="spot" cx="60" cy="68" r="5"/>`,
  cable: `<path d="M20 36h16v14H20zM84 80h16v14H84z"/><path d="M36 43c30 0 6 38 38 38h10"/><path d="M16 40h4M16 46h4M100 84h4M100 90h4"/><circle class="spot" cx="60" cy="62" r="5"/>`,
  stand: `<path d="M30 92h60l-6-12H36z"/><path d="M42 80l10-52h28l-8 52"/><rect x="50" y="30" width="26" height="44" rx="3"/><circle class="spot" cx="63" cy="68" r="3"/>`,
  mount: `<circle cx="60" cy="60" r="38"/><path d="M30 60h60M34 48h52M34 72h52"/><rect x="48" y="30" width="24" height="44" rx="3"/><circle class="spot" cx="60" cy="68" r="3"/>`,
  tote: `<path d="M26 44h68l6 56H20z"/><path d="M42 44c0-26 36-26 36 0"/><rect class="spot" x="50" y="66" width="20" height="14" rx="1"/>`,
  beanie: `<path d="M24 84c0-34 14-54 36-54s36 20 36 54z"/><path d="M22 84h76v14H22z"/><path d="M40 84v14M52 84v14M64 84v14M76 84v14"/><circle class="spot" cx="60" cy="24" r="8"/>`,
  tee: `<path d="M42 22l-26 16 10 18 12-6v52h44V50l12 6 10-18-26-16c-4 8-10 12-18 12s-14-4-18-12z"/><rect class="spot" x="55" y="86" width="12" height="9"/>`,
};

const ITEMS = [
  { no: "H-014", d: "H", name: "Linen drape panel", spec: "Light-filtering, lined. Sample sizes.", art: "drape", opts: { label: "Drop, in", values: ["63", "84", "96", "108"] } },
  { no: "H-022", d: "H", name: "Velvet cushion cover", spec: "Hidden zip. Fits a standard insert.", art: "cushion", opts: { label: "Size, in", values: ["16", "18", "20"] } },
  { no: "H-031", d: "H", name: "Flatweave rug", spec: "Reversible, low pile.", art: "rug", opts: { label: "Size, ft", values: ["3×5", "5×8", "8×10"] } },
  { no: "K-105", d: "K", name: "Enamel saucepan with lid", spec: "Oven-safe handle. Sample spec.", art: "pan" },
  { no: "K-118", d: "K", name: "Pour-over kettle", spec: "Narrow spout, steel body.", art: "kettle" },
  { no: "K-126", d: "K", name: "Stackable storage jars, set of 3", spec: "Airtight lids.", art: "jars" },
  { no: "G-207", d: "G", name: "Braided charging cable", spec: "USB-C, strain-relief ends.", art: "cable", opts: { label: "Length, m", values: ["1", "2"] } },
  { no: "G-213", d: "G", name: "Desk phone stand", spec: "Adjustable angle, non-slip base.", art: "stand" },
  { no: "G-240", d: "G", name: "Car vent phone mount", spec: "One-hand release.", art: "mount" },
  { no: "F-301", d: "F", name: "Canvas tote bag", spec: "Inside pocket, reinforced straps.", art: "tote" },
  { no: "F-312", d: "F", name: "Knit beanie", spec: "Folded cuff, one size.", art: "beanie", opts: { label: "Colour", values: ["Ink", "Red", "Grey"] } },
  { no: "F-327", d: "F", name: "Crew-neck tee", spec: "Midweight cotton.", art: "tee", opts: { label: "Size", values: ["S", "M", "L", "XL"] } },
];

/* ---------- helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function store(key, value) {
  try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch (_) { /* storage may be blocked */ }
  return null;
}
function cartCount() { return parseInt(store("dw-cart"), 10) || 0; }
function paintCart() { $$(".cart-count").forEach((el) => { el.textContent = cartCount(); }); }
function art(key) { return `<svg class="line-art" viewBox="0 0 120 120" role="img" aria-hidden="true">${ART[key]}</svg>`; }

function itemRow(it, headingTag = "h3") {
  const hasOpts = !!it.opts;
  return `<li class="item" data-no="${it.no}">
    <div class="item-art">${art(it.art)}</div>
    <div><span class="item-no">${it.no}</span></div>
    <div><${headingTag}><a href="product.html?no=${it.no}">${it.name}</a></${headingTag}><p class="spec">${it.spec}</p></div>
    <div class="item-foot">
      <span class="price">Price not set</span>
      ${hasOpts ? `<a class="btn" href="product.html?no=${it.no}">Choose ${it.opts.label.toLowerCase().replace(/, .*/, "")}</a>` : `<button class="btn" type="button" data-add="${it.no}">Add to cart</button>`}
    </div>
    <p class="added" role="status" aria-live="polite"></p>
  </li>`;
}

/* ---------- home ---------- */
function initHome() {
  const book = $("#depts");
  const tabs = $("#tabs");
  tabs.innerHTML = [{ id: "all", name: "All departments" }, ...DEPTS].map((d) => `<button class="tab" type="button" data-tab="${d.id}" aria-pressed="${d.id === "all"}">${d.name}</button>`).join("");

  book.innerHTML = DEPTS.map((d) => `
    <section class="dept" id="dept-${d.id}" aria-labelledby="h-${d.id}">
      <div class="dept-head"><h2 id="h-${d.id}">${d.name}</h2><p>${d.blurb}</p></div>
      <ul class="items">${ITEMS.filter((i) => i.d === d.id).map((i) => itemRow(i)).join("")}</ul>
    </section>`).join("");

  function show(id) {
    $$("[data-tab]", tabs).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.tab === id)));
    $$(".dept", book).forEach((s) => {
      const on = id === "all" || s.id === `dept-${id}`;
      s.hidden = !on;
      s.classList.remove("is-turning");
      if (on && id !== "all") { void s.offsetWidth; s.classList.add("is-turning"); }
    });
  }
  tabs.addEventListener("click", (e) => { const b = e.target.closest("[data-tab]"); if (b) show(b.dataset.tab); });

  book.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    store("dw-cart", String(cartCount() + 1));
    paintCart();
    $(".added", btn.closest(".item")).textContent = "Added 1. Mockup: no order is placed.";
  });

  $("#lookup").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = $("#item-q").value.trim().toLowerCase();
    const note = $("#lookup-note");
    if (!q) { note.textContent = "Type an item number such as K-118, or part of a name."; return; }
    const hit = ITEMS.find((i) => i.no.toLowerCase() === q) || ITEMS.find((i) => i.name.toLowerCase().includes(q));
    if (hit) { location.href = `product.html?no=${hit.no}`; } else { note.textContent = `No item matching “${$("#item-q").value.trim()}” in this sample catalog.`; }
  });
}

/* ---------- product ---------- */
function initProduct() {
  const q = new URLSearchParams(location.search);
  const it = ITEMS.find((x) => x.no === q.get("no")) || ITEMS[0];
  const dept = DEPTS.find((d) => d.id === it.d);
  document.title = `${it.name} | Drapewell`;
  $("#crumb-dept").textContent = dept.name;
  $("#crumb-dept").href = `index.html#dept-${dept.id}`;
  $("#crumb-name").textContent = it.name;
  $("#plate").innerHTML = art(it.art);
  $("#no").textContent = `Item ${it.no}`;
  $("#title").textContent = it.name;
  $("#lede").textContent = it.spec;

  const optBox = $("#opt-group");
  if (it.opts) {
    $("#opt-h").textContent = it.opts.label;
    $("#opts").innerHTML = it.opts.values.map((v) => `<label class="opt"><input type="radio" name="opt" value="${v}"><span>${v}</span></label>`).join("");
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

  const same = ITEMS.filter((i) => i.d === it.d && i.no !== it.no);
  $("#also").innerHTML = `<ul class="items">${same.map((i) => itemRow(i)).join("")}</ul>`;
  $("#also").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    store("dw-cart", String(cartCount() + 1));
    paintCart();
    $(".added", btn.closest(".item")).textContent = "Added 1. Mockup: no order is placed.";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  paintCart();
  const page = document.body.dataset.page;
  if (page === "home") initHome();
  if (page === "product") initProduct();
});
