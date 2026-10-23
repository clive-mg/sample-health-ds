/* Sample Health docs — File uploaders. The dropzone, its five states, and the
   file rows it owns. Moved out of docs/pages/app-c.jsx. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { FileUpload, FileUploadItem } = UI;

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
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)" }}>
      <span className="sh-tm-lab">{props.label}</span>
      {props.children}
    </div>
  );
  const Col = (props) => <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4xl-px)" }}>{props.children}</div>;

  /* ---------------- zone ---------------- */
  const ZONE_STATES = [
    { id: "default", label: "Default" }, { id: "hover", label: "Hover" }, { id: "drag", label: "Drag-over" },
    { id: "error", label: "Error" }, { id: "disabled", label: "Disabled" }
  ];
  const zoneSurface = {
    default: ["color.surface.default", "var(--colors-background-bg-primary)"],
    hover: ["color.surface.hover", "var(--colors-background-bg-primary-hover)"],
    drag: ["color.surface.selected", "var(--colors-background-bg-brand-primary)"],
    error: ["color.surface.default", "var(--colors-background-bg-primary)"],
    disabled: ["color.surface.canvas", "var(--colors-background-bg-secondary)"]
  };
  const zoneBorder = {
    default: ["color.border.subtle", "var(--colors-border-border-secondary)"],
    hover: ["color.border.subtle", "var(--colors-border-border-secondary)"],
    drag: ["color.border.primary", "var(--colors-border-border-brand)"],
    error: ["color.border.error", "var(--colors-border-border-error)"],
    disabled: ["color.border.subtle", "var(--colors-border-border-secondary)"]
  };
  const zoneRows = (st) => {
    const surf = zoneSurface[st], bord = zoneBorder[st];
    const rows = [
      tv("radius.xl", "Zone \u00b7 12px", [at("zone", "top", .06)]),
      tc(surf[0], surf[1], [at("zone", "right", .5)]),
      tc(bord[0], bord[1], [at("zone", "bottom", .3)]),
      tv("spacing.xl", "Zone padding \u00b7 top & bottom \u00b7 16px", [at("zone", "left", .12)]),
      tv("spacing.3xl", "Zone padding \u00b7 left & right \u00b7 24px", [at("chip", "left", .5)]),
      tv("spacing.lg", "Stack gap \u00b7 12px", [at("cta", "top", .1)]),
      tv("radius.lg", "Icon chip \u00b7 40 \u00d7 40px", [at("chip", "top", .5)]),
      tv("style.body.md.regular", "Prompt \u00b7 Inter 14/20 \u00b7 400", [at("cta", "right", .5)]),
      st === "disabled"
        ? tc("color.primary.300", "var(--colors-brand-300)", [at("cta", "left", .5)])
        : tc("color.text.link", "var(--colors-brand-600)", [at("cta", "left", .5)]),
      tv("style.body.sm.regular", "Formats \u00b7 Inter 12/18 \u00b7 500", [at("hint", "bottom", .5)]),
      st === "disabled"
        ? tc("color.text.disabled", "var(--colors-text-text-disabled)", [at("hint", "right", .5)])
        : tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("hint", "right", .5)])
    ];
    if (st === "error") rows.push(tc("color.text.status.error", "var(--colors-text-text-error-primary-600)", [at("error", "bottom", .5)]));
    return rows;
  };
  const zoneCls = (st) => st === "hover" ? "sh-fu-hover" : st === "drag" ? "sh-fu-drag" : undefined;

  function ZoneDoc() {
    const [st, setSt] = React.useState("default");
    return <Stage>
      <Group label={ZONE_STATES.filter((s) => s.id === st)[0].label} sig={"fu/" + st} rows={zoneRows(st)}
        tools={<Seg label="State" options={ZONE_STATES} value={st} onChange={setSt} />}
        specimen={<div className={zoneCls(st)} style={{ width: "100%", minWidth: 420 }}>
          <FileUpload disabled={st === "disabled"} error={st === "error"}
            errorText={st === "error" ? "That file is over 10 MB. Compress it or split it in two." : undefined} />
        </div>} />
    </Stage>;
  }

  /* ---------------- row ---------------- */
  const ROW_STATES = [
    { id: "queued", label: "Queued" }, { id: "uploading", label: "Uploading" }, { id: "complete", label: "Complete" },
    { id: "failed", label: "Failed" }, { id: "rejected", label: "Rejected" }
  ];
  const statusColor = {
    queued: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    uploading: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    complete: ["color.success.600", "var(--colors-success-600)"],
    failed: ["color.text.status.error", "var(--colors-text-text-error-primary-600)"],
    rejected: ["color.text.status.error", "var(--colors-text-text-error-primary-600)"]
  };
  const rowRows = (st) => {
    const bad = st === "failed" || st === "rejected";
    const sc = statusColor[st];
    const rows = [
      tv("radius.xl", "Row \u00b7 12px", [at("root", "top", .06)]),
      tv("spacing.xl", "Row padding \u00b7 16px on all sides", [at("root", "left", .2)]),
      bad
        ? tc("color.border.error", "var(--colors-border-border-error)", [at("root", "bottom", .3)])
        : tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("root", "bottom", .3)]),
      tv("spacing.lg", "Chip \u2192 body \u00b7 12px", [at("chip", "right", .5)]),
      tv("radius.lg", "File chip \u00b7 40 \u00d7 40px", [at("chip", "left", .5)]),
      tv("style.body.md.bold", "Name \u00b7 Inter 14/20 \u00b7 600", [at("name", "top", .5)]),
      tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("name", "bottom", .4)]),
      tv("style.body.md.regular", "Meta \u00b7 Inter 14/20 \u00b7 400", [at("meta", "bottom", .2)]),
      tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("meta", "left", .5)]),
      tc(sc[0], sc[1], [at("status", "bottom", .5)]),
      tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("remove", "top", .5)])
    ];
    if (st === "uploading" || st === "complete") rows.push(
      tv("radius.full", "Progress track \u00b7 8px tall", [at("bar", "left", .5)]),
      tc("color.surface.disabled", "var(--colors-background-bg-disabled)", [at("bar", "bottom", .8)]),
      tc("color.surface.primary", "var(--colors-background-bg-brand-solid)", [at("bar", "top", .2)]),
      tv("style.body.md.regular", "Percentage \u00b7 Inter 14/20 \u00b7 400", [at("pct", "right", .5)]));
    if (st === "failed") rows.push(tv("style.body.md.bold", "Try again \u00b7 Inter 14/20 \u00b7 600", [at("retry", "bottom", .5)]));
    return rows;
  };
  const ROW_SPEC = {
    queued: { name: "Claim receipt.pdf", size: "1.2 MB", status: "queued" },
    uploading: { name: "Example dashboard screenshot.jpg", size: "720 KB", status: "uploading", progress: 50 },
    complete: { name: "Tech design requirements_2.pdf", size: "720 KB", status: "complete" },
    failed: { name: "Tech design requirements.pdf", size: "1 MB", status: "failed" },
    rejected: { name: "Scan of everything.zip", size: "48 MB", status: "rejected", error: "Over 10 MB" }
  };

  function RowDoc() {
    const [st, setSt] = React.useState("uploading");
    const f = ROW_SPEC[st];
    return <Stage>
      <Group label={ROW_STATES.filter((s) => s.id === st)[0].label} sig={"fr/" + st} rows={rowRows(st)}
        tools={<Seg label="Status" options={ROW_STATES} value={st} onChange={setSt} />}
        specimen={<div style={{ width: "100%", minWidth: 420 }}>
          <FileUploadItem {...f} onRemove={() => {}} onRetry={st === "failed" ? () => {} : undefined} />
        </div>} />
    </Stage>;
  }

  const FILES = [
    { id: 1, name: "Example dashboard screenshot.jpg", size: "720 KB", status: "uploading", progress: 50 },
    { id: 2, name: "Tech design requirements_2.pdf", size: "720 KB", status: "complete" },
    { id: 3, name: "Tech design requirements.pdf", size: "1 MB", status: "failed" }
  ];

  SH.registerPage("file-uploaders", {
    h1: "File uploaders",
    wide: true,
    lead: "A dropzone that owns its list. Files can arrive by click or by drag, and each one appears as a row beneath the zone carrying its own state \u2014 queued, uploading, complete, failed or rejected. The zone wears the same label, help icon, hint and error line as every other field, so an upload sits in a form without special handling.",
    sections: [
      { id: "zone", title: "The dropzone",
        prose: ["Five states. Hover and drag-over are frozen in the diagram so both can be read. Drag-over is the only one that tints the whole zone: it has to be legible from the corner of the eye while a file is under the cursor.",
          "Disabled is a lighter step of each part rather than an opacity pass, so a disabled zone keeps its own colour instead of showing whatever sits behind it."],
        render: () => <ZoneDoc /> },

      { id: "label", title: "With and without a label",
        prose: ["Labelled, the zone matches Input and Select exactly: label above, required asterisk, help icon, error line below. Unlabelled, it is just the zone \u2014 for a page where a heading already says what to upload."],
        render: () => <Preview className="align-stretch pad-lg"><Col>
          <Eg label="Labelled, required, with help">
            <FileUpload label="Supporting documents" required helpText="Itemised bills and receipts. We do not need the claim form itself." />
          </Eg>
          <Eg label="No label">
            <FileUpload />
          </Eg>
          <Eg label="Error">
            <FileUpload label="Supporting documents" error errorText="That file is over 10 MB. Compress it or split it in two." />
          </Eg>
        </Col></Preview> },

      { id: "rows", title: "File rows",
        prose: ["Every row carries the same frame; what changes is the meta line. Queued and uploading are in flight, complete is done, failed can be retried, and rejected never started \u2014 the file was too large or the wrong type, so the row says which and offers only removal.",
          "Only the two in-flight states show a progress bar. A row with nothing to report should not draw a bar at 0%."],
        render: () => <RowDoc /> },

      { id: "together", title: "Zone and list together",
        prose: ["Pass a files array and the zone renders the rows itself. The list sits under the zone, not inside it, so the zone stays the same height however many files are in flight."],
        render: () => <Preview className="align-stretch pad-lg">
          <FileUpload label="Supporting documents" files={FILES} onRemove={() => {}} onRetry={() => {}} />
        </Preview> }
    ],
    faqs: [
      { q: "Does the component upload anything?", a: "No. It reports files through <code>onFiles</code> and renders whatever you pass back in <code>files</code>. Progress, retries and failures are your upload code's business \u2014 the component only shows them." },
      { q: "Failed or rejected?", a: "Rejected means the file never left the browser: too large, wrong type, wrong dimensions. There is nothing to retry, so the row offers only removal and names the reason. Failed means the upload started and did not finish, which is worth trying again." },
      { q: "Why is the accepted-formats line inside the zone rather than under it?", a: "Because it answers a question people ask before they drop, not after. The line under the zone is the error line \u2014 it says what went wrong with the file they already chose." },
      { q: "Can it take a single file?", a: "Yes. Pass <code>multiple={false}</code> and the picker accepts one; the list still renders as rows, so a replaced file reads the same as an added one." },
      { q: "What happens on a small screen?", a: "The zone fills its column and the rows stack. Long file names truncate rather than wrap, so the size, status and remove control stay where they are down the list." }
    ]
  });
})();
