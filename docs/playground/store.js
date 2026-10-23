/* Sample Health docs — theme store. One list of themes for the whole doc site:
   the built-in Sample Health theme (read-only) plus user themes saved in localStorage.
   - Playground: applies the active theme (or unsaved draft) to its preview iframe.
   - Home pages: the saved selection themes the content column (.sh-themed) and
     the template iframes inside it. The docs chrome is never themed. */
(function () {
  /* v2 = Theme Editor model. Themes saved under the old keys are not migrated. */
  const CUSTOM_KEY = "sh-themes-custom-v2";
  const CURRENT_KEY = "sh-theme-current";
  const DEFAULT = { id: "sample-health-default", name: "Sample Health", builtin: true, readonly: true };
  /* Starter themes: read-only (duplicate to edit) but deletable; "Restore starter themes" brings them back.
     Each one pushes a different corner of the system — colour, type, scale, density, radius, shadow, shapes. */
  const W8 = (names, w) => Object.fromEntries(names.map((n) => [n + ".fontWeight", w]));
  const HEADS = ["style.display.1", "style.display.2", "style.display.3", "style.heading.h1", "style.heading.h2", "style.heading.h3"];
  const STARTERS = [
    { id: "starter-vega", name: "Vega", st: { brand: "#3538cd", success: "#067647", error: "#c01048", warning: "#b54708", info: "#3e4784", neutral: "#4b5565", text: "#0d121c", card: "#ffffff", surface: "#f2f4f7", heading: "Space Grotesk", body: "IBM Plex Sans", scale: "1.125", radius: 0, density: 0, shadow: 1, ov: { "component.badge.radius": "radius.xs" } } },
    { id: "starter-nova", name: "Nova", st: { brand: "#c4320a", success: "#087443", error: "#c01048", warning: "#a15c07", info: "#6927da", neutral: "#57534e", text: "#1f140f", card: "#ffffff", surface: "#fff6f0", heading: "Montserrat", body: "DM Sans", scale: "1.333", radius: 4, density: 2, shadow: 4, ov: { ...W8(HEADS, "800"), "component.button.radius": "radius.full", "component.input.radius": "radius.full" } } },
    { id: "starter-maia", name: "Maia", st: { brand: "#a4442a", success: "#3b7d4f", error: "#b42318", warning: "#b54708", info: "#475467", neutral: "#57534e", text: "#292524", card: "#fffdf9", surface: "#faf5ec", heading: "Lora", body: "Nunito Sans", scale: "1.200", radius: 3, density: 3, shadow: 2, ov: { "component.button.radius": "radius.xl", "component.modal.radius": "radius.3xl" } } },
    { id: "starter-lyra", name: "Lyra", st: { brand: "#6b2d5c", success: "#2f6b4f", error: "#a32020", warning: "#93370d", info: "#344054", neutral: "#4d4d57", text: "#1c1b22", card: "#ffffff", surface: "#f6f4f1", heading: "Playfair Display", body: "Source Sans 3", scale: "1.250", radius: 1, density: 4, shadow: 0, ov: { ...W8(HEADS, "500"), "component.button.radius": "radius.none", "component.input.radius": "radius.none", "component.badge.radius": "radius.none" } } },
    { id: "starter-mira", name: "Mira", st: { brand: "#0e7470", success: "#2b7a4b", error: "#c4320a", warning: "#b54708", info: "#2d5d8b", neutral: "#4a5654", text: "#13201e", card: "#ffffff", surface: "#f1f6f5", heading: "Manrope", body: "Plus Jakarta Sans", scale: "default", radius: 2, density: 3, shadow: 1, ov: { ...W8(HEADS, "700") } } },
    { id: "starter-luma", name: "Luma", st: { brand: "#6938ef", success: "#067647", error: "#d92d20", warning: "#c4320a", info: "#0e7090", neutral: "#545264", text: "#1d1838", card: "#ffffff", surface: "#f5f3ff", heading: "Bricolage Grotesque", body: "Figtree", scale: "1.200", radius: 4, density: 3, shadow: 2, ov: { "component.button.radius": "radius.full", "component.input.radius": "radius.xl", "component.dropdown.radius": "radius.xl" } } },
    { id: "starter-sera", name: "Sera", st: { brand: "#155b75", success: "#067647", error: "#b42318", warning: "#93370d", info: "#1849a9", neutral: "#475467", text: "#0c111d", card: "#ffffff", surface: "#eff4f7", heading: "Lexend", body: "Noto Sans", scale: "1.067", radius: 3, density: 4, shadow: 3, ov: { "component.button.radius": "radius.lg" } } },
    { id: "starter-rhea", name: "Rhea", st: { brand: "#4f6b2a", success: "#3f6212", error: "#b42318", warning: "#a15c07", info: "#505b6e", neutral: "#5a5448", text: "#23211b", card: "#fffefa", surface: "#f4f2e9", heading: "EB Garamond", body: "Work Sans", scale: "1.250", radius: 1, density: 1, shadow: 2, ov: { ...W8(HEADS, "500"), "component.badge.radius": "radius.sm" } } }
  ].map((t) => ({ ...t, v: 2, starter: true, readonly: true, builtin: false, custom: false }));
  const HIDDEN_KEY = "sh-themes-starters-hidden";
  const read = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const write = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  function loadCustom() {
    const raw = read(CUSTOM_KEY) || "[]";
    try { return JSON.parse(raw).filter((t) => t && t.id && t.v === 2).map((t) => ({ ...t, custom: true, readonly: false, builtin: false })); } catch (e) { return []; }
  }

  let custom = loadCustom();
  /* Sentara Green was the previous seeded starter; the eight starters replace it. */
  const MIGRATE_KEY = "sh-themes-starters-v1";
  if (!read(MIGRATE_KEY)) { custom = custom.filter((t) => t.id !== "sentara-green"); write(CUSTOM_KEY, JSON.stringify(custom)); write(MIGRATE_KEY, "1"); }
  let hidden = (() => { try { return JSON.parse(read(HIDDEN_KEY) || "[]"); } catch (e) { return []; } })();
  let current = read(CURRENT_KEY) || DEFAULT.id;
  let draft = null;
  let version = 0;
  let started = false;
  const SCOPE = ".sh-themed";
  const subs = new Set();
  const all = () => [DEFAULT, ...STARTERS.filter((t) => !hidden.includes(t.id)), ...custom];
  const find = (id) => all().find((t) => t.id === id);
  if (!find(current)) current = DEFAULT.id;

  const active = () => draft || find(current) || DEFAULT;
  const saved = () => find(current) || DEFAULT;
  function persist() { write(CUSTOM_KEY, JSON.stringify(custom)); write(CURRENT_KEY, current); write(HIDDEN_KEY, JSON.stringify(hidden)); }
  function emit() {
    version++;
    if (started && window.SHTheme) window.SHTheme.applyScoped(document, saved(), SCOPE);
    subs.forEach((f) => f());
  }
  const slug = (s) => (s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "theme");

  window.SHThemes = {
    DEFAULT, all, find, active, saved, SCOPE,
    /* Called by the docs app on mount; pages that only load the DS bundle are untouched. */
    /* The second emit runs after the first commit, once .sh-themed exists, so
       tables that read live values re-render with the themed ones. */
    init() { if (!started) { started = true; emit(); requestAnimationFrame(() => requestAnimationFrame(emit)); } },
    /* Live value of a CSS variable inside the themed content column. Falls back to a
       hidden probe when the column isn't mounted yet (first render, route change). */
    liveVar(name) {
      if (!name) return null;
      let el = document.querySelector(SCOPE), probe = null;
      if (!el) { probe = el = document.createElement("div"); probe.className = SCOPE.slice(1); probe.hidden = true; document.body.appendChild(probe); }
      const v = getComputedStyle(el).getPropertyValue(name).trim() || null;
      if (probe) probe.remove();
      return v;
    },
    current: () => current,
    version: () => version,
    subscribe(f) { subs.add(f); return () => subs.delete(f); },
    select(id) { if (!find(id)) return; current = id; draft = null; persist(); emit(); },
    /* Live, unsaved theme; null clears it. */
    preview(t) { draft = t || null; emit(); },
    /* Saves over `id` if it is a user theme; otherwise adds a new theme. Returns its id. */
    save(t, id) {
      const clean = { ...t, custom: true, readonly: false, builtin: false };
      if (id && custom.some((x) => x.id === id)) { clean.id = id; custom = custom.map((x) => (x.id === id ? clean : x)); }
      else { clean.id = slug(clean.name) + "-" + Date.now().toString(36); custom = [...custom, clean]; }
      current = clean.id; draft = null; persist(); emit();
      return clean.id;
    },
    hiddenStarters: () => hidden.slice(),
    restoreStarters() { hidden = []; persist(); emit(); },
    remove(id) {
      if (STARTERS.some((x) => x.id === id)) { if (!hidden.includes(id)) hidden = [...hidden, id]; }
      custom = custom.filter((x) => x.id !== id);
      if (current === id) current = DEFAULT.id;
      draft = null; persist(); emit();
    }
  };

  /* React hook: re-render when the theme list or selection changes. */
  window.SH_useThemeVersion = function () {
    const R = window.React;
    const [, bump] = R.useState(0);
    R.useEffect(() => window.SHThemes.subscribe(() => bump((n) => n + 1)), []);
    return version;
  };
  /* Themed value helpers for docs tables. Return null on the default theme. */
  function toHex(v) {
    if (!v) return null;
    if (/^#[0-9a-f]{3,8}$/i.test(v)) return v.toUpperCase();
    const m = v.match(/^rgba?\(([^)]+)\)$/i);
    if (!m) return v;
    const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
    const hex = "#" + p.slice(0, 3).map((n) => Math.round(n).toString(16).padStart(2, "0")).join("").toUpperCase();
    return p.length > 3 && p[3] < 1 ? v : hex;
  }
  const st2 = () => (!saved().builtin && saved().v === 2 ? { ...window.SHTheme.V2.DEFAULTS, ...saved().st } : null);
  const kOf = (key) => { const s = st2(); return s ? window.SHTheme.V2.OPTS[key][s[key]].k : 1; };
  window.SH_themed = {
    isDefault: () => !!saved().builtin,
    color: (cssVar) => (saved().builtin || !cssVar ? null : toHex(window.SHThemes.liveVar(cssVar))),
    font: () => (st2() && st2().body) || "Inter",
    headingFont: () => (st2() && st2().heading) || "Inter",
    /* Resolved type style for a style.* token on the saved theme: { family, size, line, weight }. Null on the default theme. */
    type: (tok) => {
      const s = st2(); if (!s || !tok) return null;
      const V = window.SHTheme.V2, tv = V.flat(V.derive(s)), g = (p) => tv[tok + "." + p];
      if (g("fontSize") == null) return null;
      return { family: g("fontFamily"), size: parseInt(g("fontSize"), 10), line: parseInt(g("lineHeight"), 10), weight: +g("fontWeight") };
    },
    spacing: (px) => Math.round(px * kOf("density")),
    radius: (px) => Math.round(px * kOf("radius"))
  };
})();
