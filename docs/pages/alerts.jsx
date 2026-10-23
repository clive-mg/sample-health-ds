/* Sample Health docs — Alerts. Two variants: inline callouts and full-width
   page banners. Each carries an annotated token map. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Alert, Button } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const STATUS = [
    { id: "gray", label: "Neutral" }, { id: "info", label: "Info" }, { id: "warning", label: "Warning" },
    { id: "error", label: "Error" }, { id: "success", label: "Success" }
  ];
  /* Foundations name → CSS ramp name. info takes the primary (brand) ramp. */
  const RAMP = { info: "primary", warning: "warning", error: "error", success: "success" };
  const CSSVAR = { info: "brand", warning: "warning", error: "error", success: "success" };

  const surfaceRows = (c) => c === "gray"
    ? [tc("color.surface.canvas", "var(--colors-background-bg-secondary)", [at("root", "left", .5)]),
       tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("root", "top", .5)])]
    : [tc("color." + RAMP[c] + ".50", "var(--colors-" + CSSVAR[c] + "-50)", [at("root", "left", .5)]),
       tc("color." + RAMP[c] + ".200", "var(--colors-" + CSSVAR[c] + "-200)", [at("root", "top", .5)])];
  const glyphRow = (c, anchor) => c === "gray"
    ? tc("color.neutral.600", "var(--colors-gray-light-mode-600)", [anchor])
    : tc("color." + RAMP[c] + ".600", "var(--colors-" + CSSVAR[c] + "-600)", [anchor]);

  /* ---------------- map shell ---------------- */
  const Map = (props) => <div className="sh-tm-table"><SH.TokenMap sig={props.sig} rows={props.rows} specimen={props.specimen} /></div>;
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

  const Take = () => <Button hierarchy="link-color" size="sm">Take Action</Button>;
  const COPY = {
    gray: ["Premium Information", "Your premium and due date are shown below. Payments are processed securely, and updates may take a short time to reflect."],
    info: ["Insulin cap", "You won't pay more than $35 for a one-month supply of each covered insulin product."],
    warning: ["Prior authorization expires soon", "Coverage for this medication ends on March 14 unless the authorization is renewed."],
    error: ["There was a problem with that action", "Your payment method was declined. Update it to keep coverage active."],
    success: ["Payment received", "Your February premium has been applied to your account."]
  };

  /* ---------------- inline ---------------- */
  const inlineRows = (c) => [
    tv("radius.md", "8px", [at("root", "top", .04)])
  ].concat(surfaceRows(c), [
    tv("spacing.xl", "Padding \u00b7 16px on all sides", [at("root", "bottom", .3)]),
    tv("spacing.lg", "Icon \u2192 text gap \u00b7 12px", [at("chip", "right", .5)]),
    tc("color.surface.default", "var(--colors-background-bg-primary)", [at("chip", "left", .5)]),
    tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("chip", "top", .5)]),
    glyphRow(c, at("glyph", "bottom", .5)),
    tv("style.body.md.bold", "Title \u00b7 Inter 14/20 \u00b7 600", [at("title", "top", .5)]),
    tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("title", "bottom", .4)]),
    tv("style.body.md.regular", "Message \u00b7 Inter 14/20 \u00b7 400", [at("text", "bottom", .4)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("text", "right", .5)]),
    tv("spacing.md", "Message \u2192 action gap \u00b7 8px", [at("action", "top", .15)]),
    tc("color.text.link", "var(--colors-text-text-brand-tertiary-600)", [at("action", "bottom", .3)])
  ]);

  function InlineDoc() {
    const [c, setC] = React.useState("info");
    const copy = COPY[c];
    return <Stage>
      <Group label={STATUS.filter((s) => s.id === c)[0].label} sig={"in/" + c} rows={inlineRows(c)}
        tools={<Seg label="Status" options={STATUS} value={c} onChange={setC} />}
        specimen={<div style={{ width: "100%", minWidth: 480 }}>
          <Alert annotate color={c} title={copy[0]} actions={<Take />} onClose={() => {}}>{copy[1]}</Alert>
        </div>} />
    </Stage>;
  }

  /* ---------------- banner ---------------- */
  const bannerRows = (c) => surfaceRows(c).map((r, i) => (i === 1
    ? tc(r.token, r.color, [at("root", "bottom", .5)], r.note)
    : r)).concat([
    tv("spacing.xl", "Band padding \u00b7 top & bottom \u00b7 16px", [at("inner", "top", .2)]),
    tv("spacing.3xl", "Band inset \u00b7 left & right \u00b7 24px", [at("inner", "left", .5)]),
    tv("Content width", "max 1280px \u00b7 fills narrower pages", [at("inner", "top", .8)]),
    tv("spacing.xl", "Icon \u2192 message gap \u00b7 16px", [at("chip", "right", .5)]),
    tc("color.surface.default", "var(--colors-background-bg-primary)", [at("chip", "left", .5)]),
    glyphRow(c, at("glyph", "bottom", .5)),
    tv("style.body.md.regular", "Message \u00b7 Inter 14/20 \u00b7 400", [at("text", "bottom", .5)]),
    tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("title", "top", .5)]),
    tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("text", "right", .9)])
  ]);

  /* Banner copy per status — title, message, action label. */
  const BANNER = {
    gray: ["You are impersonating Jan Levinson.", "You cannot make any changes during impersonation mode.", "Exit impersonation"],
    info: ["Your 2026 plan documents are ready.", "Review your coverage and premium before open enrollment closes on December 7.", "Review changes"],
    warning: ["Scheduled maintenance.", "Claims submission will be unavailable Saturday from 10pm to 2am ET.", "View status"],
    error: ["Your payment method was declined.", "Update your card by March 1 to keep coverage active.", "Update payment"],
    success: ["Your plan change is complete.", "Coverage under your new plan starts March 1.", "View plan"]
  };

  function BannerDoc() {
    const [c, setC] = React.useState("error");
    const b = BANNER[c];
    return <Stage>
      <Group label={STATUS.filter((s) => s.id === c)[0].label} sig={"bn/" + c} rows={bannerRows(c)}
        tools={<Seg label="Status" options={STATUS} value={c} onChange={setC} />}
        specimen={<div style={{ width: "100%", minWidth: 560, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", overflow: "hidden", background: "var(--colors-background-bg-primary)" }}>
          <Alert annotate variant="banner" color={c} title={b[0]}
            actions={<Button size="sm">{b[2]}</Button>} onClose={() => {}}>
            {b[1]}
          </Alert>
          <div style={{ height: 640, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--colors-background-bg-secondary)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, lineHeight: "18px", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--colors-text-text-quaternary-500)" }}>Page content</div>
        </div>} />
    </Stage>;
  }

  const Col = (props) => <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xl-px)", width: "100%" }}>{props.children}</div>;
  const Eg = (props) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)" }}>
      <span className="sh-tm-lab">{props.label}</span>
      {props.children}
    </div>
  );

  SH.registerPage("alerts", {
    h1: "Alert components",
    wide: true,
    lead: "Alerts carry a status message the person did not ask for. Inline alerts sit in the content column beside what they describe; page banners span the top of the screen for conditions that affect the whole session. Both take the same five statuses, icon chip and optional action.",
    sections: [
      { id: "inline-anatomy", title: "Inline anatomy",
        prose: ["Hover a token to trace where it lands, or hover a part of the alert to find its tokens."],
        render: () => <InlineDoc /> },

      { id: "layouts", title: "Alert variations",
        prose: ["The title, message, action and dismiss control are each optional. Drop the action and the close button for a purely informational callout; drop the title when a single line says it all."],
        render: () => <Preview className="align-stretch"><Col>
          <Eg label="With one action">
            <Alert color="gray" title={COPY.gray[0]} actions={<Take />} onClose={() => {}}>{COPY.gray[1]}</Alert>
          </Eg>
          <Eg label="Without any actions and dismissible icon">
            <Alert color="gray" title={COPY.gray[0]}>{COPY.gray[1]}</Alert>
          </Eg>
          <Eg label="Without any title">
            <Alert color="info" onClose={() => {}}>{COPY.info[1]}</Alert>
          </Eg>
          <Eg label="With multiple actions">
            <Alert color="warning" title={COPY.warning[0]} onClose={() => {}} actions={<>
              <Button hierarchy="link-color" size="sm">Renew now</Button>
              <Button hierarchy="link-gray" size="sm">Remind me later</Button>
            </>}>{COPY.warning[1]}</Alert>
          </Eg>
        </Col></Preview> },

      { id: "banner", title: "Banner alerts",
        prose: ["A banner spans the full width of the page, tints edge to edge and closes with a hairline rule. Its content is constrained to the page width, so the icon and action line up with the page's own columns. Use it for a state that applies to everything on screen — impersonation, a service outage, a plan that has lapsed — not for a message about one field or one card."] },

      { id: "banner-anatomy", title: "Banner alerts anatomy",
        render: () => <BannerDoc /> }
    ],
    faqs: [
      { q: "Which colors are available?", a: "<code>gray</code>, <code>brand</code>, <code>info</code>, <code>warning</code>, <code>error</code> and <code>success</code>. <code>info</code> is an alias of <code>brand</code> — both resolve to the <code>color.primary</code> ramp, so the informational alert is the brand blue. Each color sets a default icon, which the <code>icon</code> prop overrides." },
      { q: "Why is the action link always blue?", a: "The action is a link-color button in every status, so the one interactive element on the alert reads the same everywhere. Tinting it per status would put a second red or amber element next to the icon and dilute the signal." },
      { q: "Inline or banner?", a: "Inline when the message belongs to something on the page — a form, a card, a section. Banner when it applies to the whole page or session, and when it should stay visible as the person scrolls." },
      { q: "Does it announce to screen readers?", a: "Yes. Error and warning alerts render with <code>role=\"alert\"</code>, the rest with <code>role=\"status\"</code>. Pass <code>role</code> to override." },
      { q: "What about dark mode?", a: "The neutral alert uses semantic surface and border tokens, so it flips with the theme. The four status alerts take ramp steps, which are declared once in <code>:root</code> and keep their light-mode value on a dark surface — Foundations publishes no semantic status tints yet." }
    ]
  });
})();
