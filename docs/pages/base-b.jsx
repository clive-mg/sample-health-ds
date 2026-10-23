/* Sample Health docs — Base components, batch B:
   dropdowns, featured-icons, inputs, app-store-buttons, progress-indicators, radio-buttons. */
(function () {
  const SH = window.SH;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Dropdown, FeaturedIcon, Input, AppStoreBadge, ProgressBar, ProgressCircle, RadioButton, Button } = UI;

  /* ---------------- Dropdowns ---------------- */
  const MENU = [
    { label: "View profile", icon: <Icon name="User01" size={16} />, shortcut: "\u2318K" },
    { label: "Settings", icon: <Icon name="Settings01" size={16} /> },
    { label: "Keyboard shortcuts", icon: <Icon name="Command" size={16} /> },
    { divider: true },
    { label: "Sign out", icon: <Icon name="LogOut01" size={16} />, destructive: true }
  ];
  SH.registerPage("dropdowns", {
    h1: "Dropdown components",
    lead: "Dropdown menus reveal a list of contextual actions from a trigger. Items support icons, keyboard shortcuts, dividers and destructive styling.",
    sections: [
      { id: "default", title: "Default dropdown", prose: ["Click the trigger to open the menu; clicking anywhere outside dismisses it."],
        render: () => <Preview className="pad-lg"><Dropdown trigger={<Button hierarchy="secondary" iconTrailing={<Icon name="ChevronDown" size={20} />}>Options</Button>} items={MENU} /></Preview> },
      { id: "with-icons", title: "With icons & shortcuts", prose: ["Each item can show a leading icon and a trailing keyboard-shortcut hint."],
        render: () => <Preview className="pad-lg"><Dropdown trigger={<Button hierarchy="secondary" iconLeading={<Icon name="Plus" size={20} />}>Create</Button>} items={[
          { label: "New document", icon: <Icon name="File02" size={16} />, shortcut: "\u2318N" },
          { label: "New folder", icon: <Icon name="Folder" size={16} />, shortcut: "\u2318\u21E7N" },
          { label: "Upload files", icon: <Icon name="UploadCloud02" size={16} /> }
        ]} /></Preview> },
      { id: "icon-trigger", title: "Icon trigger", prose: ["A dropdown is often triggered from an icon-only button in toolbars and table rows."],
        render: () => <Preview className="pad-lg" style={{ minHeight: 220 }}><Dropdown align="right" trigger={<Button hierarchy="tertiary" iconOnly iconLeading={<Icon name="DotsVertical" size={20} />} aria-label="More actions" />} items={[
          { label: "Edit", icon: <Icon name="Edit01" size={16} /> },
          { label: "Duplicate", icon: <Icon name="Copy01" size={16} /> },
          { label: "Share", icon: <Icon name="Share01" size={16} /> },
          { divider: true },
          { label: "Delete", icon: <Icon name="Trash01" size={16} />, destructive: true }
        ]} /></Preview> }
    ],
    faqs: [
      { q: "How do I mark an action as destructive?", a: "Set <code>destructive: true</code> on the item — its label and icon render in the error color." },
      { q: "Can I add separators?", a: "Yes — include an item with <code>divider: true</code> to render a horizontal rule between groups." }
    ]
  });

  /* ---------------- Featured icons: token application ---------------- */
  const FI_COLORS = ["brand", "gray", "success", "warning", "error"];
  const FI_SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }, { id: "lg", label: "lg" }];
  /* The chip is a fixed square with a centred glyph — no padding token is
     involved, so each size is one control size and one icon size. */
  const FI_SZ = {
    sm: { d: "40px", icon: "20px", inset: "10px" },
    md: { d: "64px", icon: "32px", inset: "16px" },
    lg: { d: "80px", icon: "40px", inset: "20px" }
  };
  /* Foundations naming from Colors: brand is the Primary ramp, gray is Neutral. */
  const FI_RAMP = { brand: "primary", gray: "neutral", success: "success", warning: "warning", error: "error" };
  const FI_VAR = { brand: "brand", gray: "gray-light-mode", success: "success", warning: "warning", error: "error" };
  const fivar = (c, s) => "var(--colors-" + FI_VAR[c] + "-" + s + ")";
  const fitok = (c, s) => "color." + FI_RAMP[c] + "." + s;
  const fiAt = (part, edge, pos) => ({ part: part, edge: edge, pos: pos });
  const fiTc = (token, color, anchors, note) => ({ token: token, color: color, anchors: anchors, note: note });
  const fiTv = (token, value, anchors, note) => ({ token: token, value: value, anchors: anchors, note: note });
  const FI_STATES = [
    { id: "structure", label: "Structure" },
    { id: "colour", label: "Fill & glyph" }
  ];

  function fiRows(state, size, color) {
    const z = FI_SZ[size] || FI_SZ.lg;
    if (state === "structure") return [
      fiTv("control.size", z.d + " square", [fiAt("chip", "top", .5)]),
      fiTv("radius.full", "9999px", [fiAt("chip", "left", .2)]),
      fiTv("icon.size", z.icon, [fiAt("glyph", "bottom", .5)])
    ];
    const rows = [
      fiTc(fitok(color, 50), fivar(color, 50), [fiAt("chip", "bottom", .12)]),
      fiTc(fitok(color, 600), fivar(color, 600), [fiAt("glyph", "right", .5)])
    ];
    if (color === "gray") rows.push(fiTc("color.border.default", "var(--colors-border-border-primary)", [fiAt("chip", "left", .5)]));
    return rows;
  }

  /* The component tags its own parts, but the specimen names them too so the
     diagram still wires up against a bundle compiled before that change. */
  const fiSpec = (state, size, color) =>
    <FeaturedIcon data-sh-part="chip" size={size} color={color}>
      <Icon name="Zap" data-sh-part="glyph" />
    </FeaturedIcon>;

  function FiBar(props) {
    return <div className="sh-tm-sizes">
      <span className="sh-tm-lab">Size</span>
      <div className="sh-tm-seg">{FI_SIZES.map((x) =>
        <button key={x.id} type="button" className={x.id === props.size ? "is-on" : ""}
          onClick={() => props.onSize(x.id)}>{x.label}</button>)}</div>
      <span className="sh-tm-lab">Color</span>
      <div className="sh-tm-dots">{FI_COLORS.map((c) =>
        <button key={c} type="button" title={c} aria-label={c} className={c === props.color ? "is-on" : ""}
          style={{ background: fivar(c, "500") }} onClick={() => props.onColor(c)} />)}</div>
    </div>;
  }

  function FiTokenDoc() {
    const [size, setSize] = SH.React.useState("sm");
    const [color, setColor] = SH.React.useState("brand");
    return <Preview className="align-stretch canvas pad-tm"><div className="sh-tm-set">
      {FI_STATES.map((s) => <div className="sh-tm-group" key={s.id}>
        <div className="sh-tm-head">
          <SH.StateMark>{s.label}</SH.StateMark>
          {s.id === "structure" ? <FiBar size={size} color={color} onSize={setSize} onColor={setColor} /> : null}
        </div>
        <SH.TokenMap sig={"fi/" + s.id + "/" + size + "/" + color}
          rows={fiRows(s.id, size, color)} specimen={fiSpec(s.id, size, color)} />
      </div>)}
    </div></Preview>;
  }

  const FI_PARTS = [
    ["chip", "The square itself. It carries the fill, the radius, and on the neutral colour a hairline border. Its size is fixed per step, so nothing inside it is padded."],
    ["glyph", "A centred stroke icon at 20 / 32 / 40px. It inherits the chip's colour rather than setting its own."]
  ];
  function FiParts() {
    return <div className="sh-parts">{FI_PARTS.map((p) => <React.Fragment key={p[0]}>
      <code className="sh-part-name">{p[0]}</code>
      <span className="sh-part-desc">{p[1]}</span>
    </React.Fragment>)}</div>;
  }

  function FiMatrix(props) {
    return <Preview className="align-stretch canvas pad-tm"><div className="sh-matrix">
      {props.cells.map((c) => <div className="sh-matrix-cell" key={c[0]}>
        <span className="sh-matrix-lab">{c[0]}</span>
        <div className="sh-matrix-art">{c[1]}</div>
        {c[2] ? <span className="sh-matrix-note">{c[2]}</span> : null}
      </div>)}
    </div></Preview>;
  }

  const fiCard = { display: "flex", flexDirection: "column", gap: "var(--spacing-xl-px)", padding: "var(--spacing-3xl-px)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-xl-px)", background: "var(--colors-background-bg-primary)" };
  const fiTitle = { fontSize: 16, lineHeight: "24px", fontWeight: 600, color: "var(--colors-text-text-primary-900)" };
  const fiBody = { margin: "var(--spacing-xs-px) 0 0", fontSize: 14, lineHeight: "20px", fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" };
  function FiCtx(props) {
    return <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)" }}>
      <div style={{ ...fiCard, flex: 1 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>{props.children}</div>
      </div>
      <span className="sh-matrix-note">{props.spec}</span>
    </div>;
  }
  const FiUpload = UI.FileUpload || (() => <span style={fiBody}>FileUpload is not in this bundle.</span>);

  SH.registerPage("featured-icons", {
    h1: "Featured icon components",
    lead: "Featured icons are the icon chips that open an empty state, an alert, an upload zone or a feature row. Three sizes step the chip and its glyph, and five colours carry the meaning. Colours come from the Foundations ramps \u2014 brand is color.primary, gray is color.neutral.",
    sections: [
      { id: "anatomy", title: "Anatomy",
        prose: ["Two parts, and no third: a square chip and a glyph centred inside it. Because the chip is sized rather than padded, the space around the glyph is a consequence of the two sizes, not a spacing token."],
        render: () => <div className="sh-stack">
          <Preview className="pad-lg"><div className="sh-row" style={{ gap: "var(--spacing-6xl-px)" }}>
            <FeaturedIcon size="lg" color="brand"><Icon name="Zap" /></FeaturedIcon>
            <FeaturedIcon size="lg" shape="square" color="gray"><Icon name="UploadCloud02" /></FeaturedIcon>
          </div></Preview>
          <FiParts />
        </div> },
      { id: "tokens", title: "Tokens",
        prose: ["One treatment: the chip is tinted from the colour's own ramp, 50 for the fill and 600 for the glyph. The neutral chip adds a color.border.default hairline, because its fill is the canvas colour and would otherwise leave the glyph floating.",
          "Both are ramp steps, declared once in :root, so a chip keeps its light-mode value on a dark surface. Hover a token to trace it onto the specimen."],
        render: () => <FiTokenDoc /> },
      { id: "colors", title: "Colors",
        prose: ["Five colours, each one ramp: the same two steps every time \u2014 50 for the fill and 600 for the glyph. Neutral adds a hairline border; the four tinted colours need none."],
        render: () => <FiMatrix cells={FI_COLORS.map((c) => [c,
          <div className="sh-row" style={{ gap: "var(--spacing-lg-px)" }}>
            <FeaturedIcon color={c} theme="light" size="lg"><Icon name="Zap" /></FeaturedIcon>
            <FeaturedIcon color={c} theme="light" shape="square" size="lg"><Icon name="Zap" /></FeaturedIcon>
          </div>,
          "color." + FI_RAMP[c] + " · 50 fill, 600 glyph"])} /> },
      { id: "sizes", title: "Sizes",
        prose: ["Three steps: 40, 64 and 80px, each pairing one chip size with one glyph size at half the chip; nothing between them is tokenised. Use sm inline beside text, md for alerts, upload zones and list rows, lg for empty states and anywhere the chip opens the page."],
        render: () => <Preview className="align-stretch canvas pad-lg"><div className="sh-ladder">
          {FI_SIZES.map((s) => <div className="sh-ladder-cell" key={s.id}>
            <FeaturedIcon size={s.id} color="brand"><Icon name="MarkerPin01" /></FeaturedIcon>
            <span className="sh-ladder-size">{s.id}</span>
            <span className="sh-ladder-spec">{FI_SZ[s.id].d} · icon {FI_SZ[s.id].icon}</span>
          </div>)}
        </div></Preview> },
      { id: "shapes", title: "Circle & square",
        prose: ["The shape prop swaps one radius token. Circles suit people, status and messages; squares suit files, objects and anything that sits next to other square chrome."],
        render: () => <FiMatrix cells={[
          ["Circle", <div className="sh-row" style={{ gap: "var(--spacing-lg-px)" }}>
            <FeaturedIcon shape="circle" size="lg" color="brand"><Icon name="Bell01" /></FeaturedIcon>
            <FeaturedIcon shape="circle" size="lg" color="gray"><Icon name="Check" /></FeaturedIcon>
          </div>, "radius.full · 9999px"],
          ["Square", <div className="sh-row" style={{ gap: "var(--spacing-lg-px)" }}>
            <FeaturedIcon shape="square" size="lg" color="brand"><Icon name="File02" /></FeaturedIcon>
            <FeaturedIcon shape="square" size="lg" color="gray"><Icon name="Check" /></FeaturedIcon>
          </div>, "radius.lg · 10px"]
        ]} /> },
      { id: "in-context", title: "In context",
        prose: ["Where the chip actually appears, and which shape, size and colour each surface takes."],
        render: () => <Preview className="align-stretch canvas pad-lg">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--spacing-3xl-px)", width: "100%" }}>
            <FiCtx spec="square · sm · gray">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--spacing-xl-px)" }}>
                <FeaturedIcon shape="square" size="sm" color="gray"><Icon name="SearchLg" /></FeaturedIcon>
                <div>
                  <div style={fiTitle}>No results found</div>
                  <p style={fiBody}>Your search didn’t match any patients. Try a different term.</p>
                </div>
                <Button hierarchy="secondary" size="sm">Clear search</Button>
              </div>
            </FiCtx>
            <FiCtx spec="circle · sm · success">
              <div style={{ display: "flex", gap: "var(--spacing-xl-px)", alignItems: "flex-start" }}>
                <FeaturedIcon theme="light" color="success" size="sm"><Icon name="CheckCircle" /></FeaturedIcon>
                <div>
                  <div style={fiTitle}>Referral sent</div>
                  <p style={fiBody}>Dr. Lee receives the packet within the hour.</p>
                </div>
              </div>
            </FiCtx>
            <FiCtx spec="square · sm · gray">
              <FiUpload hint="PDF or JPG (max. 10MB)" />
            </FiCtx>
            <FiCtx spec="circle · sm · brand">
              <div style={{ display: "flex", gap: "var(--spacing-xl-px)", alignItems: "flex-start" }}>
                <FeaturedIcon theme="light" color="brand" size="sm"><Icon name="Zap" /></FeaturedIcon>
                <div>
                  <div style={fiTitle}>Instant eligibility</div>
                  <p style={fiBody}>Coverage is checked against the payer while the patient is still on the call.</p>
                </div>
              </div>
            </FiCtx>
            <FiCtx spec="circle · sm · brand">
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "var(--spacing-xl-px)" }}>
                <FeaturedIcon theme="light" color="brand" size="sm"><Icon name="Star01" /></FeaturedIcon>
                <div>
                  <div style={{ fontSize: 12, lineHeight: "18px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--colors-text-text-brand-secondary-700)" }}>Care plans</div>
                  <div style={{ marginTop: "var(--spacing-md-px)", fontSize: 24, lineHeight: "28px", fontWeight: 600, letterSpacing: "0", color: "var(--colors-text-text-primary-900)" }}>Built around the patient</div>
                  <p style={fiBody}>Every plan starts from the same intake and adapts as results arrive.</p>
                </div>
              </div>
            </FiCtx>
          </div>
        </Preview> }
    ],
    faqs: [
      { q: "Which colors are supported?", a: "<code>brand</code>, neutral <code>gray</code>, and the semantic <code>success</code>, <code>warning</code> and <code>error</code>. Each maps to a Foundations ramp — <code>brand</code> is <code>color.primary</code>, <code>gray</code> is <code>color.neutral</code> — and every chip takes the same two steps from it: 50 fill, 600 glyph. <code>gray</code> adds a <code>color.border.default</code> hairline so the chip still reads on canvas." },
      { q: "Does it invert in dark mode?", a: "No. Both steps are ramp variables, declared once in <code>:root</code>, so a chip holds its light-mode values on a dark surface. If a tinted chip has to invert, raise it on Foundations rather than reaching back for a component-layer alias." },
      { q: "Why isn't there a padding token?", a: "The chip is a fixed square (40 / 64 / 80px) with a centred glyph at half that (20 / 32 / 40px), so the inset is a consequence of the two sizes rather than a value anyone sets." }
    ]
  });

  /* ---------------- Inputs ---------------- */
  SH.registerPage("inputs", {
    h1: "Input components",
    lead: "Text inputs capture short, single-line values. They support labels, hint text, leading icons, focus, error and disabled states across two sizes.",
    sections: [
      { id: "default", title: "Default input", prose: ["A label sits above the field, with optional hint text below."],
        render: () => <Preview className="align-stretch"><div style={{ maxWidth: 360, margin: "0 auto" }}>
          <Input label="Email" placeholder="you@samplehealth.com" hint="We'll never share your email." />
        </div></Preview> },
      { id: "leading-icon", title: "With leading icon", prose: ["A leading icon adds context — such as a magnifier on search or an envelope on email fields."],
        render: () => <Preview className="align-stretch"><div style={{ maxWidth: 360, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Search" placeholder="Search patients" iconLeading={<Icon name="SearchLg" size={20} />} />
          <Input label="Email" placeholder="you@samplehealth.com" iconLeading={<Icon name="Mail01" size={20} />} />
        </div></Preview> },
      { id: "states", title: "States", prose: ["Fields communicate focus, error and disabled clearly through border, ring and helper text."],
        render: () => <Preview className="align-stretch"><div style={{ maxWidth: 360, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          <Input label="Default" placeholder="Placeholder" />
          <Input label="Error" defaultValue="olivia@" error hint="Please enter a valid email address." />
          <Input label="Disabled" placeholder="Unavailable" disabled />
        </div></Preview> },
      { id: "sizes", title: "Sizes", prose: ["Two heights: small (36px) and medium (40px)."],
        render: () => <Preview className="align-stretch"><div style={{ maxWidth: 360, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          <Input size="sm" label="Small" placeholder="36px field" />
          <Input size="md" label="Medium" placeholder="40px field" />
        </div></Preview> }
    ],
    faqs: [
      { q: "How do I show a validation error?", a: "Set the <code>error</code> prop; the border and ring turn red and the <code>hint</code> renders in the error color." },
      { q: "Can I add an icon inside the field?", a: "Yes — pass <code>iconLeading</code> with a 20px icon element." }
    ]
  });

  /* ---------------- App store buttons ---------------- */
  SH.registerPage("app-store-buttons", {
    h1: "Mobile app store button components",
    lead: "App store badges link to your listings on the Apple App Store and Google Play with the familiar dark pill treatment.",
    sections: [
      { id: "default", title: "App store badges", prose: ["Badges for the Apple App Store and Google Play."],
        render: () => <Preview className="canvas"><div className="sh-row" style={{ gap: 16 }}>
          <AppStoreBadge store="apple" />
          <AppStoreBadge store="google" />
        </div></Preview> },
      { id: "stacked", title: "Stacked", prose: ["Stack both badges in app-download sections and footers."],
        render: () => <Preview className="canvas"><div className="sh-col" style={{ gap: 12, alignItems: "center" }}>
          <AppStoreBadge store="apple" />
          <AppStoreBadge store="google" />
        </div></Preview> }
    ]
  });

  /* ---------------- Progress indicators ---------------- */
  SH.registerPage("progress-indicators", {
    h1: "Progress indicator components",
    lead: "Progress indicators communicate completion — as a linear bar or a circular ring, with optional percentage labels.",
    sections: [
      { id: "bar", title: "Progress bar", prose: ["A slim horizontal track fills with the brand color to show how far along a task is."],
        render: () => <Preview className="align-stretch"><div style={{ maxWidth: 440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <ProgressBar value={30} />
          <ProgressBar value={70} />
        </div></Preview> },
      { id: "bar-label", title: "Bar with label", prose: ["A percentage label can sit to the right of the bar or beneath it."],
        render: () => <Preview className="align-stretch"><div style={{ maxWidth: 440, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <ProgressBar value={45} label="right" />
          <ProgressBar value={80} label="bottom" />
        </div></Preview> },
      { id: "circle", title: "Progress circle", prose: ["A circular ring with a centered percentage, in four sizes."],
        render: () => <Preview><div className="sh-row" style={{ gap: 28 }}>
          {["sm", "md", "lg"].map((s) => <ProgressCircle key={s} size={s} value={s === "sm" ? 25 : s === "md" ? 60 : 80} />)}
        </div></Preview> }
    ]
  });

  /* ---------------- Radio buttons ---------------- */
  function RadioDemo() {
    const [val, setVal] = SH.React.useState("card");
    return <div className="sh-col" style={{ gap: 14 }}>
      {[["card", "Pay by card", "Visa, Mastercard, Amex"], ["invoice", "Send an invoice", "Net 30 payment terms"], ["transfer", "Bank transfer", "Direct ACH transfer"]].map(([v, label, hint]) =>
        <RadioButton key={v} name="pay" value={v} label={label} hint={hint} checked={val === v} onChange={() => setVal(v)} />)}
    </div>;
  }
  SH.registerPage("radio-buttons", {
    h1: "Radio button components",
    lead: "Radio buttons let people choose a single option from a set. They support two sizes, hint text, and checked, unchecked and disabled states.",
    sections: [
      { id: "states", title: "States", prose: ["The core states across a group."],
        render: () => <Preview><div className="sh-row" style={{ gap: 32 }}>
          <RadioButton label="Unchecked" name="s" />
          <RadioButton label="Checked" name="s" defaultChecked />
          <RadioButton label="Disabled" name="s" disabled />
        </div></Preview> },
      { id: "sizes", title: "Sizes", prose: ["Two sizes: small (16px) and medium (20px)."],
        render: () => <Preview><div className="sh-row" style={{ gap: 32 }}>
          <RadioButton size="sm" label="Small" defaultChecked name="sz1" />
          <RadioButton size="md" label="Medium" defaultChecked name="sz2" />
        </div></Preview> },
      { id: "group", title: "Radio group with hints", prose: ["Compose a controlled group where selecting one option clears the others."],
        render: () => <Preview className="align-start"><RadioDemo /></Preview> }
    ],
    faqs: [
      { q: "Radio buttons or checkboxes?", a: "Use radio buttons when only one option in a set may be selected. Use checkboxes when multiple selections are allowed." }
    ]
  });
})();
