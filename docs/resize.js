/* Sample Health docs — drag-to-resize side panels. Any element with
   [data-resize="<css var>"] resizes that variable on <body>, between
   MIN (the Home sidebar width) and half the window. Width persists. */
(function () {
  const MIN = 360, KEY = "sh-resize:";
  const panelOf = (h) => h.closest(".pg-panel") || document.querySelector(".sh-sidebar");
  const max = () => Math.max(MIN, Math.floor(window.innerWidth / 2));
  const clamp = (w) => Math.min(max(), Math.max(MIN, Math.round(w)));
  function set(name, w, persist) {
    w = clamp(w);
    document.body.style.setProperty("--" + name, w + "px");
    if (persist) try { localStorage.setItem(KEY + name, String(w)); } catch (e) {}
    return w;
  }
  function restore() {
    for (const name of ["sh-sidebar", "pg-panel"]) {
      let v = null; try { v = localStorage.getItem(KEY + name); } catch (e) {}
      if (v && !isNaN(+v)) set(name, +v, false);
    }
  }
  if (document.body) restore(); else document.addEventListener("DOMContentLoaded", restore);
  window.addEventListener("resize", () => {
    for (const name of ["sh-sidebar", "pg-panel"]) {
      const cur = parseFloat(document.body.style.getPropertyValue("--" + name));
      if (cur && cur > max()) set(name, cur, false);
    }
  });

  document.addEventListener("pointerdown", (e) => {
    const h = e.target.closest && e.target.closest("[data-resize]");
    if (!h || e.button !== 0) return;
    e.preventDefault();
    const name = h.dataset.resize, panel = panelOf(h);
    const left = panel.getBoundingClientRect().left;
    h.setPointerCapture(e.pointerId);
    document.body.classList.add("sh-resizing");
    const move = (ev) => set(name, ev.clientX - left, false);
    const up = (ev) => {
      h.removeEventListener("pointermove", move);
      h.removeEventListener("pointerup", up);
      h.removeEventListener("pointercancel", up);
      document.body.classList.remove("sh-resizing");
      set(name, panel.getBoundingClientRect().width, true);
    };
    h.addEventListener("pointermove", move);
    h.addEventListener("pointerup", up);
    h.addEventListener("pointercancel", up);
  });
  document.addEventListener("dblclick", (e) => {
    const h = e.target.closest && e.target.closest("[data-resize]");
    if (h) set(h.dataset.resize, MIN, true);
  });
  document.addEventListener("keydown", (e) => {
    const h = e.target.closest && e.target.closest("[data-resize]");
    if (!h || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
    e.preventDefault();
    const w = panelOf(h).getBoundingClientRect().width + (e.key === "ArrowRight" ? 16 : -16);
    set(h.dataset.resize, w, true);
  });
})();
