/* Sample Health docs — form fields, v2 token maps: inputs and select. Registered
   after base-a / base-b so these replace the older demo
   pages registered earlier. */
(function () {
  const SH = window.SH;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Input, Select, MultiSelect, TextArea, FieldHelpIcon } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }];

  /* Label, field text and hint share one size per step. Height is derived:
     block padding ×2 + line height, with the 1px border as an inset shadow. */
  const FZ = {
    sm: { py: ["spacing.md", "8px"], px: ["spacing.lg", "12px"], height: "36px", icon: "16px",
      type: ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"], bold: ["style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600"] },
    md: { py: ["spacing.md", "8px"], px: ["spacing.xl", "16px"], height: "40px", icon: "20px",
      type: ["style.body.lg", "Inter \u00b7 16/24 \u00b7 400"], bold: ["style.body.lg.bold", "Inter \u00b7 16/24 \u00b7 600"] }
  };

  const C = {
    border: ["color.border.default", "var(--colors-border-border-primary)"],
    borderBrand: ["color.border.primary", "var(--colors-border-border-brand)"],
    borderError: ["color.border.error", "var(--colors-border-border-error)"],
    surface: ["color.surface.default", "var(--colors-background-bg-primary)"],
    surfaceHover: ["color.surface.hover", "var(--colors-background-bg-primary-hover)"],
    surfaceDisabled: ["color.surface.disabled", "var(--colors-background-bg-disabled)"],
    tint: ["color.primary.50", "var(--colors-brand-50)"],
    tintFill: ["color.surface.primary", "var(--colors-background-bg-brand-solid)"],
    glyph: ["color.text.on.brand", "var(--colors-text-text-primary-on-brand)"],
    ring: ["color.primary.50", "var(--colors-brand-50)"],
    ringError: ["color.error.100", "var(--colors-error-100)"],
    value: ["color.text.primary", "var(--colors-text-text-primary-900)"],
    placeholder: ["color.text.placeholder", "var(--colors-text-text-placeholder)"],
    label: ["color.text.secondary", "var(--colors-text-text-secondary-700)"],
    hint: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    hintError: ["color.text.status.error", "var(--colors-text-text-error-primary-600)"],
    disabled: ["color.text.disabled", "var(--colors-text-text-disabled)"],
    req: ["color.error.600", "var(--colors-error-600)"],
    brandText: ["color.text.link", "var(--colors-text-text-brand-tertiary-600)"],
    tipSurface: ["color.surface.inverse", "var(--colors-background-bg-primary-solid)"],
    icon: ["color.text.placeholder", "var(--colors-text-text-placeholder)"],
    iconBrand: ["color.primary.600", "var(--colors-foreground-fg-brand-primary-600)"]
  };
  const col = (k, anchors, note) => tc(C[k][0], C[k][1], anchors, note);

  const FIELD_STATES = [
    { id: "structure", label: "Structure" },
    { id: "placeholder", label: "Placeholder" },
    { id: "filled", label: "Filled" },
    { id: "hover", label: "Hover" },
    { id: "focus", label: "Focused" },
    { id: "disabled", label: "Disabled" },
    { id: "hint", label: "With label & hint text" }
  ];
  const ICON_STATES = [
    { id: "structure", label: "Structure" },
    { id: "placeholder", label: "Placeholder" },
    { id: "filled", label: "Filled" },
    { id: "focus", label: "Focused" }
  ];
  const ERROR_STATES = [
    { id: "error", label: "Error" },
    { id: "focus", label: "Focused" },
    { id: "hint", label: "Error message" }
  ];
  const MENU_STATES = [
    { id: "structure", label: "Structure" },
    { id: "item", label: "Option" },
    { id: "hover", label: "Hover" },
    { id: "selected", label: "Selected" }
  ];

  /* ---- rows: the field box, shared by Input and Select ---- */
  function fieldRows(state, size, opts) {
    const z = FZ[size] || FZ.md;
    const o = opts || {};
    if (state === "structure") {
      const rows = [
        tv(z.py[0], "Top & bottom \u00b7 " + z.py[1], [at("field", "top", .34), at("field", "bottom", .34)]),
        tv(z.px[0], "Left & right \u00b7 " + z.px[1], [at("field", "left", .5), at("field", "right", .5)]),
        tv("radius.md", "8px", [at("field", "bottom", .06)]),
        tv("border.width", "1px", [at("field", "top", .82)]),
        tv(z.type[0], z.type[1], [at("text", "bottom", .6)]),
        tv("shadow.xs", null, [at("field", "bottom", .96)])
      ];
      if (o.icon) rows.splice(4, 0,
        tv("icon.size", z.icon, [at("icon", "top", .5)]),
        tv("spacing.md", "gap \u00b7 8px", [at("icon", "right", .5)]));
      if (o.chevron) rows.splice(4, 0,
        tv("icon.size", z.icon, [at("chevron", "top", .5)]),
        tv("spacing.md", "gap \u00b7 8px", [at("chevron", "left", .5)]));
      return rows;
    }
    if (state === "placeholder") {
      const rows = [
        col("border", [at("field", "left", .5)]),
        col("surface", [at("field", "bottom", .08)]),
        col("placeholder", [at("text", "bottom", .6)])
      ];
      if (o.icon) rows.push(col("icon", [at("icon", "bottom", .5)]));
      if (o.chevron) rows.push(col("icon", [at("chevron", "bottom", .5)]));
      return rows;
    }
    if (state === "filled") {
      const rows = [col("value", [at("text", "bottom", .6)]), col("border", [at("field", "left", .5)])];
      if (o.icon) rows.push(col("icon", [at("icon", "bottom", .5)]));
      return rows;
    }
    if (state === "hover") return [
      col("surfaceHover", [at("field", "bottom", .3)]),
      col("border", [at("field", "left", .5)])
    ];
    if (state === "focus") return o.error
      ? [col("borderError", [at("field", "left", .5)]), col("ringError", [at("field", "bottom", .92)])]
      : [col("borderBrand", [at("field", "left", .5)]), col("ring", [at("field", "bottom", .92)])];
    if (state === "disabled") return [
      col("surfaceDisabled", [at("field", "bottom", .3)]),
      col("disabled", [at("text", "bottom", .6)]),
      col("border", [at("field", "left", .5)])
    ];
    if (state === "error") return [
      col("borderError", [at("field", "left", .5)]),
      col("surface", [at("field", "bottom", .08)]),
      col("hintError", [at("hint", "bottom", .6)])
    ];
    /* hint / label */
    const rows = [
      tv("spacing.sm", "gap \u00b7 6px", [at("field", "top", .12), at("hint", "top", .12)]),
      tv(z.bold[0], z.bold[1], [at("label", "bottom", .6)]),
      col("label", [at("label", "top", .6)]),
      col(o.error ? "hintError" : "hint", [at("hint", "bottom", .6)])
    ];
    if (o.required) rows.push(col("req", [at("req", "top", .5)]));
    return rows;
  }

  function menuRows(state, size) {
    const z = FZ[size] || FZ.md;
    if (state === "structure") return [
      tv("spacing.xs", "Menu padding \u00b7 4px", [at("menu", "top", .12), at("menu", "bottom", .12)]),
      tv("spacing.xs", "Offset from the field \u00b7 4px", [at("menu", "left", .04)]),
      tv("radius.md", "8px", [at("menu", "bottom", .04)]),
      tv("spacing.md", "Option \u00b7 top & bottom \u00b7 8px", [at("item", "top", .4)]),
      tv("spacing.lg", "Option \u00b7 left & right \u00b7 12px", [at("item", "left", .5)]),
      tv("radius.sm", "6px", [at("item", "bottom", .12)]),
      tv("shadow.lg", null, [at("menu", "bottom", .97)])
    ];
    if (state === "item") return [
      col("value", [at("item", "bottom", .6)]),
      tv(z.type[0], z.type[1], [at("item", "top", .6)])
    ];
    if (state === "hover") return [col("surfaceHover", [at("item", "bottom", .35)])];
    return [
      col("tint", [at("item-selected", "left", .5)]),
      tv(z.bold[0], z.bold[1], [at("item-selected", "bottom", .6)]),
      col("value", [at("item-selected", "top", .6)])
    ];
  }

  /* ---- multiselect menu ---- */
  const MULTI_STATES = [
    { id: "structure", label: "Structure" },
    { id: "item", label: "Option" },
    { id: "selected", label: "Selected" },
    { id: "all", label: "\"All\" row" },
    { id: "clear", label: "Clear action" }
  ];

  function multiRows(state, size) {
    const z = FZ[size] || FZ.md;
    if (state === "structure") return [
      tv("spacing.xs", "Menu padding \u00b7 4px", [at("menu", "top", .1)]),
      tv("spacing.md", "Row \u00b7 top & bottom \u00b7 8px", [at("item", "top", .4)]),
      tv("spacing.lg", "Row \u00b7 left & right \u00b7 12px", [at("item", "left", .5)]),
      tv("spacing.md", "gap \u00b7 8px", [at("box", "right", .5)]),
      tv("control.size", "20px", [at("box", "top", .5)]),
      tv("radius.sm", "6px", [at("item", "bottom", .12)]),
      tv(z.type[0], z.type[1], [at("item", "bottom", .6)])
    ];
    if (state === "item") return [
      col("value", [at("item", "bottom", .6)]),
      tv(z.type[0], z.type[1], [at("item", "top", .6)]),
      col("border", [at("item", "right", .5)])
    ];
    if (state === "selected") return [
      col("tint", [at("item-selected", "left", .5)]),
      tv(z.bold[0], z.bold[1], [at("item-selected", "bottom", .6)]),
      col("tintFill", [at("item-selected", "top", .5)]),
      col("glyph", [at("item-selected", "top", .2)])
    ];
    if (state === "all") return [
      tv("control.size", "20px", [at("box", "top", .5)]),
      col("tintFill", [at("box", "left", .5)]),
      col("glyph", [at("box", "bottom", .5)]),
      tv(z.type[0], z.type[1], [at("all", "bottom", .75)])
    ];
    return [
      col("brandText", [at("clear", "bottom", .6)]),
      tv(z.bold[0], z.bold[1], [at("clear", "top", .6)]),
      tv("spacing.md", "Top & bottom \u00b7 8px", [at("clear", "top", .25)]),
      tv("spacing.lg", "Left & right \u00b7 12px", [at("clear", "left", .5)])
    ];
  }

  /* ---- specimens ---- */
  /* Hover and focus live in component state, so the doc paints them with a class
     on the field; every other state is the real component in that state. */
  const simCls = (state, error) => state === "hover" ? "sh-field-hover"
    : state === "focus" ? (error ? "sh-field-focus-error" : "sh-field-focus") : null;
  const OPTS = [{ value: "ca", label: "California" }, { value: "ny", label: "New York" }, { value: "tx", label: "Texas" }, { value: "wa", label: "Washington" }];

  function inputSpec(state, size, opts) {
    const o = opts || {};
    const z = FZ[size] || FZ.md;
    const withText = state === "hint" || o.error;
    const p = { size: size, placeholder: "olivia@samplehealth.com" };
    if (o.icon) p.iconLeading = <Icon name="Mail01" size={parseInt(z.icon, 10)} />;
    if (state === "filled") p.defaultValue = "olivia@samplehealth.com";
    if (state === "disabled") { p.disabled = true; p.defaultValue = "olivia@samplehealth.com"; }
    if (o.error) { p.error = true; p.defaultValue = "olivia@samplehealth"; }
    if (withText) {
      p.label = "Email address";
      p.required = state === "hint" && !o.error;
      p.hint = o.error ? "Enter a valid email address." : "We will only use this to send receipts.";
    }
    return <div className={simCls(state, o.error)} style={{ width: 240, maxWidth: "100%" }}><Input {...p} /></div>;
  }

  function selectSpec(state, size) {
    const p = { size: size, options: OPTS, placeholder: "Select a state" };
    if (state === "filled" || state === "disabled") p.defaultValue = "ny";
    if (state === "disabled") p.disabled = true;
    if (state === "hint") { p.label = "State"; p.required = true; p.hint = "Where the practice is registered."; }
    return <div className={simCls(state)} style={{ width: 240, maxWidth: "100%" }}><Select {...p} /></div>;
  }

  function menuSpec(state, size) {
    return <div className={state === "hover" ? "sh-menu-hover" : null} style={{ width: 240, maxWidth: "100%", minHeight: 216 }}>
      <Select size={size} options={OPTS} defaultValue="ny" defaultOpen />
    </div>;
  }

  const MULTI_OPTS = [
    { value: "visit", label: "Doctor Visit" }, { value: "hospital", label: "Hospital Care" },
    { value: "lab", label: "Lab or Tests" }, { value: "imaging", label: "Imaging" },
    { value: "therapy", label: "Physical Therapy" }, { value: "rx", label: "Prescription Medication" }
  ];

  function multiSpec(state, size) {
    const partial = ["visit", "hospital", "therapy"];
    const chosen = state === "all" ? MULTI_OPTS.map((o) => o.value) : partial;
    return <div style={{ width: 260, maxWidth: "100%", minHeight: 300 }}>
      <MultiSelect size={size} options={MULTI_OPTS} defaultValue={chosen} defaultOpen />
    </div>;
  }

  /* ---- help icon: the label-row variant, shared by Input and Select ---- */
  const HELP_STATES = [
    { id: "structure", label: "Structure" },
    { id: "tooltip", label: "Tooltip" }
  ];

  function helpRows(state, size) {
    const z = FZ[size] || FZ.md;
    if (state === "structure") return [
      tv("icon.size", "16px", [at("help", "top", .5)]),
      tv("spacing.sm", "gap \u00b7 6px", [at("help", "left", .5)]),
      tv(z.bold[0], z.bold[1], [at("label", "bottom", .6)]),
      col("icon", [at("help", "bottom", .5)]),
      col("label", [at("label", "top", .6)]),
      col("req", [at("req", "top", .5)])
    ];
    return [
      col("tipSurface", [at("tip", "left", .5)]),
      col("glyph", [at("tip", "bottom", .6)]),
      tv("style.body.sm.bold", "Inter \u00b7 12/18 \u00b7 700", [at("tip", "top", .6)]),
      tv("spacing.md", "Top & bottom \u00b7 8px", [at("tip", "top", .22)]),
      tv("spacing.lg", "Left & right \u00b7 12px", [at("tip", "right", .5)]),
      tv("radius.md", "8px", [at("tip", "bottom", .08)]),
      tv("shadow.lg", null, [at("tip", "bottom", .96)])
    ];
  }

  function helpSpec(copy) {
    return function (state, size) {
      if (state === "tooltip") return <div style={{ width: 240, maxWidth: "100%", paddingTop: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span data-sh-part="label" style={{ fontFamily: "var(--font-body)", fontSize: size === "sm" ? 14 : 16, lineHeight: size === "sm" ? "20px" : "24px", fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>{copy.label}</span>
          <FieldHelpIcon text={copy.help} defaultOpen />
        </div>
      </div>;
      const p = { size: size, label: copy.label, required: true, helpText: copy.help, placeholder: copy.placeholder };
      return <div style={{ width: copy.rows ? 260 : 240, maxWidth: "100%" }}>
        {copy.rows ? <TextArea {...p} rows={copy.rows} /> : copy.options ? <Select {...p} options={copy.options} /> : <Input {...p} />}
      </div>;
    };
  }

  const inputHelpSpec = helpSpec({ label: "Claim number", help: "The number printed at the top of your claim letter.", placeholder: "Enter claim number" });
  const selectHelpSpec = helpSpec({ label: "State", help: "Where the practice is registered, not where the patient lives.", placeholder: "Select a state", options: OPTS });
  const taHelpSpec = helpSpec({ label: "Visit notes", help: "Anything the next clinician should read before the appointment.", placeholder: "Add a note for the care team\u2026", rows: 3 });

  function SizeBar(props) {
    return <div className="sh-tm-sizes">
      <span className="sh-tm-lab">Size</span>
      <div className="sh-tm-seg">{SIZES.map((x) =>
        <button key={x.id} type="button" className={x.id === props.size ? "is-on" : ""}
          onClick={() => props.onSize(x.id)}>{x.label}</button>)}</div>
    </div>;
  }

  function FieldDoc(props) {
    const [size, setSize] = SH.React.useState(SIZES[0].id);
    const states = props.states;
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {states.map((s, i) => <div className="sh-tm-group" key={s.id}>
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

  SH.registerPage("inputs", {
    lead: "Text fields take a label, a line of hint text and an optional leading icon. Padding comes from the spacing scale and the height derives from it \u2014 8/16 over a 24px line gives the 40px md field. Label, field text and hint all share one size, so the field reads as a single block of body text.",
    sections: [
      { id: "input", title: "Input",
        prose: ["The field on its own. The 1px border is an inset shadow rather than a real border, so it costs no height and the padding tokens stay the single source of truth. Hovering swaps the fill; focus moves the border to brand and adds a soft brand ring."],
        render: () => <FieldDoc sig="input" states={FIELD_STATES}
          rows={(s, z) => fieldRows(s, z, { required: true })} spec={(s, z) => inputSpec(s, z, {})} /> },
      { id: "input-icon", title: "Input with icon",
        prose: ["A leading icon sits inside the padding box, 8px from the text, drawn in the quaternary icon colour so it stays behind the value."],
        render: () => <FieldDoc sig="input-icon" states={ICON_STATES}
          rows={(s, z) => fieldRows(s, z, { icon: true })} spec={(s, z) => inputSpec(s, z, { icon: true })} /> },
      { id: "input-help", title: "Input with help icon",
        prose: ["Set helpText to add a question-mark glyph after the label \u2014 for a field whose value needs explaining, such as where to find a claim number. It sits 6px past the label, after the required asterisk, at 16px in the quaternary icon colour, and reveals its tooltip on hover and on keyboard focus. The field itself is unchanged: the glyph belongs to the label row, so padding and height stay put."],
        render: () => <FieldDoc sig="input-help" states={HELP_STATES} rows={helpRows} spec={inputHelpSpec} /> },
      { id: "input-error", title: "Input with error",
        prose: ["The error state recolours the border and the hint; the fill and padding do not change. Focus keeps the error border and swaps the ring to the error ramp."],
        render: () => <FieldDoc sig="input-error" states={ERROR_STATES}
          rows={(s, z) => fieldRows(s, z, { error: true })} spec={(s, z) => inputSpec(s, z, { error: true })} /> }
    ]
  });

  SH.registerPage("select", {
    lead: "Select pairs a field-shaped trigger with a menu of options. The trigger takes the same padding, radius, height and type as Input; only the trailing chevron and the placeholder colour distinguish it when empty. Multiselect swaps the value for a count and gives every option a checkbox.",
    sections: [
      { id: "select", title: "Select",
        prose: ["The closed trigger. Its value reads in the primary text colour and the placeholder in the placeholder colour, with the chevron in the quaternary icon colour at the far edge."],
        render: () => <FieldDoc sig="select" states={FIELD_STATES}
          rows={(s, z) => fieldRows(s, z, { chevron: true, required: true })} spec={selectSpec} /> },
      { id: "select-help", title: "Select with help icon",
        prose: ["The same helpText prop, behaving identically on Select: the glyph follows the label and the required asterisk, and the trigger keeps its padding, height and chevron."],
        render: () => <FieldDoc sig="select-help" states={HELP_STATES} rows={helpRows} spec={selectHelpSpec} /> },
      { id: "select-menu", title: "Select menu",
        prose: ["The open menu sits 4px below the field with a 4px inset frame, so every option keeps a visible gutter. The selected option takes the brand tint and the bold step of its type style \u2014 no check mark."],
        render: () => <FieldDoc sig="select-menu" states={MENU_STATES} rows={menuRows} spec={menuSpec} /> },
      { id: "multiselect", title: "Multiselect",
        prose: ["Multiselect keeps the same field, and reports a count rather than a value. Each option carries a 20px checkbox, and checked rows take the same brand tint as a single-select selection. An \u201cAll\u201d row selects everything and reads indeterminate while only some are chosen; the footer clears the selection."],
        render: () => <FieldDoc sig="multiselect" states={MULTI_STATES} rows={multiRows} spec={multiSpec} /> }
    ]
  });
  /* ---- Textarea: the same field, anchored on the textarea element itself ---- */
  const TA_STATES = [
    { id: "structure", label: "Structure" },
    { id: "placeholder", label: "Placeholder" },
    { id: "filled", label: "Filled" },
    { id: "hover", label: "Hover" },
    { id: "focus", label: "Focused" },
    { id: "disabled", label: "Disabled" }
  ];
  const TA_TEXT_STATES = [
    { id: "hint", label: "With label & hint text" },
    { id: "filled", label: "Filled" }
  ];
  const TA_ERROR_STATES = [
    { id: "error", label: "Error" },
    { id: "focus", label: "Focused" }
  ];

  function taRows(state, size, opts) {
    const z = FZ[size] || FZ.md;
    const o = opts || {};
    if (state === "structure") return [
      tv(z.py[0], "Top & bottom \u00b7 " + z.py[1], [at("field", "top", .12), at("field", "bottom", .12)]),
      tv(z.px[0], "Left & right \u00b7 " + z.px[1], [at("field", "left", .5), at("field", "right", .5)]),
      tv("radius.md", "8px", [at("field", "bottom", .06)]),
      tv("border.width", "1px", [at("field", "top", .82)]),
      tv(z.type[0], z.type[1], [at("field", "bottom", .6)]),
      tv("shadow.xs", null, [at("field", "bottom", .96)])
    ];
    if (state === "placeholder") return [
      col("border", [at("field", "left", .5)]),
      col("surface", [at("field", "bottom", .3)]),
      col("placeholder", [at("field", "top", .3)])
    ];
    if (state === "filled") return [
      col("value", [at("field", "top", .3)]),
      col("border", [at("field", "left", .5)])
    ];
    if (state === "hover") return [
      col("surfaceHover", [at("field", "bottom", .3)]),
      col("border", [at("field", "left", .5)])
    ];
    if (state === "focus") return o.error
      ? [col("borderError", [at("field", "left", .5)]), col("ringError", [at("field", "bottom", .92)])]
      : [col("borderBrand", [at("field", "left", .5)]), col("ring", [at("field", "bottom", .92)])];
    if (state === "disabled") return [
      col("surfaceDisabled", [at("field", "bottom", .3)]),
      col("disabled", [at("field", "top", .3)]),
      col("border", [at("field", "left", .5)])
    ];
    if (state === "error") return [
      col("borderError", [at("field", "left", .5)]),
      col("surface", [at("field", "bottom", .3)]),
      col("hintError", [at("hint", "bottom", .6)])
    ];
    const rows = [
      tv("spacing.sm", "gap \u00b7 6px", [at("field", "top", .04), at("hint", "top", .12)]),
      tv(z.bold[0], z.bold[1], [at("label", "bottom", .6)]),
      col("label", [at("label", "top", .6)]),
      col(o.error ? "hintError" : "hint", [at("hint", "bottom", .6)])
    ];
    if (o.required) rows.push(col("req", [at("req", "top", .5)]));
    return rows;
  }

  function taSpec(state, size, opts) {
    const o = opts || {};
    const withText = state === "hint" || o.text || o.error;
    const p = { size: size, rows: 3, placeholder: "Add a note for the care team\u2026" };
    if (state === "filled" || state === "disabled") p.defaultValue = "Patient reports improvement since the last visit.";
    if (state === "disabled") p.disabled = true;
    if (o.error) { p.error = true; p.defaultValue = "Patient reports"; }
    if (withText) {
      p.label = "Visit notes";
      p.required = !o.error;
      p.hint = o.error ? "Notes must be at least 40 characters." : "Shared with everyone on the care team.";
    }
    return <div className={simCls(state, o.error)} style={{ width: 260, maxWidth: "100%" }}><TextArea {...p} /></div>;
  }

  SH.registerPage("textareas", {
    lead: "Textarea is the Input field grown to several lines. Padding, radius, type, colour and the inset border are identical \u2014 only the height differs, and it comes from the rows attribute rather than a token. The handle resizes vertically only.",
    sections: [
      { id: "textarea", title: "Textarea",
        prose: ["The field on its own. Hovering swaps the fill; focus moves the border to brand and adds a soft brand ring, exactly as on a single-line input."],
        render: () => <FieldDoc sig="textarea" states={TA_STATES}
          rows={(s, z) => taRows(s, z, {})} spec={(s, z) => taSpec(s, z, {})} /> },
      { id: "textarea-text", title: "Textarea with label & hint",
        prose: ["Label, field and hint sit 6px apart and share one size, so the whole field reads as a single block of body text. The asterisk marks a required field."],
        render: () => <FieldDoc sig="textarea-text" states={TA_TEXT_STATES}
          rows={(s, z) => taRows(s, z, { required: true })} spec={(s, z) => taSpec(s, z, { text: true })} /> },
      { id: "textarea-help", title: "Textarea with help icon",
        prose: ["helpText behaves as it does on Input: the question-mark glyph follows the label and the required asterisk, 6px past it at 16px in the quaternary icon colour, and reveals its tooltip on hover and on keyboard focus. The field below it is untouched."],
        render: () => <FieldDoc sig="textarea-help" states={HELP_STATES} rows={helpRows} spec={taHelpSpec} /> },
      { id: "textarea-error", title: "Textarea with error",
        prose: ["The error state recolours the border and the hint; the fill and padding do not change. Focus keeps the error border and swaps the ring to the error ramp."],
        render: () => <FieldDoc sig="textarea-error" states={TA_ERROR_STATES}
          rows={(s, z) => taRows(s, z, { error: true })} spec={(s, z) => taSpec(s, z, { error: true })} /> }
    ]
  });
})();
