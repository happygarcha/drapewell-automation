/* Data layer. Tries the store's public JSON (live products, variants, photos); if that is blocked
   (CORS, offline, preview sandbox) it falls back to the bundled snapshot in catalog.js. */
(function () {
  const STORE = window.DW_STORE;
  const snapshot = window.DW_PRODUCTS;
  const byHandle = Object.fromEntries(snapshot.map((p) => [p.handle, p]));
  const strip = (html) => String(html || "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

  function fromSnapshot(p) {
    return {
      handle: p.handle, title: p.name, name: p.name, room: p.room, price: p.price, tint: p.tint,
      images: [window.DW_CDN + p.img], description: "", live: false,
      options: [], variants: [{ id: null, title: "Default", price: p.price, available: true }],
    };
  }
  function fromLive(j, room) {
    const snap = byHandle[j.handle];
    const variants = (j.variants || []).map((v) => ({ id: v.id, title: v.title, price: parseFloat(v.price), available: v.available !== false, options: [v.option1, v.option2, v.option3].filter(Boolean) }));
    const prices = variants.map((v) => v.price).filter((n) => !isNaN(n));
    return {
      handle: j.handle, title: j.title, name: snap ? snap.name : j.title, room: room || (snap && snap.room) || "", price: prices.length ? Math.min(...prices) : (snap ? snap.price : 0),
      tint: snap ? snap.tint : "oklch(0.94 0.006 240)",
      images: (j.images || []).map((i) => i.src).filter(Boolean).length ? j.images.map((i) => i.src) : (snap ? [window.DW_CDN + snap.img] : []),
      description: strip(j.body_html), live: true,
      options: (j.options || []).filter((o) => !(o.values.length === 1 && o.values[0] === "Default Title")).map((o) => ({ name: o.name, values: o.values })),
      variants,
    };
  }
  async function getJSON(path) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 6000);
    try { const r = await fetch(STORE + path, { signal: ctl.signal, headers: { Accept: "application/json" } }); if (!r.ok) throw new Error(r.status); return await r.json(); }
    finally { clearTimeout(t); }
  }

  const cache = {};
  window.DW = {
    STORE,
    /* all products in a room (collection handle) */
    async room(handle) {
      if (cache["r:" + handle]) return cache["r:" + handle];
      let list;
      try { const j = await getJSON(`/collections/${encodeURIComponent(handle)}/products.json?limit=250`); list = (j.products || []).map((p) => fromLive(p, handle)); window.DW.live = true; }
      catch (_) { list = snapshot.filter((p) => p.room === handle).map(fromSnapshot); window.DW.live = window.DW.live || false; }
      return (cache["r:" + handle] = list);
    },
    async product(handle) {
      if (cache["p:" + handle]) return cache["p:" + handle];
      let p;
      try { const j = await getJSON(`/products/${encodeURIComponent(handle)}.js`); p = fromLive({ ...j, body_html: j.description, images: (j.images || []).map((s) => ({ src: s.startsWith("//") ? "https:" + s : s })), variants: (j.variants || []).map((v) => ({ ...v, price: (v.price / 100).toFixed(2) })) }); }
      catch (_) { try { const j = await getJSON(`/products/${encodeURIComponent(handle)}.json`); p = fromLive(j.product); } catch (_2) { const s = byHandle[handle]; p = s ? fromSnapshot(s) : null; } }
      return (cache["p:" + handle] = p);
    },
  };
})();
