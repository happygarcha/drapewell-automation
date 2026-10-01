/* Cinematic home: a WebGL curtain that opens on scroll, then a pinned scroll story through the rooms.
   Everything degrades: no WebGL -> static hero, reduced motion or no scroll engine -> the plain spreads. */
(function () {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  if (!reduce) root.classList.add("motion");

  /* ---------- WebGL curtain ---------- */
  const VERT = "attribute vec2 p; varying vec2 vUv; void main(){ vUv = p*0.5+0.5; gl_Position = vec4(p,0.0,1.0); }";
  const FRAG = `precision mediump float;
varying vec2 vUv; uniform vec2 uRes; uniform float uT, uOpen; uniform vec2 uMouse;
float hash(vec2 q){ return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }
void main(){
  vec2 uv = vUv; float aspect = uRes.x / uRes.y; float y = 1.0 - uv.y;
  float gap = 0.5 * uOpen; float d = abs(uv.x - 0.5);
  if (d < gap) { float sh = smoothstep(0.04, 0.0, gap - d) * 0.22; gl_FragColor = vec4(0.0, 0.0, 0.0, sh); return; }
  float c = (d - gap) / max(0.0001, 0.5 - gap);
  float side = uv.x < 0.5 ? -1.0 : 1.0;
  float phase = c * 15.0 * (0.8 + 0.4 * uOpen);
  phase += 0.55 * sin(y * 2.4 + uT * 0.55 + c * 3.0) * (0.25 + y);
  phase += 0.18 * sin(y * 7.0 - uT * 0.9 + c * 9.0) * y;
  vec2 m = vec2(uMouse.x * aspect, 1.0 - uMouse.y);
  float md = distance(vec2(uv.x * aspect, y), m);
  phase += exp(-md * md * 7.0) * 0.9 * sign(uv.x - uMouse.x);
  float slope = cos(phase) + 0.55 * cos(2.0 * phase + 1.3);
  float shade = 0.5 + 0.27 * slope + 0.05 * side;
  shade *= mix(0.72, 1.0, smoothstep(0.0, 0.3, y));
  shade *= 0.86 + 0.14 * smoothstep(0.0, 0.10, c);
  float weave = sin(uv.x * uRes.x * 0.85) * 0.018 + (hash(uv * uRes) - 0.5) * 0.03;
  shade = clamp(shade + weave, 0.0, 1.0);
  vec3 deep = vec3(0.075, 0.115, 0.165); vec3 lit = vec3(0.34, 0.47, 0.55);
  vec3 col = mix(deep, lit, shade);
  float rod = smoothstep(0.045, 0.02, y); col = mix(col, vec3(0.03, 0.05, 0.08), rod * 0.8);
  gl_FragColor = vec4(col, 1.0);
}`;

  function startCurtain(canvas) {
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return null;
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n) => gl.getUniformLocation(prog, n);
    const U = { res: u("uRes"), t: u("uT"), open: u("uOpen"), mouse: u("uMouse") };
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(2, Math.round(canvas.clientWidth * dpr)), h = Math.max(2, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    }
    return { draw(t, open, mx, my) { size(); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.uniform2f(U.res, canvas.width, canvas.height); gl.uniform1f(U.t, t); gl.uniform1f(U.open, open); gl.uniform2f(U.mouse, mx, my); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); } };
  }

  /* ---------- story DOM ---------- */
  const rail = $("#rail"), stage = $("#stage"), storyEl = $("#story");
  let scenes = [], tints = [], n = 0, active = -1;

  function buildStory(rooms, products) {
    if (!storyEl) return;
    const withItems = rooms.filter((r) => products(r.handle).length);
    n = withItems.length;
    tints = withItems.map((r) => products(r.handle)[0].tint);
    rail.innerHTML = withItems.map((r, i) => `<li><button type="button" data-go="${i}" aria-label="Go to ${esc(r.title)}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="l">${esc(r.title)}</span></button></li>`).join("");
    const sizes = ["(min-width: 900px) 34vw, 70vw", "(min-width: 900px) 20vw, 40vw", "(min-width: 900px) 16vw, 36vw"];
    stage.querySelectorAll(".scene").forEach((e) => e.remove());
    withItems.forEach((r, i) => {
      const ps = products(r.handle).slice(0, 3);
      const words = r.title.split(/\s+/).map((w, k) => `<span class="w" style="--k:${k}"><span>${esc(w)}</span></span>`).join(" ");
      const slot = ["a", "b", "c"];
      const el = document.createElement("div");
      el.className = "scene"; el.dataset.i = i; el.setAttribute("aria-hidden", "true");
      el.innerHTML = `<div class="s-ghost" aria-hidden="true">${esc(r.title)}</div><h2 class="s-title">${words}</h2>
        <p class="s-line">${esc((window.DW_ROOM_LINES || {})[r.handle] || "New in the store.")}</p>
        <a class="s-more" href="room.html?room=${encodeURIComponent(r.handle)}" tabindex="-1">See all ${products(r.handle).length}</a>
        ${ps.map((p, k) => `<a class="s-plate ${slot[k]}" href="product.html?handle=${encodeURIComponent(p.handle)}" tabindex="-1" style="--tint:${p.tint};view-transition-name:pv-${esc(p.handle)}"><img src="${p.images[0]}${p.images[0].includes("?") ? "&" : "?"}width=${k ? 700 : 1100}" alt="" loading="lazy" decoding="async"><span class="cap"><span>${esc(p.name)}</span><b>${p.variants.length > 1 ? "From " : ""}$${p.price.toFixed(2)}</b></span></a>`).join("")}`;
      stage.appendChild(el);
    });
    const strip = $("#strip");
    if (strip) { const word = withItems.map((r) => `<span>${esc(r.title)}</span>`).join(""); strip.innerHTML = word + word + word + word; }
    storyEl.style.height = `calc(${n} * 85svh + 100svh)`;
    scenes = [...stage.querySelectorAll(".scene")];
    active = -1; dirty = true;
  }

  function setActive(i) {
    if (i === active) return;
    active = i;
    scenes.forEach((s, k) => { const on = k === i; s.classList.toggle("on", on); s.setAttribute("aria-hidden", String(!on)); s.querySelectorAll("a").forEach((a) => { a.tabIndex = on ? 0 : -1; }); });
    rail.querySelectorAll("button").forEach((b, k) => b.toggleAttribute("aria-current", k === i));
    stage.style.setProperty("--tint", tints[i] || "var(--wall)");
    if (window.DWLiquid) { window.DWLiquid.attach(scenes[i]); if (scenes[i + 1]) window.DWLiquid.attach(scenes[i + 1]); }
  }

  /* ---------- scroll + render loop ---------- */
  const hero = $("#hero"), canvas = $("#curtain"), copy = $(".hero-copy"), plate = $("#hero-plate");
  let curtain = null, dirty = true, running = false;
  let open = 0, openT = 0, mx = 0.5, my = 0.4, mxT = 0.5, myT = 0.4, t0 = performance.now();

  if (root.classList.contains("motion") && canvas) {
    try { curtain = startCurtain(canvas); } catch (_) { curtain = null; }
    if (curtain) root.classList.add("gl");
  }

  let lastY = scrollY, skew = 0;
  function measure() {
    const vh = innerHeight;
    const strip = $("#strip");
    if (strip && root.classList.contains("motion")) {
      const dy = scrollY - lastY; lastY = scrollY; skew += (clamp(dy * 0.12, -9, 9) - skew) * 0.25;
      const w = strip.scrollWidth / 4; strip.style.transform = `translateX(${(-(scrollY * 0.45) % w).toFixed(1)}px) skewX(${(-skew).toFixed(2)}deg)`;
    }
    if (hero && root.classList.contains("gl")) {
      const r = hero.getBoundingClientRect(); const p = clamp(-r.top / Math.max(1, r.height - vh));
      openT = ease(clamp(p * 1.18));
      const fade = clamp(1 - p * 3.2);
      copy.style.opacity = fade; copy.style.translate = `0 ${(-p * 60).toFixed(1)}px`;
      plate.style.scale = (0.9 + 0.1 * openT).toFixed(4);
      root.classList.toggle("over-dark", r.bottom > vh * 0.5 && p < 0.55);
    }
    if (storyEl && root.classList.contains("motion") && n) {
      const r = storyEl.getBoundingClientRect(); const total = Math.max(1, r.height - vh);
      const p = clamp(-r.top / total); const pos = p * n * 0.9999; const idx = clamp(Math.floor(pos), 0, n - 1);
      setActive(idx); stage.style.setProperty("--local", (pos - idx).toFixed(4));
      stage.classList.toggle("is-live", r.top < vh && r.bottom > 0);
    }
  }

  function frame(now) {
    open += (openT - open) * 0.09; mx += (mxT - mx) * 0.06; my += (myT - my) * 0.06;
    if (curtain) curtain.draw((now - t0) / 1000, open, mx, my);
    const settled = Math.abs(openT - open) < 0.001 && Math.abs(mxT - mx) < 0.001;
    if (hero && curtain) { const r = hero.getBoundingClientRect(); if (r.bottom < -50 || r.top > innerHeight) { running = false; return; } }
    requestAnimationFrame(frame);
  }
  function kick() { if (!running && curtain) { running = true; requestAnimationFrame(frame); } }

  addEventListener("scroll", () => { measure(); kick(); }, { passive: true });
  addEventListener("resize", () => { measure(); kick(); });
  addEventListener("pointermove", (e) => {
    mxT = e.clientX / innerWidth; myT = e.clientY / innerHeight; kick();
    if (stage) { stage.style.setProperty("--mx", `${(mxT * 100).toFixed(1)}%`); stage.style.setProperty("--my", `${(myT * 100).toFixed(1)}%`); }
  }, { passive: true });
  /* cloth ripple on product photos: an SVG displacement filter that eases in on hover */
  const turb = $("#rip-turb"), dmap = $("#rip-map");
  let rip = { el: null, v: 0, to: 0, raf: 0 };
  function ripLoop(now) {
    rip.v += (rip.to - rip.v) * 0.12;
    if (dmap) { dmap.setAttribute("scale", rip.v.toFixed(2)); turb.setAttribute("baseFrequency", `${(0.004 + Math.sin(now / 900) * 0.0008).toFixed(5)} ${(0.012 + Math.cos(now / 1100) * 0.002).toFixed(5)}`); }
    if (rip.to === 0 && rip.v < 0.3) { if (rip.el) rip.el.style.filter = ""; rip.el = null; rip.raf = 0; return; }
    rip.raf = requestAnimationFrame(ripLoop);
  }
  if (fine && !reduce && dmap) {
    document.addEventListener("pointerover", (e) => { if (window.DWLiquidOn) return; const pl = e.target.closest && e.target.closest(".s-plate"); if (!pl) return; const im = pl.querySelector("img"); if (rip.el && rip.el !== im) rip.el.style.filter = ""; rip.el = im; im.style.filter = "url(#ripple)"; rip.to = 22; if (!rip.raf) rip.raf = requestAnimationFrame(ripLoop); });
    document.addEventListener("pointerout", (e) => { const pl = e.target.closest && e.target.closest(".s-plate"); if (pl && !pl.contains(e.relatedTarget)) { rip.to = 0; if (!rip.raf) rip.raf = requestAnimationFrame(ripLoop); } });
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) kick(); });


  /* ---------- liquid photos: one shared WebGL renderer, a 2D canvas inside each plate ---------- */
  const LQ_VERT = "attribute vec2 p; varying vec2 vUv; void main(){ vUv = vec2(p.x*0.5+0.5, 0.5-p.y*0.5); gl_Position = vec4(p,0.0,1.0); }";
  const LQ_FRAG = `precision mediump float;
varying vec2 vUv; uniform sampler2D uTex; uniform vec2 uScale; uniform float uAspect, uTime, uScroll, uHover;
uniform vec2 uTrail[8]; uniform vec2 uVel[8]; uniform float uAge[8];
void main(){
  vec2 uv = vUv; vec2 d = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    vec2 dp = uv - uTrail[i]; dp.x *= uAspect;
    float f = exp(-dot(dp, dp) * 16.0) * uAge[i];
    d += uVel[i] * f;
    float ring = sin(length(dp) * 38.0 - (1.0 - uAge[i]) * 14.0) * exp(-length(dp) * 5.0) * uAge[i];
    d += normalize(dp + 0.0001) * ring * 0.012;
  }
  d *= 0.42;
  uv += d;
  uv += vec2(sin(uv.y * 9.0 + uTime * 1.2), cos(uv.x * 7.0 + uTime)) * 0.0035 * (0.4 + uHover);
  uv.y += sin(uv.x * 5.0 + uTime * 0.8) * uScroll * 0.03;
  uv = (uv - 0.5) * uScale + 0.5;
  float s = length(d) * 1.6 + abs(uScroll) * 0.01;
  vec2 dir = normalize(d + vec2(0.0001, 0.0));
  float r = texture2D(uTex, clamp(uv + dir * s * 0.38, 0.0, 1.0)).r;
  float g = texture2D(uTex, clamp(uv, 0.0, 1.0)).g;
  float b = texture2D(uTex, clamp(uv - dir * s * 0.38, 0.0, 1.0)).b;
  vec3 col = vec3(r, g, b);
  col += smoothstep(0.0, 0.05, length(d)) * 0.04;
  gl_FragColor = vec4(col, 1.0);
}`;
  const Liquid = (function () {
    if (reduce) return null;
    const cv = document.createElement("canvas"); cv.width = 760; cv.height = 960;
    const gl = cv.getContext("webgl", { preserveDrawingBuffer: false, antialias: false, alpha: false });
    if (!gl) return null;
    let prog;
    try {
      const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
      prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, LQ_VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, LQ_FRAG)); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error("link");
    } catch (_) { return null; }
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(prog, n);
    const u = { tex: U("uTex"), scale: U("uScale"), aspect: U("uAspect"), time: U("uTime"), scroll: U("uScroll"), hover: U("uHover"), trail: U("uTrail"), vel: U("uVel"), age: U("uAge") };
    const items = new Set(); let raf = 0, scrollV = 0, lastSY = scrollY;

    function attach(plateEl) {
      if (plateEl._lq) return;
      const img = plateEl.querySelector("img"); if (!img || !img.src) return;
      const c2 = document.createElement("canvas"); c2.className = "lq"; c2.setAttribute("aria-hidden", "true");
      const it = { el: plateEl, img, c2, ctx: c2.getContext("2d"), tex: null, ready: false, hover: 0, hoverT: 0, last: null, trail: Array.from({ length: 8 }, () => ({ x: 0.5, y: 0.5, vx: 0, vy: 0, a: 0 })), head: 0, nat: [1, 1] };
      plateEl._lq = it; plateEl.appendChild(c2);
      const im = new Image(); im.crossOrigin = "anonymous";
      im.onload = () => {
        try {
          const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          it.tex = t; it.nat = [im.naturalWidth, im.naturalHeight]; it.ready = true; items.add(it); render(it, 0); plateEl.classList.add("lq-on");
        } catch (_) { c2.remove(); }
      };
      im.onerror = () => c2.remove();
      im.src = img.currentSrc || img.src;
    }
    function push(it, e) {
      const r = it.el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      if (it.last) { const k = it.trail[it.head = (it.head + 1) % 8]; k.x = x; k.y = y; k.vx = Math.max(-0.5, Math.min(0.5, (x - it.last.x) * 1.8)); k.vy = Math.max(-0.5, Math.min(0.5, (y - it.last.y) * 1.8)); k.a = 1; }
      it.last = { x, y }; it.hoverT = 1; start();
    }
    function render(it, now) {
      const r = it.el.getBoundingClientRect(); const dpr = Math.min(devicePixelRatio || 1, 1.5);
      const w = Math.max(2, Math.min(cv.width, Math.round(r.width * dpr))), h = Math.max(2, Math.min(cv.height, Math.round(r.height * dpr)));
      if (it.c2.width !== w || it.c2.height !== h) { it.c2.width = w; it.c2.height = h; }
      gl.viewport(0, 0, w, h);
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, it.tex); gl.uniform1i(u.tex, 0);
      const pa = w / h, ia = it.nat[0] / it.nat[1];
      gl.uniform2f(u.scale, Math.min(1, pa / ia), Math.min(1, ia / pa)); gl.uniform1f(u.aspect, pa);
      gl.uniform1f(u.time, now / 1000); gl.uniform1f(u.scroll, scrollV); gl.uniform1f(u.hover, it.hover);
      const tr = new Float32Array(16), ve = new Float32Array(16), ag = new Float32Array(8);
      it.trail.forEach((k, i) => { tr[i * 2] = k.x; tr[i * 2 + 1] = k.y; ve[i * 2] = k.vx; ve[i * 2 + 1] = k.vy; ag[i] = k.a; });
      gl.uniform2fv(u.trail, tr); gl.uniform2fv(u.vel, ve); gl.uniform1fv(u.age, ag);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      it.ctx.drawImage(cv, 0, cv.height - h, w, h, 0, 0, w, h);
    }
    function tick(now) {
      scrollV += ((scrollY - lastSY) / Math.max(1, innerHeight) * 6 - scrollV) * 0.18; lastSY = scrollY;
      let busy = Math.abs(scrollV) > 0.01;
      items.forEach((it) => {
        const vis = it.el.closest(".scene.on") || it.el.closest(".hero-reveal"); if (!vis) return;
        it.hover += (it.hoverT - it.hover) * 0.1;
        let alive = it.hover > 0.01 || it.hoverT > 0;
        it.trail.forEach((k) => { k.a *= 0.93; if (k.a < 0.01) k.a = 0; else alive = true; });
        if (alive || busy) { render(it, now); busy = true; }
      });
      raf = busy ? requestAnimationFrame(tick) : 0;
    }
    function start() { if (!raf) raf = requestAnimationFrame(tick); }
    addEventListener("scroll", start, { passive: true });
    return { attach, push, start, hasGL: true };
  })();

  document.addEventListener("pointermove", (e) => {
    if (!Liquid) return; const pl = e.target.closest && e.target.closest(".s-plate, .hero-reveal .plate"); if (pl && pl._lq && pl._lq.ready) Liquid.push(pl._lq, e);
  }, { passive: true });
  document.addEventListener("pointerout", (e) => { const pl = e.target.closest && e.target.closest(".s-plate, .hero-reveal .plate"); if (pl && pl._lq && !pl.contains(e.relatedTarget)) { pl._lq.hoverT = 0; pl._lq.last = null; Liquid && Liquid.start(); } });
  window.DWLiquidOn = !!Liquid;
  function attachLiquid(rootEl) { if (!Liquid || !rootEl) return; rootEl.querySelectorAll(".s-plate, .plate").forEach((p) => Liquid.attach(p)); if (rootEl.matches && rootEl.matches(".plate")) Liquid.attach(rootEl); }
  window.DWLiquid = { attach: attachLiquid };

  /* rail clicks scroll to the room */
  rail && rail.addEventListener("click", (e) => {
    const b = e.target.closest("[data-go]"); if (!b || !storyEl) return;
    const r = storyEl.getBoundingClientRect(); const total = r.height - innerHeight;
    scrollTo({ top: scrollY + r.top + total * ((+b.dataset.go + 0.5) / n), behavior: "smooth" });
  });

  /* magnetic buttons + tilt (fine pointers only) */
  if (fine && !reduce) {
    document.addEventListener("pointermove", (e) => {
      document.querySelectorAll(".magnet").forEach((el) => {
        const r = el.getBoundingClientRect(); const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy; const dist = Math.hypot(dx, dy); const reach = Math.max(r.width, r.height) * 0.9;
        if (dist < reach) { el.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.3).toFixed(1)}px`; } else if (el.style.translate) { el.style.translate = ""; }
      });
      const pl = e.target.closest && e.target.closest(".s-plate");
      if (pl) { const r = pl.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; pl.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`); pl.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`); }
    }, { passive: true });
    document.addEventListener("pointerout", (e) => { const pl = e.target.closest && e.target.closest(".s-plate"); if (pl) { pl.style.setProperty("--rx", "0deg"); pl.style.setProperty("--ry", "0deg"); } });
  }

  document.addEventListener("dw:render", (e) => { buildStory(e.detail.rooms, e.detail.products); measure(); kick(); setTimeout(() => window.DWLiquid && window.DWLiquid.attach(document.querySelector(".hero-reveal")), 60); });
  measure(); kick();
})();
