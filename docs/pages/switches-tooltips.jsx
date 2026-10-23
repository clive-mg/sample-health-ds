/* Sample Health docs — switches & tooltips, v2 token maps. Registered after
   base-d so these replace the older demo pages
   registered earlier. */
(function () {
  const SH = window.SH;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Toggle, Tooltip, Button, Input } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }];

  /* Track and knob are control dimensions, not spacing: the knob is the track
     height less a 2px inset on every side. Label and hint step with the size. */
  const TZ = {
    sm: { w: "36px", h: "20px", knob: "16px", type: ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"] },
    md: { w: "44px", h: "24px", knob: "20px", type: ["style.body.lg", "Inter \u00b7 16/24 \u00b7 400"] }
  };

  const C = {
    trackOff: ["color.neutral.100", "var(--colors-background-bg-tertiary)"],
    trackOffHover: ["color.neutral.200", "var(--colors-background-bg-quaternary)"],
    trackOn: ["color.surface.primary", "var(--colors-background-bg-brand-solid)"],
    trackOnHover: ["color.surface.primary.hover", "var(--colors-background-bg-brand-solid-hover)"],
    knob: ["color.neutral.0", "var(--colors-base-white)"],
    ring: ["color.primary.600", "var(--colors-brand-600)"],
    trackOnDisabled: ["color.primary.200", "var(--colors-brand-200)"],
    trackOffDisabled: ["color.surface.disabled", "var(--colors-background-bg-disabled)"],
    textDisabled: ["color.text.disabled", "var(--colors-text-text-disabled)"],
    label: ["color.text.secondary", "var(--colors-text-text-secondary-700)"],
    hint: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    tipSurface: ["color.surface.inverse", "var(--colors-background-bg-primary-solid)"],
    onBrand: ["color.text.on.brand", "var(--colors-text-text-primary-on-brand)"]
  };
  const col = (k, anchors, note) => tc(C[k][0], C[k][1], anchors, note);

  /* ---------------- Toggle ---------------- */
  const TOGGLE_STATES = [
    { id: "structure", label: "Structure" },
    { id: "off", label: "Off" },
    { id: "on", label: "On" },
    { id: "hover", label: "Hover" },
    { id: "focus", label: "Focused" },
    { id: "disabled", label: "Disabled" },
    { id: "off-disabled", label: "Off + disabled" }
  ];
  const TOGGLE_TEXT_STATES = [
    { id: "structure", label: "Structure" },
    { id: "text", label: "Label & hint" }
  ];

  function toggleRows(state, size) {
    const z = TZ[size] || TZ.md;
    if (state === "structure") return [
      tv("control.width", z.w, [at("track", "top", .5)]),
      tv("control.height", z.h, [at("track", "left", .5)]),
      tv("radius.full", "9999px", [at("track", "bottom", .1)]),
      tv("control.knob", z.knob + " \u00b7 track \u2212 2 insets", [at("knob", "top", .5)]),
      tv("spacing.xxs", "Knob inset \u00b7 2px", [at("knob", "left", .5)]),
      tv("shadow.sm", null, [at("knob", "bottom", .5)])
    ];
    if (state === "off") return [
      col("trackOff", [at("track", "bottom", .5)]),
      col("knob", [at("knob", "top", .5)])
    ];
    if (state === "on") return [
      col("trackOn", [at("track", "bottom", .5)]),
      col("knob", [at("knob", "top", .5)])
    ];
    if (state === "hover") return [
      col("trackOffHover", [at("track", "bottom", .5)]),
      col("trackOnHover", [at("track-on", "bottom", .5)])
    ];
    if (state === "focus") return [
      col("ring", [at("track", "bottom", .9)]),
      col("trackOn", [at("track", "top", .5)])
    ];
    if (state === "disabled") return [
      col("trackOnDisabled", [at("track", "bottom", .5)]),
      col("knob", [at("knob", "top", .5)])
    ];
    return [
      col("trackOffDisabled", [at("track", "bottom", .5)]),
      col("knob", [at("knob", "top", .5)])
    ];
  }

  function toggleTextRows(state, size) {
    const z = TZ[size] || TZ.md;
    if (state === "structure") return [
      tv("spacing.md", "Track \u2192 text \u00b7 8px", [at("text", "left", .2)]),
      tv("spacing.xxs", "Label \u2192 hint \u00b7 2px", [at("hint", "top", .1)]),
      tv(z.type[0], z.type[1], [at("label", "bottom", .6)]),
      tv("spacing.xxs", "Track offset when a hint wraps \u00b7 2px", [at("track", "top", .5)])
    ];
    return [
      col("label", [at("label", "top", .6)]),
      col("hint", [at("hint", "bottom", .6)]),
      tv(z.type[0], z.type[1], [at("hint", "top", .6)])
    ];
  }

  /* Hover and focus live in component state, so the doc freezes them with a
     class on the specimen; every other state is the real component. */
  const togCls = (state) => state === "hover" ? "sh-tog-hover" : state === "focus" ? "sh-tog-focus" : null;

  function toggleSpec(state, size) {
    if (state === "hover") return <div className="sh-tog-hover" style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Toggle size={size} />
      <Toggle size={size} defaultChecked data-sh-part="track-on" />
    </div>;
    const p = { size: size };
    if (state === "on" || state === "focus" || state === "disabled") p.defaultChecked = true;
    if (state === "disabled" || state === "off-disabled") p.disabled = true;
    return <div className={togCls(state)}><Toggle {...p} /></div>;
  }

  function toggleTextSpec(state, size) {
    return <div style={{ width: 300, maxWidth: "100%" }}>
      <Toggle size={size} defaultChecked label="Email notifications" hint="Get notified when someone messages your care team." />
    </div>;
  }

  /* ---------------- Tooltip ---------------- */
  const TIP_STATES = [
    { id: "structure", label: "Structure" },
    { id: "title", label: "Title only" }
  ];
  const TIP_SUPPORTING_STATES = [{ id: "supporting", label: "With supporting text" }];
  const PLACEMENTS = [
    { id: "top", label: "Top" },
    { id: "right", label: "Right" },
    { id: "bottom", label: "Bottom" },
    { id: "left", label: "Left" }
  ];

  function tipRows(state) {
    if (state === "structure") return [
      tv("spacing.md", "Top & bottom \u00b7 8px", [at("tip", "top", .25)]),
      tv("spacing.lg", "Left & right \u00b7 12px", [at("tip", "right", .5)]),
      tv("radius.md", "8px", [at("tip", "bottom", .08)]),
      tv("style.body.md", "Inter \u00b7 14/20 \u00b7 400", [at("tip-title", "bottom", .6)]),
      tv("shadow.lg", null, [at("tip", "bottom", .96)])
    ];
    return [
      col("tipSurface", [at("tip", "left", .5)]),
      col("onBrand", [at("tip-title", "bottom", .6)]),
      tv("style.body.md", "Inter \u00b7 14/20 \u00b7 400", [at("tip-title", "top", .6)]),
      tv("max-width", "260px", [at("tip", "right", .82)])
    ];
  }

  function tipSupportingRows() {
    return [
      tv("spacing.xs", "Title \u2192 supporting \u00b7 4px", [at("tip-supporting", "top", .12)]),
      tv("style.body.md.bold", "Title turns semibold \u00b7 14/20 \u00b7 600", [at("tip-title", "bottom", .6)]),
      tv("style.body.md", "Inter \u00b7 14/20 \u00b7 400", [at("tip-supporting", "bottom", .6)]),
      col("onBrand", [at("tip-title", "top", .6)]),
      col("tipSurface", [at("tip", "left", .5)])
    ];
  }

  function placementRows(state) {
    const edge = { top: "bottom", bottom: "top", left: "right", right: "left" }[state];
    return [
      tv("spacing.md", "Offset from the trigger \u00b7 8px", [at("tip", edge, .5)]),
      tv("radius.md", "8px", [at("tip", "bottom", .08)]),
      col("tipSurface", [at("tip", "left", .5)])
    ];
  }

  const TIP_PAD = { display: "flex", justifyContent: "center", padding: 76 };

  function tipSpec(state) {
    return <div style={TIP_PAD}>
      <Tooltip title="Copy to clipboard" open>
        <Button hierarchy="secondary" size="sm">Copy</Button>
      </Tooltip>
    </div>;
  }

  function tipSupportingSpec() {
    return <div style={TIP_PAD}>
      <Tooltip title="Keyboard shortcuts" supportingText="Press ? anywhere to view the full list of shortcuts." open>
        <Button hierarchy="secondary" size="sm">Help</Button>
      </Tooltip>
    </div>;
  }

  function placementSpec(state) {
    return <div style={TIP_PAD}>
      <Tooltip title={state[0].toUpperCase() + state.slice(1)} placement={state} open>
        <Button hierarchy="secondary" size="sm">Trigger</Button>
      </Tooltip>
    </div>;
  }

  /* ---------------- doc shells ---------------- */
  function SizeBar(props) {
    return <div className="sh-tm-sizes">
      <span className="sh-tm-lab">Size</span>
      <div className="sh-tm-seg">{SIZES.map((x) =>
        <button key={x.id} type="button" className={x.id === props.size ? "is-on" : ""}
          onClick={() => props.onSize(x.id)}>{x.label}</button>)}</div>
    </div>;
  }

  function TogDoc(props) {
    const [size, setSize] = SH.React.useState(SIZES[0].id);
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {props.states.map((s, i) => <div className="sh-tm-group" key={s.id}>
          <div className="sh-tm-head">
            <SH.StateMark>{s.label}</SH.StateMark>
            {i === 0 ? <SizeBar size={size} onSize={setSize} /> : null}
          </div>
          <SH.TokenMap sig={props.sig + "/" + s.id + "/" + size}
            rows={props.rows(s.id, size)} specimen={props.spec(s.id, size)} />
        </div>)}
      </div>
    </Preview>;
  }

  function TipDoc(props) {
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {props.states.map((s) => <div className="sh-tm-group" key={s.id}>
          <div className="sh-tm-head"><SH.StateMark>{s.label}</SH.StateMark></div>
          <SH.TokenMap sig={props.sig + "/" + s.id} rows={props.rows(s.id)} specimen={props.spec(s.id)} />
        </div>)}
      </div>
    </Preview>;
  }

  /* ---------------- pages ---------------- */
  SH.registerPage("toggles", {
    lead: "A toggle switches a single setting on or off, and the change takes effect immediately. The track is a switch button, so it answers to the pointer and to the keyboard: hover darkens it one step and focus draws a brand ring held off the track by a surface-coloured gap. Two sizes step the track, the knob and the label together.",
    sections: [
      { id: "toggle", title: "Toggle",
        prose: ["The control on its own. The track is a full-radius pill and the knob is the track height less a 2px inset on every side, so the knob size follows from the track rather than being set independently. Off and on are two surfaces of the same shape. Disabled is a lighter step of the same ramp rather than an opacity pass, so a disabled toggle still reads as on or off and keeps its own colour instead of bleeding whatever sits behind it."],
        render: () => <TogDoc sig="toggle" states={TOGGLE_STATES} rows={toggleRows} spec={toggleSpec} /> },
      { id: "toggle-text", title: "Toggle with label & hint",
        prose: ["Label and hint sit 8px right of the track and 2px apart, and they step with the size: 14/20 at sm, 16/24 at md. When a hint is present the track drops 2px so it aligns to the label's first line rather than the block."],
        render: () => <TogDoc sig="toggle-text" states={TOGGLE_TEXT_STATES} rows={toggleTextRows} spec={toggleTextSpec} /> }
    ],
    faqs: [
      { q: "Is the toggle keyboard accessible?", a: "Yes. The track is a <code>button</code> with <code>role=\"switch\"</code> and <code>aria-checked</code>, so it takes tab focus and toggles on space or enter." },
      { q: "Why is the knob size not a token?", a: "It derives from the track: track height minus the 2px inset on each side. Setting it separately would let the two drift apart." }
    ]
  });

  SH.registerPage("tooltips", {
    lead: "A tooltip reveals a short, contextual hint next to its trigger on hover or on keyboard focus. One size, one surface: a dark inverse bubble with 14px regular text and an optional second line. It is a hint, never the only place information lives.",
    sections: [
      { id: "tooltip", title: "Tooltip",
        prose: ["The bubble sits 8px from its trigger. Padding is 8/12, the radius is the md step and the shadow is the lg pair \u2014 the same elevation as a dropdown menu. Copy is 14px regular on the inverse surface — the body default, so a hint never reads smaller than the interface around it — capped at 260px so a long hint wraps rather than stretching across the layout."],
        render: () => <TipDoc sig="tooltip" states={TIP_STATES} rows={tipRows} spec={tipSpec} /> },
      { id: "tooltip-supporting", title: "With supporting text",
        prose: ["A second line adds detail 4px under the title, at the same 14px size. This is the only case where the first line turns semibold: with something beneath it, it becomes a title. Keep it to one sentence: anything longer belongs in hint text under the field."],
        render: () => <TipDoc sig="tooltip-supporting" states={TIP_SUPPORTING_STATES} rows={tipSupportingRows} spec={tipSupportingSpec} /> },
      { id: "tooltip-placements", title: "Placements",
        prose: ["Four placements, each 8px from the trigger. Nothing else changes with the placement: the same padding, radius, surface and shadow, only the edge the bubble grows from."],
        render: () => <TipDoc sig="tooltip-placement" states={PLACEMENTS} rows={placementRows} spec={placementSpec} /> },
      { id: "tooltip-triggers", title: "On real triggers",
        prose: ["Two common cases, live \u2014 hover or tab to either. An icon-only button needs a tooltip to name the action it carries; a field help icon uses one to explain a value without spending a line of hint text on it."],
        render: () => <Preview className="pad-lg"><div className="sh-row" style={{ gap: 40, alignItems: "flex-end" }}>
          <Tooltip title="Copy to clipboard"><Button hierarchy="secondary" iconOnly iconLeading={<Icon name="Copy01" size={20} />} aria-label="Copy" /></Tooltip>
          <Tooltip title="Settings" supportingText="Workspace preferences, members and billing."><Button hierarchy="secondary" iconLeading={<Icon name="Settings01" size={20} />}>Settings</Button></Tooltip>
          <div style={{ width: 220 }}><Input label="Claim number" required helpText="The number printed at the top of your claim letter." placeholder="Enter claim number" /></div>
        </div></Preview> }
    ],
    faqs: [
      { q: "Can I put a tooltip on plain text?", a: "Only if the text is focusable. A hover-only hint is invisible to keyboard and touch users, so anything essential belongs in the visible copy." },
      { q: "How do I show a tooltip on a focusable trigger?", a: "Pass <code>open</code> alongside your own focus state, which is how <code>FieldHelpIcon</code> keeps the hint up while the glyph holds focus." }
    ]
  });
})();
