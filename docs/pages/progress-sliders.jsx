/* Sample Health docs — progress indicators & sliders, v2 token maps.
   Registered after base-b / base-c so these replace the older demo pages
   registered earlier. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { ProgressBar, ProgressCircle, Slider } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  /* The unfilled track takes the published neutral surface: color.surface.disabled
     is gray 100 in light and gray 800 in dark, the exact pair the track needs. */

  const C = {
    fill: ["color.surface.primary", "var(--colors-background-bg-brand-solid)"],
    handle: ["color.surface.default", "var(--colors-background-bg-primary)"],
    handleBorder: ["color.border.primary", "var(--colors-border-border-brand)"],
    halo: ["color.primary.50", "var(--colors-brand-50)"],
    tick: ["color.border.default", "var(--colors-border-border-primary)"],
    label: ["color.text.secondary", "var(--colors-text-text-secondary-700)"],
    ends: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    value: ["color.text.primary", "var(--colors-text-text-primary-900)"],
    tipSurface: ["color.surface.inverse", "var(--colors-background-bg-primary-solid)"],
    onBrand: ["color.text.on.brand", "var(--colors-text-text-primary-on-brand)"],
    success: ["color.success.600", "var(--colors-success-600)"],
    warning: ["color.warning.600", "var(--colors-warning-600)"],
    error: ["color.error.600", "var(--colors-error-600)"]
  };
  const col = (k, anchors, note) => tc(C[k][0], C[k][1], anchors, note);
  const BODY_MD = ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"];

  /* ---------------- shared doc shell ---------------- */
  function Seg(props) {
    return <div className="sh-tm-sizes">
      <span className="sh-tm-lab">{props.label || "Size"}</span>
      <div className="sh-tm-seg">{props.options.map((x) =>
        <button key={x.id} type="button" className={x.id === props.value ? "is-on" : ""}
          onClick={() => props.onChange(x.id)}>{x.label}</button>)}</div>
    </div>;
  }

  function MapDoc(props) {
    const [size, setSize] = React.useState(props.sizes ? props.sizes[0].id : null);
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {props.states.map((s, i) => <div className="sh-tm-group" key={s.id}>
          <div className="sh-tm-head">
            <SH.StateMark>{s.label}</SH.StateMark>
            {i === 0 && props.sizes ? <Seg options={props.sizes} value={size} onChange={setSize} label={props.sizeLabel} /> : null}
          </div>
          <SH.TokenMap sig={props.sig + "/" + s.id + "/" + size}
            rows={props.rows(s.id, size)} specimen={props.spec(s.id, size)} />
        </div>)}
      </div>
    </Preview>;
  }

  const CIRCLE_SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }, { id: "lg", label: "lg" }, { id: "xl", label: "xl" }];

  /* ---------------- Progress bar ---------------- */
  const BAR_STATES = [
    { id: "structure", label: "Structure" },
    { id: "colour", label: "Track & fill" }
  ];
  const BAR_LABEL_STATES = [
    { id: "right", label: "Label right" },
    { id: "bottom", label: "Label bottom" }
  ];
  const BAR_STATUS_STATES = [
    { id: "success", label: "Success" },
    { id: "warning", label: "Warning" },
    { id: "error", label: "Error" }
  ];

  /* Kept well inside the stage so the connector elbows have room to land
     without crossing the specimen. */
  const barWrap = (children) => <div style={{ width: 210, maxWidth: "100%" }}>{children}</div>;

  function barRows(state, size) {
    if (state === "structure") return [
      tv("control.height", "8px track", [at("track", "top", .5)]),
      tv("radius.full", "9999px \u00b7 track and fill", [at("track", "left", .2)]),
      tv("width", "Fill \u00b7 value \u00f7 max, as a percentage", [at("fill", "bottom", .5)]),
      tv("transition", "width 200ms ease", [at("fill", "top", .7)])
    ];
    return [
      tc("color.surface.disabled", "var(--colors-background-bg-disabled)", [at("track", "left", .5)]),
      col("fill", [at("fill", "bottom", .4)])
    ];
  }
  function barSpec() {
    return barWrap(<ProgressBar value={60} />);
  }

  function barLabelRows(state) {
    if (state === "right") return [
      tv("spacing.lg", "Track \u2192 label \u00b7 12px", [at("track", "right", .5)]),
      tv(BODY_MD[0], BODY_MD[1], [at("label", "left", .25)]),
      col("label", [at("label", "left", .75)])
    ];
    return [
      tv("spacing.md", "Track \u2192 label \u00b7 8px", [at("track", "bottom", .5)]),
      tv(BODY_MD[0], BODY_MD[1], [at("label", "left", .25)]),
      col("label", [at("label", "left", .75)])
    ];
  }
  function barLabelSpec(state) {
    return barWrap(<ProgressBar value={state === "right" ? 45 : 80} label={state} />);
  }

  function barStatusRows(state) {
    return [
      col(state, [at("fill", "bottom", .5)]),
      tc("color.surface.disabled", "var(--colors-background-bg-disabled)", [at("track", "left", .5)])
    ];
  }
  function barStatusSpec(state) {
    return barWrap(<ProgressBar value={state === "success" ? 100 : state === "warning" ? 72 : 35} color={state} />);
  }

  /* ---------------- Progress circle ---------------- */
  const CIRCLE_D = { sm: "64px", md: "80px", lg: "120px", xl: "160px" };
  const CIRCLE_TYPE = {
    sm: ["style.body.sm.bold", "Inter \u00b7 12/18 \u00b7 700"],
    md: ["style.heading.h6", "Inter \u00b7 16/20 \u00b7 600"],
    lg: ["style.heading.h3", "Inter \u00b7 24/28 \u00b7 600"],
    xl: ["style.heading.h2", "Inter \u00b7 30/36 \u00b7 600"]
  };
  const CIRCLE_STATES = [
    { id: "structure", label: "Structure" },
    { id: "colour", label: "Track & fill" }
  ];
  const GAUGE_STATES = [{ id: "half", label: "Half-circle gauge" }];
  const CIRCLE_BARE_STATES = [{ id: "bare", label: "No label" }];

  function circleRows(state, size) {
    const t = CIRCLE_TYPE[size] || CIRCLE_TYPE.md;
    if (state === "structure") return [
      tv("control.size", CIRCLE_D[size] + " diameter", [at("root", "top", .5)]),
      tv("stroke", "8px \u00b7 track and fill", [at("track", "left", .5)]),
      tv(t[0], t[1], [at("label", "bottom", .5)]),
      tv("stroke-dashoffset", "Circumference \u00d7 (1 \u2212 value \u00f7 max)", [at("fill", "bottom", .2)])
    ];
    return [
      tc("color.surface.disabled", "var(--colors-background-bg-disabled)", [at("track", "left", .5)]),
      col("fill", [at("fill", "top", .5)]),
      col("value", [at("label", "bottom", .5)])
    ];
  }
  function circleSpec(state, size) {
    return <ProgressCircle value={68} size={size} />;
  }

  function gaugeRows(state, size) {
    const t = CIRCLE_TYPE[size] || CIRCLE_TYPE.md;
    return [
      tv("control.size", CIRCLE_D[size] + " wide \u00b7 half as tall", [at("root", "top", .5)]),
      tv("stroke-dasharray", "\u03c0r \u00b7 a 180\u00b0 arc, left to right", [at("fill", "left", .5)]),
      tv(t[0], t[1], [at("label", "bottom", .5)]),
      col("fill", [at("root", "bottom", .3)])
    ];
  }
  function gaugeSpec(state, size) {
    return <ProgressCircle value={68} size={size} variant="half" />;
  }

  function bareRows(state, size) {
    return [
      tv("control.size", CIRCLE_D[size] + " diameter", [at("root", "top", .5)]),
      col("fill", [at("fill", "left", .5)]),
      tc("color.surface.disabled", "var(--colors-background-bg-disabled)", [at("track", "right", .5)])
    ];
  }
  function bareSpec(state, size) {
    return <ProgressCircle value={68} size={size} showLabel={false} />;
  }

  /* ---------------- Slider ---------------- */
  const SLIDER_STATES = [
    { id: "structure", label: "Structure" },
    { id: "colour", label: "Track, fill & handle" }
  ];
  const SLIDER_INTERACTION_STATES = [
    { id: "rest", label: "Rest" },
    { id: "hover", label: "Hover" },
    { id: "focus", label: "Focused" },
    { id: "drag", label: "Dragging" },
    { id: "disabled", label: "Disabled" }
  ];

  const sldWrap = (children, pad) => <div style={{ width: 230, maxWidth: "100%", paddingTop: pad || 0 }}>{children}</div>;

  function sliderRows(state) {
    if (state === "structure") return [
      tv("control.height", "8px track", [at("track", "top", .25)]),
      tv("control.size", "24px handle", [at("handle", "top", .5)]),
      tv("radius.full", "9999px \u00b7 track, fill and handle", [at("track", "left", .2)]),
      tv("border-width", "1.5px \u00b7 Foundations publishes no border-width token", [at("handle", "bottom", .5)]),
      tv("shadow.sm", null, [at("handle", "right", .5)])
    ];
    return [
      tc("color.surface.disabled", "var(--colors-background-bg-disabled)", [at("track", "left", .5)]),
      col("fill", [at("fill", "bottom", .4)]),
      col("handle", [at("handle", "top", .5)]),
      col("handleBorder", [at("handle", "bottom", .5)])
    ];
  }
  function sliderSpec() {
    return sldWrap(<Slider defaultValue={55} />);
  }

  /* Hover, focus and drag are component state, so the diagram freezes the halo
     with a class on the specimen; the tooltip is shown by prop. */
  function interactionRows(state) {
    if (state === "rest") return [
      col("handle", [at("handle", "top", .5)]),
      col("handleBorder", [at("handle", "bottom", .5)]),
      tv("shadow.sm", null, [at("handle", "right", .5)])
    ];
    if (state === "hover") return [
      col("halo", [at("handle", "top", .5)], "Hover, focus and drag light the same halo; only the cursor and the tooltip differ."),
      tv("cursor", "grab", [at("handle", "bottom", .5)])
    ];
    if (state === "focus") return [
      col("halo", [at("handle", "top", .5)]),
      tv("shadow.sm", "Kept under the halo", [at("handle", "bottom", .5)]),
      tv("outline", "none \u00b7 the halo is the focus indicator", [at("handle", "right", .5)])
    ];
    if (state === "drag") return [
      col("halo", [at("handle", "top", .5)]),
      tv("cursor", "grabbing", [at("handle", "bottom", .5)]),
      col("fill", [at("fill", "bottom", .5)])
    ];
    return [
      tv("opacity", "60%", [at("root", "left", .5)], "Disabled is an opacity pass over the whole control, not a token \u2014 the fill keeps its brand colour."),
      tv("cursor", "not-allowed", [at("handle", "bottom", .5)])
    ];
  }
  function interactionSpec(state) {
    const lit = state === "hover" || state === "focus" || state === "drag";
    return <div className={lit ? "sh-sld-lit" : null}>
      {sldWrap(<Slider defaultValue={55} disabled={state === "disabled"} />)}
    </div>;
  }

  const TOOLTIP_STATES = [{ id: "tooltip", label: "Value tooltip" }];
  function tooltipRows() {
    return [
      tv("spacing.md", "Handle \u2192 bubble \u00b7 8px", [at("tooltip", "bottom", .5)]),
      tv("spacing.md / spacing.lg", "Bubble padding \u00b7 8px / 12px", [at("tooltip", "left", .25)]),
      tv("radius.md", "8px", [at("tooltip", "top", .1)]),
      col("tipSurface", [at("tooltip", "left", .6)]),
      col("onBrand", [at("tooltip", "bottom", .85)]),
      tv("shadow.lg", null, [at("tooltip", "bottom", .15)])
    ];
  }
  function tooltipSpec() {
    return sldWrap(<Slider defaultValue={40} tooltip="always" formatValue={(v) => "$" + v + "k"} />, 76);
  }

  const ENDS_STATES = [{ id: "ends", label: "Min & max labels" }];
  function endsRows() {
    return [
      tv("spacing.md", "Track \u2192 labels \u00b7 8px", [at("min", "top", .5)]),
      tv(BODY_MD[0], BODY_MD[1], [at("min", "bottom", .5)]),
      col("ends", [at("max", "left", .75)])
    ];
  }
  function endsSpec() {
    return sldWrap(<Slider defaultValue={55} endLabels formatValue={(v) => v + "%"} />);
  }

  const RANGE_STATES = [{ id: "range", label: "Two handles" }];
  function rangeRows() {
    return [
      tv("width", "Fill spans handle to handle", [at("fill", "top", .5)]),
      col("fill", [at("fill", "bottom", .5)]),
      col("handle", [at("handle", "top", .5)]),
      col("handleBorder", [at("handle-end", "top", .5)]),
      tv("aria-valuemax", "Each handle is bounded by the other", [at("handle-end", "bottom", .5)])
    ];
  }
  function rangeSpec() {
    return sldWrap(<Slider range defaultValue={[25, 70]} />);
  }

  const TICK_STATES = [{ id: "ticks", label: "Steps & ticks" }];
  function tickRows() {
    return [
      tv("step", "Values snap to the step \u00b7 10 here", [at("fill", "top", .35)]),
      tv("spacing.md", "Track \u2192 ticks \u00b7 8px", [at("ticks", "top", .15)]),
      tv("control.size", "Tick \u00b7 2 \u00d7 4px, full radius", [at("ticks", "bottom", .3)]),
      col("tick", [at("ticks", "bottom", .6)])
    ];
  }
  function tickSpec() {
    return sldWrap(<Slider defaultValue={60} step={10} ticks />);
  }

  /* ---------------- live compositions ---------------- */
  function UploadRow() {
    const [pct, setPct] = React.useState(64);
    React.useEffect(() => {
      const t = setInterval(() => setPct((p) => (p >= 100 ? 24 : p + 4)), 700);
      return () => clearInterval(t);
    }, []);
    return <div style={{ width: 380, maxWidth: "100%", display: "flex", gap: 16, padding: 16, borderRadius: "var(--radius-xl-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)" }}>
      <Icon name="File05" size={20} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, lineHeight: "20px", color: "var(--colors-text-text-secondary-700)" }}>Lab results.pdf</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)", marginBottom: 8 }}>2.4 MB</div>
        <ProgressBar value={pct} label="right" />
      </div>
    </div>;
  }

  function OnboardingCard() {
    return <div style={{ width: 300, maxWidth: "100%", display: "flex", gap: 20, alignItems: "center", padding: 20, borderRadius: "var(--radius-xl-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)" }}>
      <ProgressCircle value={75} size="sm" />
      <div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, lineHeight: "20px", color: "var(--colors-text-text-primary-900)" }}>Set up your profile</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>3 of 4 steps done</div>
      </div>
    </div>;
  }

  function FilterPanel() {
    const [price, setPrice] = React.useState([40, 180]);
    const [radius, setRadius] = React.useState(15);
    return <div style={{ width: 320, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 32, padding: 24, borderRadius: "var(--radius-xl-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px" }}>
          <span style={{ fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>Visit cost</span>
          <span style={{ fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>${price[0]} – ${price[1]}</span>
        </div>
        <Slider range min={0} max={250} step={5} value={price} onChange={setPrice} endLabels formatValue={(v) => "$" + v} />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px" }}>
          <span style={{ fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>Distance</span>
          <span style={{ fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{radius} miles</span>
        </div>
        <Slider min={0} max={50} step={5} value={radius} onChange={setRadius} ticks />
      </div>
    </div>;
  }

  /* ---------------- pages ---------------- */
  SH.registerPage("progress-indicators", {
    lead: "A progress indicator reports how far a task has got: a linear bar for anything inline, a circular ring or half gauge where the number is the point. Both read the same two surfaces \u2014 a neutral track and a brand fill \u2014 and both carry the progressbar role with a live value, so the number is announced as it changes.",
    sections: [
      { id: "bar", title: "Progress bar",
        prose: ["One track height, 8px, at full radius. The fill is a percentage of value over max, animated over 200ms, so a value arriving in steps still reads as motion rather than a jump."],
        render: () => <MapDoc sig="bar" states={BAR_STATES} rows={barRows} spec={barSpec} /> },
      { id: "bar-label", title: "Label positions",
        prose: ["The percentage sits 12px right of the track, or 8px under its right edge when the bar needs the full width. Both are 14px regular in secondary text \u2014 the reading is support for the bar, not a headline."],
        render: () => <MapDoc sig="bar-label" states={BAR_LABEL_STATES} rows={barLabelRows} spec={barLabelSpec} /> },
      { id: "bar-status", title: "Status fills",
        prose: ["The fill can take a status ramp step where progress carries a verdict: success when a task completes, warning as a quota fills, error when it is exceeded. The track never changes. Use these sparingly \u2014 a bar that is merely in progress stays brand.",
          "These are ramp steps, not semantic tokens, so they do not invert in dark mode. A semantic status-fill token would be the fix; it is a gap in Foundations today."],
        render: () => <MapDoc sig="bar-status" states={BAR_STATUS_STATES} rows={barStatusRows} spec={barStatusSpec} /> },
      { id: "circle", title: "Progress circle",
        prose: ["Four diameters: 64, 80, 120 and 160px, all with an 8px stroke. The centred percentage is a type-scale step rather than a fraction of the diameter \u2014 12/700, then 16, 24 and 30 at 600 \u2014 so it matches the text around it at every size."],
        render: () => <MapDoc sig="circle" sizes={CIRCLE_SIZES} states={CIRCLE_STATES} rows={circleRows} spec={circleSpec} /> },
      { id: "gauge", title: "Half-circle gauge",
        prose: ["The same ring drawn as a 180\u00b0 arc, filling left to right, in a box half as tall. It suits a dashboard tile where a full circle would leave a hole in the layout; the label sits on the arc's baseline."],
        render: () => <MapDoc sig="gauge" sizes={CIRCLE_SIZES} states={GAUGE_STATES} rows={gaugeRows} spec={gaugeSpec} /> },
      { id: "circle-bare", title: "Circle without a label",
        prose: ["Drop the label when the number is already on screen beside the ring, or when the ring is small enough that 12px would crowd it."],
        render: () => <MapDoc sig="circle-bare" sizes={CIRCLE_SIZES} states={CIRCLE_BARE_STATES} rows={bareRows} spec={bareSpec} /> },
      { id: "context", title: "In context",
        prose: ["An upload row pairs the bar with a right label, where it has to share a line with the file name. A completeness card uses the small ring, where the percentage is the message."],
        render: () => <Preview className="pad-lg"><div className="sh-row" style={{ gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
          <UploadRow /><OnboardingCard />
        </div></Preview> }
    ],
    faqs: [
      { q: "Bar or circle?", a: "Use the bar inline \u2014 in a list row, under a heading, inside a card \u2014 where it can take the full width. Use the circle when the percentage itself is the content, such as a completeness score or a dashboard tile." },
      { q: "Is the value announced to screen readers?", a: "Yes. Both carry <code>role=\"progressbar\"</code> with <code>aria-valuenow</code>, <code>aria-valuemin</code> and <code>aria-valuemax</code>, so the value is announced as it changes." },
      { q: "Why is the circle label not scaled from the diameter?", a: "It used to be \u2014 size \u00d7 0.22 produced 12.3, 17.6 and 26.4px, none of which are on the type scale. The label now steps 12 / 16 / 24 / 30 with the diameter." }
    ]
  });

  SH.registerPage("sliders", {
    lead: "A slider picks a value from a continuous range by dragging the handle, clicking the track, or holding focus and using the arrow keys. One track, one handle; a tooltip, end labels, ticks and a second handle are all additions to that base rather than separate controls.",
    sections: [
      { id: "slider", title: "Track & handle",
        prose: ["An 8px track with a 24px handle centred on it. The handle is a white surface with a 1.5px brand border and the sm shadow, so it stays legible where it overlaps the fill."],
        render: () => <MapDoc sig="slider" states={SLIDER_STATES} rows={sliderRows} spec={sliderSpec} /> },
      { id: "states", title: "States",
        prose: ["Hover, focus and drag light the same soft brand halo; what changes between them is the cursor \u2014 grab, then grabbing. Pointer-down moves focus to the handle, so a drag can be finished with the arrow keys. Disabled is an opacity pass over the whole control."],
        render: () => <MapDoc sig="slider-state" states={SLIDER_INTERACTION_STATES} rows={interactionRows} spec={interactionSpec} /> },
      { id: "tooltip", title: "Value tooltip",
        prose: ["A bubble above the handle carries the current value, on the same inverse surface, padding and shadow as the Tooltip component. Set it to appear on hover and focus, or to stay up while the slider is on screen; pass a formatter to add a unit."],
        render: () => <MapDoc sig="slider-tooltip" states={TOOLTIP_STATES} rows={tooltipRows} spec={tooltipSpec} /> },
      { id: "ends", title: "Min & max labels",
        prose: ["End labels name the bounds 8px under the track, in 14px regular tertiary text. They answer what the range is; the tooltip or a readout above the track answers where you are in it."],
        render: () => <MapDoc sig="slider-ends" states={ENDS_STATES} rows={endsRows} spec={endsSpec} /> },
      { id: "range", title: "Range",
        prose: ["Two handles bound a span, and the fill runs between them rather than from the start of the track. Each handle takes the other as its limit, in the drag and in aria, so they cannot cross."],
        render: () => <MapDoc sig="slider-range" states={RANGE_STATES} rows={rangeRows} spec={rangeSpec} /> },
      { id: "ticks", title: "Steps & ticks",
        prose: ["A step snaps every value, whether it arrives by pointer or by arrow key. Ticks draw that step 8px under the track as 2\u00d74px marks. Keep them to a dozen or so \u2014 past that they read as a texture, not as positions."],
        render: () => <MapDoc sig="slider-ticks" states={TICK_STATES} rows={tickRows} spec={tickSpec} /> },
      { id: "context", title: "In context",
        prose: ["A filter panel, live. The cost range pairs two handles with end labels and a readout in the field label; the distance slider steps in fives and shows its ticks. Tab into either and use the arrow keys."],
        render: () => <Preview className="pad-lg"><FilterPanel /></Preview> }
    ],
    faqs: [
      { q: "Which keys move the handle?", a: "Left and down decrease by one step, right and up increase by one. Page up and page down move ten steps, home and end jump to the bounds." },
      { q: "Slider or number input?", a: "A slider is for an approximate value where the trade-off matters more than the digits. When people know the exact number they want \u2014 a dose, a claim amount \u2014 give them a field, or pair the slider with one." },
      { q: "Why does the handle no longer use the slider component tokens?", a: "The handle read <code>--component-colors-components-sliders-*</code>. It now takes <code>color.surface.default</code> and <code>color.border.primary</code> from Foundations, both of which flip with the theme, so the handle inverts in dark mode without the component layer." }
    ]
  });
})();
