/* Sample Health docs — Tables. Every example carries an annotated token map:
   hover a chip or a part of the table to trace where the token lands. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Table, Badge, Avatar, Button, ProgressBar, EmptyState, Tooltip, Dropdown } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const C = {
    card: ["color.surface.default", "var(--colors-background-bg-primary)"],
    head: ["color.surface.canvas", "var(--colors-background-bg-secondary)"],
    stripe: ["color.surface.canvas", "var(--colors-background-bg-secondary)"],
    divider: ["color.border.subtle", "var(--colors-border-border-secondary)"],
    cell: ["color.text.secondary", "var(--colors-text-text-secondary-700)"],
    lead: ["color.text.primary", "var(--colors-text-text-primary-900)"],
    meta: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    hover: ["color.neutral.100", "var(--colors-background-bg-secondary-hover)"],
    selected: ["color.surface.selected", "var(--colors-background-bg-brand-primary)"],
    off: ["color.text.disabled", "var(--colors-text-text-disabled)"]
  };
  const col = (k, anchors, note) => tc(C[k][0], C[k][1], anchors, note);

  /* ---------------- sample data ---------------- */
  const PROVIDERS = [
    { id: 1, name: "Amara Okafor", handle: "@a.okafor", initials: "AO", status: "Active", specialty: "Cardiology", email: "a.okafor@samplehealth.com", panels: ["Cardiology", "Inpatient"], more: 4 },
    { id: 2, name: "Ben Halvorsen", handle: "@b.halvorsen", initials: "BH", status: "Active", specialty: "Primary care", email: "b.halvorsen@samplehealth.com", panels: ["Clinic 2", "Telehealth"], more: 2 },
    { id: 3, name: "Lin Zhao", handle: "@l.zhao", initials: "LZ", status: "Pending", specialty: "Radiology", email: "l.zhao@samplehealth.com", panels: ["Imaging"], more: 3 },
    { id: 4, name: "Marta Reyes", handle: "@m.reyes", initials: "MR", status: "Inactive", specialty: "Endocrinology", email: "m.reyes@samplehealth.com", panels: ["Clinic 1"], more: 1 },
    { id: 5, name: "Tomas Nkemdirim", handle: "@t.nkemdirim", initials: "TN", status: "Active", specialty: "Orthopedics", email: "t.nkemdirim@samplehealth.com", panels: ["Surgery", "Clinic 3"], more: 2 }
  ];
  const PAYERS = [
    { id: "mhp", plan: "Meridian Health Plan", domain: "meridianhp.com", initials: "MH", status: "Contracted", program: "Commercial PPO", members: 2400, use: 60 },
    { id: "cas", plan: "Cascade Mutual", domain: "cascademutual.com", initials: "CM", status: "Churned", program: "Medicare Advantage", members: 1180, use: 20 },
    { id: "nwb", plan: "Northwind Benefits", domain: "northwindbenefits.com", initials: "NB", status: "Contracted", program: "Self-funded", members: 3260, use: 70 },
    { id: "hpc", plan: "Harbor Point Care", domain: "harborpoint.health", initials: "HP", status: "Contracted", program: "Medicaid MCO", members: 960, use: 30 }
  ];
  const CLAIMS = [
    { id: "CLM-3066", date: "Feb 4, 2026", status: "Paid", patient: "Olivia Ruiz", email: "o.ruiz@mail.com", initials: "OR", service: "Office visit \u2014 99213" },
    { id: "CLM-3065", date: "Feb 4, 2026", status: "Paid", patient: "Priya Nadar", email: "p.nadar@mail.com", initials: "PN", service: "Echocardiogram \u2014 93306" },
    { id: "CLM-3064", date: "Feb 3, 2026", status: "Refunded", patient: "Luis Ferreira", email: "l.ferreira@mail.com", initials: "LF", service: "Lab panel \u2014 80053" },
    { id: "CLM-3063", date: "Feb 2, 2026", status: "Denied", patient: "Dana Whitfield", email: "d.whitfield@mail.com", initials: "DW", service: "MRI lumbar \u2014 72148" }
  ];
  const DOCS = [
    { id: "d1", file: "Prior authorization.pdf", kind: "PDF", size: "200 KB", up: "Feb 4, 2026", edit: "Feb 4, 2026", by: "Amara Okafor", initials: "AO" },
    { id: "d2", file: "Discharge summary.docx", kind: "DOC", size: "400 KB", up: "Feb 3, 2026", edit: "Feb 4, 2026", by: "Ben Halvorsen", initials: "BH" },
    { id: "d3", file: "Echo report.pdf", kind: "PDF", size: "1.2 MB", up: "Feb 2, 2026", edit: "Feb 2, 2026", by: "Lin Zhao", initials: "LZ" },
    { id: "d4", file: "Intake photo.jpg", kind: "IMG", size: "720 KB", up: "Feb 1, 2026", edit: "Feb 1, 2026", by: "Marta Reyes", initials: "MR" }
  ];

  /* ---------------- cell renderers ---------------- */
  const badgeColor = (s) => ({ Active: "success", Contracted: "success", Paid: "success", Pending: "warning", Refunded: "warning", Denied: "error", Churned: "gray", Inactive: "gray" }[s] || "gray");
  const Lead = (props) => (
    <div data-sh-part={props.part} style={{ display: "flex", alignItems: "center", gap: "var(--spacing-lg-px)" }}>
      {props.avatar}
      <div style={{ minWidth: 0 }}>
        <div data-sh-part={props.titlePart} style={{ fontSize: 14, fontWeight: 600, lineHeight: "20px", color: "var(--colors-text-text-primary-900)" }}>{props.title}</div>
        <div data-sh-part={props.subPart} style={{ fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>{props.sub}</div>
      </div>
    </div>
  );
  const Logo = (props) => (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, flex: "0 0 auto", borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-secondary-subtle)", fontSize: 14, fontWeight: 600, color: "var(--colors-text-text-tertiary-600)" }}>{props.initials}</span>
  );
  const FileGlyph = (props) => (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, flex: "0 0 auto", borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", fontSize: 12, fontWeight: 700, letterSpacing: ".06em", color: "var(--colors-text-text-tertiary-600)" }}>{props.kind}</span>
  );

  const providerCols = [
    { key: "name", header: "Name", render: (r) => <Lead part="lead" titlePart="leadtitle" subPart="leadsub" avatar={<Avatar size="md" initials={r.initials} />} title={r.name} sub={r.handle} /> },
    { key: "status", header: "Status", render: (r) => <span data-sh-part="badge"><Badge size="sm" type="pill-color" color={badgeColor(r.status)}>{r.status}</Badge></span> },
    { key: "specialty", header: "Specialty", sortable: true },
    { key: "email", header: "Email address" },
    { key: "panels", header: "Panels", render: (r) => <span data-sh-part="tags" style={{ display: "inline-flex", gap: "var(--spacing-md-px)", flexWrap: "nowrap" }}>
      {r.panels.map((p) => <Badge key={p} size="sm" type="pill-color" color="gray">{p}</Badge>)}
      <Badge size="sm" type="pill-color" color="gray">{"+" + r.more}</Badge></span> }
  ];
  const payerCols = [
    { key: "plan", header: "Plan", render: (r) => <Lead part="lead" titlePart="leadtitle" subPart="leadsub" avatar={<Logo initials={r.initials} />} title={r.plan} sub={r.domain} /> },
    { key: "status", header: "Status", render: (r) => <span data-sh-part="badge"><Badge size="sm" type="pill-color" color={badgeColor(r.status)}>{r.status}</Badge></span> },
    { key: "program", header: "Program" },
    { key: "members", header: "Members", align: "right", render: (r) => r.members.toLocaleString() },
    { key: "use", header: "Network use", width: 180, render: (r) => <span data-sh-part="bar" style={{ display: "flex", alignItems: "center", gap: "var(--spacing-lg-px)" }}>
      <span style={{ flex: 1 }}><ProgressBar value={r.use} /></span>
      <span style={{ fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>{r.use + "%"}</span></span> }
  ];
  const claimCols = [
    { key: "id", header: "Claim", render: (r) => <span style={{ fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{"#" + r.id}</span> },
    { key: "date", header: "Date", sortable: true },
    { key: "status", header: "Status", render: (r) => <span data-sh-part="badge"><Badge size="sm" type="pill-color" color={badgeColor(r.status)}>{r.status}</Badge></span> },
    { key: "patient", header: "Patient" },
    { key: "service", header: "Service" },
    { key: "actions", header: "Actions", render: () => <span data-sh-part="rowactions" style={{ display: "inline-flex", gap: "var(--spacing-lg-px)" }}>
      <Button hierarchy="link-gray" size="sm">Delete</Button><Button hierarchy="link-color" size="sm">Edit</Button></span> }
  ];
  const DOC_ACTIONS = [
    { icon: "Download01", label: "Download" },
    { icon: "Share04", label: "Share" },
    { icon: "Trash01", label: "Delete" }
  ];
  const docCols = [
    { key: "file", header: "File name", render: (r) => <Lead part="lead" titlePart="leadtitle" subPart="leadsub" avatar={<FileGlyph kind={r.kind} />} title={r.file} sub={r.size} /> },
    { key: "up", header: "Date uploaded", sortable: true },
    { key: "edit", header: "Last updated" },
    { key: "by", header: "Uploaded by" },
    { key: "actions", header: "Actions", render: () => <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-lg-px)" }}>
      {DOC_ACTIONS.map((a) => <Tooltip key={a.label} title={a.label}>
        <Button hierarchy="link-gray" size="sm" iconOnly iconLeading={<Icon name={a.icon} size={18} />} aria-label={a.label} /></Tooltip>)}</span> }
  ];
  const MENU_ACTIONS = [
    { label: "Edit", icon: <Icon name="Edit02" size={16} /> },
    { label: "Download", icon: <Icon name="Download01" size={16} /> },
    { label: "Share", icon: <Icon name="Share04" size={16} /> },
    { divider: true },
    { label: "Delete", icon: <Icon name="Trash01" size={16} />, destructive: true }
  ];
  const menuCols = [docCols[0], docCols[1]].concat([
    { key: "actions", header: "Actions", render: () => <Dropdown align="right" items={MENU_ACTIONS}
      trigger={<Button hierarchy="link-gray" size="sm" iconOnly iconLeading={<Icon name="DotsVertical" size={18} />} aria-label="More actions" />} /> }
  ]);

  /* ---------------- map shell ---------------- */
  function Map(props) {
    return (
      <div className={"sh-tm-table" + (props.cls ? " " + props.cls : "")}>
        <SH.TokenMap sig={props.sig} rows={props.rows} specimen={props.specimen} />
      </div>
    );
  }
  function Group(props) {
    return (
      <div className="sh-tm-group">
        <div className="sh-tm-head"><SH.StateMark>{props.label}</SH.StateMark>{props.tools || null}</div>
        <Map sig={props.sig} rows={props.rows} specimen={props.specimen} cls={props.cls} />
      </div>
    );
  }
  const Stage = (props) => <Preview className="align-stretch canvas pad-tm"><div className="sh-tm-set">{props.children}</div></Preview>;
  const Seg = (props) => (
    <div className="sh-tm-sizes">
      <span className="sh-tm-lab">{props.label}</span>
      <div className="sh-tm-seg">{props.options.map((o) =>
        <button key={o.id} type="button" className={o.id === props.value ? "is-on" : ""} onClick={() => props.onChange(o.id)}>{o.label}</button>)}</div>
    </div>
  );

  /* ---------------- 1. anatomy ---------------- */
  const anatomyRows = [
    tv("radius.md", "8px", [at("card", "top", .04)]),
    tv("shadow.xs", "0px 1px 2px rgba(10,13,18,0.05)", [at("card", "left", .96)]),
    col("card", [at("card", "bottom", .5)]),
    col("head", [at("head", "left", .5)]),
    col("divider", [at("row", "right", 1)]),
    tv("spacing.xl", "Cell padding \u00b7 top & bottom \u00b7 16px", [at("cell", "top", .3)]),
    tv("spacing.xl", "Cell padding \u00b7 left & right \u00b7 16px", [at("cell", "left", .5)]),
    tv("style.body.md.bold", "Header \u00b7 Inter 14/20 \u00b7 600", [at("headcell", "top", .5)]),
    tv("style.body.md.regular", "Cell \u00b7 Inter 14/20 \u00b7 400", [at("cell", "bottom", .4)]),
    col("cell", [at("cell", "right", .5)])
  ];

  /* ---------------- 2. sizes ---------------- */
  const SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }];
  const sizeRows = (size) => [
    tv(size === "sm" ? "spacing.md" : "spacing.xl", "Cell padding \u00b7 top & bottom \u00b7 " + (size === "sm" ? "8px" : "16px"), [at("cell", "top", .3)]),
    tv("spacing.xl", "Cell padding \u00b7 left & right \u00b7 16px \u00b7 both sizes", [at("cell", "left", .5)]),
    tv(size === "sm" ? "spacing.md" : "spacing.lg", "Header padding \u00b7 top & bottom \u00b7 " + (size === "sm" ? "8px" : "12px"), [at("headcell", "top", .35)]),
    tv("spacing.xl", "Header padding \u00b7 left & right \u00b7 16px", [at("headcell", "left", .5)]),
    tv("style.body.md.regular", "Inter 14/20 \u00b7 400 in both sizes", [at("cell", "bottom", .4)])
  ];

  /* ---------------- 3. fills ---------------- */
  const FILLS = [{ id: "divider", label: "Divider line" }, { id: "alternating", label: "Alternating fill" }];
  const fillRows = (fill) => fill === "divider"
    ? [col("divider", [at("row", "bottom", .5)]), tv("Divider", "1px between rows", [at("row", "right", 1)]), col("card", [at("row", "left", .5)])]
    : [col("stripe", [at("rowalt", "left", .5)]), col("card", [at("row", "left", .5)]), tv("Divider", "none \u2014 the fill replaces it", [at("rowalt", "right", 1)])];

  /* ---------------- 4. row states ---------------- */
  const STATES = [
    { id: "hover", label: "Hover" }, { id: "selected", label: "Selected" }, { id: "sorted", label: "Sorted column" }
  ];
  function stateRows(state) {
    if (state === "selected") return [col("selected", [at("rowsel", "left", .5)]), tv("Checkbox", "16px", [at("selectcell", "top", .5)])];
    if (state === "sorted") return [col("cell", [at("sorthead", "top", .5)]), tv("spacing.xs", "Label \u2192 arrow gap \u00b7 4px", [at("sorthead", "right", .5)]), tv("Sort arrow", "16px", [at("sorthead", "bottom", .5)])];
    return [col("hover", [at("row", "left", .5)]), col("cell", [at("cell", "bottom", .4)])];
  }

  /* ---------------- specimens ---------------- */
  const shortProviders = PROVIDERS.slice(0, 3);
  const baseCols = providerCols.slice(0, 3);

  function StatesDoc() {
    const [state, setState] = React.useState("hover");
    const [sel, setSel] = React.useState([1]);
    const isSorted = state === "sorted";
    const body = (
      <div className={state === "hover" ? "sh-tbl-hover" : null}>
        <Table annotate columns={baseCols} data={shortProviders}
          selectable={state === "selected"} selected={state === "selected" ? sel : []} onSelectionChange={setSel}
          sort={isSorted ? { key: "specialty", dir: "asc" } : null} onSort={isSorted ? () => {} : null} />
      </div>
    );
    return <Stage>
      <Group label={STATES.filter((s) => s.id === state)[0].label} sig={"st/" + state} rows={stateRows(state)} specimen={body}
        tools={<Seg label="State" options={STATES} value={state} onChange={setState} />} />
    </Stage>;
  }

  function SizeDoc() {
    const [size, setSize] = React.useState("md");
    return <Stage>
      <Group label={size === "sm" ? "Small" : "Medium"} sig={"sz/" + size} rows={sizeRows(size)}
        specimen={<Table annotate size={size} columns={baseCols} data={shortProviders} />}
        tools={<Seg label="Size" options={SIZES} value={size} onChange={setSize} />} />
    </Stage>;
  }

  function FillDoc() {
    const [fill, setFill] = React.useState("divider");
    return <Stage>
      <Group label={fill === "divider" ? "Divider line" : "Alternating fill"} sig={"fl/" + fill} rows={fillRows(fill)}
        specimen={<Table annotate fill={fill} columns={baseCols} data={PROVIDERS.slice(0, 4)} />}
        tools={<Seg label="Rows" options={FILLS} value={fill} onChange={setFill} />} />
    </Stage>;
  }

  function PaginationDoc() {
    const [page, setPage] = React.useState(1);
    const pages = 4;
    const start = (page - 1) % 2;
    return <Stage>
      <Group label="Pagination footer" sig={"pg/" + page}
        rows={[
          tv("spacing.lg", "Footer padding \u00b7 12px", [at("footer", "top", .2)]),
          tv("spacing.xl", "Footer inset \u00b7 16px", [at("footer", "left", .5)]),
          col("divider", [at("footer", "top", .8)]),
          tv("style.body.md.regular", "Page label \u00b7 Inter 14/20 \u00b7 400", [at("pagelabel", "bottom", .5)]),
          col("cell", [at("pagelabel", "top", .5)])
        ]}
        specimen={<Table annotate columns={baseCols} data={PROVIDERS.slice(start, start + 3)}
          pagination={{ page, pages, onPrev: () => setPage((p) => Math.max(1, p - 1)), onNext: () => setPage((p) => Math.min(pages, p + 1)) }} />} />
    </Stage>;
  }

  /* ---------------- content examples ---------------- */
  const leadRows = [
    tv("spacing.lg", "Avatar \u2192 text gap \u00b7 12px", [at("lead", "top", .5)]),
    tv("style.body.md.bold", "Primary line \u00b7 Inter 14/20 \u00b7 600", [at("leadtitle", "left", .5)]),
    col("lead", [at("leadtitle", "bottom", .5)]),
    tv("style.body.md.regular", "Secondary line \u00b7 Inter 14/20 \u00b7 400", [at("leadsub", "left", .5)]),
    col("meta", [at("leadsub", "bottom", .5)])
  ];

  function ExampleDoc(props) {
    return <Stage><Group label={props.label} sig={props.sig} rows={props.rows} specimen={props.specimen} /></Stage>;
  }

  const emptySearch = (
    <EmptyState icon={<Icon name="SearchLg" size={24} />}
      title={<span data-sh-part="statetitle">No providers found</span>}
      actions={<span data-sh-part="stateactions" style={{ display: "inline-flex", gap: "var(--spacing-md-px)" }}>
        <Button hierarchy="secondary" size="sm">Clear search</Button><Button size="sm">Add provider</Button></span>}>
      <span data-sh-part="statebody-text">Your search “Cascade” did not match any provider in this directory.</span>
    </EmptyState>
  );
  const emptyFirst = (
    <EmptyState color="brand" icon={<Icon name="Users01" size={24} />}
      title={<span data-sh-part="statetitle">Add your first provider</span>}
      actions={<span data-sh-part="stateactions" style={{ display: "inline-flex", gap: "var(--spacing-md-px)" }}>
        <Button hierarchy="secondary" size="sm">Import CSV</Button><Button size="sm" iconLeading={<Icon name="Plus" size={18} />}>Add provider</Button></span>}>
      <span data-sh-part="statebody-text">Providers you add here appear in scheduling, charting and claims.</span>
    </EmptyState>
  );
  const errorState = (
    <EmptyState color="error" icon={<Icon name="AlertCircle" size={24} />}
      title={<span data-sh-part="statetitle">Something went wrong</span>}
      actions={<span data-sh-part="stateactions"><Button hierarchy="secondary" size="sm" iconLeading={<Icon name="RefreshCw01" size={18} />}>Try again</Button></span>}>
      <span data-sh-part="statebody-text">We had trouble loading this directory. Refresh the page, or contact support if it keeps happening.</span>
    </EmptyState>
  );
  const stateBodyRows = [
    tv("spacing.6xl", "Body padding \u00b7 48px", [at("statebody", "left", .5)]),
    tv("style.body.lg.bold", "Title \u00b7 Inter 16/24 \u00b7 600", [at("statetitle", "top", .5)]),
    col("lead", [at("statetitle", "bottom", .5)]),
    tv("style.body.md.regular", "Supporting text \u00b7 Inter 14/20 \u00b7 400", [at("statebody-text", "left", .5)]),
    col("meta", [at("statebody-text", "bottom", .5)]),
    tv("spacing.md", "Action gap \u00b7 8px", [at("stateactions", "bottom", .5)])
  ];

  /* ---------------- page ---------------- */
  SH.registerPage("tables", {
    h1: "Table components",
    wide: true,
    lead: "Tables present structured data in a card: a sticky column-header row above rows that carry text or richer cell content. Two densities, two row treatments, optional selection, sorting and pagination, and three body states cover the patterns in the product. Hover any token chip \u2014 or any part of a table \u2014 to trace where the token lands.",
    sections: [
      { id: "anatomy", title: "Anatomy",
        prose: ["The card owns the border, radius and shadow; the header row sits on the canvas surface and every row below it shares one inset. Column headers are 14px Semibold, the floor set in CLAUDE.md, and follow the body text size of the table."],
        render: () => <Stage><Group label="Structure" sig="anatomy" rows={anatomyRows} specimen={<Table annotate columns={baseCols} data={shortProviders} />} /></Stage> },
      { id: "sizes", title: "Sizes",
        prose: ["Density is the only difference between the two sizes: <code>sm</code> pads rows by 8px and <code>md</code> by 16px, giving 36px and 52px rows against the same 20px line. Type and inset do not change; header padding steps with the rows (8px at sm, 12px at md)."],
        render: () => <SizeDoc /> },
      { id: "row-treatments", title: "Row treatments",
        prose: ["Rows separate either by a 1px divider or by an alternating fill. The fill uses the same surface as the header row, so a striped table reads as one continuous block; pick one treatment per table, never both."],
        render: () => <FillDoc /> },
      { id: "row-states", title: "Row states",
        prose: ["Hover and selection each swap a single surface \u2014 hover sits one step darker than the alternating fill, so it reads on both row treatments. Sorting emphasises the active column header rather than tinting the column."],
        render: () => <StatesDoc /> },
      { id: "pagination", title: "Pagination footer",
        prose: ["The footer is a separate band below the last row: previous and next controls at the edges, the page label centred."],
        render: () => <PaginationDoc /> },
      { id: "providers", title: "Provider directory",
        prose: ["The flagship layout. A lead cell pairs an avatar with two lines of text, status is a pill badge, and panel membership overflows into a count."],
        render: () => <ExampleDoc label="Lead cell, badges & tags" sig="ex/prov" rows={leadRows.concat([
          tv("spacing.md", "Tag gap \u00b7 8px", [at("tags", "top", .5)]),
          tv("style.body.sm.regular", "Badge \u00b7 Inter 12/18 \u00b7 500", [at("badge", "bottom", .5)])
        ])} specimen={<Table annotate columns={providerCols} data={PROVIDERS} />} /> },
      { id: "payers", title: "Payer contracts",
        prose: ["A logo tile replaces the avatar, and the last column pairs a progress bar with its numeric reading so the column can be scanned either way."],
        render: () => <ExampleDoc label="Logo cell & inline meter" sig="ex/pay" rows={leadRows.concat([
          tv("spacing.lg", "Meter \u2192 value gap \u00b7 12px", [at("bar", "top", .5)]),
          tv("Meter height", "8px", [at("bar", "bottom", .3)])
        ])} specimen={<Table annotate columns={payerCols} data={PAYERS} />} /> },
      { id: "row-actions", title: "Row actions",
        prose: ["A trailing Actions column ends the row three ways. Link buttons name the actions in place and keep the row at one visual weight until it is hovered. Icon buttons trade those labels for tooltips where the column has to stay narrow. An overflow menu folds the whole set behind a single trigger \u2014 use it once there are more than three actions, or when one of them is destructive."],
        render: () => <Stage>
          <Group label="Status pills & link actions" sig="ex/clm" rows={[
            tv("spacing.lg", "Action gap \u00b7 12px", [at("rowactions", "top", .5)]),
            tv("style.body.sm.regular", "Badge \u00b7 Inter 12/18 \u00b7 500", [at("badge", "top", .5)]),
            col("cell", [at("cell", "bottom", .5)])
          ]} specimen={<Table annotate size="sm" columns={claimCols} data={CLAIMS} />} />
          <Group label="File cell & icon actions" sig="ex/doc" rows={leadRows.concat([
            tv("radius.md", "Glyph \u00b7 8px", [at("lead", "left", .5)])
          ])} specimen={<Table annotate fill="alternating" columns={docCols} data={DOCS} />} />
          <div className="sh-tm-group sh-tbl-menu">
            <div className="sh-tm-head"><SH.StateMark>Overflow menu</SH.StateMark></div>
            <Table fill="alternating" columns={menuCols} data={DOCS.slice(0, 3)} />
          </div>
        </Stage> },
      { id: "empty-search", title: "No results",
        prose: ["When a filter or search empties the table, the header row is dropped and the body carries the reason plus a way out."],
        render: () => <ExampleDoc label="No results" sig="st/empty" rows={stateBodyRows} specimen={<Table annotate columns={baseCols} data={[]} state="empty" empty={emptySearch} />} /> },
      { id: "empty-first", title: "Nothing yet",
        prose: ["A first-run table swaps the neutral icon for the brand colour and leads with the action that fills the table."],
        render: () => <ExampleDoc label="First run" sig="st/first" rows={stateBodyRows} specimen={<Table annotate columns={baseCols} data={[]} state="empty" empty={emptyFirst} />} /> },
      { id: "error", title: "Error",
        prose: ["A load failure keeps the same body layout; only the featured icon and the recovery action change."],
        render: () => <ExampleDoc label="Load failure" sig="st/err" rows={stateBodyRows} specimen={<Table annotate columns={baseCols} data={[]} state="error" error={errorState} />} /> }
    ],
    faqs: [
      { q: "How do I render custom cell content?", a: "Give a column a <code>render(row)</code> function returning any JSX \u2014 used here for lead cells, badges, meters and row actions." },
      { q: "Which type styles do the header and cells use?", a: "Header is <code>style.body.md.bold</code> (14/20/600) and cells are <code>style.body.md.regular</code> (14/20/400). The workbook's <code>style.table.header</code> and <code>style.table.cell</code> both resolve to 16px, which no table in the product uses today." },
      { q: "Can a table be both striped and divided?", a: "No. Pick one row treatment: <code>fill=\"divider\"</code> or <code>fill=\"alternating\"</code>." }
    ]
  });
})();
