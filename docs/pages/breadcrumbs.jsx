/* Sample Health docs — Breadcrumbs. Plain-text trail, chevron or slash
   divider, middle levels collapsing behind a … menu. Moved out of
   docs/pages/app-a.jsx. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Breadcrumbs } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors) => ({ token, color, anchors });
  const tv = (token, value, anchors) => ({ token, value, anchors });

  const TRAIL = [{ label: "Coverage" }, { label: "Plan documents" }, { label: "2026 Summary of Benefits" }];
  const DEEP = [{ label: "Coverage" }, { label: "Plans" }, { label: "2026" }, { label: "Medical" }, { label: "Summary of Benefits" }];

  const Map = (props) => <div className="sh-tm-table sh-tm-right"><SH.TokenMap sig={props.sig} rows={props.rows} specimen={props.specimen} /></div>;
  const Group = (props) => (
    <div className="sh-tm-group">
      <div className="sh-tm-head"><SH.StateMark>{props.label}</SH.StateMark>{props.tools || null}</div>
      <Map sig={props.sig} rows={props.rows} specimen={props.specimen} />
    </div>
  );
  const Stage = (props) => <Preview className="align-stretch canvas pad-tm"><div className="sh-tm-set">{props.children}</div></Preview>;
  const Seg = (props) => (
    <div className="sh-tm-sizes">
      <span className="sh-tm-lab">{props.label}</span>
      <div className="sh-tm-seg">{props.options.map((o) =>
        <button key={o.id} type="button" className={o.id === props.value ? "is-on" : ""} onClick={() => props.onChange(o.id)}>{o.label}</button>)}</div>
    </div>
  );
  const Eg = (props) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)" }}>
      <span className="sh-tm-lab">{props.label}</span>
      {props.children}
    </div>
  );
  const Col = (props) => <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4xl-px)" }}>{props.children}</div>;

  const rows = [
    tv("style.body.md.regular", "Crumb · Inter 14/20 · 400", [at("crumb", "top", .5)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("crumb", "bottom", .5)]),
    tv("spacing.md", "Crumb → divider · 8px", [at("divider", "left", .5)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("divider", "bottom", .5)]),
    tv("style.body.md.bold", "Current page · Inter 14/20 · 600", [at("current", "top", .5)]),
    tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("current", "bottom", .5)])
  ];

  function Anatomy() {
    const [dv, setDv] = React.useState("chevron");
    return <Stage>
      <Group label={dv === "chevron" ? "Chevron divider" : "Slash divider"} sig={"bc/" + dv} rows={rows}
        tools={<Seg label="Divider" options={[{ id: "chevron", label: "Chevron" }, { id: "slash", label: "Slash" }]} value={dv} onChange={setDv} />}
        specimen={<Breadcrumbs divider={dv} items={TRAIL} />} />
    </Stage>;
  }

  SH.registerPage("breadcrumbs", {
    h1: "Breadcrumbs",
    wide: true,
    lead: "Breadcrumbs show where the current page sits in the hierarchy and let people step back up it. Every level but the last is a link; the last is the page you are on, so it is plain text rather than a link to itself.",
    sections: [
      { id: "default", title: "Breadcrumbs",
        prose: ["A crumb per level, left to right, shallowest first. Keep labels to the name of the level — the trail is for orientation, not description, and a long label crowds out the levels either side of it. Labels longer than the crumb truncate rather than wrap."],
        render: () => <Preview className="align-stretch pad-lg"><Col>
          <Eg label="Two levels"><Breadcrumbs items={[{ label: "Claims" }, { label: "Claim #4471" }]} /></Eg>
          <Eg label="Three levels"><Breadcrumbs items={TRAIL} /></Eg>
          <Eg label="A long label truncates"><Breadcrumbs items={[{ label: "Coverage" }, { label: "2026 Summary of Benefits and Coverage for Preferred PPO" }, { label: "Dental" }]} /></Eg>
        </Col></Preview> },

      { id: "anatomy", title: "Anatomy",
        prose: ["Hover a token to trace where it lands, or hover a part of the trail to find its tokens."],
        render: () => <Anatomy /> },

      { id: "dividers", title: "Dividers",
        prose: ["A chevron is the default: it points the direction the hierarchy runs. The slash is for trails that read as a path — a file location, a URL, a plan code — where the chevron's direction would say something the content does not."],
        render: () => <Preview className="align-stretch pad-lg"><Col>
          <Eg label="Chevron"><Breadcrumbs items={TRAIL} /></Eg>
          <Eg label="Slash"><Breadcrumbs divider="slash" items={TRAIL} /></Eg>
        </Col></Preview> },

      { id: "deep", title: "Deep trails",
        prose: ["Past four levels the middle collapses behind a … that opens the hidden levels as a menu. The first and last crumbs always survive, because those are the two that orient you: the section you are in and the page you are on. Raise maxItems where a trail earns more levels, or set it to 0 to keep every level and let the trail wrap."],
        render: () => <Preview className="align-stretch pad-lg" minHeight={280}><Col>
          <Eg label="Five levels, collapsed — click the …"><Breadcrumbs items={DEEP} /></Eg>
          <Eg label="The same five with maxItems={0}"><Breadcrumbs maxItems={0} items={DEEP} /></Eg>
        </Col></Preview> }
    ],
    faqs: [
      { q: "Why is the last crumb not a link?", a: "It points at the page you are already on. Rendering it as a link offers a navigation that does nothing. It carries <code>aria-current=\"page\"</code> instead, which is what tells a screen reader where the trail ends." },
      { q: "Breadcrumbs or tabs?", a: "Breadcrumbs move you <em>up</em> a hierarchy you descended into. Tabs move you <em>across</em> views of the same thing. A page can carry both — the trail above the title, the tabs below it." },
      { q: "Should the trail include the home page?", a: "No. Sample Health puts the top-level section first — Claims, Coverage, Members. A home crumb spends a level on a destination the product logo already provides." },
      { q: "What happens on a narrow screen?", a: "The trail does not wrap: crumbs truncate at 200px and the middle collapses behind the … menu. If four levels still do not fit, lower <code>maxItems</code> for that page rather than letting the trail run off the edge." },
      { q: "Is it keyboard reachable?", a: "Yes. Each crumb is a link in one tab sequence, the … is a button, and the menu closes on <code>Escape</code>. The whole trail sits in a <code>nav</code> labelled Breadcrumb." }
    ]
  });
})();
