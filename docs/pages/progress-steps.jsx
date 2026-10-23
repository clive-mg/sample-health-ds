/* Sample Health docs — Progress steps. One component across four marker types,
   three text placements, both orientations and three sizes. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { ProgressSteps, Button, Input } = UI;
  const { Icon } = SH;

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
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg-px)" }}>
      <span className="sh-tm-lab">{props.label}</span>
      {props.children}
    </div>
  );
  const Col = (props) => <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6xl-px)" }}>{props.children}</div>;

  const STEPS = [
    { title: "Your details", description: "Name and email" },
    { title: "Practice details", description: "Address and hours" },
    { title: "Invite your team", description: "Start collaborating" },
    { title: "Confirm", description: "Review and finish" }
  ];

  const STEP_ICONS = ["User01", "Building02", "Users01", "CheckCircle"];
  const withIcons = (list, names) => list.map((s, i) => Object.assign({}, s, { icon: <Icon name={names[i]} /> }));
  const ICON_STEPS = withIcons(STEPS, STEP_ICONS);

  /* ---------------- markers ---------------- */
  const MARKERS = [{ id: "dot", label: "Dot" }, { id: "number", label: "Number" }, { id: "featured", label: "Featured icon" }];
  const MD = { dot: 32, number: 32, featured: 48 };
  const markerRows = (m) => [
    tv("radius.full", "Marker \u00b7 " + MD[m] + " \u00d7 " + MD[m], [at("marker", "top", .5)]),
    tc("color.surface.primary", "var(--colors-background-bg-brand-solid)", [at("marker", "left", .5)]),
    tc(m === "featured" ? "color.primary.50" : "color.text.on.brand", m === "featured" ? "var(--colors-brand-50)" : "var(--colors-text-text-primary-on-brand)", [at("marker", "bottom", .5)]),
    tv("border-width", "Ring \u00b7 2px \u00b7 Foundations publishes no border-width token", [at("root", "top", .5)]),
    tc("color.primary.600", "var(--colors-brand-600)", [at("root", "right", .28)]),
    tc("color.border.default", "var(--colors-border-border-primary)", [at("root", "right", .6)]),
    tv("spacing.xl", "Marker \u2192 text \u00b7 16px", [at("text", "top", .1)]),
    tv("style.body.lg.bold", "Title \u00b7 Inter 16/24 \u00b7 600", [at("title", "left", .5)]),
    tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("title", "bottom", .4)]),
    tv("spacing.xxs", "Title \u2192 supporting \u00b7 2px", [at("desc", "top", .2)]),
    tv("style.body.md.regular", "Supporting \u00b7 Inter 14/20 \u00b7 400", [at("desc", "left", .5)]),
    tc("color.text.placeholder", "var(--colors-text-text-quaternary-500)", [at("desc", "right", .5)]),
    tv("border-width", "Connector \u00b7 2px, between markers only", [at("track", "bottom", .18)]),
    tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("track", "top", .85)])
  ];
  function MarkerDoc() {
    const [m, setM] = React.useState("dot");
    return <Stage>
      <Group label={MARKERS.find((x) => x.id === m).label} sig={"ps/" + m} rows={markerRows(m)}
        tools={<Seg label="Marker" options={MARKERS} value={m} onChange={setM} />}
        specimen={<div style={{ width: "100%", minWidth: 520 }}>
          <ProgressSteps steps={m === "featured" ? ICON_STEPS : STEPS} current={1} marker={m} />
        </div>} />
    </Stage>;
  }

  /* ---------------- placement ---------------- */
  function PlacementDoc() {
    return <Preview className="align-stretch pad-lg"><Col>
      <Eg label="Text below the marker"><ProgressSteps steps={STEPS} current={1} marker="dot" /></Eg>
      <Eg label="Markers only, with a count"><ProgressSteps steps={STEPS} current={1} marker="dot" textPlacement="none" connector={false} showCount /></Eg>
      <Eg label="Markers only, connected"><ProgressSteps steps={STEPS} current={1} marker="dot" textPlacement="none" /></Eg>
    </Col></Preview>;
  }

  /* ---------------- vertical ---------------- */
  function VerticalDoc() {
    return <Preview className="align-start pad-lg">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 320px))", gap: "var(--spacing-6xl-px)", justifyContent: "start" }}>
        <Eg label="Dot"><ProgressSteps steps={STEPS} current={1} orientation="vertical" marker="dot" /></Eg>
        <Eg label="Number"><ProgressSteps steps={STEPS} current={1} orientation="vertical" marker="number" /></Eg>
        <Eg label="Featured icon"><ProgressSteps steps={ICON_STEPS} current={1} orientation="vertical" marker="featured" /></Eg>
      </div>
    </Preview>;
  }

  /* ---------------- rail ---------------- */
  function RailDoc() {
    return <Preview className="align-stretch pad-lg">
      <ProgressSteps steps={STEPS} current={1} marker="none" />
    </Preview>;
  }

  /* ---------------- states ---------------- */
  const STATE_STEPS = [
    { title: "Your details", description: "Complete", status: "complete" },
    { title: "Practice details", description: "Current", status: "current" },
    { title: "Insurance", description: "Upcoming", status: "upcoming" },
    { title: "Invite your team", description: "Error", status: "error" },
    { title: "Confirm", description: "Disabled", status: "disabled" }
  ];
  const STATE_ICON_STEPS = withIcons(STATE_STEPS, ["User01", "Building02", "Shield01", "Users01", "CheckCircle"]);
  function StatesDoc() {
    const [m, setM] = React.useState("dot");
    return <Preview className="align-stretch pad-lg"><div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3xl-px)" }}>
      <Seg label="Marker" options={MARKERS} value={m} onChange={setM} />
      <ProgressSteps steps={m === "featured" ? STATE_ICON_STEPS : STATE_STEPS} current={1} marker={m} />
    </div></Preview>;
  }

  /* ---------------- wizard ---------------- */
  const PANELS = [
    <div key="a" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--spacing-xl-px)" }}>
      <Input size="sm" label="First name" placeholder="Amara" />
      <Input size="sm" label="Last name" placeholder="Chen" />
      <Input size="sm" label="Work email" placeholder="name@samplehealth.org" />
      <Input size="sm" label="Phone" placeholder="+44 20 7946 0000" />
    </div>,
    <div key="b" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--spacing-xl-px)" }}>
      <Input size="sm" label="Practice name" placeholder="Northgate Cardiology" />
      <Input size="sm" label="Address" placeholder="14 Northgate Road" />
    </div>,
    <div key="c" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--spacing-xl-px)" }}>
      <Input size="sm" label="Colleague's email" placeholder="name@samplehealth.org" />
      <Input size="sm" label="Role" placeholder="Care coordinator" />
    </div>,
    <div key="d" style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>Everything is ready. Review the details above, then finish setting up the practice.</div>
  ];
  function Wizard() {
    const [step, setStep] = React.useState(1);
    return <Preview className="align-stretch pad-lg">
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4xl-px)", width: "100%" }}>
        <ProgressSteps steps={STEPS} current={step} marker="number" onStepClick={(i) => setStep(i)} />
        <div style={{ padding: "var(--spacing-3xl-px)", borderRadius: "var(--radius-xl-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)" }}>{PANELS[step]}</div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--spacing-lg-px)" }}>
          <Button hierarchy="secondary" disabled={step === 0} onClick={() => setStep(Math.max(0, step - 1))}>Back</Button>
          <Button disabled={step === STEPS.length - 1} onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}>Continue</Button>
        </div>
      </div>
    </Preview>;
  }

  SH.registerPage("progress-steps", {
    h1: "Progress steps",
    wide: true,
    lead: "A stepper for any flow that runs longer than one screen. One component covers four marker types, three text placements and both orientations \u2014 give it a list of steps and the index of the current one.",
    sections: [
      { id: "markers", title: "Markers",
        prose: ["Three ways to mark a step. A dot is the quietest and suits a flow people already understand. Numbers help when the order matters or when someone will refer to \u201cstep 3\u201d out loud. The featured icon is for onboarding and setup pages, where the stepper is the main thing on screen and each step can carry an icon of its own.",
          "Whatever the marker, a completed step is a filled brand circle with a check, the current step is a 2px color.primary.600 ring with a dot inside, and upcoming steps are a grey ring. The connector runs between markers only \u2014 no stub before the first or after the last \u2014 and the markers are opaque, so the line looks continuous without any of it showing through.",
          "The current step's title uses the brand text colour, which Foundations publishes no name for. Flagged rather than annotated with an invented one."],
        render: () => <MarkerDoc /> },

      { id: "placement", title: "Text placement",
        prose: ["Text below the marker for a wizard that spans the page \u2014 four steps across a content column each get a whole column of width.",
          "Markers on their own are for the top of a phone screen or a card header, where the label lives in the heading and the row only has to say how far along someone is. Add the count and it says it in words too."],
        render: () => <PlacementDoc /> },

      { id: "vertical", title: "Vertical",
        prose: ["The same markers stacked, with the connector running down through them. Vertical suits a sidebar beside the form, a checklist where each step has a sentence of explanation, and any flow with more than about five steps \u2014 which is more than a horizontal row can carry without the labels colliding."],
        render: () => <VerticalDoc /> },

      { id: "rail", title: "The rail",
        prose: ["No marker at all: a 2px rule above the text, brand for the steps already reached and grey for the rest. It is the most compact of the set and the only one that survives at six or more steps horizontally, because it drops the markers that need room around them.",
          "Use it when the stepper is a progress indicator rather than a map \u2014 people can see how far along they are, but the rail does not invite them to click back."],
        render: () => <RailDoc /> },

      { id: "states", title: "States",
        prose: ["Five states. Complete, current and upcoming are derived from the current index; error and disabled are set per step and override it. An error step keeps its position in the row and turns the marker and its text error red \u2014 and it is always clickable, wherever it sits, so someone can go straight back to the thing that failed. A disabled step is a step nobody can reach yet, and it never becomes a button.",
          "When steps are clickable, the whole step is the button: hovering lifts the marker a pixel and lights it with a shadow, and focus rings the marker. Upcoming steps are inert, so people can go back but not skip ahead."],
        render: () => <StatesDoc /> },

      { id: "wizard", title: "In a flow",
        prose: ["The stepper driving a four-step setup. Continue advances, Back retreats, and any completed step takes you straight there \u2014 the marker lifts under the pointer to say so."],
        render: () => <Wizard /> }
    ],
    faqs: [
      { q: "Which marker should I use?", a: "Dots for a short flow people already know, numbers when the order matters or people refer to steps by number, the featured icon when the stepper is the main thing on the page and each step has an icon worth showing." },
      { q: "How many steps fit horizontally?", a: "Four with text below in a full-width column, five at a squeeze. Past that, go vertical or use the rail \u2014 both hold six or more without the labels colliding." },
      { q: "Can someone skip ahead?", a: "No. Only completed steps and error steps are buttons; upcoming steps are inert. Wire <code>onStepClick</code> and the component decides which steps are live." },
      { q: "What marks an error?", a: "Set <code>status: \"error\"</code> on the step. The marker takes the alert glyph and the error border, the text turns error red, and the step becomes clickable regardless of where it sits in the row." },
      { q: "How is it announced?", a: "The list is an <code>ol</code>, and the current step carries <code>aria-current=\"step\"</code>. The connector is decorative and hidden from assistive tech." }
    ]
  });
})();
