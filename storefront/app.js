/* Drapewell storefront mockup. Static, no network calls.
   All catalog content below is SAMPLE data: names, fabrics, sizes and specs are
   placeholders. There are no prices, stock levels or shipping claims. */

const ALL_DROPS = [63, 84, 96, 108, 120];
const PANEL_WIDTH = 52; // inches per panel (sample)
const FULLNESS = 2; // fabric width as a multiple of window width (sample guide)
const RAIL_ALLOWANCE = 4; // inches above the window the rod sits (sample guide)

const PRODUCTS = [
  { id: "harbour", name: "Harbour", ref: "0412", cls: "f-linen", c: "oklch(0.62 0.05 235)", h: 210, fabric: "Slub linen blend", light: "Light-filtering", lining: "Lined", care: "Machine wash cold", drops: [63, 84, 96, 108] },
  { id: "slate", name: "Slate", ref: "0377", cls: "f-velvet", c: "oklch(0.36 0.02 260)", h: 172, fabric: "Matte velvet", light: "Room-darkening", lining: "Lined", care: "Dry clean", drops: [84, 96, 108, 120] },
  { id: "salt", name: "Salt", ref: "0209", cls: "f-sheer", c: "oklch(0.93 0.01 240)", h: 236, fabric: "Voile sheer", light: "Sheer", lining: "Unlined", care: "Machine wash cold", drops: [63, 84, 96, 108, 120] },
  { id: "marl", name: "Marl", ref: "0551", cls: "f-herringbone", c: "oklch(0.7 0.02 250)", h: 184, fabric: "Herringbone weave", light: "Light-filtering", lining: "Lined", care: "Machine wash cold", drops: [84, 96] },
  { id: "ink", name: "Ink", ref: "0618", cls: "f-blackout", c: "oklch(0.28 0.06 265)", h: 220, fabric: "Triple-weave blackout", light: "Blackout", lining: "Lined", care: "Wipe clean", drops: [63, 84, 96, 108, 120] },
  { id: "moss", name: "Moss", ref: "0143", cls: "f-linen", c: "oklch(0.52 0.06 150)", h: 196, fabric: "Washed linen", light: "Light-filtering", lining: "Unlined", care: "Machine wash cold", drops: [63, 84, 96] },
  { id: "clay", name: "Clay", ref: "0488", cls: "f-twill", c: "oklch(0.58 0.12 45)", h: 178, fabric: "Cotton twill", light: "Room-darkening", lining: "Lined", care: "Machine wash cold", drops: [84, 96, 108, 120] },
  { id: "dune", name: "Dune", ref: "0266", cls: "f-sheer", c: "oklch(0.84 0.05 85)", h: 228, fabric: "Open-weave sheer", light: "Sheer", lining: "Unlined", care: "Machine wash cold", drops: [63, 84, 96] },
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

/* window finder: returns { panels, drop } or an error string */
function fit(widthIn, heightIn) {
  if (!(widthIn > 0) || !(heightIn > 0)) return { error: "Enter your window width and height in inches." };
  const panels = Math.max(1, Math.ceil((widthIn * FULLNESS) / PANEL_WIDTH));
  const need = heightIn + RAIL_ALLOWANCE;
  const drop = ALL_DROPS.find((d) => d >= need);
  if (!drop) return { error: `A window ${heightIn} in tall needs a drop over ${ALL_DROPS.at(-1)} in, longer than the sample range.` };
  return { panels, drop, widthIn, heightIn };
}

function describeFit(f) {
  return `For a <strong>${f.widthIn} × ${f.heightIn} in</strong> window: <strong>${f.panels} ${f.panels === 1 ? "panel" : "panels"}</strong> at a <strong>${f.drop} in drop</strong>. Cards that come in that drop are lit.`;
}

/* ---------- collection page ---------- */
function initCollection() {
  const list = $("#cards");
  const result = $("#finder-result");
  const sheet = $("#compare");
  const pulled = new Set();
  let current = null;

  list.innerHTML = PRODUCTS.map((p) => `
    <li class="swatch" data-id="${p.id}">
      <div class="cloth ${p.cls}" style="--c:${p.c};--h:${p.h}px" role="img" aria-label="${p.name} fabric swatch, ${p.fabric}"></div>
      <div class="tag"><h3 class="tag-name">${p.name}</h3><p class="tag-ref">No. ${p.ref}</p></div>
      <div class="swatch-body">
        <p class="spec">${p.fabric}. ${p.light}.</p>
        <div class="notches">
          <span class="notch-label" id="n-${p.id}">Drop lengths, in</span>
          <ul class="notch-row" aria-labelledby="n-${p.id}">
            ${ALL_DROPS.map((d, i) => `<li class="notch ${p.drops.includes(d) ? "" : "is-absent"}" data-drop="${d}" style="--i:${i}">${d}<span class="sr-only">${p.drops.includes(d) ? "" : " not offered"}</span></li>`).join("")}
          </ul>
        </div>
        <div class="card-actions">
          <label class="pull"><input type="checkbox" data-pull="${p.id}"> Pull to compare</label>
          <a class="btn" href="product.html?id=${p.id}" data-view>Choose size</a>
        </div>
      </div>
    </li>`).join("");

  function applyFit() {
    $$(".swatch", list).forEach((card) => {
      const p = PRODUCTS.find((x) => x.id === card.dataset.id);
      const ok = current && !current.error && p.drops.includes(current.drop);
      card.classList.toggle("no-fit", !!(current && !current.error && !ok));
      $$(".notch", card).forEach((n) => n.classList.toggle("is-fit", !!(ok && +n.dataset.drop === current.drop)));
      const a = $("[data-view]", card);
      a.href = `product.html?id=${p.id}` + (current && !current.error ? `&w=${current.widthIn}&h=${current.heightIn}` : "");
    });
  }

  $("#finder").addEventListener("submit", (e) => {
    e.preventDefault();
    const w = parseFloat($("#win-w").value);
    const h = parseFloat($("#win-h").value);
    current = fit(w, h);
    if (current.error) { result.textContent = current.error; } else { result.innerHTML = describeFit(current); }
    applyFit();
  });

  /* compare sheet */
  function renderSheet() {
    const picks = PRODUCTS.filter((p) => pulled.has(p.id));
    sheet.classList.toggle("is-open", picks.length > 0);
    sheet.setAttribute("aria-hidden", picks.length ? "false" : "true");
    sheet.inert = picks.length === 0;
    $$(".swatch", list).forEach((c) => c.classList.toggle("is-pulled", pulled.has(c.dataset.id)));
    $$("[data-pull]", list).forEach((box) => { box.disabled = !box.checked && pulled.size >= 3; });
    const rows = [["Fabric", (p) => p.fabric], ["Light", (p) => p.light], ["Lining", (p) => p.lining], ["Care", (p) => p.care], ["Drops, in", (p) => p.drops.join(", ")]];
    const grid = $("#compare-grid");
    grid.style.setProperty("--n", picks.length || 1);
    grid.innerHTML = `<span class="colhead"></span>` + picks.map((p) => `<span class="colhead">${p.name}</span>`).join("") +
      rows.map(([label, fn]) => `<span class="rowhead">${label}</span>` + picks.map((p) => `<span>${fn(p)}</span>`).join("")).join("");
    $("#compare-count").textContent = `Comparing ${picks.length} of 3`;
  }
  list.addEventListener("change", (e) => {
    const box = e.target.closest("[data-pull]");
    if (!box) return;
    box.checked ? pulled.add(box.dataset.pull) : pulled.delete(box.dataset.pull);
    renderSheet();
  });
  $("#compare-clear").addEventListener("click", () => {
    pulled.clear(); $$("[data-pull]", list).forEach((b) => { b.checked = false; }); renderSheet();
  });
  renderSheet();
}

/* ---------- product page ---------- */
function initProduct() {
  const q = new URLSearchParams(location.search);
  const p = PRODUCTS.find((x) => x.id === q.get("id")) || PRODUCTS[0];
  document.title = `${p.name} drapes | Drapewell`;
  const w = parseFloat(q.get("w")), h = parseFloat(q.get("h"));
  const f = w && h ? fit(w, h) : null;
  const suggestion = f && !f.error ? f : null;

  $("#crumb-name").textContent = p.name;
  $("#bolt").innerHTML = `
    <div class="cloth ${p.cls}" style="--c:${p.c}" role="img" aria-label="${p.name} fabric, hung in folds"></div>
    <div class="tag"><h2 class="tag-name">${p.name}</h2><p class="tag-ref">No. ${p.ref}</p></div>`;
  $("#title").textContent = `${p.name} drapes`;
  $("#lede").textContent = `${p.fabric}. ${p.light}, ${p.lining.toLowerCase()}. Choose a drop length and how many panels you need.`;
  $("#specs").innerHTML = [["Fabric", p.fabric], ["Light", p.light], ["Lining", p.lining], ["Care", p.care], ["Panel width", `${PANEL_WIDTH} in`]]
    .map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");

  const dropBox = $("#drops");
  dropBox.innerHTML = ALL_DROPS.map((d) => {
    const ok = p.drops.includes(d);
    return `<label class="drop ${suggestion && suggestion.drop === d && ok ? "is-fit" : ""}"><input type="radio" name="drop" value="${d}" ${ok ? "" : "disabled"}><span>${d}${ok ? "" : '<span class="sr-only"> not offered</span>'}</span></label>`;
  }).join("");

  let panels = suggestion ? suggestion.panels : 2;
  const out = $("#panels"), status = $("#status"), add = $("#add");
  const hint = $("#fit-hint");
  if (suggestion) {
    hint.innerHTML = `For your <strong>${suggestion.widthIn} × ${suggestion.heightIn} in</strong> window we suggest <strong>${suggestion.panels} panels</strong> at a <strong>${suggestion.drop} in drop</strong>${p.drops.includes(suggestion.drop) ? "" : ", which this fabric does not come in"}.`;
  } else {
    hint.textContent = "Not sure? Use the window size finder on the drapes page and it will suggest panels and drop.";
  }
  function paint() {
    out.textContent = panels;
    $("#total-width").textContent = `${panels * PANEL_WIDTH} in of fabric`;
  }
  $("#less").addEventListener("click", () => { panels = Math.max(1, panels - 1); paint(); });
  $("#more").addEventListener("click", () => { panels = Math.min(8, panels + 1); paint(); });
  paint();

  function updateAdd() {
    const chosen = $("input[name=drop]:checked", dropBox);
    add.disabled = !chosen;
    add.setAttribute("aria-disabled", String(!chosen));
    if (!chosen) status.textContent = "";
  }
  dropBox.addEventListener("change", updateAdd);
  updateAdd();

  add.addEventListener("click", () => {
    const chosen = $("input[name=drop]:checked", dropBox);
    if (!chosen) { status.textContent = "Choose a drop length first."; return; }
    store("dw-cart", String(cartCount() + panels));
    paintCart();
    status.textContent = `Added ${panels} ${panels === 1 ? "panel" : "panels"}, ${chosen.value} in drop. This is a mockup: no order is placed.`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  paintCart();
  const page = document.body.dataset.page;
  if (page === "collection") initCollection();
  if (page === "product") initProduct();
});
