/* Sample Health docs — TokenMap: an annotated "token application" diagram.
   Reusable across component pages: pass a specimen whose parts carry
   data-sh-part attributes, plus rows that reference those parts. Connectors
   are measured from the live DOM and drawn as rounded elbows. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const h = React.createElement;

  /* Colour chips print their resolved hex plus the ramp step it lands on. Both
     are probed from the live document so they can never drift from the CSS. */
  const RAMPS = [["brand", "Primary"], ["gray-light-mode", "Neutral"], ["error", "Error"], ["warning", "Warning"], ["success", "Success"], ["gray-blue", "Info"]];
  const STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  let RAMP_INDEX = null;
  function probe(value, prop) {
    const el = document.createElement("span");
    el.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;top:0;left:0";
    el.style[prop] = value;
    document.body.appendChild(el);
    const out = getComputedStyle(el)[prop];
    el.remove();
    return out;
  }
  function toHex(s) {
    const m = /rgba?\(([^)]+)\)/.exec(s || "");
    if (!m) return null;
    const p = m[1].split(",").map(function (x) { return parseFloat(x); });
    const hex = "#" + p.slice(0, 3).map(function (n) { return Math.round(n).toString(16).padStart(2, "0"); }).join("").toUpperCase();
    return p.length > 3 && p[3] < 1 ? hex + " \u00b7 " + Math.round(p[3] * 100) + "%" : hex;
  }
  function rampIndex() {
    if (RAMP_INDEX) return RAMP_INDEX;
    RAMP_INDEX = {};
    const cs = getComputedStyle(document.documentElement);
    RAMPS.forEach(function (r) {
      STEPS.forEach(function (s) {
        const raw = cs.getPropertyValue("--colors-" + r[0] + "-" + s).trim();
        if (!raw) return;
        const hx = toHex(probe(raw, "backgroundColor"));
        if (hx && !RAMP_INDEX[hx]) RAMP_INDEX[hx] = r[1] + " " + s;
      });
    });
    if (!RAMP_INDEX["#FFFFFF"]) RAMP_INDEX["#FFFFFF"] = "White";
    if (!RAMP_INDEX["#000000"]) RAMP_INDEX["#000000"] = "Black";
    return RAMP_INDEX;
  }
  function colorLabel(value) {
    const hx = toHex(probe(value, "backgroundColor"));
    if (!hx) return null;
    const step = rampIndex()[hx.split(" ")[0]];
    return step ? hx + " \u00b7 " + step : hx;
  }

  function unit(p, q) { const dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy) || 1; return { x: dx / l, y: dy / l }; }
  function dist(p, q) { return Math.hypot(q.x - p.x, q.y - p.y); }

  function roundedPath(pts, r) {
    let d = "M " + pts[0].x + " " + pts[0].y;
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i], a = pts[i - 1], b = pts[i + 1];
      const rr = Math.min(r, dist(p, a) / 2, dist(p, b) / 2);
      const u1 = unit(p, a), u2 = unit(p, b);
      d += " L " + (p.x + u1.x * rr) + " " + (p.y + u1.y * rr) +
           " Q " + p.x + " " + p.y + " " + (p.x + u2.x * rr) + " " + (p.y + u2.y * rr);
    }
    const last = pts[pts.length - 1];
    return d + " L " + last.x + " " + last.y;
  }

  function route(c, a, edge) {
    if (edge === "left" || edge === "right") {
      if (Math.abs(c.y - a.y) < 5) return [{ x: c.x, y: a.y }, a];
      const gx = edge === "left" ? a.x - 22 : a.x + 22;
      return [c, { x: gx, y: c.y }, { x: gx, y: a.y }, a];
    }
    if (Math.abs(c.x - a.x) < 5) return [{ x: a.x, y: c.y }, a];
    return [c, { x: a.x, y: c.y }, a];
  }

  function anchorPoint(el, wr, edge, pos) {
    const r = el.getBoundingClientRect();
    const p = pos == null ? 0.5 : pos;
    if (edge === "left") return { x: r.left - wr.left, y: r.top - wr.top + r.height * p };
    if (edge === "right") return { x: r.right - wr.left, y: r.top - wr.top + r.height * p };
    if (edge === "top") return { x: r.left - wr.left + r.width * p, y: r.top - wr.top };
    return { x: r.left - wr.left + r.width * p, y: r.bottom - wr.top };
  }

  function TokenMap(props) {
    const rows = props.rows || [];
    const sig = props.sig || "";
    const wrapRef = React.useRef(null);
    const [geo, setGeo] = React.useState({ lines: [], chipPad: 0, specPad: 0 });
    const [hotChip, setHotChip] = React.useState(null);
    const [hotPart, setHotPart] = React.useState(null);
    /* Connectors are hidden until a chip or a part is hovered. Tap pins one, so
       touch devices — which never hover — can still trace a token. */
    const [pinChip, setPinChip] = React.useState(null);
    const [pinPart, setPinPart] = React.useState(null);
    const padRef = React.useRef({ chipPad: 0, specPad: 0 });

    React.useLayoutEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      let raf = 0;
      const measure = () => {
        const wr = wrap.getBoundingClientRect();
        const chips = wrap.querySelector(".sh-tm-chips");
        const spec = wrap.querySelector(".sh-tm-spec");
        let chipPad = padRef.current.chipPad, specPad = padRef.current.specPad;
        const first = wrap.querySelector('[data-tm-chip="0"]');
        if (first && spec && chips) {
          const fr = first.getBoundingClientRect(), sr = spec.getBoundingClientRect();
          const fRaw = fr.top + fr.height / 2 - chipPad;
          const sRaw = sr.top + sr.height / 2 - specPad;
          chipPad = Math.max(0, Math.round(sRaw - fRaw));
          specPad = Math.max(0, Math.round(fRaw - sRaw));
        }
        const lines = [];
        rows.forEach((row, i) => {
          const chip = wrap.querySelector('[data-tm-chip="' + i + '"]');
          if (!chip) return;
          const cr = chip.getBoundingClientRect();
          const start = { x: cr.right - wr.left + 7, y: cr.top - wr.top + cr.height / 2 + (chipPad - padRef.current.chipPad) };
          (row.anchors || []).forEach((an, j) => {
            const el = wrap.querySelector('[data-sh-part="' + an.part + '"]');
            if (!el) return;
            const a = anchorPoint(el, wr, an.edge, an.pos);
            a.y += specPad - padRef.current.specPad;
            lines.push({ key: i + "-" + j, row: i, part: an.part, d: roundedPath(route(start, a, an.edge), 10), start: start, end: a });
          });
        });
        padRef.current = { chipPad: chipPad, specPad: specPad };
        setGeo({ lines: lines, chipPad: chipPad, specPad: specPad });
      };
      measure();
      const ro = new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); });
      ro.observe(wrap);
      const t = setTimeout(measure, 250);
      window.addEventListener("resize", measure);
      return () => { ro.disconnect(); clearTimeout(t); cancelAnimationFrame(raf); window.removeEventListener("resize", measure); };
    }, [sig, rows.length]);

    const hotRows = {};
    const liveChip = hotChip != null ? hotChip : pinChip;
    const livePart = hotPart || pinPart;
    if (liveChip != null) hotRows[liveChip] = true;
    if (livePart) rows.forEach((r, i) => { if ((r.anchors || []).some((a) => a.part === livePart)) hotRows[i] = true; });
    const anyHot = Object.keys(hotRows).length > 0;

    React.useEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const parts = new Set();
      Object.keys(hotRows).forEach((i) => (rows[i].anchors || []).forEach((a) => parts.add(a.part)));
      wrap.querySelectorAll("[data-sh-part]").forEach((el) => {
        el.classList.toggle("is-hot", parts.has(el.getAttribute("data-sh-part")));
      });
    });

    const notes = rows.map((r, i) => (r.note ? { i: i, row: r } : null)).filter(Boolean);
    const vals = React.useMemo(() => rows.map((r) => r.value || (r.color ? colorLabel(r.color) : null)), [sig, rows.length]);

    return h("div", { className: "sh-tm", ref: wrapRef },
      h("div", { className: "sh-tm-chips", style: { marginTop: geo.chipPad } },
        rows.map((row, i) =>
          h("div", {
            key: i, className: "sh-tm-chip" + (row.color ? "" : " no-sw") + (hotRows[i] ? " is-hot" : "") + (anyHot && !hotRows[i] ? " is-dim" : ""),
            "data-tm-chip": i, title: row.note || null,
            onMouseEnter: () => setHotChip(i), onMouseLeave: () => setHotChip(null),
            onClick: () => { setPinPart(null); setPinChip(pinChip === i ? null : i); }
          },
            row.color ? h("span", { className: "sh-tm-sw", style: { background: row.color } }) : null,
            h("span", { className: "sh-tm-text" },
              h("span", { className: "sh-tm-name" }, row.token),
              vals[i] ? h("span", { className: "sh-tm-val" }, vals[i]) : null),
            row.note ? h("span", { className: "sh-tm-flag" }, "!") : null)),
        notes.length ? h("div", { className: "sh-tm-notes" },
          notes.map((n) => h("p", { key: n.i, className: "sh-tm-note" },
            h("span", { className: "sh-tm-flag" }, "!"),
            h("b", null, n.row.token),
            " " + n.row.note))) : null),
      h("div", {
        className: "sh-tm-stage",
        onMouseOver: (e) => {
          const el = e.target.closest && e.target.closest("[data-sh-part]");
          setHotPart(el ? el.getAttribute("data-sh-part") : null);
        },
        onMouseLeave: () => setHotPart(null),
        onClick: (e) => {
          const el = e.target.closest && e.target.closest("[data-sh-part]");
          const name = el ? el.getAttribute("data-sh-part") : null;
          setPinChip(null);
          setPinPart(pinPart === name ? null : name);
        }
      },
        h("div", { className: "sh-tm-spec", style: { marginTop: geo.specPad } }, props.specimen)),
      h("svg", { className: "sh-tm-wires", width: "100%", height: "100%" },
        geo.lines.map((l) => {
          const hot = hotRows[l.row];
          const cls = "sh-tm-wire" + (hot ? " is-hot" : "") + (anyHot && !hot ? " is-dim" : "");
          return h("g", { key: l.key, className: cls },
            h("path", { d: l.d, fill: "none" }),
            h("circle", { cx: l.start.x, cy: l.start.y, r: 2.5 }),
            h("circle", { cx: l.end.x, cy: l.end.y, r: 2.5 }));
        })));
  }

  SH.TokenMap = TokenMap;

  /* State marker used above each diagram */
  SH.StateMark = function (props) {
    return h("div", { className: "sh-tm-state" }, h("span", null, props.children));
  };
})();
