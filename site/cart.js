/* Cart: browser-local lines, a modal drawer, and checkout through the store's cart permalink. */
(function () {
  const KEY = "dw-cart-lookbook-v2";
  const money = (n) => `$${n.toFixed(2)}`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function read() { try { const v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v : []; } catch (_) { return []; } }
  function write(lines) { try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (_) { /* blocked */ } }
  let lines = read();
  const count = () => lines.reduce((n, l) => n + l.qty, 0);
  const total = () => lines.reduce((n, l) => n + l.qty * l.price, 0);
  const keyOf = (l) => `${l.handle}|${l.variantId || l.variantTitle}`;

  function checkoutUrl() {
    if (lines.length && lines.every((l) => l.variantId)) return `${window.DW.STORE}/cart/${lines.map((l) => `${l.variantId}:${l.qty}`).join(",")}`;
    return `${window.DW.STORE}/cart`;
  }

  let dlg;
  function build() {
    dlg = document.createElement("dialog");
    dlg.className = "cart";
    dlg.setAttribute("aria-label", "Cart");
    dlg.innerHTML = `<div class="cart-in"><header><h2>Cart</h2><button type="button" class="x" data-close aria-label="Close cart">Close</button></header>
      <div class="cart-lines" id="cart-lines"></div>
      <footer><div class="sub"><span>Subtotal (CAD)</span><span id="cart-sub">$0.00</span></div>
      <p class="fine" id="cart-fine"></p>
      <a class="co" id="cart-co" href="#">Checkout on Drapewell</a></footer></div>`;
    document.body.appendChild(dlg);
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg || e.target.closest("[data-close]")) return dlg.close();
      const b = e.target.closest("[data-k]"); if (!b) return;
      const l = lines.find((x) => keyOf(x) === b.dataset.k); if (!l) return;
      if (b.dataset.act === "inc") l.qty = Math.min(9, l.qty + 1);
      if (b.dataset.act === "dec") l.qty = Math.max(0, l.qty - 1);
      if (b.dataset.act === "rm") l.qty = 0;
      lines = lines.filter((x) => x.qty > 0); write(lines); paint();
    });
  }
  function paint() {
    const n = count();
    document.querySelectorAll("[data-cart-count]").forEach((el) => { el.textContent = n; const b = el.closest("button"); if (b) b.setAttribute("aria-label", `Open cart, ${n} ${n === 1 ? "item" : "items"}`); });
    if (!dlg) return;
    const box = dlg.querySelector("#cart-lines");
    box.innerHTML = lines.length ? lines.map((l) => `<div class="line">
      <div class="th" style="--tint:oklch(0.94 0.006 240)">${l.img ? `<img src="${esc(l.img)}" alt="" loading="lazy">` : ""}</div>
      <div class="d"><a href="product.html?handle=${encodeURIComponent(l.handle)}">${esc(l.title)}</a>${l.variantTitle && l.variantTitle !== "Default" ? `<span>${esc(l.variantTitle)}</span>` : ""}
        <div class="q"><button type="button" data-act="dec" data-k="${esc(keyOf(l))}" aria-label="Fewer">−</button><output>${l.qty}</output><button type="button" data-act="inc" data-k="${esc(keyOf(l))}" aria-label="More">+</button><button type="button" class="rm" data-act="rm" data-k="${esc(keyOf(l))}">Remove</button></div></div>
      <div class="pr">${money(l.price * l.qty)}</div></div>`).join("") : `<p class="empty">Your cart is empty.</p>`;
    dlg.querySelector("#cart-sub").textContent = money(total());
    const co = dlg.querySelector("#cart-co");
    co.href = checkoutUrl();
    co.setAttribute("aria-disabled", String(!lines.length));
    co.tabIndex = lines.length ? 0 : -1;
    const exact = lines.length && lines.every((l) => l.variantId);
    dlg.querySelector("#cart-fine").textContent = lines.length ? (exact ? "Checkout opens your selection on the Drapewell store. Shipping and taxes are calculated there." : "Some items are from the offline snapshot, so checkout opens the store cart; choose options there.") : "";
  }
  window.DWCart = {
    add(item) {
      const k = keyOf(item); const ex = lines.find((l) => keyOf(l) === k);
      if (ex) ex.qty = Math.min(9, ex.qty + item.qty); else lines.push({ ...item });
      write(lines); paint(); this.open();
    },
    open() { if (!dlg) build(); paint(); if (!dlg.open) dlg.showModal(); },
    init() { paint(); document.addEventListener("click", (e) => { if (e.target.closest("[data-open-cart]")) { e.preventDefault(); window.DWCart.open(); } }); },
  };
  document.addEventListener("DOMContentLoaded", () => window.DWCart.init());
})();
