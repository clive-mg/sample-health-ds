/* Sample Health docs — Modals. One component, two kinds: the fixed 480px
   dialogue and the sized content modal, centred or as a right slide-out. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Modal, Button, Input, TextArea, Checkbox } = UI;

  /* Specimens are static, but the close control is part of the anatomy — a
     no-op handler renders it without wiring dismissal into a diagram. */
  const NOOP = () => {};
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
  /* Anatomy specimens render flat — the scrim and the viewport are stripped by
     .sh-md-flat, so the connectors have a static panel to point at. */
  const Flat = (props) => <div className="sh-md-flat" style={{ width: "100%", maxWidth: (props.width || 480) + 48 }}>{props.children}</div>;

  /* ---------------- shared content ---------------- */
  /* On a fullscreen modal the fields would otherwise run the whole width of
     the surface; cap them at 30% so the form stays a readable column. */
  const InviteFields = (props) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xl-px)", width: props.narrow ? "30%" : "100%", minWidth: props.narrow ? 280 : 0 }}>
      <Input size="sm" label="Full name" placeholder="e.g. Amara Chen" />
      <Input size="sm" label="Work email" placeholder="name@samplehealth.org" />
      <Input size="sm" label="Role" placeholder="Care coordinator" />
      <TextArea size="sm" label="Note" placeholder="Add a line to the invitation email" />
    </div>
  );
  const Pair = (props) => <React.Fragment>
    <Button hierarchy="secondary" onClick={props.onClose}>Cancel</Button>
    <Button hierarchy={props.destructive ? "primary-destructive" : "primary"} onClick={props.onClose}>{props.confirm || "Send invite"}</Button>
  </React.Fragment>;

  /* ---------------- viewport mock ---------------- */
  const VW = 1280, VH = 800, K = 0.56;
  const bar = (w, h, o, k) => <div key={k} style={{ width: w, height: h, borderRadius: "var(--radius-xs-px)", background: "var(--colors-gray-light-mode-200)", opacity: o || 1 }} />;
  function AppSkeleton() {
    return (
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", background: "var(--colors-background-bg-secondary)" }}>
        <div style={{ width: 240, flexShrink: 0, borderRight: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {bar(112, 16)}
          {[0, 1, 2, 3, 4].map((i) => bar(160, 12, 0.6, i))}
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: 32, display: "flex", flexDirection: "column", gap: 24 }}>
          {bar(224, 20)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ height: 120, borderRadius: "var(--radius-xl-px)", background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)" }} />)}
          </div>
        </div>
      </div>
    );
  }
  function Mock(props) {
    const ref = React.useRef(null);
    const [fit, setFit] = React.useState({ k: K, vw: VW });
    React.useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;
      /* Wider than a 1280 viewport, the mock stops scaling and simply becomes
         that wide — so the modal widths read at true pixel size. */
      const measure = () => {
        const w = el.getBoundingClientRect().width;
        if (!w) return;
        const vw = Math.max(VW, Math.round(w));
        setFit({ k: w / vw, vw: vw });
      };
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);
    return (
      <div ref={ref} style={{ width: "100%" }}>
        <div style={{ width: "100%", height: Math.round(VH * fit.k), position: "relative", overflow: "hidden", borderRadius: "var(--radius-xl-px)", border: "1px solid var(--colors-border-border-secondary)" }}>
          <div style={{ width: fit.vw, height: VH, transform: "scale(" + fit.k + ")", transformOrigin: "top left", position: "relative" }}>
            <AppSkeleton />
            {props.children}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- live triggers ---------------- */
  const KINDS = [
    { id: "dialogue", label: "Dialogue" },
    { id: "content", label: "Content · md" },
    { id: "slide", label: "Slide-out · md" },
    { id: "full", label: "Fullscreen" }
  ];
  function LiveDemo() {
    const [open, setOpen] = React.useState(null);
    const close = () => setOpen(null);
    return <Preview className="pad-lg"><div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-lg-px)" }}>
      {KINDS.map((k) => <Button key={k.id} hierarchy="secondary" onClick={() => setOpen(k.id)}>{k.label}</Button>)}
      <Modal open={open === "dialogue"} onClose={close}
        icon={<Icon name="UserPlus01" />} title="Invite Amara Chen?"
        description="She'll get an email with a link to join the Northgate care team. You can revoke access at any time."
        actions={<Pair onClose={close} confirm="Send invite" />} />
      <Modal open={open === "content"} onClose={close} variant="content" size="md"
        title="Invite a care team member" description="They'll get an email with a link to join your organisation."
        actions={<Pair onClose={close} />}><InviteFields /></Modal>
      <Modal open={open === "slide"} onClose={close} variant="content" position="right" size="md"
        title="Invite a care team member" description="They'll get an email with a link to join your organisation."
        actions={<Pair onClose={close} />}><InviteFields /></Modal>
      <Modal open={open === "full"} onClose={close} variant="content" size="full"
        title="Invite a care team member" description="They'll get an email with a link to join your organisation."
        actions={<Pair onClose={close} />}><InviteFields narrow /></Modal>
    </div></Preview>;
  }

  /* ---------------- anatomy ---------------- */
  const dialogueRows = [
    tv("radius.xl", "12px", [at("panel", "top", .06)]),
    tc("color.surface.default", "var(--colors-background-bg-primary)", [at("panel", "left", .5)]),
    tv("shadow.xl", "0px 20px 24px -4px · 0px 8px 8px -4px", [at("panel", "bottom", .82)]),
    tv("spacing.3xl", "Padding · 24px on all sides", [at("panel", "left", .16)]),
    tv("spacing.xl", "Icon \u2192 text · 16px", [at("icon", "right", .5)]),
    tv("style.heading.h5", "Title · Inter 18/22 · 600", [at("title", "top", .5)]),
    tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("title", "bottom", .4)]),
    tv("spacing.xs", "Title \u2192 supporting · 4px", [at("desc", "top", .2)]),
    tv("style.body.md.regular", "Supporting · Inter 14/20 · 400", [at("desc", "left", .5)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("desc", "bottom", .5)]),
    tv("spacing.3xl", "Text \u2192 actions · 24px", [at("actions", "top", .12)]),
    tv("spacing.lg", "Button gap · 12px", [at("actions", "bottom", .62)])
  ];
  const contentRows = [
    tv("radius.xl", "12px", [at("panel", "top", .04)]),
    tc("color.surface.default", "var(--colors-background-bg-primary)", [at("panel", "left", .55)]),
    tv("shadow.xl", "0px 20px 24px -4px · 0px 8px 8px -4px", [at("panel", "bottom", .9)]),
    tv("spacing.3xl", "Header padding · 24px", [at("header", "left", .3)]),
    tv("style.heading.h5", "Title · Inter 18/22 · 600", [at("title", "top", .5)]),
    tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("title", "right", .5)]),
    tv("style.body.md.regular", "Supporting · Inter 14/20 · 400", [at("desc", "left", .5)]),
    tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("header", "bottom", .62)]),
    tv("spacing.3xl", "Body padding · 24px", [at("body", "left", .5)]),
    tv("spacing.3xl", "Footer padding · 24px", [at("footer", "left", .4)]),
    tv("spacing.lg", "Button gap · 12px", [at("actions", "bottom", .55)])
  ];

  function AnatomyDoc() {
    return <Stage>
      <Group label="Dialogue modal example" sig="md/dlg" rows={dialogueRows}
        specimen={<Flat width={480}>
          <Modal inline onClose={NOOP} icon={<Icon name="Trash01" />} iconColor="error" title="Delete this care plan?"
            description="The plan and its 14 tasks are removed for everyone. This cannot be undone."
            actions={<React.Fragment><Button hierarchy="secondary">Cancel</Button><Button hierarchy="primary-destructive">Delete</Button></React.Fragment>} />
        </Flat>} />
      <Group label="Content modal example" sig="md/cnt" rows={contentRows}
        specimen={<Flat width={640}>
          <Modal inline onClose={NOOP} variant="content" size="md" title="Invite a care team member"
            description="They'll get an email with a link to join your organisation."
            actions={<React.Fragment><Button hierarchy="secondary">Cancel</Button><Button>Send invite</Button></React.Fragment>}>
            <InviteFields />
          </Modal>
        </Flat>} />
    </Stage>;
  }

  /* ---------------- sizes ---------------- */
  const POS_OPTS = [{ id: "center", label: "Centre" }, { id: "right", label: "Slide-out" }];
  const SIZE_OPTS = [
    { id: "sm", label: "sm · 480" }, { id: "md", label: "md · 640" }, { id: "lg", label: "lg · 800" },
    { id: "xl", label: "xl · 1024" }, { id: "full", label: "Full" }
  ];
  const SizePlaceholder = () => <div style={{
    display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
    minHeight: 96, padding: "var(--spacing-3xl-px)", borderRadius: "var(--radius-md-px)",
    border: "1px dashed var(--colors-border-border-secondary)", background: "var(--colors-background-bg-secondary)",
    fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)"
  }}>User-defined content goes in here</div>;
  const SIZE_BODY = {
    sm: <SizePlaceholder />, md: <SizePlaceholder />, lg: <SizePlaceholder />,
    xl: <SizePlaceholder />, full: <SizePlaceholder />
  };
  function SizeDemo() {
    const [pos, setPos] = React.useState("center");
    const [size, setSize] = React.useState("md");
    return <Preview className="align-stretch pad-lg"><div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xl-px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3xl-px)" }}>
        <Seg label="Position" options={POS_OPTS} value={pos} onChange={setPos} />
        <Seg label="Size" options={SIZE_OPTS} value={size} onChange={setSize} />
      </div>
      <Mock>
        <Modal inline onClose={NOOP} key={pos + size} variant="content" position={pos} size={size} title="Invite a care team member"
          description="They'll get an email with a link to join your organisation."
          actions={<React.Fragment><Button hierarchy="secondary">Cancel</Button><Button>Send invite</Button></React.Fragment>}>
          {SIZE_BODY[size]}
        </Modal>
      </Mock>
    </div></Preview>;
  }


  /* ---------------- dialogue treatments ---------------- */
  const Cancel = () => <Button hierarchy="secondary">Cancel</Button>;
  const TREATMENTS = [
    { id: "left", label: "Icon top-left", el: <Modal inline onClose={NOOP} icon={<Icon name="UserPlus01" />} title="Invite Amara Chen?"
        description="She'll get an email with a link to join the Northgate care team."
        actions={<React.Fragment><Cancel /><Button>Send invite</Button></React.Fragment>} /> },
    { id: "center", label: "Icon centred", el: <Modal inline onClose={NOOP} iconAlign="center" icon={<Icon name="CheckCircle" />} iconColor="success"
        title="Referral sent" description="Northgate Cardiology will confirm the appointment within two working days."
        actions={<React.Fragment><Cancel /><Button>View referral</Button></React.Fragment>} /> },
    { id: "plain", label: "No icon", el: <Modal inline onClose={NOOP} title="Leave without saving?"
        description="Your edits to this care plan will be discarded."
        actions={<React.Fragment><Cancel /><Button>Discard</Button></React.Fragment>} /> },
    { id: "destructive", label: "Destructive", el: <Modal inline onClose={NOOP} icon={<Icon name="Trash01" />} iconColor="error" title="Delete this care plan?"
        description="The plan and its 14 tasks are removed for everyone. This cannot be undone."
        actions={<React.Fragment><Cancel /><Button hierarchy="primary-destructive">Delete</Button></React.Fragment>} /> },
    { id: "single", label: "Single action", el: <Modal inline onClose={NOOP} icon={<Icon name="InfoCircle" />} iconColor="gray" title="Records are read-only"
        description="This patient is under another provider's care until 14 September."
        actions={<Button hierarchy="secondary">Got it</Button>} /> },
    { id: "input", label: "One field", el: <Modal inline onClose={NOOP} icon={<Icon name="Mail01" />} title="Send a copy"
        description="We'll email a PDF of this summary."
        actions={<React.Fragment><Cancel /><Button>Send</Button></React.Fragment>}>
        <div style={{ paddingTop: "var(--spacing-xs-px)" }}><Input size="sm" label="Email address" placeholder="name@samplehealth.org" /></div>
      </Modal> },
    { id: "check", label: "Checkbox in the footer", el: <Modal inline onClose={NOOP} icon={<Icon name="AlertTriangle" />} iconColor="warning" title="Archive 12 records?"
        description="Archived records stay searchable but drop out of the active list."
        footerLeading={<Checkbox size="sm" label="Don't ask again" />}
        actions={<React.Fragment><Cancel /><Button>Archive</Button></React.Fragment>} /> }
  ];
  function Treatments() {
    return <Preview className="align-stretch pad-lg">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 480px))", gap: "var(--spacing-4xl-px)", justifyContent: "start" }}>
        {TREATMENTS.map((t) => <Eg key={t.id} label={t.label}><Flat width={480}>{t.el}</Flat></Eg>)}
      </div>
    </Preview>;
  }

  SH.registerPage("modals", {
    h1: "Modals",
    wide: true,
    lead: "Two kinds of overlay on one component. A dialogue asks for a decision and is always 480px wide. A content modal is a working surface with a header, a scrolling body and an optional footer, at one of four widths or fullscreen, centred or slid out from the right.",
    sections: [
      { id: "kinds", title: "Two kinds",
        prose: ["A dialogue is a sentence and a choice: an icon, a title, a line of supporting text, two buttons. It has one width because a dialogue that needs resizing has stopped being a dialogue and become a form.",
          "A content modal is a surface people work on. The header and footer stay put while the body scrolls, so the title and the actions are always in view no matter how long the form runs.",
          "Open each one to see it over the real page. Escape closes, so does the scrim and the close button."],
        render: () => <LiveDemo /> },

      { id: "anatomy", title: "Anatomy",
        prose: ["Both kinds are built from the same parts and the same 24px padding. The difference is the rules: a content modal separates its header and footer from the body with a hairline, because they are fixed regions the body scrolls under. A dialogue has no rules — there is nothing to separate.",
          "The scrim is color.surface.overlay at 70%, with no blur. Fullscreen drops it entirely."],
        render: () => <AnatomyDoc /> },

      { id: "sizes", title: "Sizes and position",
        prose: ["Four fixed widths and fullscreen. 480 for a single decision or one field, 640 for a short form, 800 when the form has two columns or a preview beside it, 1024 for a table or a side-by-side comparison. Pick by what the content needs, not by how important the task feels.",
          "The same panel can be centred or slid out from the right. Centre it when the task interrupts — it has to be finished or abandoned before anything else happens. Slide it out when the task sits beside the page: a detail panel, a filter set, a record someone is reading while the list stays where it was. A slide-out is full height with square corners and takes the same four widths; it has no fullscreen step, because at that width there is no page left beside it.",
          "Fullscreen is edge to edge — no radius, no scrim, no inset. The header and footer bars run the full width and so does the body, which is why it suits a table or a canvas rather than a narrow form. Below 640px every content modal becomes a fullscreen sheet regardless of its size, because 800px of form on a phone is a horizontal scroll."],
        render: () => <SizeDemo /> },

      { id: "treatments", title: "Dialogue treatments",
        prose: ["The featured icon carries the tone: brand for a routine confirmation, error for anything destructive, warning for a reversible bulk action, success to confirm something already done. A dialogue with nothing to signal is better with no icon at all.",
          "The icon usually sits top-left with the text beside it. Centre it when the dialogue is an announcement rather than a question — the whole panel centres with it, buttons included.",
          "A single field is the most a dialogue should hold. Two fields means a content modal at 480."],
        render: () => <Treatments /> }
    ],
    faqs: [
      { q: "Dialogue or content modal?", a: "Count the inputs. None or one, and it's a dialogue. Two or more, or anything that scrolls, and it's a content modal — the header and footer need to stay put while the body moves." },
      { q: "Can I drop the footer?", a: "Yes. A content modal with no <code>actions</code> and no <code>footerLeading</code> renders no footer bar and no rule — right for a read-only panel, where the close button is the only way out. Dialogues always have actions." },
      { q: "Why can't a slide-out be fullscreen?", a: "A fullscreen slide-out is a fullscreen modal with a slower animation. Use <code>size=\"full\"</code> at <code>position=\"center\"</code>." },
      { q: "What happens on a phone?", a: "Content modals become fullscreen sheets below 640px and their action buttons stack, primary on top. Dialogues keep their width, which is already narrower than most phones, and stack their buttons the same way." },
      { q: "How is it dismissed?", a: "Escape, the close button, or a click on the scrim. Pass <code>dismissOnScrim={false}</code> for a task that shouldn't be abandoned by a stray click, and <code>showClose={false}</code> to force a deliberate choice from the actions." },
      { q: "What happened to Drawer?", a: "It was the same panel with a different name. It's gone — use <code>position=\"right\"</code>." }
    ]
  });
})();
