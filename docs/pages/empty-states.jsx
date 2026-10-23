/* Sample Health docs — Empty states. One component, three sizes, five
   situations. Moved out of docs/pages/app-b.jsx. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { EmptyState, Button } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors) => ({ token, color, anchors });
  const tv = (token, value, anchors) => ({ token, value, anchors });

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
  const Col = (props) => <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6xl-px)" }}>{props.children}</div>;

  const SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }, { id: "lg", label: "lg" }];
  const SPEC = {
    sm: { pad: "spacing.2xl", padV: "Padding · 20px on all sides", title: "style.heading.h6", titleV: "Title · Inter 16/24 · 600", text: "style.body.md.regular", textV: "Supporting · Inter 14/20 · 400", chip: "40px chip", width: "Max width · 320px" },
    md: { pad: "spacing.3xl", padV: "Padding · 24px on all sides", title: "style.heading.h5", titleV: "Title · Inter 18/22 · 600", text: "style.body.md.regular", textV: "Supporting · Inter 14/20 · 400", chip: "64px chip", width: "Max width · 400px" },
    lg: { pad: "spacing.4xl", padV: "Padding · 32px on all sides", title: "style.heading.h3", titleV: "Title · Inter 24/28 · 600", text: "style.body.lg.regular", textV: "Supporting · Inter 16/24 · 400", chip: "80px chip", width: "Max width · 480px" },
  };
  const rows = (sz) => {
    const s = SPEC[sz];
    return [
      tv(s.pad, s.padV, [at("root", "left", .12)]),
      tv("Layout", s.width, [at("root", "top", .5)]),
      tv("radius.full", "Icon chip · " + s.chip, [at("graphic", "left", .5)]),
      tc("color.neutral.50", "var(--colors-gray-light-mode-50)", [at("graphic", "top", .35)]),
      tc("color.border.default", "var(--colors-border-border-primary)", [at("graphic", "right", .5)]),
      tv(sz === "lg" ? "spacing.2xl" : "spacing.xl", "Chip → title · " + (sz === "lg" ? "20px" : "16px"), [at("title", "top", .18)]),
      tv(s.title, s.titleV, [at("title", "left", .5)]),
      tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("title", "bottom", .4)]),
      tv("spacing.xs", "Title → supporting · 4px", [at("text", "top", .3)]),
      tv(s.text, s.textV, [at("text", "left", .5)]),
      tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("text", "bottom", .5)]),
      tv(sz === "lg" ? "spacing.3xl" : "spacing.2xl", "Supporting → actions · " + (sz === "lg" ? "24px" : "20px"), [at("actions", "top", .2)]),
      tv("spacing.lg", "Button gap · 12px", [at("actions", "bottom", .5)])
    ];
  };

  function Anatomy() {
    const [sz, setSz] = React.useState("md");
    return <Stage>
      <Group label={sz === "sm" ? "Small — panels and cards" : sz === "md" ? "Medium — a section" : "Large — a whole page"} sig={"es/" + sz} rows={rows(sz)}
        tools={<Seg label="Size" options={SIZES} value={sz} onChange={setSz} />}
        specimen={<EmptyState size={sz} icon={<Icon name="File02" />} title="No documents yet"
          actions={<Button size={sz === "lg" ? "lg" : "md"} iconLeading={<Icon name="Plus" size={20} />}>Upload a document</Button>}>
          Plan documents you upload will be listed here.
        </EmptyState>} />
    </Stage>;
  }

  SH.registerPage("empty-states", {
    h1: "Empty states",
    wide: true,
    lead: "An empty state fills a space that has nothing in it and says why. Every one carries the same four parts — an icon, a title naming the emptiness, a line explaining it, and the action that ends it. What changes between them is the reason, and the reason decides the copy, the icon and whether there is an action at all.",
    sections: [
      { id: "anatomy", title: "Anatomy",
        prose: ["The three sizes are the same composition at three scales. Use sm inside a panel or a card, md for a section of a page, lg when the empty state is the page. Hover a token to trace where it lands."],
        render: () => <Anatomy /> },

      { id: "kinds", title: "Five situations",
        prose: ["The difference between a good empty state and a dead end is whether it says what happened and what to do. Name the emptiness in the title, give the reason in one line, and put the way out in the action — the same three moves each time, however the space came to be empty.",
          "Only three of these five take a coloured icon. Gray is the default because most emptiness is ordinary: nothing has happened yet. Reach for brand, error or warning when the state carries a consequence."],
        render: () => <Preview className="align-stretch pad-lg"><Col>
          <Eg label="First run — nothing created yet">
            <EmptyState color="brand" icon={<Icon name="FilePlus02" />} title="No claims filed yet"
              actions={<Button iconLeading={<Icon name="Plus" size={20} />}>File a claim</Button>}>
              Claims you file appear here with their status and payment history.
            </EmptyState>
          </Eg>
          <Eg label="No search results">
            <EmptyState icon={<Icon name="SearchLg" />} title="No providers found" actions={<>
              <Button hierarchy="secondary">Clear search</Button>
              <Button>Browse all providers</Button>
            </>}>
              Nothing matched “cardiologist 94103”. Check the spelling or widen the area.
            </EmptyState>
          </Eg>
          <Eg label="No filter matches">
            <EmptyState icon={<Icon name="FilterLines" />} title="No claims match these filters"
              actions={<Button hierarchy="secondary">Reset filters</Button>}>
              Try a wider date range, or clear the status filter.
            </EmptyState>
          </Eg>
          <Eg label="Failed to load">
            <EmptyState color="error" icon={<Icon name="AlertCircle" />} title="We couldn't load your claims"
              actions={<Button hierarchy="secondary" iconLeading={<Icon name="RefreshCw01" size={20} />}>Try again</Button>}>
              The connection timed out. Your claims are safe — this is a display problem.
            </EmptyState>
          </Eg>
          <Eg label="No access">
            <EmptyState color="warning" icon={<Icon name="Lock01" />} title="You don't have access to this plan">
              Ask the plan administrator to add you, then reload the page.
            </EmptyState>
          </Eg>
        </Col></Preview> },

      { id: "card", title: "Framed in a card",
        prose: ["The bare empty state has no frame of its own — it centres itself in whatever space the parent gives it, which is what a table body or a dashboard panel already provides. Use the card variant only when the empty state has to hold its own edge on a plain page."],
        render: () => <Preview className="align-stretch pad-lg"><Col>
          <Eg label="Bare — the default">
            <EmptyState size="sm" icon={<Icon name="File02" />} title="No documents yet" actions={<Button size="sm">Upload</Button>}>
              Nothing has been added to this plan year.
            </EmptyState>
          </Eg>
          <Eg label="Card">
            <EmptyState size="sm" variant="card" style={{ maxWidth: "none", width: "100%" }} icon={<Icon name="File02" />} title="No documents yet" actions={<Button size="sm">Upload</Button>}>
              Nothing has been added to this plan year.
            </EmptyState>
          </Eg>
        </Col></Preview> }
    ],
    faqs: [
      { q: "Does every empty state need an action?", a: "No. An action belongs there when the person can end the emptiness — file the first claim, clear the filter, retry the request. When they cannot, as with a permission they do not hold, the supporting line should name who can instead. A button that leads nowhere is worse than no button." },
      { q: "Which colour should the icon be?", a: "Gray unless the state carries a consequence. Brand for a first run, because that state is an invitation. Error for something that failed. Warning for something blocked. Success is for a finished queue, not an empty one." },
      { q: "Empty state or alert?", a: "An empty state stands where content would be and is the only thing in that space. An alert sits beside content that is already there. If the table has rows and something also went wrong, that is an alert." },
      { q: "How long should the supporting line be?", a: "One line at the width the size gives it — 320, 400 or 480px. If it needs two, the title is probably doing too little work." },
      { q: "What happened to EmptySearch and EmptyStateIllustration?", a: "Both were retired. <code>EmptySearch</code> was a no-results state that <code>EmptyState</code> already covers, and the concentric-ring illustration was never used in a screen. The five situations above replace both." }
    ]
  });
})();
