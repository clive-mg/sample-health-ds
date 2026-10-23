/* Sample Health docs — Notifications. Every section carries a trigger that
   fires the real toast into the corner of the page, so the stacking and
   auto-dismiss behaviour can be seen rather than described. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Toast, ToastSimple, ToastProgress, Button } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  /* Foundations name → CSS ramp name for the status glyph. */
  const RAMP = { gray: "neutral", brand: "primary", success: "success", warning: "warning", error: "error" };
  const CSSVAR = { gray: "gray-light-mode", brand: "brand", success: "success", warning: "warning", error: "error" };
  const STATUS = [
    { id: "gray", label: "Neutral" }, { id: "brand", label: "Brand" }, { id: "success", label: "Success" },
    { id: "warning", label: "Warning" }, { id: "error", label: "Error" }
  ];

  /* ---------------- toast store ---------------- */
  const LIFE = 8000, PEEK = 3, GAP = 12, WIDTH = 360;
  let seq = 0, queue = [];
  const subs = new Set();
  const emit = () => subs.forEach((f) => f(queue.slice()));
  const push = (t) => { queue = [Object.assign({ id: ++seq, left: LIFE }, t)].concat(queue); emit(); };
  const drop = (id) => { queue = queue.filter((t) => t.id !== id); emit(); };
  /* Only the toasts on top of the stack age; the ones queued behind wait. */
  function step() {
    let expired = false;
    queue.slice(0, PEEK).forEach((t) => { t.left -= 100; if (t.left <= 0) expired = true; });
    if (expired) { queue = queue.filter((t) => t.left > 0); emit(); }
  }
  function useToasts() {
    const [list, setList] = React.useState(queue);
    React.useEffect(() => { subs.add(setList); setList(queue.slice()); return () => { subs.delete(setList); }; }, []);
    return list;
  }

  const ACT = (a, i) => <Button key={i} hierarchy={a[1]} size="sm" onClick={a[2] || null}>{a[0]}</Button>;

  function Card(props) {
    const t = props.toast;
    if (t.kind === "simple") return <div style={{ display: "flex", justifyContent: "flex-end" }}><ToastSimple color={t.color} message={t.title} /></div>;
    if (t.kind === "progress") return <ToastProgress title={t.title} progress={Math.round((t.left / LIFE) * 100)} />;
    return <Toast color={t.color} title={t.title} onClose={() => drop(t.id)}
      actions={t.actions ? t.actions.map(ACT) : null}>{t.body}</Toast>;
  }

  function Viewport() {
    const list = useToasts();
    const [open, setOpen] = React.useState(false);
    const [, tick] = React.useState(0);
    const [hs, setHs] = React.useState([]);
    const refs = React.useRef([]);
    const ids = list.map((t) => t.id).join(",");

    React.useLayoutEffect(() => {
      setHs(list.map((_, i) => (refs.current[i] ? refs.current[i].offsetHeight : 0)));
    }, [ids, open]);

    /* Hovering the stack pauses every countdown — the person is reading it. */
    React.useEffect(() => {
      if (open || !list.length) return;
      const iv = setInterval(() => { step(); tick((n) => n + 1); }, 100);
      return () => clearInterval(iv);
    }, [open, list.length]);

    if (!list.length) return null;
    const height = open
      ? list.reduce((s, _, i) => s + (hs[i] || 0) + (i ? GAP : 0), 0)
      : (hs[0] || 0);

    return (
      <div style={{ position: "fixed", right: 24, bottom: 24, width: WIDTH, height: height, zIndex: 90, pointerEvents: "none" }}
        onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        {list.map((t, i) => {
          const behind = Math.min(i, PEEK);
          const hidden = !open && i >= PEEK;
          const y = open
            ? -list.slice(0, i).reduce((s, _, k) => s + (hs[k] || 0) + GAP, 0)
            : -10 * behind;
          const scale = open ? 1 : 1 - 0.04 * behind;
          return (
            <div key={t.id} ref={(el) => { refs.current[i] = el; }} className={hidden ? null : "sh-toast-in"}
              style={{
                position: "absolute", right: 0, bottom: 0, width: WIDTH, transformOrigin: "bottom right",
                transform: "translateY(" + y + "px) scale(" + scale + ")",
                height: open || !i ? "auto" : (hs[0] || undefined), overflow: open || !i ? "visible" : "hidden",
                opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto", zIndex: 100 - i,
                transition: "transform 260ms cubic-bezier(.2,.7,.2,1), opacity 200ms ease"
              }}>
              <div ref={(el) => { refs.current[i] = el; }}><Card toast={t} /></div>
            </div>
          );
        })}
      </div>
    );
  }

  /* One viewport for the whole document, mounted on first use. */
  let hostRoot = null;
  function mountHost() {
    if (hostRoot) return;
    const el = document.createElement("div");
    el.className = "sh";
    document.body.appendChild(el);
    hostRoot = window.ReactDOM.createRoot(el);
    hostRoot.render(React.createElement(Viewport));
  }
  const fire = (t) => { mountHost(); push(t); };

  /* ---------------- copy ---------------- */
  const COPY = {
    gray: ["Draft saved", "Your visit note for Olivia Ruiz was saved as a draft."],
    brand: ["Sample Health 1.4.1 is now available", "Includes the all new dashboard view. Pages and exports will now load faster."],
    success: ["Claim submitted", "CLM-3067 was accepted by Meridian Health Plan."],
    warning: ["Storage almost full", "You have used 90% of your document storage."],
    error: ["Upload failed", "Echo report.pdf exceeds the 20 MB limit."]
  };
  const ACTIONS = {
    gray: [["Discard", "link-gray"], ["Resume editing", "link-color"]],
    brand: [["Later", "link-gray"], ["Install now", "link-color"]],
    success: [["View claim", "link-color"]],
    warning: [["Manage storage", "link-color"]],
    error: [["Try again", "link-color"]]
  };
  const toastFor = (c) => ({ color: c, title: COPY[c][0], body: COPY[c][1], actions: ACTIONS[c] });

  /* ---------------- shells ---------------- */
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
  const Col = (props) => <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3xl-px)", width: "100%" }}>{props.children}</div>;
  const Trig = (props) => (
    <button type="button" onClick={props.onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-md-px)", border: "none", background: "transparent", padding: 0, cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>
      <Icon name="Bell01" size={18} />{props.children || "Click to trigger a toast"}
    </button>
  );
  const TrigRow = (props) => <div style={{ display: "flex", justifyContent: "center", gap: "var(--spacing-3xl-px)", marginTop: "var(--spacing-3xl-px)" }}>{props.children}</div>;
  const Eg = (props) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-xl-px)" }}>
        <span className="sh-tm-lab">{props.label}</span>
        <Trig onClick={props.onTrigger} />
      </div>
      {props.children}
    </div>
  );

  /* ---------------- anatomy ---------------- */
  const rows = (c) => [
    tv("radius.md", "8px", [at("root", "top", .04)]),
    tc("color.surface.default", "var(--colors-background-bg-primary)", [at("root", "left", .5)]),
    tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("root", "top", .5)]),
    tv("shadow.lg", "0px 12px 16px -4px \u00b7 0px 4px 6px -2px", [at("root", "bottom", .75)]),
    tv("spacing.xl", "Padding \u00b7 16px on all sides", [at("root", "bottom", .3)]),
    tv("spacing.lg", "Icon \u2192 text gap \u00b7 12px", [at("glyph", "right", .5)]),
    tc("color." + RAMP[c] + ".600", "var(--colors-" + CSSVAR[c] + "-600)", [at("glyph", "left", .5)]),
    tv("style.body.md.bold", "Title \u00b7 Inter 14/20 \u00b7 600", [at("title", "top", .5)]),
    tc("color.text.primary", "var(--colors-text-text-primary-900)", [at("title", "bottom", .4)]),
    tv("spacing.xxs", "Title \u2192 message gap \u00b7 2px", [at("text", "top", .12)]),
    tv("style.body.md.regular", "Message \u00b7 Inter 14/20 \u00b7 400", [at("text", "bottom", .4)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("text", "right", .5)]),
    tv("spacing.lg", "Message \u2192 action gap \u00b7 12px", [at("action", "top", .12)]),
    tc("color.text.link", "var(--colors-text-text-brand-tertiary-600)", [at("action", "bottom", .3)])
  ];

  function AnatomyDoc() {
    const [c, setC] = React.useState("brand");
    const t = toastFor(c);
    return <Stage>
      <Group label={STATUS.filter((s) => s.id === c)[0].label} sig={"tst/" + c} rows={rows(c)}
        tools={<Seg label="Status" options={STATUS} value={c} onChange={setC} />}
        specimen={<div style={{ width: "100%", minWidth: 360, display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--spacing-3xl-px)" }}>
          <Toast annotate color={c} title={t.title} onClose={() => {}} actions={t.actions.map(ACT)}>{t.body}</Toast>
          <Trig onClick={() => fire(t)} />
        </div>} />
    </Stage>;
  }

  /* ---------------- page ---------------- */
  SH.registerPage("notifications", {
    h1: "Notification components",
    wide: true,
    lead: "A toast reports something that already happened, in a floating card pinned to the bottom-right of the screen. It carries a status glyph, a title, a message and up to two link actions. Toasts stack, pause while they are being read, and clear themselves after eight seconds.",
    sections: [
      { id: "anatomy", title: "Toast anatomy",
        prose: ["Hover a token to trace where it lands, or hover a part of the toast to find its tokens. The trigger fires the same toast into the corner of the page."],
        render: () => <AnatomyDoc /> },

      { id: "variations", title: "Toast variations",
        prose: ["The title, message, actions and dismiss control are each optional. Two actions is the ceiling — a toast that needs more decisions than that belongs in a modal."],
        render: () => <Preview className="align-stretch"><Col>
          <Eg label="With two actions" onTrigger={() => fire(toastFor("brand"))}>
            <Toast color="brand" title={COPY.brand[0]} onClose={() => {}} actions={ACTIONS.brand.map(ACT)}>{COPY.brand[1]}</Toast>
          </Eg>
          <Eg label="With one action" onTrigger={() => fire(toastFor("success"))}>
            <Toast color="success" title={COPY.success[0]} onClose={() => {}} actions={ACTIONS.success.map(ACT)}>{COPY.success[1]}</Toast>
          </Eg>
          <Eg label="Without any actions" onTrigger={() => fire({ color: "warning", title: COPY.warning[0], body: COPY.warning[1] })}>
            <Toast color="warning" title={COPY.warning[0]} onClose={() => {}}>{COPY.warning[1]}</Toast>
          </Eg>
          <Eg label="Title only" onTrigger={() => fire({ color: "error", title: COPY.error[0] })}>
            <Toast color="error" title={COPY.error[0]} onClose={() => {}} />
          </Eg>
        </Col></Preview> },

      { id: "stacking", title: "Stacking",
        prose: ["Fire a second toast and the first slides behind it: the newest sits in front, the two behind it peek out at the top edge, and anything past three waits its turn. Hovering the stack fans it out into a list and freezes every countdown until the pointer leaves."],
        render: () => <Preview className="align-stretch"><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--spacing-lg-px)" }}>
          <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)", textAlign: "center" }}>
            Trigger a few, then hover the stack in the bottom-right corner.
          </p>
          <TrigRow>
            <Trig onClick={() => fire(toastFor("brand"))} />
            <Trig onClick={() => { ["success", "warning", "error"].forEach((c, i) => setTimeout(() => fire(toastFor(c)), i * 180)); }}>Trigger three at once</Trig>
          </TrigRow>
        </div></Preview> },

      { id: "progress", title: "Auto-dismiss progress",
        prose: ["A bar across the foot of the toast counts out the eight seconds it has left. It pauses with the rest of the stack on hover."],
        render: () => <Preview className="align-stretch"><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--spacing-3xl-px)" }}>
          <ToastProgress title="Exporting claims report" progress={60} />
          <Trig onClick={() => fire({ kind: "progress", title: "Exporting claims report" })} />
        </div></Preview> }
    ],
    faqs: [
      { q: "Where do toasts appear?", a: "Bottom-right of the viewport, 24px from each edge, above everything else on the page. The position is fixed for the whole product so people learn where to look." },
      { q: "How long do they stay?", a: "Eight seconds. The countdown pauses while the pointer is over the stack, and toasts queued behind the top three do not start ageing until they reach the front." },
      { q: "How many can stack?", a: "Three are visible: the newest in front, with the two behind it peeking out. Further toasts queue and appear as the ones in front clear." },
      { q: "Toast or alert?", a: "A toast reports something that already happened and disappears. An inline alert describes a condition that persists on the page — a lapsed authorization, a declined payment — and stays until it is resolved." },
      { q: "What about dark mode?", a: "The surface, border and text tokens are semantic, so they flip with the theme. The status glyph takes its ramp's 600 step, which is declared once in <code>:root</code> and keeps its light-mode value on a dark surface." }
    ]
  });
})();
