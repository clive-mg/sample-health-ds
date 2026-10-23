/* Sample Health docs — Accordion. Four containers, three indicators, one or
   several panels open at a time. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Accordion, Badge, Button } = UI;

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
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg-px)", minWidth: 0 }}>
      <span className="sh-tm-lab">{props.label}</span>
      {props.children}
    </div>
  );
  const Col = (props) => <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6xl-px)", width: "100%" }}>{props.children}</div>;
  const Frame = (props) => <div style={{ width: "100%" }}>{props.children}</div>;

  const FAQ = [
    { title: "What are your shipping options?", content: "We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders." },
    { title: "What is your return policy?", content: "Unopened items can be returned within 30 days of delivery. Refunds reach the original payment method within five working days." },
    { title: "How can I contact customer support?", content: "Support is open Monday to Friday, 9am to 6pm, on 0800 123 4567 or at support@samplehealth.org." }
  ];

  const CARE = [
    { title: "How do I book an appointment?", supportingText: "Scheduling", content: "Open the practice from your dashboard and pick a slot. You will get a confirmation by email and a reminder the day before." },
    { title: "Where do my test results appear?", supportingText: "Records", content: "Results post to the record they belong to as soon as the lab releases them, and the care team is notified at the same time." },
    { title: "Which insurers are in network?", supportingText: "Billing", content: "Your plan's network is listed under Billing. Anything outside it needs prior authorisation before the visit." }
  ];

  /* ---------------- anatomy ---------------- */
  const VARIANTS = [
    { id: "dividers", label: "Dividers" }, { id: "card", label: "Card" },
    { id: "cards", label: "Item cards" }, { id: "filled", label: "Filled" }
  ];
  const SPEC = [
    { title: "What are your shipping options?", supportingText: "Delivery and tracking", content: FAQ[0].content },
    FAQ[1], FAQ[2]
  ];
  /* Rows shared by every container: the header, the text and the panel are the
     same in all four. Only the shell round them, and the inline padding it
     forces, change. */
  const textRows = [
    tv("spacing.xl", "Header padding \u00b7 16px block", [at("header", "top", .3)]),
    tv("style.heading.h6", "Title \u00b7 Inter 16/20 \u00b7 600", [at("title", "right", .5)]),
    tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("title", "bottom", .3)]),
    tv("spacing.xxs", "Title \u2192 supporting \u00b7 2px", [at("supporting", "top", .15)]),
    tv("style.body.md.regular", "Supporting \u00b7 Inter 14/20 \u00b7 400", [at("supporting", "left", .5)]),
    tv("spacing.xl", "Text \u2192 indicator \u00b7 16px", [at("indicator", "left", .5)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("indicator", "top", .5)]),
    tv("style.body.md.regular", "Panel \u00b7 Inter 14/20 \u00b7 400", [at("panel", "left", .4)]),
    tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("panel", "right", .5)]),
    tv("spacing.xl", "Panel padding-bottom \u00b7 16px", [at("panel", "bottom", .35)])
  ];
  const shellRows = {
    dividers: [
      tv("spacing.none", "Header padding \u00b7 0 inline \u00b7 flush with the rule", [at("header", "left", .55)]),
      tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("item", "bottom", .5)]),
      tc("color.surface.hover", "var(--colors-background-bg-primary-hover)", [at("header", "right", .15)])
    ],
    card: [
      tv("spacing.xl", "Header padding \u00b7 16px inline", [at("header", "left", .55)]),
      tv("radius.md", "Card corner \u00b7 8px", [at("root", "top", .12)]),
      tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("root", "left", .12)]),
      tc("color.surface.default", "var(--colors-background-bg-primary)", [at("root", "right", .85)]),
      tc("color.surface.hover", "var(--colors-background-bg-primary-hover)", [at("header", "right", .15)])
    ],
    cards: [
      tv("spacing.xl", "Header padding \u00b7 16px inline", [at("header", "left", .55)]),
      tv("spacing.md", "Card \u2192 card \u00b7 8px", [at("item", "bottom", .12)]),
      tv("radius.md", "Card corner \u00b7 8px", [at("item", "top", .12)]),
      tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("item", "left", .2)]),
      tv("shadow.xs", "0px 1px 2px 0px \u00b7 5%", [at("item", "right", .85)]),
      tc("color.surface.hover", "var(--colors-background-bg-primary-hover)", [at("header", "right", .15)])
    ],
    filled: [
      tv("spacing.xl", "Header padding \u00b7 16px inline", [at("header", "left", .55)]),
      tv("spacing.md", "Panel \u2192 panel \u00b7 8px", [at("item", "bottom", .12)]),
      tv("radius.md", "Corner \u00b7 8px", [at("item", "top", .12)]),
      tc("color.surface.canvas", "var(--colors-background-bg-secondary)", [at("item", "left", .2)]),
      tc("color.neutral.100", "var(--colors-gray-light-mode-100)", [at("header", "right", .15)])
    ]
  };
  const anatomyRows = (v) => shellRows[v].concat(textRows);
  function AnatomyDoc() {
    const [v, setV] = React.useState("dividers");
    const label = VARIANTS.filter((x) => x.id === v)[0].label;
    return <Stage>
      <Group label={label} sig={"acc/" + v} rows={anatomyRows(v)}
        tools={<Seg label="Container" options={VARIANTS} value={v} onChange={setV} />}
        specimen={<div style={{ width: "100%", minWidth: 420 }}><Accordion key={v} variant={v} items={SPEC} /></div>} />
    </Stage>;
  }

  /* ---------------- containers ---------------- */
  function ContainerDoc() {
    const [v, setV] = React.useState("dividers");
    return <Preview className="align-stretch pad-lg"><div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3xl-px)", width: "100%" }}>
      <Seg label="Container" options={VARIANTS} value={v} onChange={setV} />
      <Frame><Accordion key={v} variant={v} items={FAQ} /></Frame>
    </div></Preview>;
  }

  /* ---------------- indicators ---------------- */
  function IndicatorDoc() {
    return <Preview className="align-start pad-lg">
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6xl-px)", width: "100%" }}>
        <Eg label="Chevron"><Accordion variant="card" indicator="chevron" items={FAQ.slice(0, 2)} /></Eg>
        <Eg label="Plus / minus"><Accordion variant="card" indicator="plusMinus" items={FAQ.slice(0, 2)} /></Eg>
        <Eg label="Chevron, leading"><Accordion variant="card" indicator="chevronLeft" items={FAQ.slice(0, 2)} /></Eg>
      </div>
    </Preview>;
  }

  /* ---------------- behaviour ---------------- */
  const MODES = [{ id: "single", label: "One at a time" }, { id: "multiple", label: "Several" }];
  function BehaviourDoc() {
    const [m, setM] = React.useState("single");
    return <Preview className="align-stretch pad-lg"><div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3xl-px)", width: "100%" }}>
      <Seg label="Open" options={MODES} value={m} onChange={setM} />
      <Frame><Accordion key={m} multiple={m === "multiple"} defaultOpen={m === "multiple" ? [0, 1] : 0} items={CARE} /></Frame>
    </div></Preview>;
  }

  /* ---------------- content ---------------- */
  const RICH = [
    {
      title: "What does the plan cover?",
      supportingText: "Updated 4 August 2026",
      content: <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xl-px)" }}>
        <span>Consultations, diagnostics and prescriptions are covered in full at in-network practices. Out-of-network visits are reimbursed at 60% once the deductible is met.</span>
        <div style={{ display: "flex", gap: "var(--spacing-md-px)", flexWrap: "wrap" }}>
          <Badge size="sm" type="pill-color" color="success">In network</Badge>
          <Badge size="sm" type="pill-color" color="gray">Deductible $250</Badge>
        </div>
        <div><Button size="sm" hierarchy="secondary">Download summary</Button></div>
      </div>
    },
    { title: "How do I add a dependent?", content: "Dependents can be added within 30 days of a qualifying event. Outside that window, wait for open enrolment." },
    { title: "Claims history", supportingText: "Available from 1 September", content: "Nothing to show yet.", disabled: true }
  ];
  function ContentDoc() {
    return <Preview className="align-stretch pad-lg"><Frame><Accordion variant="cards" items={RICH} /></Frame></Preview>;
  }

  SH.registerPage("accordion", {
    h1: "Accordion",
    wide: true,
    lead: "A disclosure list for content people can skip past. Each header is the button, each panel holds whatever the item carries \u2014 a paragraph, a form, a summary with actions. Four containers, three indicators, and either one panel open at a time or as many as someone wants.",
    sections: [
      { id: "anatomy", title: "Anatomy",
        prose: ["A title, an optional line of supporting text and a chevron on the right. The whole header is the button, so the hit target runs the full width of the list. Switch the container to see what each one changes: dividers pulls the header flush with the rule at 0 inline padding, and the other three inset it by 16px to clear their edge.",
          "Type is fixed at one size in every container. Titles are H6, supporting text is Body Medium regular, and the panel is Body Medium regular in text.secondary \u2014 the answer reads as quieter than the question."],
        render: () => <AnatomyDoc /> },

      { id: "containers", title: "Containers",
        prose: ["Dividers for a page that is mostly accordion \u2014 a support page, a policy list \u2014 where a border round every item would be noise. One card round the list when it sits among other cards and needs the same edge. Item cards when each item is a thing in its own right and can be reordered or removed. Filled when the accordion sits on white and needs to separate itself without a border.",
          "Hovering a header tints the whole row with color.surface.hover. The filled container is already sitting on that tint, so its hover steps to color.neutral.100 \u2014 Foundations publishes no semantic hover for a filled surface, and that ramp step does not invert in dark mode. Flagged rather than annotated with a name that does not exist."],
        render: () => <ContainerDoc /> },

      { id: "indicators", title: "Indicators",
        prose: ["A chevron that rotates is the default and reads as \u201cthere is more below\u201d. Plus and minus is firmer about the state and suits a long list someone will scan rather than read. Putting the chevron before the title makes the list look like a tree, which is right for nested navigation and wrong for an FAQ."],
        render: () => <IndicatorDoc /> },

      { id: "behaviour", title: "One panel or several",
        prose: ["By default opening a panel shuts the one before it, so the page never grows under the pointer. Set multiple when the panels are short and people will want to compare them, or when the accordion is a set of filters rather than a set of answers.",
          "Pressing the open header shuts it, in both modes. defaultOpen takes an index, or a list of indices when multiple is set \u2014 pass null to start with everything shut."],
        render: () => <BehaviourDoc /> },

      { id: "content", title: "What an item holds",
        prose: ["A panel takes any content: paragraphs, badges, a form, a button. Supporting text sits under the title and stays visible whether the panel is open or shut, which is where a date, a category or a count belongs.",
          "A disabled item is a header nobody can open \u2014 the text and glyph drop to the disabled colour and the row loses its hover. Use it for content that exists but is not ready, not for content someone is not allowed to see."],
        render: () => <ContentDoc /> }
    ],
    faqs: [
      { q: "Which container should I use?", a: "Dividers unless something else in the layout argues otherwise: it is the quietest and the one that scales to a page of questions. Reach for cards when each item is an object rather than a question." },
      { q: "Can more than one panel be open?", a: "Yes, with <code>multiple</code>. Off by default so the page does not grow under the pointer." },
      { q: "Does it animate?", a: "The panel animates its height over 220ms and the chevron rotates with it. Plus and minus swap instead of rotating." },
      { q: "How is it announced?", a: "Each header is a <code>button</code> carrying <code>aria-expanded</code> and <code>aria-controls</code>; each panel is a <code>region</code> labelled by its header. The indicator is decorative and hidden from assistive tech." },
      { q: "Is it keyboard accessible?", a: "Tab moves between headers, Enter or Space toggles the panel, and the focused header takes a 2px inset focus ring." }
    ]
  });
})();
