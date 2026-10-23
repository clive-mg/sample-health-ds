/* Sample Health docs — Date pickers. The calendar surface and the three
   pickers built on it: one date, one range, and a start / end field pair.
   Replaces the old Calendars and Date pickers pages. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Calendar, DatePicker, DateRangePicker, DateRangeFields, DateInputField } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const T = new Date();
  const d = (n) => new Date(T.getFullYear(), T.getMonth(), n);
  const RANGE = { start: d(6), end: d(20) };
  const PRESETS = ["Today", "Last 7 days", "Last 30 days", "This month", "Last month"];

  /* ---------------- map shell ---------------- */
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
  const Grid = (props) => <div style={{ display: "grid", gridTemplateColumns: props.cols || "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--spacing-4xl-px)", alignItems: "start" }}>{props.children}</div>;

  /* ---------------- calendar anatomy ---------------- */
  const shellRows = [
    tv("radius.xl", "Panel · 12px", [at("root", "top", .06)]),
    tc("color.surface.default", "var(--colors-background-bg-primary)", [at("root", "left", .35)]),
    tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("root", "top", .5)]),
    tv("shadow.lg", "0px 12px 16px -4px · 0px 4px 6px -2px", [at("root", "bottom", .8)]),
    tv("spacing.2xl", "Panel padding · 20px on all sides", [at("body", "left", .12)]),
    tv("spacing.lg", "Header → grid · 12px", [at("grid", "top", .04)]),
    tv("style.heading.h6", "Month · Inter 16/24 · 600", [at("caption", "top", .5)]),
    tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("caption", "bottom", .5)]),
    tv("spacing.5xl", "Nav control · 40 × 40px", [at("nav", "left", .5)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("nav", "bottom", .5)]),
    tv("style.body.sm.regular", "Day letters · Inter 12/18 · 500", [at("dow", "top", .5)]),
    tv("spacing.5xl", "Day cell · 40 × 40px · 7 × 6 grid", [at("day", "left", .5)]),
    tv("radius.full", "Day cell · 9999px", [at("day", "bottom", .1)])
  ];

  /* ---------------- day states ---------------- */
  const stateRows = [
    tv("style.body.md.regular", "Day · Inter 14/20 · 400", [at("day", "top", .5)]),
    tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("day", "bottom", .5)]),
    tc("color.surface.hover", "var(--colors-background-bg-primary-hover)", [at("hover", "right", .5)]),
    tv("color.primary.50", "4px focus ring", [at("focus", "bottom", .5)]),
    tc("color.surface.primary", "var(--colors-background-bg-brand-solid)", [at("sel", "left", .5)]),
    tc("color.text.inverse", "var(--colors-text-text-white)", [at("sel", "top", .5)]),
    tv("style.body.md.bold", "Selected & today · Inter 14/20 · 600", [at("today", "top", .4)]),
    tc("color.surface.selected", "var(--colors-background-bg-brand-primary)", [at("band", "bottom", .5)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("outside", "right", .5)]),
    tc("color.text.disabled", "var(--colors-text-text-disabled)", [at("dis", "left", .5)])
  ];

  function CalendarDoc() {
    const [m, setM] = React.useState("single");
    return <Stage>
      <Group label={m === "single" ? "One date" : "A range, two months"} sig={"cal/" + m} rows={shellRows}
        tools={<Seg label="Mode" options={[{ id: "single", label: "Single" }, { id: "range", label: "Range" }]} value={m} onChange={setM} />}
        specimen={m === "single"
          ? <Calendar annotate defaultValue={d(14)} />
          : <Calendar annotate mode="range" months={2} presets={PRESETS} footer defaultValue={RANGE} />} />
    </Stage>;
  }

  function StatesDoc() {
    return <Stage>
      <Group label="Every day state at once" sig="states" rows={stateRows}
        specimen={<Calendar annotate mode="range" defaultValue={RANGE} minDate={d(4)} demo={{ hover: 25, focus: 27 }} />} />
    </Stage>;
  }

  /* ---------------- trigger field ---------------- */
  const FIELD_STATES = [
    { id: "default", label: "Default" }, { id: "open", label: "Open" },
    { id: "error", label: "Error" }, { id: "disabled", label: "Disabled" }
  ];
  const fieldRows = (st) => {
    const rows = [
      tv("style.body.md.bold", "Label · Inter 14/20 · 600", [at("label", "top", .5)]),
      tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("label", "bottom", .4)]),
      tv("spacing.sm", "Label → field · 6px", [at("field", "top", .12)]),
      tv("spacing.md", "Field padding · top & bottom · 8px", [at("field", "left", .12)]),
      tv("spacing.xl", "Field padding · left & right · 16px", [at("icon", "right", .9)]),
      tv("spacing.md", "Value → glyph · 8px", [at("icon", "left", .5)]),
      tv("radius.md", "8px", [at("field", "top", .92)]),
      tv("shadow.xs", "0px 1px 2px 0px", [at("field", "bottom", .7)])
    ];
    if (st === "disabled") rows.push(
      tc("color.surface.disabled", "var(--colors-background-bg-disabled)", [at("field", "right", .5)]),
      tc("color.border.default", "var(--colors-border-border-primary)", [at("field", "bottom", .25)]),
      tc("color.text.disabled", "var(--colors-text-text-disabled)", [at("text", "top", .5)]));
    else rows.push(
      tc("color.surface.default", "var(--colors-background-bg-primary)", [at("field", "right", .5)]),
      st === "error"
        ? tc("color.border.error", "var(--colors-border-border-error)", [at("field", "bottom", .25)])
        : st === "open"
        ? tc("color.border.primary", "var(--colors-border-border-brand)", [at("field", "bottom", .25)])
        : tc("color.border.default", "var(--colors-border-border-primary)", [at("field", "bottom", .25)]),
      tc("color.text.placeholder", "var(--colors-text-text-placeholder)", [at("icon", "top", .5)]),
      tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("text", "top", .5)]));
    if (st === "open") rows.push(tv("color.primary.50", "6px focus ring", [at("field", "left", .85)]));
    rows.push(
      tv("style.body.md.regular", "Hint · Inter 14/20 · 400", [at("hint", "bottom", .5)]),
      st === "error"
        ? tc("color.text.status.error", "var(--colors-text-text-error-primary-600)", [at("hint", "right", .5)])
        : tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("hint", "right", .5)]));
    return rows;
  };

  function FieldDoc() {
    const [st, setSt] = React.useState("default");
    return <Stage>
      <Group label={FIELD_STATES.filter((s) => s.id === st)[0].label} sig={"fld/" + st} rows={fieldRows(st)}
        tools={<Seg label="State" options={FIELD_STATES} value={st} onChange={setSt} />}
        specimen={<div style={{ width: 320 }}>
          <DateInputField label="Appointment date" helpText="The date of the visit, not the date the claim was filed."
            value={st === "disabled" ? "" : "Aug 14, 2026"} open={st === "open"} error={st === "error"} disabled={st === "disabled"}
            hint={st === "error" ? "Choose a date on or after today." : "The office confirms within one business day."} />
        </div>} />
    </Stage>;
  }

  /* ---------------- range popover ---------------- */
  const rangeRows = [
    tv("spacing.lg", "Rail padding · 12px", [at("rail", "left", .1)]),
    tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("rail", "right", .35)]),
    tv("style.body.md.regular", "Preset · Inter 14/20 · 400", [at("rail", "top", .5)]),
    tv("spacing.3xl", "Month → month · 24px", [at("body", "top", .5)]),
    tc("color.surface.primary", "var(--colors-background-bg-brand-solid)", [at("sel", "left", .5)]),
    tc("color.surface.selected", "var(--colors-background-bg-brand-primary)", [at("band", "top", .5)]),
    tv("spacing.xl", "Footer padding · 16px", [at("footer", "left", .3)]),
    tv("style.body.md.regular", "Readout · Inter 14/20 · 400", [at("footer", "bottom", .25)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("footer", "bottom", .5)]),
    tv("spacing.lg", "Cancel → Apply · 12px", [at("footer", "right", .5)])
  ];

  const RangeDoc = () => <Stage>
    <Group label="Preset rail, two months, Apply footer" sig="rng" rows={rangeRows}
      specimen={<Calendar annotate mode="range" months={2} presets={PRESETS} footer defaultValue={RANGE} />} />
  </Stage>;

  /* ---------------- page ---------------- */
  SH.registerPage("date-pickers", {
    h1: "Date pickers",
    wide: true,
    lead: "One calendar surface, three ways to ask for a date. A single picker fills one field from one month. A range picker fills one field from two months, with presets and an Apply step. A start and end pair asks for the two ends separately, the way the rest of a form asks for anything else.",
    sections: [
      { id: "calendar", title: "Calendar",
        prose: ["The calendar is the surface all three pickers open. It renders six week rows whatever the month, so the panel never changes height as you page through the year, and fills the leading and trailing rows with the neighbouring months' days. Today carries a dot under its number; the selected day is a brand-filled circle.",
          "It is also usable on its own, inline, where a date is the whole question rather than one field in a form."],
        render: () => <CalendarDoc /> },

      { id: "states", title: "Day states",
        prose: ["Hover and focus are frozen in this diagram so both can be read at once. Days outside the month are muted but selectable; days outside minDate and maxDate are not."],
        render: () => <StatesDoc /> },

      { id: "date-picker", title: "Date picker",
        prose: ["One field, one date. The trigger is the Input field with a calendar glyph and a formatted value in place of typed text, so a date field lines up with every other field in the form. Choosing a day fills the field and closes the popover — there is nothing to confirm."],
        render: () => <Preview className="align-stretch pad-lg" minHeight={520}>
          <Grid cols="repeat(auto-fit, minmax(280px, 320px))">
            <Eg label="Empty"><DatePicker label="Appointment date" /></Eg>
            <Eg label="With a value and a hint"><DatePicker label="Appointment date" defaultValue={d(14)} hint="The office confirms within one business day." /></Eg>
            <Eg label="Error"><DatePicker label="Appointment date" error hint="Choose a date on or after today." /></Eg>
            <Eg label="Disabled"><DatePicker label="Appointment date" disabled /></Eg>
            <Eg label="Small"><DatePicker size="sm" label="Appointment date" defaultValue={d(14)} /></Eg>
            <Eg label="Bounded to this month"><DatePicker label="Appointment date" minDate={d(1)} maxDate={d(28)} hint="Within the current billing month." /></Eg>
          </Grid>
        </Preview> },

      { id: "field", title: "Trigger anatomy",
        render: () => <FieldDoc /> },

      { id: "range-picker", title: "Date range picker",
        prose: ["One field, both ends. The popover pairs a preset rail with two months, so most spans are one click and the rest are two. Click a day to set the start, click again to set the end; clicking before the start begins a new range.",
          "The range is a draft until Apply, which is what separates this from the single picker: a half-picked range is a meaningless value, so it never reaches the form. Cancel restores whatever the field held before."],
        render: () => <Preview className="align-stretch pad-lg" minHeight={560}>
          <div style={{ width: 360 }}><DateRangePicker label="Claim period" defaultValue={RANGE} hint="Claims filed between these dates, inclusive." /></div>
        </Preview> },

      { id: "range-anatomy", title: "Range popover anatomy",
        render: () => <RangeDoc /> },

      { id: "range-fields", title: "Start and end fields",
        prose: ["Two pickers, one per end. Use this when the two dates are separate facts a person already knows — a coverage period, an employment span, a leave request — rather than a window they want to sweep out on a calendar. It also survives a narrow column, which the two-month popover does not.",
          "The pair is linked: the end field cannot open on a day before the start and opens on the start's month, so the only range it can produce is a valid one. Moving the start past the end clears the end rather than silently inverting the range."],
        render: () => <Preview className="align-stretch pad-lg" minHeight={520}>
          <Grid cols="minmax(0, 560px)">
            <Eg label="Filled"><DateRangeFields defaultValue={RANGE} hint="Coverage runs from the start date through the end date." /></Eg>
            <Eg label="Empty"><DateRangeFields startLabel="Coverage begins" endLabel="Coverage ends" required /></Eg>
          </Grid>
        </Preview> }
    ],
    faqs: [
      { q: "Which of the three?", a: "One date — <code>DatePicker</code>. A span the person will pick by looking at a calendar, or one they will take from a preset — <code>DateRangePicker</code>. A span whose two ends are known facts, or a form too narrow for a two-month popover — <code>DateRangeFields</code>." },
      { q: "Why does the range picker have an Apply button when the single picker does not?", a: "A single date is complete the moment it is clicked. A range is not complete until both ends are set, so committing on click would push a half-picked value into the form. Apply is the commit; Cancel restores the previous range." },
      { q: "Can someone type a date instead?", a: "Not yet. The trigger is a button, not a text input — it takes the Input field's construction, but nothing typed. Typed entry with parsing and masking is a gap; raise it before shipping a form where people arrive with the date already in hand." },
      { q: "What works from the keyboard?", a: "The grid takes a single tab stop. Arrow keys move a day at a time, up and down move a week, <code>Home</code> and <code>End</code> jump to the ends of the week, <code>PageUp</code> and <code>PageDown</code> move a month — paging the view when the focused day falls outside it. <code>Enter</code> or <code>Space</code> selects, <code>Escape</code> closes the popover." },
      { q: "What about dark mode?", a: "The selection fill, the in-range band, hover and every surface and text colour are semantic tokens, so they flip with the theme. The focus ring is <code>color.primary.50</code>, a ramp step, which is declared once and keeps its light-mode value on a dark surface." },
      { q: "Where did the Calendars page go?", a: "Here. The calendar and the pickers were documented apart while they were the same surface twice; <code>#/calendars</code> now lands on this page." }
    ]
  });
})();
