/* Sample Health docs — selection controls, v2 token maps: checkboxes and radio
   buttons. Registered after base-a / base-b so these replace the older demo
   pages registered earlier. */
(function () {
  const SH = window.SH;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Checkbox, RadioButton } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }];

  /* Per size: the control dimension, its radius step, the glyph it holds and the
     type styles the label and hint take. */
  const SEL_SZ = {
    sm: { box: "16px", radius: ["radius.xs", "4px"], glyph: "12px", dot: "5.3px \u00b7 control \u00f7 3",
      label: ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"], hint: ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"] },
    md: { box: "20px", radius: ["radius.sm", "6px"], glyph: "16px", dot: "6.7px \u00b7 control \u00f7 3",
      label: ["style.body.lg", "Inter \u00b7 16/24 \u00b7 400"], hint: ["style.body.lg", "Inter \u00b7 16/24 \u00b7 400"] }
  };
  /* Label and hint share one weight; colour carries the hierarchy. Line heights
     are 20px at 14px — the control step, now also the Body Medium line. */

  const C = {
    border: ["color.border.default", "var(--colors-border-border-primary)"],
    surface: ["color.surface.default", "var(--colors-background-bg-primary)"],
    fill: ["color.surface.primary", "var(--colors-background-bg-brand-solid)"],
    glyph: ["color.text.on.brand", "var(--colors-text-text-primary-on-brand)"],
    hoverBorder: ["color.primary.600", "var(--colors-brand-600)"],
    hoverFill: ["color.primary.50", "var(--colors-brand-50)"],
    ring: ["color.focusRing", "var(--colors-effects-focus-rings-focus-ring)"],
    label: ["color.text.primary", "var(--colors-text-text-primary-900)"],
    hint: ["color.text.placeholder", "var(--colors-text-text-quaternary-500)"]
  };
  const col = (k, anchors, note) => tc(C[k][0], C[k][1], anchors, note);

  const CONTROL_STATES = [
    { id: "structure", label: "Structure" },
    { id: "unchecked", label: "Unchecked" },
    { id: "checked", label: "Checked" },
    { id: "indeterminate", label: "Indeterminate" },
    { id: "hover", label: "Hover" },
    { id: "focus", label: "Focused" }
  ];
  const TEXT_STATES = [
    { id: "structure", label: "Structure" },
    { id: "label", label: "Label" },
    { id: "hint", label: "With hint text" },
    { id: "checked", label: "Checked" },
    { id: "focus", label: "Focused" }
  ];

  /* ---- rows ---- */
  function controlRows(kind, state, size) {
    const z = SEL_SZ[size] || SEL_SZ.md;
    const radio = kind === "radio";
    if (state === "structure") return [
      tv("control.size", z.box, [at("box", "top", .5)]),
      tv(radio ? "radius.full" : z.radius[0], radio ? "9999px" : z.radius[1], [at("box", "bottom", .12)]),
      tv("border.width", "1px", [at("box", "left", .5)])
    ];
    if (state === "unchecked") return [
      col("border", [at("box", "left", .5)]),
      col("surface", [at("box", "bottom", .3)])
    ];
    if (state === "checked" || state === "indeterminate") return [
      col("fill", [at("box", "left", .5)]),
      tv(radio ? "dot.size" : "icon.size", radio ? z.dot : z.glyph, [at("box", "top", .5)]),
      col("glyph", [at("box", "bottom", .5)])
    ];
    /* Hover only moves the resting border and fill; the checked control keeps its
       solid brand fill and darkens one step on hover instead. */
    if (state === "hover") return [
      col("hoverBorder", [at("box", "left", .5)]),
      col("hoverFill", [at("box", "bottom", .3)])
    ];
    return [col("ring", [at("box", "bottom", .85)])];
  }

  function textRows(kind, state, size) {
    const z = SEL_SZ[size] || SEL_SZ.md;
    if (state === "structure") return [
      tv("spacing.md", "gap \u00b7 8px", [at("box", "right", .5)]),
      tv("spacing.xxs", "Control offset \u00b7 2px", [at("box", "top", .25)]),
      tv("spacing.xxs", "Label & hint gap \u00b7 2px", [at("hint", "top", .1)]),
      tv(z.label[0], z.label[1], [at("label", "bottom", .55)]),
      tv(z.hint[0], z.hint[1], [at("hint", "bottom", .6)])
    ];
    if (state === "label") return [
      col("label", [at("label", "bottom", .55)]),
      tv(z.label[0], z.label[1], [at("label", "top", .55)])
    ];
    if (state === "hint") return [
      col("hint", [at("hint", "bottom", .6)]),
      tv(z.hint[0], z.hint[1], [at("hint", "top", .6)])
    ];
    if (state === "checked") return [
      col("fill", [at("box", "left", .5)]),
      col("glyph", [at("box", "bottom", .5)])
    ];
    return [col("ring", [at("box", "bottom", .85)])];
  }

  /* ---- specimens ---- */
  /* Hover and focus are painted by doc-only classes on the control: neither
     component implements the state in code yet. */
  const simClass = (state) => state === "hover" ? "sh-sel-hover" : state === "focus" ? "sh-sel-focus" : null;

  function controlSpec(kind, state, size) {
    const on = state === "checked" || state === "focus" || state === "indeterminate";
    const p = { size: size, "data-sh-part": "box", className: simClass(state) };
    return kind === "radio"
      ? <RadioButton {...p} name={"tm-" + state} checked={on} />
      : <Checkbox {...p} checked={state === "indeterminate" ? false : on} indeterminate={state === "indeterminate"} />;
  }

  function textSpec(kind, state, size) {
    const p = {
      size: size, "data-sh-part": "box", className: simClass(state), checked: true,
      label: <span data-sh-part="label">Notifications</span>,
      hint: <span data-sh-part="hint">A daily summary of activity.</span>
    };
    return <div style={{ width: 200, maxWidth: "100%" }}>{kind === "radio" ? <RadioButton {...p} name={"tmt-" + state} /> : <Checkbox {...p} />}</div>;
  }

  function SizeBar(props) {
    return <div className="sh-tm-sizes">
      <span className="sh-tm-lab">Size</span>
      <div className="sh-tm-seg">{SIZES.map((x) =>
        <button key={x.id} type="button" className={x.id === props.size ? "is-on" : ""}
          onClick={() => props.onSize(x.id)}>{x.label}</button>)}</div>
    </div>;
  }

  function SelDoc(props) {
    const kind = props.kind, text = props.text;
    const [size, setSize] = SH.React.useState(SIZES[0].id);
    const states = text ? TEXT_STATES : CONTROL_STATES;
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {states.map((s) => <div className="sh-tm-group" key={s.id}>
          <div className="sh-tm-head">
            <SH.StateMark>{s.label}</SH.StateMark>
            {s.id === "structure" ? <SizeBar size={size} onSize={setSize} /> : null}
          </div>
          <SH.TokenMap sig={kind + "/" + (text ? "t" : "c") + "/" + s.id + "/" + size}
            rows={text ? textRows(kind, s.id, size) : controlRows(kind, s.id, size)}
            specimen={text ? textSpec(kind, s.id, size) : controlSpec(kind, s.id, size)} />
        </div>)}
      </div>
    </Preview>;
  }

  SH.registerPage("checkboxes", {
    h1: "Checkbox components",
    lead: "Checkboxes let people select one or many options, or toggle a single setting. Two sizes step the control and its label; the box itself is a square with a stepped radius, and the checked and indeterminate states share one solid brand fill.",
    sections: [
      { id: "checkbox", title: "Checkbox",
        prose: ["The control on its own, for table rows and other places where a nearby cell carries the meaning. Unchecked, it is a 1px border over the default surface; checked or indeterminate, the border gives way to a solid brand fill and the glyph is drawn in the on-brand text colour."],
        render: () => <SelDoc kind="checkbox" /> },
      { id: "checkbox-text", title: "Checkbox with text",
        prose: ["With a label, and optionally a line of hint text, the control aligns to the top of the text block and offsets by 2px so it sits on the label's optical centre line. Both lines are Regular 400; colour separates the label from its supporting text."],
        render: () => <SelDoc kind="checkbox" text /> }
    ]
  });

  SH.registerPage("radio-buttons", {
    h1: "Radio button components",
    lead: "Radio buttons let people choose a single option from a set. They take the same two sizes, spacing and type as checkboxes; only the shape and the selected glyph differ — a full-radius control with a centred dot one third of its width.",
    sections: [
      { id: "radio", title: "Radio button",
        prose: ["The control on its own. Unchecked, it is a 1px border over the default surface; checked, it takes the solid brand fill with a centred dot in the on-brand text colour."],
        render: () => <SelDoc kind="radio" /> },
      { id: "radio-text", title: "Radio button with text",
        prose: ["Label and hint text follow the checkbox exactly: an 8px gap from the control, 2px between the two lines, and the control offset 2px from the top of the text block."],
        render: () => <SelDoc kind="radio" text /> }
    ]
  });
})();
