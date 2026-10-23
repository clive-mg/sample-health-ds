/* Sample Health docs — Navigation. Two families: the horizontal TopNav and the
   vertical shell (TopNav + SidebarNav), with a shared utility bar. Each family
   opens with an annotated token map, then splits into the choices a consumer
   actually makes: theme, layers, actions, list structure, breakpoint. */
(function () {
  const SH = window.SH;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { TopNav, SidebarNav, NavUtilityBar } = SH.ui;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const C = {
    surface: ["color.surface.default", "var(--colors-background-bg-primary)"],
    canvas: ["color.surface.canvas", "var(--colors-background-bg-secondary)"],
    hover: ["color.surface.hover", "var(--colors-background-bg-primary-hover)"],
    active: ["color.surface.active", "var(--colors-background-bg-active)"],
    selected: ["color.surface.selected", "var(--colors-background-bg-brand-primary)"],
    inverse: ["color.surface.inverse", "var(--colors-background-bg-primary-solid)"],
    primary: ["color.surface.primary", "var(--colors-background-bg-brand-solid)"],
    p700: ["color.primary.700", "var(--colors-brand-700)"],
    p800: ["color.primary.800", "var(--colors-brand-800)"],
    n700: ["color.neutral.700", "var(--colors-gray-light-mode-700)"],
    n800: ["color.neutral.800", "var(--colors-gray-light-mode-800)"],
    n900: ["color.neutral.900", "var(--colors-gray-light-mode-900)"],
    n300: ["color.neutral.300", "var(--colors-gray-light-mode-300)"],
    n400: ["color.neutral.400", "var(--colors-gray-light-mode-400)"],
    n600: ["color.neutral.600", "var(--colors-gray-light-mode-600)"],
    p300: ["color.primary.300", "var(--colors-brand-300)"],
    rule: ["color.border.subtle", "var(--colors-border-border-secondary)"],
    frame: ["color.border.default", "var(--colors-border-border-primary)"],
    label: ["color.text.secondary", "var(--colors-text-text-secondary-700)"],
    muted: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    onBrand: ["color.text.on.brand", "var(--colors-text-text-primary-on-brand)"],
    inverseText: ["color.text.inverse", "var(--colors-text-text-white)"],
    iconOn: ["color.primary.600", "var(--colors-brand-600)"],
    ring: ["color.primary.100", "var(--colors-brand-100)"]
  };
  const col = (k, anchors, note) => tc(C[k][0], C[k][1], anchors, note);

  /* ---------------- demo content ---------------- */
  const CARE = [{ label: "Find a doctor", icon: "SearchLg" }, { label: "Urgent care", icon: "Map01" }, { label: "Virtual visit", icon: "MessageCircle01" }];
  const RX = [{ label: "Find a pharmacy", icon: "Map01" }, { label: "Price a drug", icon: "CreditCard01" }, { label: "Mail order", icon: "Package" }];
  const ITEMS = [{ label: "Coverage" }, { label: "Claims" }, { label: "Find care", children: CARE }, { label: "Pharmacy", children: RX }, { label: "Documents" }];
  const SHORT = [{ label: "Coverage" }, { label: "Claims" }, { label: "Find care", children: CARE }];

  const UTIL_IN = {
    left: [{ label: "United States - EN", icon: "Globe01", menu: true }],
    right: [
      { label: "1-800-123-4567 (TTY: 711)", icon: "Phone01" },
      { label: "support@sampleHealth.com", icon: "Mail01", href: "#" },
      { label: "Help Center", icon: "HelpCircle", href: "#" }
    ]
  };
  const ACCOUNT = {
    name: "Olivia Rhye", email: "olivia@samplehealth.com", initials: "OR",
    menu: [{ label: "View profile", icon: "User01" }, { label: "Account settings", icon: "Settings01" }, { label: "Sign out", icon: "LogOut01" }]
  };

  const FLAT = [
    { label: "Overview", icon: "Home01" }, { label: "Coverage", icon: "Shield01" },
    { label: "Claims", icon: "File02" }, { label: "Find care", icon: "Map01" },
    { label: "Pharmacy", icon: "Package" }, { label: "Documents", icon: "Folder" }
  ];
  const COUNTED = [
    { label: "Overview", icon: "Home01" }, { label: "Coverage", icon: "Shield01" },
    { label: "Claims", icon: "File02", badge: 3 }, { label: "Messages", icon: "MessageCircle01", badge: 12 },
    { label: "Pharmacy", icon: "Package" }, { label: "Documents", icon: "Folder" }
  ];
  const GROUPED = [
    { label: "My plan", items: [{ label: "Overview", icon: "Home01" }, { label: "Coverage", icon: "Shield01" }, { label: "Claims", icon: "File02", badge: 3 }] },
    { label: "Care", items: [{ label: "Find care", icon: "Map01" }, { label: "Pharmacy", icon: "Package" }, { label: "Messages", icon: "MessageCircle01", badge: 12 }] },
    { label: "Records", items: [{ label: "Documents", icon: "Folder" }, { label: "Billing", icon: "CreditCard01" }] }
  ];
  const SIDE_TREE = [
    { label: "My plan", items: [
      { label: "Overview", icon: "Home01" }, { label: "Coverage", icon: "Shield01" },
      { label: "Claims", icon: "File02", badge: 3, children: [{ label: "Open", badge: 3 }, { label: "Processed" }, { label: "Appeals" }] }
    ] },
    { label: "Care", items: [
      { label: "Find care", icon: "Map01" },
      { label: "Pharmacy", icon: "Package", children: [{ label: "Find a pharmacy" }, { label: "Price a drug" }, { label: "Mail order" }] },
      { label: "Messages", icon: "MessageCircle01", badge: 12 }
    ] },
    { label: "Records", items: [{ label: "Documents", icon: "Folder" }, { label: "Billing", icon: "CreditCard01" }] }
  ];
  const V_LISTS = [{ id: "plain", label: "Plain" }, { id: "grouped", label: "Grouped" }, { id: "tree", label: "Collapsible" }];
  const V_VIEWS = [{ id: "desktop", label: "Desktop", icon: "Monitor01" }, { id: "tablet", label: "Tablet", icon: "Tablet01" }, { id: "mobile", label: "Mobile", icon: "Phone01" }];
  const V_DATA = { plain: FLAT, grouped: GROUPED, tree: SIDE_TREE };
  const V_W = { desktop: null, tablet: 900, mobile: 390 };

  /* ---------------- frames ---------------- */
  /* Horizontal frames hug the bar and do not clip: the item dropdown and the account
     popover both escape downward, so a rounded, overflow-hidden frame would cut them
     off. Vertical frames keep the rounded canvas — a full-height rail needs a page to
     sit against, and its menus open inside that frame. */
  const page = (children, h, row, scroll) => (
    <div style={{
      display: "flex", flexDirection: row ? "row" : "column",
      minHeight: row ? h || 260 : undefined,
      background: row ? "var(--colors-background-bg-secondary)" : "transparent",
      borderRadius: row ? 12 : 0, boxSizing: "border-box",
      border: "1px solid var(--colors-border-border-primary)",
      overflowX: scroll ? "auto" : row ? "hidden" : "visible",
      overflowY: row ? "hidden" : "visible"
    }}>{children}</div>
  );
  const Stack = (props) => (
    <Preview className="align-stretch pad-tm">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {props.groups.map((g) => (
          <div key={g.id}>
            <div style={{ marginBottom: 8 }}><SH.StateMark>{g.label}</SH.StateMark></div>
            {g.el}
          </div>
        ))}
      </div>
    </Preview>
  );
  /* Segmented control and on/off chip row, shared by the two horizontal sections. */
  const Seg = (props) => (
    <div className="sh-tm-sizes">
      <span className="sh-tm-lab">{props.label}</span>
      <div className={"sh-tm-seg" + (props.icons ? " is-icons" : "")}>{props.options.map((o) =>
        <button key={o.id} type="button" className={o.id === props.value ? "is-on" : ""}
          aria-label={props.icons ? o.label : undefined} title={props.icons ? o.label : undefined}
          onClick={() => props.onChange(o.id)}>
          {props.icons ? <Icon name={o.icon} size={20} aria-hidden="true" /> : o.label}
        </button>)}</div>
    </div>
  );
  const Flags = (props) => (
    <div className="sh-tm-sizes">
      <span className="sh-tm-lab">{props.label}</span>
      <div className="sh-tm-chipset">{props.options.map((o) =>
        <button key={o.id} type="button" className={props.value[o.id] ? "is-on" : ""}
          aria-pressed={!!props.value[o.id]}
          onClick={() => props.onChange(o.id)}>{o.label}</button>)}</div>
    </div>
  );
  const THEMES = [{ id: "light", label: "Light" }, { id: "brand", label: "Brand" }];
  const FEATURES = [
    { id: "utility", label: "Utility strip" }, { id: "search", label: "Search" },
    { id: "cta", label: "Call to action" }, { id: "actions", label: "Icon actions" }
  ];
  const VIEWS = [{ id: "desktop", label: "Desktop", icon: "Monitor01" }, { id: "mobile", label: "Mobile", icon: "Phone01" }];

  const Map1 = (props) => (
    <Preview className="align-stretch canvas pad-tm">
      <div className={props.wide ? "sh-tm-table" : undefined}>
        <div className="sh-tm-set">
          <div className="sh-tm-group">
            <div className="sh-tm-head"><SH.StateMark>{props.label || "Structure"}</SH.StateMark></div>
            <SH.TokenMap sig={props.sig} rows={props.rows} specimen={props.specimen} />
          </div>
        </div>
      </div>
    </Preview>
  );

  /* ---------------- token rows ---------------- */
  /* Only the colour rows differ by theme, and they differ substantially: light draws
     from the semantic layer, brand from the primary ramp. The anatomy diagram therefore
     rebuilds its rows from the selected theme rather than naming light's tokens under both. */
  const BAR_COL = {
    light: { surface: "surface", fillOn: "selected", hairline: "rule", label: "label", labelOn: "label" },
    brand: { surface: "primary", fillOn: "p800", hairline: "p700", label: "inverseText", labelOn: "inverseText" }
  };
  const RING = { light: "ring", brand: "p300" };
  const barRowsFor = (th) => {
    const k = BAR_COL[th];
    return [
      tv("spacing.4xl", "Page inset \u00b7 left & right \u00b7 32px", [at("bar", "left", .5)]),
      tv("spacing.lg", "Bar padding \u00b7 top & bottom \u00b7 12px", [at("bar", "top", .28)]),
      tv("Bar height", "64px \u00b7 padding + 40px content row", [at("bar", "right", .5)]),
      tv("spacing.4xl", "Logo \u2192 nav \u00b7 32px", [at("logo", "right", .5)]),
      tv("spacing.xs", "Gap between items \u00b7 4px", [at("item", "right", .5)]),
      tv("spacing.md / lg", "Item padding \u00b7 8px / 12px", [at("item", "top", .3)]),
      tv("radius.md", "Item \u00b7 8px", [at("item-on", "bottom", .12)]),
      col(k.surface, [at("bar", "bottom", .55)]),
      col(k.fillOn, [at("item-on", "bottom", .5)], th === "light" ? undefined : "Ramp step: the semantic selected surface would vanish on this bar."),
      col(k.hairline, [at("bar", "bottom", .95)]),
      col(k.label, [at("item", "bottom", .8)]),
      ...(k.label === k.labelOn ? [] : [col(k.labelOn, [at("item-on", "top", .82)], "Current label steps to white.")]),
      tv("style.body.md.regular", "Rest label \u00b7 Inter 14/20 \u00b7 400", [at("item", "left", .5)]),
      tv("style.body.md.bold", "Current label \u00b7 Inter 14/20 \u00b7 600", [at("item-on", "top", .5)])
    ];
  };
  const UTIL_COL = {
    light: { surface: "canvas", text: "muted" },
    brand: { surface: "p800", text: "inverseText" }
  };
  const utilRowsFor = (th) => {
    const k = UTIL_COL[th];
    return [
      tv("spacing.md", "Strip padding \u00b7 top & bottom \u00b7 8px", [at("utility", "top", .3)]),
      tv("Strip height", "34px \u00b7 padding + line height", [at("utility", "right", .5)]),
      tv("spacing.lg", "Gap between links \u00b7 12px", [at("util-divider", "top", .5)]),
      tv("Divider", "1px \u00d7 16px between links", [at("util-divider", "bottom", .5)]),
      th === "light"
        ? col("n300", [at("util-divider", "left", .5)])
        : tv("Divider colour", "White \u2014 neutral 300 is invisible on a saturated surface", [at("util-divider", "left", .5)]),
      col(k.surface, [at("utility", "bottom", .6)], th === "light" ? undefined : "One step off the bar beneath it, so the two rows read apart."),
      col(k.text, [at("util-item", "bottom", .8)]),
      tv("style.body.sm.regular", "Inter 12/18 \u00b7 500", [at("util-item", "left", .5)])
    ];
  };
  const sideRows = [
    tv("Panel width", "280px \u00b7 64px collapsed", [at("panel", "bottom", .5)]),
    tv("spacing.xl", "Panel padding \u00b7 all sides \u00b7 16px", [at("group-label", "top", .5)]),
    tv("spacing.3xl", "Gap between groups \u00b7 24px", [at("list", "right", .55)]),
    tv("spacing.lg", "Icon \u2192 label \u00b7 12px", [at("icon", "right", .5)]),
    tv("Row height", "36px \u00b7 8px padding + 20px line", [at("item-on", "right", .5)]),
    tv("radius.md", "Row \u00b7 8px", [at("item-on", "left", .12)]),
    tv("radius.full", "Count chip \u00b7 9999px", [at("badge", "bottom", .12)]),
    col("surface", [at("panel", "right", .42)]),
    col("selected", [at("item-on", "bottom", .5)]),
    col("iconOn", [at("icon-on", "left", .5)]),
    col("label", [at("item", "left", .5)]),
    col("rule", [at("panel", "right", .8)]),
    tv("style.overline", "Group title \u00b7 Inter 12/18 \u00b7 700 \u00b7 uppercase +6%", [at("group-label", "right", .5)]),
    tv("style.body.md.regular", "Rest label \u00b7 Inter 14/20 \u00b7 400", [at("item", "bottom", .85)]),
    tv("style.body.md.bold", "Current label \u00b7 Inter 14/20 \u00b7 600", [at("item-on", "top", .5)])
  ];

  /* ---------------- specimens ---------------- */
  const sideSpec = page(<SidebarNav groups={GROUPED} current="Claims" viewport="desktop" />, 520, true, true);
  /* One live bar, driven by the section's own toggles. Every horizontal variant this
     page used to show as its own stack is a position of these three controls — including
     the small-screen form, which is the same component with `compact` set. */
  const HBar = () => {
    const [theme, setTheme] = React.useState("light");
    const [view, setView] = React.useState("desktop");
    const [on, setOn] = React.useState({ utility: false, search: true, cta: false, actions: true });
    const flip = (k) => setOn((s) => ({ ...s, [k]: !s[k] }));
    const mobile = view === "mobile";
    const nav = <TopNav theme={theme} items={ITEMS} current="Claims" account={ACCOUNT}
      compact={mobile} search={on.search} actions={on.actions}
      cta={on.cta ? { label: "Add a dependent", icon: "Plus" } : undefined}
      utility={on.utility ? UTIL_IN : undefined} />;
    return <Preview className="align-stretch pad-tm">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <Seg label="View" options={VIEWS} value={view} onChange={setView} icons />
          <Seg label="Theme" options={THEMES} value={theme} onChange={setTheme} />
          <Flags label="Layers" options={FEATURES} value={on} onChange={flip} />
        </div>
        {mobile
          ? <div style={{
            width: 390, borderRadius: 12, overflow: "hidden", boxSizing: "border-box",
            border: "1px solid var(--colors-border-border-primary)",
            background: "var(--colors-background-bg-secondary)", minHeight: 420
          }}>{nav}</div>
          : page(nav, 200)}
      </div>
    </Preview>;
  };

  /* The anatomy map follows the same idea: pick the part, read its rows. */
  const H_PARTS = [{ id: "bar", label: "Primary bar" }, { id: "util", label: "Utility strip" }];
  const HAnatomy = () => {
    const [part, setPart] = React.useState("bar");
    const [theme, setTheme] = React.useState("light");
    const bar = part === "bar";
    const nav = bar
      ? <TopNav theme={theme} items={SHORT} current="Claims" actions account={ACCOUNT} inset={32} />
      : <TopNav theme={theme} items={SHORT} current="Claims" utility={UTIL_IN} account={ACCOUNT} inset={32} />;
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-table">
        <div className="sh-tm-set">
          <div className="sh-tm-group">
            <div className="sh-tm-head">
              <SH.StateMark>{bar ? "Primary bar" : "Utility strip"}</SH.StateMark>
              <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <Seg label="Part" options={H_PARTS} value={part} onChange={setPart} />
                <Seg label="Theme" options={THEMES} value={theme} onChange={setTheme} />
              </div>
            </div>
            <SH.TokenMap sig={"nav/h/" + part + "/" + theme} rows={bar ? barRowsFor(theme) : utilRowsFor(theme)}
              specimen={page(nav, bar ? 180 : 200)} />
          </div>
        </div>
      </div>
    </Preview>;
  };

  /* The shell: one toggle in the bar drives one `open` boolean the sidebar reads.
     `pref` is the user's override — null means "whatever the breakpoint would do" —
     which is the whole of the wiring a consuming app has to write. */
  /* Same mark as the docs shell's own panel toggle: the chevron points the way the
     panel will move \u2014 inward to collapse, outward to expand. Mobile has no rail to
     collapse to, so it takes the hamburger and its close cross instead. */
  const PanelMark = ({ open, mobile }) => (mobile
    ? <Icon name={open ? "XClose" : "Menu01"} size={24} aria-hidden="true" />
    : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8"></rect>
      <path d="M9.5 4.5v15" stroke="currentColor" strokeWidth="1.8"></path>
      <path d={open ? "M17 8.4v7.2L13 12z" : "M14 8.4v7.2L18 12z"} fill="currentColor"></path>
    </svg>
  );
  const VToggle = ({ theme, open, mobile, onClick }) => (
    <button type="button" aria-label={open ? (mobile ? "Close menu" : "Collapse navigation") : (mobile ? "Open menu" : "Expand navigation")}
      aria-expanded={open} onClick={onClick} style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40,
        border: "none", borderRadius: "var(--radius-md-px)", background: "transparent", cursor: "pointer",
        color: theme === "brand" ? "var(--colors-brand-100)" : "var(--colors-foreground-fg-quaternary-500)"
      }}><PanelMark open={open} mobile={mobile} /></button>
  );
  const shellFrame = (children, w) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{
        display: "flex", flexDirection: "column", width: w || "100%", minHeight: 520, boxSizing: "border-box",
        borderRadius: 12, overflow: "hidden", border: "1px solid var(--colors-border-border-primary)",
        background: "var(--colors-background-bg-secondary)"
      }}>{children}</div>
    </div>
  );
  const VShell = () => {
    const [theme, setTheme] = React.useState("light");
    const [list, setList] = React.useState("grouped");
    const [view, setView] = React.useState("desktop");
    const [current, setCurrent] = React.useState("Claims");
    const [pref, setPref] = React.useState(null);
    React.useEffect(() => { setPref(null); }, [view]);
    const open = pref == null ? view === "desktop" : pref;
    const data = V_DATA[list];
    return <Preview className="align-stretch pad-tm">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <Seg label="View" options={V_VIEWS} value={view} onChange={setView} icons />
          <Seg label="List" options={V_LISTS} value={list} onChange={setList} />
          <Seg label="Theme" options={THEMES} value={theme} onChange={setTheme} />
        </div>
        {shellFrame(<>
          <TopNav theme={theme} items={[]} search actions inset={16} logoHeight={28}
            compact={view === "mobile"} account={ACCOUNT}
            leading={<VToggle theme={theme} open={open} mobile={view === "mobile"} onClick={() => setPref(!open)} />} />
          <div style={{ position: "relative", display: "flex", flex: 1, minHeight: 0, overflow: "hidden" }}>
            <SidebarNav theme={theme} viewport={view} open={open} onClose={() => setPref(false)}
              {...(list === "plain" ? { items: data } : { groups: data })}
              current={current} onSelect={setCurrent} expanded={["Pharmacy"]} />
            <main style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 24, lineHeight: "28px", fontWeight: 600, color: "var(--colors-text-text-tertiary-600)" }}>{current}</span>
            </main>
          </div>
        </>, V_W[view])}
      </div>
    </Preview>;
  };


  /* ---------------- page ---------------- */
  SH.registerPage("navigation", {
    h1: "Navigation",
    lead: "Two families, one vocabulary. TopNav runs the product across the top of the page; SidebarNav runs the destinations down the left, and a vertical product uses both \u2014 the bar carries the logo, the search, the user and the toggle that collapses the sidebar. Both take the same two themes, mark the current destination the same way, and pair with NavUtilityBar \u2014 the thin secondary strip that carries locale, contact routes and help. Horizontal suits up to about seven top-level destinations; vertical suits deeper lists, group headers and counted rows. Hover any token chip \u2014 or any part of a specimen \u2014 to trace where the token lands.",
    sections: [
      {
        id: "horizontal", title: "Horizontal navigation",
        prose: [],
        render: () => <HBar />
      },
      {
        id: "h-anatomy", title: "Anatomy",
        prose: [],
        render: () => <HAnatomy />
      },

      {
        id: "v-shell", title: "Vertical navigation",
        prose: [],
        render: () => <VShell />
      },
      {
        id: "vertical", title: "Anatomy",
        prose: ["280px wide, 16px of padding on all four sides, so rows sit inset from the panel edge \u2014 and the list from the first row down, nothing above it. Rows stack flush, 36px each \u2014 8px of block padding on a 20px line \u2014 with a 20px icon 12px ahead of the label and a count chip pinned right. Groups sit 24px apart under a 12/18 uppercase title. Collapsed, everything holds except the label."],
        render: () => <Map1 wide sig="nav/side" rows={sideRows} specimen={sideSpec} />
      },
    ],
    faqs: [
      { q: "Which component do I reach for?", a: "<code>TopNav</code> for the bar across the top, <code>SidebarNav</code> for the column down the left, and <code>NavUtilityBar</code> for the secondary strip \u2014 though <code>TopNav</code> renders that for you when you pass <code>utility</code>. A vertical product needs the first two together: neither is a whole shell on its own." },
      { q: "How do I mark the current page?", a: "Pass <code>current</code> the label of the active destination. The component sets <code>aria-current=\"page\"</code>, the active surface and the semibold weight from that one prop \u2014 there is no separate active flag per item." },
      { q: "Does the brand theme follow dark mode?", a: "No, and that is deliberate. Only the light theme is built from semantic tokens; brand sits on <code>color.surface.primary</code> with fills from the primary ramp, which is declared once and does not flip. A brand bar stays brand when the page around it changes." },
      { q: "Why is the sub-nav row not built from Tabs?", a: "Because it is chrome, not content. <code>Tabs</code> switches views inside a page and is styled for the light canvas; the sub-nav row is themed with the bar it hangs from, so it goes dark when the bar does. Use <code>Tabs</code> inside the page, this row above it." },
      { q: "What happens to labels in the collapsed rail?", a: "They are hidden, not dropped. Every row keeps its <code>label</code> as an <code>aria-label</code> and a tooltip on hover and on keyboard focus, so screen readers read the same list either way. Rows without an <code>icon</code> cannot appear in the rail \u2014 give every top-level row one." },
      { q: "Can I put a destination in the utility strip?", a: "No. The strip is for locale, contact routes, help and auth \u2014 things that are the same on every page. It is set in tertiary text at 36px precisely so it does not compete with the destination list; a page that lives there will not be found." },
      { q: "How wide is the sidebar, and can I change it?", a: "280px expanded and 64px collapsed, settable through <code>width</code> and <code>railWidth</code>. Keep the expanded rail between 256 and 320px: below that long labels truncate, above it the page loses more than the navigation gains." }
    ]
  });
})();
