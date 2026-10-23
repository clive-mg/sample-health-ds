/* Sample Health docs — Theme Editor panel (Basics / Advanced; component radii live under Advanced › Radius).
   Ported from Playground Editor Directions v3. State is a v2 theme `st`
   (see SHTheme.V2); the Playground owns it and saves it through SHThemes. */
(function () {
  const React = window.React;
  const UI = window.UntitledUIPRODesignSystem_380e88 || {};
  const { useState, useEffect, useRef } = React;
  const V = () => window.SHTheme.V2;
  const HEX = /^#[0-9a-f]{6}$/i;
  const CONTROLS = {
    brand: { label: "Brand colour", group: "color", hint: "color.primary.600" },
    heading: { label: "Heading font", group: "font-h" },
    body: { label: "Body font", group: "font-b" },
    scale: { label: "Type scale", group: "type" },
    radius: { label: "Corners", group: "radius", hint: "radius.*" },
    density: { label: "Spacing", group: "spacing", hint: "spacing.*" },
    shadow: { label: "Shadows", group: "shadow", hint: "shadow.*" }
  };
  const typeOf = (name) => V().TYPE.find((s) => name.startsWith(s.token + "."));
  function groupOf(name) {
    if (name === "font.face.base.semibold") return "font-h";
    if (name.startsWith("font.")) return "font-b";
    if (name.startsWith("style.")) { const s = typeOf(name); return name.endsWith(".fontFamily") ? (s.fam === "h" ? "font-h" : "font-b") : "type"; }
    return name.split(".")[0];
  }

  function useEditor(st, setSt) {
    const [pending, setPending] = useState(null);
    const groups = V().derive(st);
    const set = (key, val) => {
      if (st[key] === val) return;
      const g = CONTROLS[key].group;
      const names = Object.keys(st.ov || {}).filter((n) => groupOf(n) === g);
      const to = V().OPTS[key] ? V().OPTS[key][val].l : key === "scale" ? V().SCALES.find((o) => o.v === val).l : val;
      if (names.length) { setPending({ key, val, names, label: CONTROLS[key].label, to }); return; }
      setSt((s) => ({ ...s, [key]: val }));
    };
    const setColor = (key, val) => setSt((s) => ({ ...s, [key]: val }));
    const override = (name, val) => setSt((s) => ({ ...s, ov: { ...s.ov, [name]: val } }));
    const reset = (name) => setSt((s) => { const ov = { ...s.ov }; delete ov[name]; return { ...s, ov }; });
    const resolvePending = (keep) => { const p = pending; setSt((s) => { const ov = { ...s.ov }; if (!keep) p.names.forEach((n) => delete ov[n]); return { ...s, [p.key]: p.val, ov }; }); setPending(null); };
    return { st, groups, set, setColor, override, reset, pending, resolvePending, cancel: () => setPending(null) };
  }

  function Ctl({ k, label, right, children }) {
    const c = CONTROLS[k] || {};
    return <div className="te-ctl">
      <div className="te-ctl-h"><span className="te-ctl-l">{label || c.label}</span>{right}</div>
      {children}
    </div>;
  }
  /* Custom colour popover: always opens on HEX (the native picker's format can't be set from the page). */
  const hexToHsv = (h) => { const n = parseInt(h.slice(1), 16), r = (n >> 16 & 255) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255, mx = Math.max(r, g, b), d = mx - Math.min(r, g, b);
    const hh = d === 0 ? 0 : mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return { h: hh * 60, s: mx ? d / mx : 0, v: mx }; };
  const hsvToHex = ({ h, s, v }) => { const f = (k) => { const x = (k + h / 60) % 6; return v - v * s * Math.max(0, Math.min(x, 4 - x, 1)); }; return "#" + [f(5), f(3), f(1)].map((c) => Math.round(c * 255).toString(16).padStart(2, "0")).join(""); };
  const rgbOf = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgbHex = (r, g, b) => "#" + [r, g, b].map((x) => Math.round(Math.min(255, Math.max(0, x))).toString(16).padStart(2, "0")).join("");
  const hslOf = (h) => { const [r, g, b] = rgbOf(h).map((x) => x / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1)), hh = d === 0 ? 0 : mx === r ? ((g - b) / d + 6) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [Math.round(hh * 60), Math.round(s * 100), Math.round(l * 100)]; };
  const hslHex = (h, s, l) => { s /= 100; l /= 100; const a = s * Math.min(l, 1 - l), f = (n) => { const k = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); }; return rgbHex(f(0) * 255, f(8) * 255, f(4) * 255); };
  const FMTS = ["HEX", "RGB", "HSLA"];
  let lastFmt = "HEX";
  function ColorNum({ label, value, max, onSet, disabled, title }) {
    const [txt, setTxt] = useState(null);
    return <label className="te-cp-num" title={title}>
      <input className="te-in sm" inputMode="numeric" aria-label={label} disabled={disabled} value={txt != null ? txt : String(value)}
        onChange={(e) => { const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 3); setTxt(v); if (v !== "") onSet(Math.min(max, +v)); }} onBlur={() => setTxt(null)} />
      <span className="te-cp-fmt">{label}</span>
    </label>;
  }
  function ColorPop({ value, onChange, label }) {
    const [open, setOpen] = useState(false);
    const [fmt, setFmtS] = useState(lastFmt);
    const setFmt = (f) => { lastFmt = f; setFmtS(f); };
    const [hsv, setHsv] = useState(() => hexToHsv(value));
    const [txt, setTxt] = useState(null);
    const ref = useRef(null), area = useRef(null), hue = useRef(null), sw = useRef(null), pop = useRef(null);
    const [pos, setPos] = useState(null);
    /* Fixed to the viewport so the editor's scroll area and footer can't clip it; flips above when there's no room below. */
    React.useLayoutEffect(() => {
      if (!open) { setPos(null); return; }
      const place = () => {
        if (!sw.current || !pop.current) return;
        const r = sw.current.getBoundingClientRect(), h = pop.current.offsetHeight, w = pop.current.offsetWidth, gap = 4, vh = window.innerHeight, vw = window.innerWidth;
        const top = r.bottom + gap + h <= vh - 8 || r.top - gap - h < 8 ? Math.min(r.bottom + gap, Math.max(8, vh - h - 8)) : r.top - gap - h;
        setPos({ top, left: Math.min(Math.max(8, r.left), vw - w - 8) });
      };
      place();
      window.addEventListener("resize", place); window.addEventListener("scroll", place, true);
      return () => { window.removeEventListener("resize", place); window.removeEventListener("scroll", place, true); };
    }, [open]);
    useEffect(() => { if (hsvToHex(hsv) !== value.toLowerCase()) setHsv((p) => { const n = hexToHsv(value); return n.s === 0 || n.v === 0 ? { ...n, h: p.h } : n; }); }, [value]);
    useEffect(() => {
      if (!open) return;
      const down = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      const key = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("mousedown", down); document.addEventListener("keydown", key);
      return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
    }, [open]);
    const push = (n) => { setHsv(n); onChange(hsvToHex(n)); };
    /* Keep the current hue when the new colour is grey/black/white, so the area doesn't jump to red. */
    const setHex = (h, hueHint) => { const n = hexToHsv(h); push(n.s === 0 || n.v === 0 ? { ...n, h: hueHint != null ? hueHint : hsv.h } : n); };
    const drag = (el, fn) => (e) => {
      e.preventDefault();
      const move = (ev) => { const r = el.current.getBoundingClientRect(); fn(Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height))); };
      move(e);
      const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
      window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
    };
    const nudge = (k, d) => (e) => {
      const step = e.shiftKey ? .1 : .01, m = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (!m) return; e.preventDefault();
      if (k === "h") push({ ...hsv, h: Math.min(360, Math.max(0, hsv.h + m[0] * step * 360)) });
      else push({ ...hsv, s: Math.min(1, Math.max(0, hsv.s + m[0] * step)), v: Math.min(1, Math.max(0, hsv.v + m[1] * step)) });
    };
    const hex = hsvToHex(hsv);
    return <div className="te-cp" ref={ref}>
      <button type="button" ref={sw} className="pg-color te-cp-sw" aria-label={label} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((o) => !o)}><i style={{ background: value }}></i></button>
      {open ? <div className="te-cp-pop" ref={pop} style={pos ? { top: pos.top, left: pos.left } : { visibility: "hidden" }} role="dialog" aria-label={label + " picker"}>
        <div className="te-cp-area" ref={area} style={{ background: "hsl(" + hsv.h + ",100%,50%)" }} onPointerDown={drag(area, (x, y) => push({ ...hsv, s: x, v: 1 - y }))}>
          <span className="te-cp-knob" role="slider" tabIndex={0} aria-label="Saturation and brightness" aria-valuetext={hex} onKeyDown={nudge("sv")} style={{ left: hsv.s * 100 + "%", top: (1 - hsv.v) * 100 + "%", background: hex }}></span>
        </div>
        <div className="te-cp-row">
          <i className="te-cp-prev" style={{ background: hex }}></i>
          <div className="te-cp-hue" ref={hue} onPointerDown={drag(hue, (x) => push({ ...hsv, h: x * 360 }))}>
            <span className="te-cp-knob" role="slider" tabIndex={0} aria-label="Hue" aria-valuemin={0} aria-valuemax={360} aria-valuenow={Math.round(hsv.h)} onKeyDown={nudge("h")} style={{ left: hsv.h / 3.6 + "%", top: "50%", background: "hsl(" + hsv.h + ",100%,50%)" }}></span>
          </div>
        </div>
        <div className="te-seg2 te-cp-seg" role="radiogroup" aria-label="Colour format">{FMTS.map((f) => <button type="button" role="radio" key={f} aria-checked={fmt === f} className={fmt === f ? "on" : ""} onClick={() => setFmt(f)}>{f}</button>)}</div>
        {fmt === "HEX" ? <div className="te-cp-hex">
          <UI.Input size="sm" aria-label={label + " hex"} maxLength={7} value={txt != null ? txt : hex.toUpperCase()}
            onChange={(e) => { let v = e.target.value; if (v && v[0] !== "#") v = "#" + v; setTxt(v); if (HEX.test(v)) setHex(v.toLowerCase()); }} onBlur={() => setTxt(null)} />
        </div> : null}
        {fmt === "RGB" ? (() => { const c = rgbOf(hex); return <div className="te-cp-nums">{["R", "G", "B"].map((k, i) => <ColorNum key={k} label={k} max={255} value={c[i]} onSet={(n) => { const d = c.slice(); d[i] = n; setHex(rgbHex(...d)); }} />)}</div>; })() : null}
        {fmt === "HSLA" ? (() => { const c = hslOf(hex); c[0] = c[1] === 0 || c[2] === 0 || c[2] === 100 ? Math.round(hsv.h) : c[0]; return <div className="te-cp-nums">
          {[["H", 360], ["S", 100], ["L", 100]].map(([k, m], i) => <ColorNum key={k} label={k} max={m} value={c[i]} onSet={(n) => { const d = c.slice(); d[i] = n; setHex(hslHex(...d), i === 0 ? n : null); }} />)}
          <ColorNum label="A" max={100} value="100%" disabled title="Opacity isn't supported yet" onSet={() => {}} />
        </div>; })() : null}
      </div> : null}
    </div>;
  }
  function Hex({ value, onChange, label }) {
    const [txt, setTxt] = useState(null);
    return <div className="pg-color-row">
      <ColorPop label={label} value={HEX.test(value) ? value : "#000000"} onChange={onChange} />
      <div className="pg-grow"><UI.Input size="sm" aria-label={label + " hex"} maxLength={7} value={txt != null ? txt : value}
        onChange={(e) => { setTxt(e.target.value); if (HEX.test(e.target.value)) onChange(e.target.value.toLowerCase()); }} onBlur={() => setTxt(null)} /></div>
    </div>;
  }
  function Select({ label, value, options, groups, onChange, sm, title }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
      if (!open) return;
      const down = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      const key = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("mousedown", down); document.addEventListener("keydown", key);
      return () => { document.removeEventListener("mousedown", down); document.removeEventListener("keydown", key); };
    }, [open]);
    const gs = groups || [{ group: null, items: options }];
    const cur = [].concat(...gs.map((g) => g.items)).find((o) => o.v === value);
    return <div className={"te-fp" + (sm ? " sm" : "")} ref={ref}>
      {label ? <span className="te-fp-l">{label}</span> : null}
      <button type="button" title={title} aria-haspopup="listbox" aria-expanded={open} className={"te-fp-field" + (open ? " open" : "")} onClick={() => setOpen(!open)}>
        <span className="te-fp-v" style={cur && cur.style}>{cur ? cur.l : value}</span><UI.Icon name="ChevronDown" size={16} />
      </button>
      {open ? <div className="te-fp-pop" role="listbox">
        {gs.map((g, i) => <div key={i} className="te-fp-g">
          {g.group ? <div className="te-fp-gh">{g.group}</div> : null}
          {g.items.map((o) => <button type="button" role="option" aria-selected={o.v === value} key={o.v} className={"te-fp-i" + (o.v === value ? " on" : "")} style={o.style} onClick={() => { onChange(o.v); setOpen(false); }}><span>{o.l}</span></button>)}
        </div>)}
      </div> : null}
    </div>;
  }
  const fontGroups = () => V().FONTS.map((g) => ({ group: g.group, items: g.fonts.map((f) => ({ v: f, l: f, style: { fontFamily: V().fontStack(f) } })) }));
  const FontPick = (p) => <Select {...p} groups={fontGroups()} />;
  function Step({ k, t }) {
    const opts = V().OPTS[k], i = t.st[k];
    return <Ctl k={k}>
      <UI.Slider min={0} max={opts.length - 1} step={1} value={i} onChange={(v) => t.set(k, Math.round(+v))} aria-label={CONTROLS[k].label} />
      <div className="te-ticks">{opts.map((o) => <button type="button" key={o.v} style={{ "--i": o.v }} className={o.v === i ? "on" : ""} onClick={() => t.set(k, o.v)}>{o.l}</button>)}</div>
    </Ctl>;
  }

  /* ---------- Components ---------- */
  function radiusOpts(tv) { return Object.keys(V().RADIUS).concat("full").map((n) => ({ v: "radius." + n, l: n + " — " + tv["radius." + n] })); }
  function ComponentsTab({ t }) {
    const tv = {}, v = {};
    t.groups.forEach((g) => g.tokens.forEach((x) => { tv[x.name] = x.value; v[x.name] = x; }));
    return <div className="te-cp">
      {V().COMP.map((c) => {
        const custom = c.props.map((p) => v[p.name]).filter((x) => x.custom);
        return <div key={c.id} className="te-cp-sec">
          <div className="te-ty-hd"><span className="te-ty-h">{c.label}</span><span className="pg-grow"></span>{custom.length ? <button type="button" className="te-rst" onClick={() => custom.forEach((x) => t.reset(x.name))}>Reset</button> : null}</div>
          {c.props.map((p) => {
            const tk = v[p.name];
            return <div key={p.p} className="te-cp-r">
              <span className="te-cp-l">{p.label}{tk.custom ? <i></i> : null}</span>
              <Select sm title={p.name} value={tk.value} options={radiusOpts(tv)} onChange={(x) => (x === p.d ? t.reset(p.name) : t.override(p.name, x))} />
            </div>;
          })}
        </div>;
      })}
    </div>;
  }

  /* ---------- Advanced ---------- */
  function TokenRow({ t, tk }) {
    return <div className={"te-tr" + (tk.custom ? " custom" : "")}>
      <span className="te-tr-l" title={tk.name}>{tk.name.split(".").slice(1).join(".")}</span>
      <input className="te-in sm mono" value={tk.value} title={tk.value} onChange={(e) => t.override(tk.name, e.target.value)} />
      {tk.custom ? <button type="button" className="te-rst" title={"Back to " + tk.derived} onClick={() => t.reset(tk.name)}>Reset</button> : <span className="te-auto">Auto</span>}
    </div>;
  }
  const SECS = [["colors", "Colors", "Palette"], ["typography", "Typography", "Type01"], ["spacing", "Spacing", "Grid01"], ["radius", "Radius", "Copy01"], ["elevation", "Shadows", "LayersTwo01"]];
  const SEC_GROUP = { spacing: "spacing", radius: "radius", typography: "type", elevation: "shadow" };
  const WEIGHT_L = { 100: "Thin 100", 200: "Extra Light 200", 300: "Light 300", 400: "Regular 400", 500: "Medium 500", 600: "Semibold 600", 700: "Bold 700", 800: "Extra Bold 800", 900: "Black 900" };
  const SIZES = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72];
  function TypeTab({ t }) {
    const v = {}; t.groups.find((x) => x.id === "type").tokens.forEach((x) => (v[x.name] = x));
    const fld = (label, tk, el) => <div className={"te-ty-f" + (tk.custom ? " custom" : "")}><span className="te-ty-fl">{label}{tk.custom ? <i></i> : null}</span>{el}</div>;
    return <div className="te-ty">
      <div className="te-fp-stack">
        <FontPick label="Heading font" value={t.st.heading} onChange={(f) => t.set("heading", f)} />
        <FontPick label="Body font" value={t.st.body} onChange={(f) => t.set("body", f)} />
      </div>
      {V().TYPE.map((s) => {
        const f = v[s.token + ".fontFamily"], z = v[s.token + ".fontSize"], l = v[s.token + ".lineHeight"], w = v[s.token + ".fontWeight"];
        const custom = [f, z, l, w].filter((x) => x.custom);
        return <div key={s.key} className="te-ty-sec">
          <div className="te-ty-hd">
            <span className="te-ty-h">{s.label}</span><span className="pg-grow"></span>
            {custom.length ? <button type="button" className="te-rst" onClick={() => custom.forEach((x) => t.reset(x.name))}>Reset</button> : null}
            <span className="te-ty-aa" style={{ fontFamily: V().fontStack(f.value), fontWeight: w.value, fontSize: Math.min(parseInt(z.value) || 16, 30) + "px" }}>Aa</span>
          </div>
          <div className="te-ty-grid">
            {fld("Family", f, <FontPick sm value={f.value} onChange={(x) => t.override(f.name, x)} />)}
            {fld("Size", z, <Select sm value={z.value} options={SIZES.map((x) => ({ v: x + "px", l: x + "px" }))} onChange={(x) => t.override(z.name, x)} />)}
            {fld("Line height", l, <input className="te-in sm" value={l.value} onChange={(e) => t.override(l.name, e.target.value)} />)}
            {fld("Weight", w, <Select sm value={w.value} options={V().weightsOf(f.value).map((x) => ({ v: String(x), l: WEIGHT_L[x] }))} onChange={(x) => t.override(w.name, x)} />)}
          </div>
          {V().offScaleWeight(w) ? <div className="te-muted">{WEIGHT_L[w.value]} is outside the {s.label} scale, so it previews here but isn't exported.</div> : null}
        </div>;
      })}
    </div>;
  }
  function ContrastWarn({ st, fg, label }) {
    const a = fg || st.text || V().DEFAULTS.text, b = st.card || V().DEFAULTS.card;
    if (!HEX.test(a) || !HEX.test(b)) return null;
    const r = V().contrast(a, b);
    return r < 4.5 ? <div className="te-cw" role="status"><UI.Icon name="AlertTriangle" size={16} /><span>{label || "Text primary"} on Card background is {r.toFixed(1)}:1. Body text needs at least 4.5:1.</span></div> : null;
  }
  function AdvancedTab({ t }) {
    const [sec, setSec] = useState("colors");
    return <div className="te-tt">
      <div className="te-st-bar" role="tablist">{SECS.map(([id, l, ico]) => {
        const g = t.groups.find((x) => x.id === SEC_GROUP[id]);
        const cg = id === "radius" ? t.groups.find((x) => x.id === "component") : null;
        const n = (g ? g.tokens.filter((x) => x.custom).length : 0) + (cg ? cg.tokens.filter((x) => x.custom).length : 0);
        return <button type="button" key={id} role="tab" aria-selected={sec === id} title={l} className={"te-st" + (sec === id ? " on" : "")} onClick={() => setSec(id)}><UI.Icon name={ico} size={20} />{sec === id ? <span>{l}</span> : null}{n > 0 ? <i className="te-st-dot"></i> : null}</button>;
      })}</div>
      {sec === "colors" ? <React.Fragment>
        <div className="te-tg">{V().COLORS.filter((c) => !c.group).map((c) => <div key={c.key} className="te-cr">
          <div className="te-cr-l"><span className="te-cr-n">{c.label}</span></div>
          <Hex label={c.label} value={t.st[c.key] || V().DEFAULTS[c.key]} onChange={(v) => t.setColor(c.key, v)} />
        </div>)}</div>
        <div className="te-tg">
          <div className="te-ty-hd"><span className="te-ty-h">Text</span></div>
          {V().COLORS.filter((c) => c.group === "text").map((c) => {
            const derived = c.key === "textSecondary" && !t.st.textSecondary;
            const val = c.key === "textSecondary" ? V().textSecondary(t.st) : (t.st[c.key] || V().DEFAULTS[c.key]);
            return <div key={c.key} className="te-cr">
              <div className="te-cr-l"><span className="te-cr-n">{c.label}</span>{c.key === "textSecondary" ? (derived ? <span className="te-muted">Follows Text primary</span> : <button type="button" className="te-rst" onClick={() => t.setColor(c.key, undefined)}>Reset</button>) : null}</div>
              <Hex label={c.label} value={val} onChange={(v) => t.setColor(c.key, v)} />
              <ContrastWarn st={t.st} fg={val} label={c.label} />
            </div>;
          })}
        </div>
      </React.Fragment> : null}
      {sec === "typography" ? <TypeTab t={t} /> : null}
      {sec !== "typography" && sec !== "colors" ? t.groups.filter((g) => g.id === SEC_GROUP[sec]).map((g) => <div key={g.id} className="te-tg">{g.tokens.map((tk) => <TokenRow key={tk.name} t={t} tk={tk} />)}</div>) : null}
      {sec === "radius" ? <ComponentsTab t={t} /> : null}
    </div>;
  }

  function ThemeEditor({ st, setSt, picker }) {
    const t = useEditor(st, setSt);
    const [tab, setTab] = useState("Basics");
    const p = t.pending;
    return <div className="te">
      <div className="te-h">
        {picker}
        <div className="te-seg2" role="tablist">{["Basics", "Advanced"].map((x) => <button type="button" role="tab" key={x} aria-selected={x === tab} className={x === tab ? "on" : ""} onClick={() => setTab(x)}>{x}</button>)}</div>
      </div>
      <div className="te-b">
        {tab === "Basics" ? <React.Fragment>
          <Ctl k="brand"><Hex label="Brand colour" value={t.st.brand} onChange={(v) => t.setColor("brand", v)} /></Ctl>
          <div className="te-fp-stack">
            <FontPick label="Heading font" value={t.st.heading} onChange={(f) => t.set("heading", f)} />
            <FontPick label="Body font" value={t.st.body} onChange={(f) => t.set("body", f)} />
          </div>
          <Step k="radius" t={t} /><Step k="density" t={t} /><Step k="shadow" t={t} />
        </React.Fragment> : <AdvancedTab t={t} />}
      </div>
      <UI.Modal open={!!p} onClose={t.cancel} variant="content" size="sm" title="Keep your custom values?"
        actions={<React.Fragment>
          <UI.Button hierarchy="secondary" onClick={() => t.resolvePending(true)}>Keep custom</UI.Button>
          <UI.Button hierarchy="primary" onClick={() => t.resolvePending(false)}>Recalculate</UI.Button>
        </React.Fragment>}>
        {p ? <div className="te-dlg">
          <p className="te-dlg-p">You edited {p.names.length} {p.names.length === 1 ? "token" : "tokens"} by hand. Changing {p.label} to <b>{p.to}</b> recalculates them.</p>
          <div className="te-dlg-l">{p.names.slice(0, 6).map((n) => <code key={n} className="te-tk">{n}</code>)}{p.names.length > 6 ? <span className="te-muted">+{p.names.length - 6} more</span> : null}</div>
        </div> : null}
      </UI.Modal>
    </div>;
  }

  Object.assign(window, { SH_ThemeEditor: ThemeEditor });
})();
