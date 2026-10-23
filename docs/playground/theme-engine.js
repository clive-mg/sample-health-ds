/* Sample Health — theme engine (prototype).
   Turns a small theme definition (JSON) into the full set of foundation CSS
   variables: brand ramp, neutral ramp, shadows, radius, spacing, font.
   Every semantic token in tokens/fig-tokens.css aliases these via var(), so
   overriding them on <html> re-themes every component. */
(function (root) {
  const STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const DEFAULT_GRAY = { 25: "#fdfdfd", 50: "#fafafa", 100: "#f5f5f5", 200: "#e9eaeb", 300: "#d5d7da", 400: "#a4a7ae", 500: "#717680", 600: "#535862", 700: "#414651", 800: "#252b37", 900: "#181d27", 950: "#0a0d12" };
  const SPACING = { none: 0, xxs: 2, xs: 4, sm: 6, md: 8, lg: 12, xl: 16, "2xl": 20, "3xl": 24, "4xl": 32, "5xl": 40, "6xl": 48, "7xl": 64, "8xl": 80, "9xl": 96, "10xl": 128, "11xl": 160 };
  const RADIUS = { none: 0, xxs: 2, xs: 4, sm: 6, md: 8, lg: 10, xl: 12, "2xl": 16, "3xl": 20, "4xl": 24 };
  const SHADOWS = { "2xl-01": .18, "2xl-02": .04, "3xl-01": .14, "3xl-02": .04, "lg-01": .08, "lg-02": .03, "lg-03": .04, "md-01": .1, "md-02": .06, "skeumorphic-inner-border": .18, "skeumorphic-inner": .05, "sm-01": .1, "sm-02": .1, "xl-01": .08, "xl-02": .03, "xl-03": .04, xs: .05 };
  const FONTS = {
    "Inter": null,
    "IBM Plex Sans": "IBM+Plex+Sans:wght@400;500;600;700",
    "Source Sans 3": "Source+Sans+3:wght@400;500;600;700",
    "Public Sans": "Public+Sans:wght@400;500;600;700",
    "DM Sans": "DM+Sans:wght@400;500;600;700",
    "Nunito Sans": "Nunito+Sans:wght@400;500;600;700"
  };

  const toLin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const toSrgb = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
  function hexToRgb(hex) { const h = hex.replace("#", ""); const n = parseInt(h.length === 3 ? h.split("").map((x) => x + x).join("") : h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function hexToOklch(hex) {
    const [r, g, b] = hexToRgb(hex).map((v) => toLin(v / 255));
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return { L, C: Math.hypot(A, B), H: ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360 };
  }
  function oklchToRgbLin(L, C, H) {
    const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
    const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * b, 3);
    const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * b, 3);
    const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * b, 3);
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
  }
  function oklchToHex(L, C, H) {
    let lo = 0, hi = C, rgb = oklchToRgbLin(L, C, H);
    const ok = (v) => v.every((x) => x >= -1e-4 && x <= 1 + 1e-4);
    if (!ok(rgb)) { for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (ok(oklchToRgbLin(L, mid, H))) lo = mid; else hi = mid; } rgb = oklchToRgbLin(L, lo, H); }
    return "#" + rgb.map((v) => Math.round(Math.min(1, Math.max(0, toSrgb(Math.min(1, Math.max(0, v))))) * 255).toString(16).padStart(2, "0")).join("");
  }

  /* Base colour lands on step 600 — the step primary buttons and brand fills use. */
  function brandRamp(hex) {
    const { L, C, H } = hexToOklch(hex);
    const light = { 25: .985, 50: .97, 100: .935, 200: .885, 300: .81, 400: .72 };
    const chroma = { 25: .08, 50: .15, 100: .3, 200: .5, 300: .7, 400: .88, 500: .97, 600: 1, 700: .95, 800: .85, 900: .75, 950: .65 };
    const lt = { ...light, 500: (L + Math.max(light[400], L + .1)) / 2, 600: L, 700: L - .06, 800: L - .11, 900: L - .16, 950: L - .23 };
    for (const k of [25, 50, 100, 200, 300, 400]) lt[k] = Math.max(lt[k], L + (.985 - L) * ((STEPS.indexOf(400) - STEPS.indexOf(k) + 1) / 7));
    const out = {};
    for (const s of STEPS) out[s] = s === 600 ? hex.toLowerCase() : oklchToHex(Math.max(.12, Math.min(.99, lt[s])), C * chroma[s], H);
    return out;
  }
  function neutralRamp(tint, primaryHex) {
    if (!tint || tint === "none") return { ...DEFAULT_GRAY };
    const H = tint === "warm" ? 70 : hexToOklch(primaryHex).H;
    const out = {};
    for (const s of STEPS) { const L = hexToOklch(DEFAULT_GRAY[s]).L; const edge = s <= 50 || s >= 950 ? .5 : 1; out[s] = oklchToHex(L, .012 * edge, H); }
    return out;
  }


  /* ---- v2 theme model (Theme Editor). A theme is { v: 2, st } where st holds the
     Basics inputs plus per-token overrides (st.ov). derive() turns st into token
     groups; v2Vars() turns those into the CSS variables the DS reads. ---- */
  const V2_OPTS = {
    radius: [{ v: 0, l: "Sharp", k: .5 }, { v: 1, l: "Subtle", k: .75 }, { v: 2, l: "Default", k: 1 }, { v: 3, l: "Soft", k: 1.5 }, { v: 4, l: "Round", k: 2 }],
    density: [{ v: 0, l: "Compact", k: .75 }, { v: 1, l: "Snug", k: .875 }, { v: 2, l: "Default", k: 1 }, { v: 3, l: "Roomy", k: 1.25 }, { v: 4, l: "Spacious", k: 1.5 }],
    shadow: [{ v: 0, l: "None", k: 0 }, { v: 1, l: "Subtle", k: .35 }, { v: 2, l: "Soft", k: .6 }, { v: 3, l: "Default", k: 1 }, { v: 4, l: "Strong", k: 1.75 }]
  };
  const V2_DEFAULTS = { brand: "#1570ef", success: "#079455", error: "#d92d20", warning: "#dc6803", info: "#3e4784", neutral: "#535862", text: "#181d27", card: "#ffffff", surface: "#fafafa", heading: "Inter", body: "Inter", radius: 2, density: 2, shadow: 3, ov: {} };
  const V2_COLORS = [
    { key: "brand", label: "Primary", token: "color.primary", css: "brand" },
    { key: "success", label: "Success", token: "color.success", css: "success" },
    { key: "error", label: "Error", token: "color.error", css: "error" },
    { key: "warning", label: "Warning", token: "color.warning", css: "warning" },
    { key: "info", label: "Info", token: "color.info", css: "info" },
    { key: "neutral", label: "Neutral", token: "color.neutral", css: "gray-light-mode" },
    { key: "text", label: "Text primary", token: "color.text.primary", sem: true, group: "text" },
    { key: "textSecondary", label: "Text secondary", token: "color.text.secondary", sem: true, group: "text", optional: true },
    { key: "card", label: "Card background", token: "color.surface.default", sem: true },
    { key: "surface", label: "Surface", token: "color.surface.canvas", sem: true }
  ];
  /* Semantic colours (light mode only). Related tokens are mixed from the three inputs. */
  const mixHex = (a, b, t) => { const x = hexToRgb(a), y = hexToRgb(b); return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join(""); };
  const lum = (h) => { const c = hexToRgb(h).map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); };
  /* Text secondary follows Text primary until the user sets it; then it stays fixed. */
  const textSecondary = (st) => { st = { ...V2_DEFAULTS, ...st }; return /^#[0-9a-f]{6}$/i.test(st.textSecondary || "") ? st.textSecondary : (/^#[0-9a-f]{6}$/i.test(st.text) && /^#[0-9a-f]{6}$/i.test(st.card) ? mixHex(st.text, st.card, .2) : null); };
  function semVars(st, v) {
    const ok = (k) => /^#[0-9a-f]{6}$/i.test(st[k] || "");
    const ts = ok("textSecondary") ? st.textSecondary : null;
    if (!["text", "card", "surface"].every(ok) || (!ts && ["text", "card", "surface"].every((k) => st[k].toLowerCase() === V2_DEFAULTS[k]))) return;
    const t = st.text, c = st.card, s = st.surface;
    Object.assign(v, {
      "--colors-text-text-primary-900": t, "--colors-text-text-secondary-700": ts || mixHex(t, c, .2), "--colors-text-text-tertiary-600": mixHex(t, c, .3),
      "--colors-background-bg-primary": c, "--colors-background-bg-primary-alt": c, "--colors-background-bg-primary-hover": mixHex(c, t, .02),
      "--colors-background-bg-secondary": s, "--colors-background-bg-secondary-subtle": mixHex(s, c, .7)
    });
  }
  const V2_SHADOW = { xs: [[1, 2, 0, .05]], sm: [[1, 3, 0, .1], [1, 2, 0, .1]], md: [[4, 8, -2, .1], [2, 4, -2, .06]], lg: [[12, 16, -4, .08], [4, 6, -2, .03]], xl: [[20, 24, -4, .08], [8, 8, -4, .03]], "2xl": [[24, 48, -12, .18]], "3xl": [[32, 64, -12, .14]] };
  const V2_FONTS = [
    { group: "Sans serif", fonts: ["Geist", "Inter", "Noto Sans", "Nunito Sans", "Figtree", "Roboto", "Raleway", "DM Sans", "Public Sans", "Outfit", "Oxanium", "Manrope", "Space Grotesk", "Montserrat", "IBM Plex Sans", "Source Sans 3", "Instrument Sans", "Work Sans", "Plus Jakarta Sans", "Lexend", "Sora", "Rubik", "Open Sans", "Lato", "Poppins", "Atkinson Hyperlegible", "Bricolage Grotesque"] },
    { group: "Serif", fonts: ["Noto Serif", "Roboto Slab", "Merriweather", "Lora", "Playfair Display", "EB Garamond", "Instrument Serif", "Source Serif 4", "Libre Baskerville", "Crimson Pro"] }
  ];
  /* Upright weights each family publishes on Google Fonts, named steps 100–900 only.
     Snapshot taken 2026-10-20; update by hand when a family changes. */
  const W = (a, b) => { const o = []; for (let w = a; w <= b; w += 100) o.push(w); return o; };
  const V2_WEIGHTS = {
    "Geist": W(100, 900), "Inter": W(100, 900), "Noto Sans": W(100, 900), "Nunito Sans": W(200, 900), "Figtree": W(300, 900), "Roboto": W(100, 900),
    "Raleway": W(100, 900), "DM Sans": W(100, 900), "Public Sans": W(100, 900), "Outfit": W(100, 900), "Oxanium": W(200, 800), "Manrope": W(200, 800),
    "Space Grotesk": W(300, 700), "Montserrat": W(100, 900), "IBM Plex Sans": W(100, 700), "Source Sans 3": W(200, 900), "Instrument Sans": W(400, 700),
    "Work Sans": W(100, 900), "Plus Jakarta Sans": W(200, 800), "Lexend": W(100, 900), "Sora": W(100, 800), "Rubik": W(300, 900), "Open Sans": W(300, 800),
    "Lato": [100, 300, 400, 700, 900], "Poppins": W(100, 900), "Atkinson Hyperlegible": [400, 700], "Bricolage Grotesque": W(200, 800),
    "Noto Serif": W(100, 900), "Roboto Slab": W(100, 900), "Merriweather": W(300, 900), "Lora": W(400, 700), "Playfair Display": W(400, 900),
    "EB Garamond": W(400, 800), "Instrument Serif": [400], "Source Serif 4": W(200, 900), "Libre Baskerville": [400, 700], "Crimson Pro": W(200, 900)
  };
  const weightsOf = (f) => V2_WEIGHTS[f] || [400, 500, 600, 700];
  /* Nearest weight the family has; a tie goes to the heavier one. */
  const snapWeight = (f, w) => { const ws = weightsOf(f), n = +w; return ws.includes(n) ? n : ws.reduce((b, x) => (Math.abs(x - n) < Math.abs(b - n) || (Math.abs(x - n) === Math.abs(b - n) && x > b) ? x : b), ws[0]); };
  const V2_SERIF = new Set(V2_FONTS[1].fonts);
  const fontStack = (f) => '"' + f + '", ' + (V2_SERIF.has(f) ? "Georgia, serif" : 'system-ui, -apple-system, "Segoe UI", sans-serif');
  const V2_TYPE = [
    ["d1", "Display 1", "style.display.1", "h", 72, 86, [600], "display-1"], ["d2", "Display 2", "style.display.2", "h", 60, 72, [600], "display-2"], ["d3", "Display 3", "style.display.3", "h", 48, 58, [600], "display-3"],
    ["h1", "Heading 1", "style.heading.h1", "h", 36, 44, [600], "h1"], ["h2", "Heading 2", "style.heading.h2", "h", 30, 36, [600], "h2"], ["h3", "Heading 3", "style.heading.h3", "h", 24, 28, [600], "h3"],
    ["h4", "Heading 4", "style.heading.h4", "h", 20, 24, [600], "h4"], ["h5", "Heading 5", "style.heading.h5", "h", 18, 22, [600], "h5"], ["h6", "Heading 6", "style.heading.h6", "h", 16, 20, [600], "h6"],
    ["blg", "Body large", "style.body.lg.regular", "b", 16, 24, [400, 600], "body-lg"], ["bmd", "Body medium", "style.body.md.regular", "b", 14, 20, [400, 600], "body-md"], ["bsm", "Body small", "style.body.sm.regular", "b", 12, 18, [500, 700], "body-sm"],
    ["cap", "Caption", "style.caption", "b", 12, 18, [500, 700], "caption"], ["ovl", "Overline", "style.overline", "b", 12, 18, [500, 700], null]
  ].map(([key, label, token, fam, size, line, weights, css]) => ({ key, label, token, fam, size, line, weights, css }));
  /* Component radius hooks: each component reads var(--sh-<id>-radius, <its default>). */
  const V2_COMP = [["button", "Button", "radius.md"], ["badge", "Badge", "radius.full"], ["input", "Input field", "radius.md"], ["dropdown", "Dropdown menu", "radius.md"], ["tooltip", "Tooltip", "radius.md"], ["alert", "Alert", "radius.md"], ["notification", "Notification", "radius.md"], ["modal", "Modal", "radius.xl"]]
    .map(([id, label, d]) => ({ id, label, props: [{ p: "radius", label: "Border radius", kind: "radius", d, name: "component." + id + ".radius" }] }));
  /* Type scale: headings step up from a 16px base (H6 = step 0 … Display 1 = step 8). "default" keeps the published ladder. */
  const V2_SCALES = [{ v: "default", l: "Sample Health default" }, { v: "1.067", l: "1.067 — Minor Second" }, { v: "1.125", l: "1.125 — Major Second" }, { v: "1.200", l: "1.200 — Minor Third" }, { v: "1.250", l: "1.250 — Major Third" }, { v: "1.333", l: "1.333 — Perfect Fourth" }];
  const SCALE_STEP = { h6: 0, h5: 1, h4: 2, h3: 3, h2: 4, h1: 5, d3: 6, d2: 7, d1: 8 };
  const scaled = (s, sc) => { const ratio = parseFloat(sc); if (!ratio || s.fam !== "h" || SCALE_STEP[s.key] == null) return [s.size, s.line]; const z = Math.round(16 * Math.pow(ratio, SCALE_STEP[s.key])); return [z, Math.round(z * 1.2)]; };
  const k2 = (key, v) => V2_OPTS[key][v == null ? V2_DEFAULTS[key] : v].k;
  const shadowCss = (n, k) => (k === 0 ? "none" : V2_SHADOW[n].map(([y, b, s, a]) => "0px " + y + "px " + b + "px " + s + "px rgba(10,13,18," + +(a * k).toFixed(3) + ")").join(", "));
  function derive(st) {
    const rk = k2("radius", st.radius), sk = k2("density", st.density), hk = k2("shadow", st.shadow), ov = st.ov || {};
    return [
      { id: "font", tokens: [["regular", "body"], ["medium", "body"], ["semibold", "heading"], ["bold", "body"]].map(([w, c]) => ({ name: "font.face.base." + w, value: st[c], kind: "font", owner: c })) },
      { id: "type", tokens: [].concat(...V2_TYPE.map((s, _i, _a, sz = scaled(s, st.scale)) => [
        { name: s.token + ".fontFamily", value: s.fam === "h" ? st.heading : st.body, kind: "font", owner: s.fam === "h" ? "heading" : "body" },
        { name: s.token + ".fontSize", value: sz[0] + "px", kind: "px" },
        { name: s.token + ".lineHeight", value: sz[1] + "px", kind: "px" },
        { name: s.token + ".fontWeight", value: String(s.weights[0]), kind: "w" }
      ])) },
      { id: "radius", owner: "radius", tokens: Object.keys(RADIUS).map((n) => ({ name: "radius." + n, value: Math.round(RADIUS[n] * rk) + "px", kind: "px", css: "--radius-" + n + "-px" })).concat([{ name: "radius.full", value: "9999px", kind: "px", css: "--radius-full-px" }]) },
      { id: "spacing", owner: "density", tokens: Object.keys(SPACING).map((n) => ({ name: "spacing." + n, value: Math.round(SPACING[n] * sk) + "px", kind: "px", css: "--spacing-" + n + "-px" })) },
      { id: "shadow", owner: "shadow", tokens: Object.keys(V2_SHADOW).map((n) => ({ name: "shadow." + n, value: shadowCss(n, hk), kind: "shadow" })) },
      { id: "component", tokens: [].concat(...V2_COMP.map((c) => c.props.map((p) => ({ name: p.name, value: p.d, kind: "ref" })))) }
    ].map((g) => ({ ...g, tokens: g.tokens.map((t) => (ov[t.name] != null ? { ...t, derived: t.value, value: ov[t.name], custom: true } : t)) }))
      .map((g) => {
        if (g.id !== "type") return g;
        const fam = {}; g.tokens.forEach((t) => { if (/\.fontFamily$/.test(t.name)) fam[t.name.slice(0, -11)] = t.value; });
        return { ...g, tokens: g.tokens.map((t) => {
          if (!/\.fontWeight$/.test(t.name)) return t;
          const f = fam[t.name.slice(0, -11)], w = snapWeight(f, t.value);
          return String(w) === String(t.value) ? t : { ...t, value: String(w), snappedFrom: t.value };
        }) };
      });
  }
  const flat = (groups) => { const o = {}; groups.forEach((g) => g.tokens.forEach((x) => (o[x.name] = x.value))); return o; };
  const BASE_V2 = flat(derive(V2_DEFAULTS));
  const px = (v) => (/^\d+(\.\d+)?$/.test(String(v)) ? v + "px" : v);
  function v2Vars(st) {
    st = { ...V2_DEFAULTS, ...st };
    const groups = derive(st), tv = flat(groups), v = {};
    V2_COLORS.forEach((c) => { if (c.sem) return; const hex = (st[c.key] || "").toLowerCase(); if (/^#[0-9a-f]{6}$/.test(hex) && hex !== V2_DEFAULTS[c.key]) { const r = brandRamp(hex); for (const s of STEPS) v["--colors-" + c.css + "-" + s] = r[s]; } });
    groups.filter((g) => g.id === "radius" || g.id === "spacing").forEach((g) => g.tokens.forEach((x) => { if (x.value !== BASE_V2[x.name]) v[x.css] = px(x.value); }));
    semVars(st, v);
    const hk = k2("shadow", st.shadow);
    if (hk !== 1) for (const n in SHADOWS) v["--colors-effects-shadows-shadow-" + n] = "rgba(10,13,18," + +(SHADOWS[n] * hk).toFixed(3) + ")";
    const h = tv["font.face.base.semibold"], b = tv["font.face.base.regular"];
    if (h && h !== "Inter") { v["--font-display"] = fontStack(h); v["--font-family-font-family-display"] = '"' + h + '"'; }
    if (b && b !== "Inter") { v["--font-body"] = fontStack(b); v["--font-family-font-family-body"] = '"' + b + '"'; }
    V2_TYPE.forEach((s) => { if (!s.css) return; ["fontSize", "lineHeight"].forEach((p, i) => { const n = s.token + "." + p; if (tv[n] !== BASE_V2[n]) v["--text-" + s.css + (i ? "-line" : "-size")] = px(tv[n]); }); });
    V2_COMP.forEach((c) => c.props.forEach((p) => { const val = tv[p.name]; if (val && val !== p.d) v["--sh-" + c.id + "-radius"] = "var(--radius-" + val.slice(7) + "-px)"; }));
    return v;
  }
  function v2Fonts(st) {
    const tv = flat(derive({ ...V2_DEFAULTS, ...st })), set = new Set();
    Object.keys(tv).forEach((n) => { if (/(^font\.face|\.fontFamily$)/.test(n) && tv[n] && tv[n] !== "Inter") set.add(tv[n]); });
    return [...set];
  }
  function v2FontHref(st) {
    const f = v2Fonts(st);
    return f.length ? "https://fonts.googleapis.com/css2?" + f.map((x) => { const ws = weightsOf(x); return "family=" + x.replace(/ /g, "+") + (ws.length === 1 && ws[0] === 400 ? "" : ":wght@" + ws.join(";")); }).join("&") + "&display=swap" : null;
  }
  /* A weight outside the style's published weights is preview-only: Export skips it. */
  const STYLE_BY_TOKEN = {}; V2_TYPE.forEach((s) => (STYLE_BY_TOKEN[s.token + ".fontWeight"] = s));
  const offScaleWeight = (x) => { const s = STYLE_BY_TOKEN[x.name]; return !!s && !s.weights.includes(+x.value); };
  /* Changed tokens only, one row per token — what Export writes. */
  function v2Export(st) {
    st = { ...V2_DEFAULTS, ...st };
    const rows = [];
    V2_COLORS.forEach((c) => { if (c.optional ? st[c.key] : (st[c.key] || "").toLowerCase() !== V2_DEFAULTS[c.key]) rows.push({ name: c.sem ? c.token : c.token + ".600", value: st[c.key] }); });
    derive(st).forEach((g) => g.tokens.forEach((x) => { if (x.value !== BASE_V2[x.name] && !offScaleWeight(x)) rows.push({ name: x.name, value: x.value }); }));
    return rows;
  }
  const V2 = { DEFAULTS: V2_DEFAULTS, OPTS: V2_OPTS, COLORS: V2_COLORS, FONTS: V2_FONTS, TYPE: V2_TYPE, SCALES: V2_SCALES, COMP: V2_COMP, RADIUS, SPACING, SHADOW: V2_SHADOW, fontStack, weightsOf, textSecondary, offScaleWeight, contrast, derive, flat, vars: v2Vars, fonts: v2Fonts, fontHref: v2FontHref, exportRows: v2Export };

  function themeToVars(t) {
    if (t && t.v === 2) return v2Vars(t.st || {});
    const v = {};
    const c = t.color || {};
    if (c.primary) { const r = brandRamp(c.primary); for (const s of STEPS) v["--colors-brand-" + s] = r[s]; }
    if (c.accent) { const r = brandRamp(c.accent); for (const s of STEPS) v["--colors-accent-" + s] = r[s]; }
    const gray = neutralRamp(c.neutralTint, c.primary || "#1570ef");
    if (c.neutralTint && c.neutralTint !== "none") for (const s of STEPS) v["--colors-gray-light-mode-" + s] = gray[s];
    if (t.shadow && t.shadow.tint && t.shadow.tint !== "none") {
      const [r, g, b] = hexToRgb(gray[950]); const k = t.shadow.strength == null ? 1 : t.shadow.strength;
      for (const n in SHADOWS) v["--colors-effects-shadows-shadow-" + n] = `rgba(${r},${g},${b},${+(SHADOWS[n] * k).toFixed(3)})`;
    }
    const br = t.components && t.components.button && t.components.button.radius;
    if (br && br !== "default") v["--sh-button-radius"] = "var(--radius-" + br + "-px)";
    const rs = t.radius && t.radius.scale; if (rs && rs !== 1) for (const n in RADIUS) v["--radius-" + n + "-px"] = Math.round(RADIUS[n] * rs) + "px";
    const ss = t.spacing && t.spacing.scale; if (ss && ss !== 1) for (const n in SPACING) v["--spacing-" + n + "-px"] = Math.round(SPACING[n] * ss) + "px";
    const f = t.font && t.font.family; if (f && f !== "Inter") { const stack = `"${f}", system-ui, -apple-system, "Segoe UI", sans-serif`; v["--font-body"] = stack; v["--font-display"] = stack; v["--font-family-font-family-body"] = `"${f}"`; v["--font-family-font-family-display"] = `"${f}"`; }
    return v;
  }
  function themeToCSS(t, selector) {
    const v = themeToVars(t);
    return `${selector}{\n${Object.keys(v).map((k) => `  ${k}: ${v[k]};`).join("\n")}\n}`;
  }
  function fontHref(t) { if (t && t.v === 2) return v2FontHref(t.st || {}); const g = t.font && FONTS[t.font.family]; return g ? `https://fonts.googleapis.com/css2?family=${g}&display=swap` : null; }

  /* Templates set heading sizes inline and inherit the body font, so the heading
     face has to be routed to h1–h6 explicitly. */
  const HEADINGS = (sel) => "\n" + sel + " :is(h1,h2,h3,h4,h5,h6){font-family:var(--font-display)}";
  /* Apply a theme to a document. A builtin default removes every override. */
  function applyTheme(doc, t) {
    const html = doc.documentElement;
    let style = doc.getElementById("sh-theme-runtime");
    let font = doc.getElementById("sh-theme-font");
    if (!t || t.builtin) { delete html.dataset.shTheme; if (style) style.remove(); if (font) font.remove(); return; }
    html.dataset.shTheme = t.id;
    if (!style) { style = doc.createElement("style"); style.id = "sh-theme-runtime"; doc.head.appendChild(style); }
    style.textContent = themeToCSS(t, `:root[data-sh-theme="${t.id}"]`) + HEADINGS(`:root[data-sh-theme="${t.id}"]`);
    const href = fontHref(t);
    if (href) { if (!font) { font = doc.createElement("link"); font.id = "sh-theme-font"; font.rel = "stylesheet"; doc.head.appendChild(font); } if (font.href !== href) font.href = href; }
    else if (font) font.remove();
  }
  /* Theme one subtree of a document instead of :root. Custom properties resolve
     where they are declared, so every :root alias (semantic and component tokens)
     is re-declared inside the scope; otherwise it would keep the :root value. */
  let ALIASES = null;
  function collectAliases(doc) {
    if (ALIASES) return ALIASES;
    const light = {}, dark = {};
    const walk = (rules) => {
      for (const r of rules) {
        if (r.styleSheet) { try { walk(r.styleSheet.cssRules); } catch (e) {} continue; }
        if (!r.selectorText || !r.style) continue;
        const sel = r.selectorText.trim();
        const target = sel === ":root" || sel === "html" ? light : /^:root\[data-theme="?dark"?\]$/.test(sel) ? dark : null;
        if (!target) continue;
        for (let i = 0; i < r.style.length; i++) {
          const n = r.style[i];
          if (n.indexOf("--") !== 0) continue;
          const val = r.style.getPropertyValue(n).trim();
          if (val.indexOf("var(") !== -1) target[n] = val;
        }
      }
    };
    for (const sh of doc.styleSheets) { try { walk(sh.cssRules); } catch (e) {} }
    if (Object.keys(light).length) ALIASES = { light, dark };
    return { light, dark };
  }
  function applyScoped(doc, t, scope) {
    let style = doc.getElementById("sh-theme-scoped");
    let font = doc.getElementById("sh-theme-scoped-font");
    if (!t || t.builtin) { if (style) style.remove(); if (font) font.remove(); return; }
    const a = collectAliases(doc), v = themeToVars(t);
    const decl = (o) => Object.keys(o).map((k) => "  " + k + ": " + o[k] + ";").join("\n");
    if (!style) { style = doc.createElement("style"); style.id = "sh-theme-scoped"; doc.head.appendChild(style); }
    style.textContent = scope + "{\n" + decl(a.light) + "\n" + decl(v) + "\n  font-family: var(--font-body);\n  color: var(--colors-text-text-primary-900);\n  background: var(--colors-background-bg-secondary);\n}\n"
      + ':root[data-theme="dark"] ' + scope + "{\n" + decl(a.dark) + "\n" + decl(v) + "\n}" + HEADINGS(scope);
    const href = fontHref(t);
    if (href) { if (!font) { font = doc.createElement("link"); font.id = "sh-theme-scoped-font"; font.rel = "stylesheet"; doc.head.appendChild(font); } if (font.href !== href) font.href = href; }
    else if (font) font.remove();
  }
  function swatches(t) {
    if (!t || t.builtin) return ["#1570ef", "#f79009", "#717680"];
    if (t.v === 2) { const s = { ...V2_DEFAULTS, ...t.st }; return [s.brand, s.warning, s.neutral]; }
    const c = t.color || {};
    return [c.primary || "#1570ef", c.accent || "#f79009", neutralRamp(c.neutralTint, c.primary || "#1570ef")[500]];
  }

  root.SHTheme = { STEPS, FONTS, brandRamp, neutralRamp, themeToVars, themeToCSS, applyTheme, applyScoped, fontHref, swatches, hexToOklch, oklchToHex, V2 };
})(typeof window !== "undefined" ? window : globalThis);
