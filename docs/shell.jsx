/* Sample Health docs — application shell: sidebar, hash routing, content
   renderer, prev/next pager and the "On this page" TOC with scrollspy. */
(function () {
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const h = React.createElement;
  const SH = window.SH;
  const UI = window.UntitledUIPRODesignSystem_380e88 || {};
  const NAV = window.SH_NAV || [];
  const LOGO = "assets/logo.png";

  const flat = NAV.flatMap((g) => g.items.map((it) => ({ ...it, group: g.group })));
  const bySlug = (s) => flat.find((i) => i.slug === s);
  /* Home is the first docs route, and stays the top bar's selected item for the
     whole docs mode — Playground is the only other place you can be. */
  const HOME = (flat[0] && flat[0].slug) || "tokens-color";
  /* Retired slugs that still exist in the wild. */
  const ALIAS = { calendars: "date-pickers" };

  function routeSlug() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    if (raw === "playground") return "playground";
    const m = ALIAS[raw] || raw;
    return m && bySlug(m) ? m : (flat[0] && flat[0].slug);
  }
  function go(slug) { location.hash = "#/" + slug; }
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top, behavior: "smooth" });
  }

  /* ---------------- Sidebar ---------------- */
  const FOLD_KEY = "sh-docs-nav-collapsed";
  function readCollapsed() {
    try { const v = JSON.parse(localStorage.getItem(FOLD_KEY)); return v && typeof v === "object" ? v : {}; } catch (e) { return {}; }
  }
  /* Chrome icon: chevrons folding inward (collapse) or outward (expand). */
  function FoldIcon(props) {
    const inward = props.dir === "in";
    return h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
      h("path", { d: "M4 12h16", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }),
      h("path", { d: inward ? "M8 5l4 4 4-4" : "M8 8l4-4 4 4", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }),
      h("path", { d: inward ? "M8 19l4-4 4 4" : "M8 16l4 4 4-4", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  function Sidebar(props) {
    const q = props.query.trim().toLowerCase();
    const [collapsed, setCollapsed] = React.useState(readCollapsed);
    React.useEffect(() => {
      try { localStorage.setItem(FOLD_KEY, JSON.stringify(collapsed)); } catch (e) {}
    }, [collapsed]);
    const toggle = (g) => setCollapsed((c) => ({ ...c, [g]: !c[g] }));
    const anyOpen = NAV.some((g) => !collapsed[g.group]);
    const toggleAll = () => setCollapsed(anyOpen
      ? NAV.reduce((acc, g) => { acc[g.group] = true; return acc; }, {})
      : {});
    return h("aside", { className: "sh-sidebar" },
      h("div", { className: "sh-themepick" },
        window.SH_ThemePicker ? h(window.SH_ThemePicker) : null),
      h("div", { className: "sh-panel-rule" }),
      h("div", { className: "sh-search-wrap" },
        h("div", { className: "sh-search" },
          h(UI.SearchInput, { size: "sm", placeholder: "Search components", value: props.query,
            iconLeading: h(UI.Icon, { name: "SearchMd", size: 20 }),
            onChange: (e) => props.setQuery(e && e.target ? e.target.value : e) })),
        q ? null : h("button", { type: "button", className: "sh-icon-btn", onClick: toggleAll,
          title: anyOpen ? "Collapse all sections" : "Expand all sections",
          "aria-label": anyOpen ? "Collapse all sections" : "Expand all sections" },
          h(FoldIcon, { dir: anyOpen ? "in" : "out" }))),
      h("nav", { className: "sh-nav" },
        NAV.map((grp) => {
          const items = grp.items.filter((it) => !q || it.title.toLowerCase().includes(q));
          if (!items.length) return null;
          const isOpen = q ? true : !collapsed[grp.group];
          return h("div", { className: "sh-navgroup" + (isOpen ? "" : " is-collapsed"), key: grp.group },
            h("button", { className: "sh-navgroup-label", type: "button",
              "aria-expanded": isOpen, onClick: () => toggle(grp.group) },
              h("span", null, grp.group),
              h(SH.Chevron, { dir: isOpen ? "up" : "down", size: 18 })),
            isOpen ? items.map((it) =>
              h("a", { key: it.slug, href: "#/" + it.slug,
                className: "sh-navlink" + (it.slug === props.current ? " is-active" : ""),
                onClick: () => props.onNavigate && props.onNavigate() },
                h("span", null, it.title))) : null);
        }),
        (q && !flat.some((it) => it.title.toLowerCase().includes(q)))
          ? h("div", { className: "sh-nav-empty" }, "No components match \u201c" + props.query + "\u201d.")
          : null));
  }

  /* ---------------- TOC ---------------- */
  function Toc(props) {
    const [active, setActive] = React.useState(props.entries[0] && props.entries[0].id);
    React.useEffect(() => {
      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          let cur = props.entries[0] && props.entries[0].id;
          for (const e of props.entries) {
            const el = document.getElementById(e.id);
            if (el && el.getBoundingClientRect().top <= 120) cur = e.id;
          }
          setActive(cur);
        });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }, [props.entries]);
    if (!props.entries.length) return h("div", { className: "sh-toc" });
    return h("div", { className: "sh-toc" },
      h("div", { className: "sh-toc-label" }, "On this page"),
      h("ul", { className: "sh-toc-list" },
        props.entries.map((e) =>
          h("li", { key: e.id },
            h("a", { href: "#" + e.id, className: (e.sub ? "sub " : "") + (active === e.id ? "is-active" : ""),
              onClick: (ev) => { ev.preventDefault(); scrollToId(e.id); } }, e.title)))));
  }

  /* ---------------- Content ---------------- */
  function Crumbs(props) {
    return h("div", { className: "sh-crumbs" },
      h("span", null, props.group),
      h(SH.Chevron, { dir: "right", size: 16 }),
      h("span", null, "Components"),
      h(SH.Chevron, { dir: "right", size: 16 }),
      h("span", { className: "sh-crumb-cur" }, props.title));
  }

  function Section(props) {
    const s = props.section;
    if (s.split) {
      return h("section", { className: "sh-section sh-split", id: s.id },
        h("div", { className: "sh-split-info" },
          h("h2", { className: "sh-h2", id: s.id + "-h" },
            s.title,
            h("a", { className: "sh-anchor", href: "#" + s.id, onClick: (e) => { e.preventDefault(); scrollToId(s.id); }, "aria-label": "Link to section" }, "#")),
          (s.prose || []).map((p, i) => h("p", { className: "sh-prose", key: i, dangerouslySetInnerHTML: { __html: p } }))),
        h("div", { className: "sh-split-body" },
          h(SH.Boundary, { label: s.id }, s.render ? s.render(SH) : null)));
    }
    return h("section", { className: "sh-section", id: s.id },
      s.title ? h("h2", { className: "sh-h2", id: s.id + "-h" },
        s.title,
        h("a", { className: "sh-anchor", href: "#" + s.id, onClick: (e) => { e.preventDefault(); scrollToId(s.id); }, "aria-label": "Link to section" }, "#")) : null,
      (s.prose || []).map((p, i) => h("p", { className: "sh-prose", key: i, dangerouslySetInnerHTML: { __html: p } })),
      h(SH.Boundary, { label: s.id }, s.render ? s.render(SH) : null));
  }

  function Pager(props) {
    const idx = flat.findIndex((i) => i.slug === props.current);
    const prev = flat[idx - 1], next = flat[idx + 1];
    return h("div", { className: "sh-pager" },
      prev ? h("a", { className: "sh-pager-card", href: "#/" + prev.slug },
        h("span", { className: "sh-pager-dir" }, "\u2190 Previous"),
        h("span", { className: "sh-pager-name" }, prev.title)) : h("span", null),
      next ? h("a", { className: "sh-pager-card next", href: "#/" + next.slug },
        h("span", { className: "sh-pager-dir" }, "Next \u2192"),
        h("span", { className: "sh-pager-name" }, next.title)) : h("span", null));
  }

  function PageView(props) {
    const item = props.item;
    const page = SH.pages[item.slug];
    React.useEffect(() => { window.scrollTo(0, 0); }, [item.slug]);
    if (!page) {
      return h("div", { className: "sh-content" },
        h(Crumbs, { group: item.group, title: item.title }),
        h("h1", { className: "sh-h1" }, item.title),
        h("p", { className: "sh-lead" }, "This page is being prepared."));
    }
    const tocEntries = [];
    (page.sections || []).forEach((s) => { if (s.title) tocEntries.push({ id: s.id, title: s.title }); });
    /* A one-entry rail says nothing the h1 doesn't — let the content fill the page. */
    const showToc = tocEntries.length > 1;

    return h(React.Fragment, null,
      h("div", { className: "sh-content" + (page.wide ? " sh-content-wide" : "") + (showToc ? "" : " sh-content-full") },
        h("h1", { className: "sh-h1" }, item.title),
        page.lead ? h("p", { className: "sh-lead" }, page.lead) : null,
        page.meta && page.meta.length ? h("div", { className: "sh-meta" },
          page.meta.map((m, i) => h("a", { className: "sh-meta-link", key: i, href: m.href || "#", target: m.href ? "_blank" : null, rel: "noreferrer" },
            m.label))) : null,
        (page.sections || []).map((s) => h(Section, { key: s.id, section: s })),
        h(Pager, { current: item.slug })),
      showToc ? h(Toc, { entries: tocEntries, key: item.slug }) : null);
  }

  /* ---------------- Top bar ---------------- */
  const THEME_KEY = "sh-docs-theme";
  const PANEL_KEY = "sh-docs-panel";
  function readTheme() {
    try { return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light"; } catch (e) { return "light"; }
  }
  function readPanel() {
    try { return localStorage.getItem(PANEL_KEY) !== "0"; } catch (e) { return true; }
  }
  function PanelIcon(props) {
    return h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
      h("rect", { x: 3, y: 4.5, width: 18, height: 15, rx: 2.5, stroke: "currentColor", strokeWidth: 1.8 }),
      h("path", { d: "M9.5 4.5v15", stroke: "currentColor", strokeWidth: 1.8 }),
      h("path", { d: props.open ? "M17 8.4v7.2L13 12z" : "M14 8.4v7.2L18 12z", fill: "currentColor" }));
  }
  function ThemeIcon(props) {
    return props.theme === "dark"
      ? h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
          h("path", { d: "M20 14.5A8.2 8.2 0 019.5 4a8.5 8.5 0 1010.5 10.5z", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "round" }))
      : h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" },
          h("circle", { cx: 12, cy: 12, r: 4, stroke: "currentColor", strokeWidth: 1.8 }),
          h("path", { d: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4",
            stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }));
  }
  function TopBar(props) {
    const nextTheme = props.theme === "dark" ? "light" : "dark";
    return h("header", { className: "sh-topbar" },
      h("button", { type: "button", className: "sh-icon-btn", onClick: props.onTogglePanel,
        "aria-expanded": props.panelOpen, "aria-label": (props.panelOpen ? "Hide" : "Show") + " navigation panel",
        title: (props.panelOpen ? "Hide" : "Show") + " navigation panel" },
        h(PanelIcon, { open: props.panelOpen })),
      h("nav", { className: "sh-topnav", "aria-label": "Primary" },
        h("a", { className: "sh-topnav-item" + (props.playground ? "" : " is-active"),
          "aria-current": props.playground ? null : "page", href: "#/" + HOME }, "Home"),
        h("a", { className: "sh-topnav-item" + (props.playground ? " is-active" : ""),
          "aria-current": props.playground ? "page" : null, href: "#/playground" }, "Playground")));
  }

  function Playground(props) {
    return window.SH_Playground ? h(window.SH_Playground, props) : null;
  }

  /* ---------------- App ---------------- */
  function App() {
    const [slug, setSlug] = React.useState(routeSlug());
    const [query, setQuery] = React.useState("");
    const [panelOpen, setPanelOpen] = React.useState(() => window.innerWidth > 900 && readPanel());
    const [theme, setTheme] = React.useState(readTheme);
    React.useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    }, [theme]);
    React.useEffect(() => {
      if (window.innerWidth > 900) { try { localStorage.setItem(PANEL_KEY, panelOpen ? "1" : "0"); } catch (e) {} }
    }, [panelOpen]);
    React.useEffect(() => {
      const on = () => { setSlug(routeSlug()); if (window.innerWidth <= 900) setPanelOpen(false); };
      window.addEventListener("hashchange", on);
      if (!location.hash) go(HOME);
      return () => window.removeEventListener("hashchange", on);
    }, []);
    const playground = slug === "playground";
    const item = bySlug(slug) || flat[0];
    return h("div", { className: "sh-app" + (panelOpen && !playground ? " panel-open" : "") },
      h(TopBar, { theme: theme, playground: playground, panelOpen: panelOpen,
        onToggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
        onTogglePanel: () => setPanelOpen((v) => !v) }),
      h("div", { className: "sh-body" },
        h("div", { className: "sh-scrim", onClick: () => setPanelOpen(false) }),
        playground ? null : h(Sidebar, { current: item.slug, query: query, setQuery: setQuery,
          onNavigate: () => { if (window.innerWidth <= 900) setPanelOpen(false); } }),
        playground || !panelOpen ? null : h("div", { className: "sh-resizer-rail" },
          h("div", { className: "sh-resizer", role: "separator", "aria-orientation": "vertical", "aria-label": "Resize sidebar", tabIndex: 0, "data-resize": "sh-sidebar" })),
        h("main", { className: "sh-main" + (playground ? "" : " " + window.SHThemes.SCOPE.slice(1)) },
          playground
            ? h(Playground, { panelOpen: panelOpen })
            : h("div", { className: "sh-main-inner" }, h(PageView, { item: item, key: item.slug })))));
  }

  window.SH_mount = function () {
    if (window.SHThemes) window.SHThemes.init();
    ReactDOM.createRoot(document.getElementById("root")).render(h(App));
  };
})();
