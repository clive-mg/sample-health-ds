/* Sample Health docs — Pagination. Four variants of one component. Moved out
   of docs/pages/app-d.jsx. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Pagination } = UI;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors) => ({ token, color, anchors });
  const tv = (token, value, anchors) => ({ token, value, anchors });

  const Map = (props) => <div className={"sh-tm-table sh-tm-right" + (props.pop ? " sh-tm-pop" : "")}><SH.TokenMap sig={props.sig} rows={props.rows} specimen={props.specimen} /></div>;
  const Group = (props) => (
    <div className="sh-tm-group">
      <div className="sh-tm-head"><SH.StateMark>{props.label}</SH.StateMark>{props.tools || null}</div>
      <Map sig={props.sig} rows={props.rows} specimen={props.specimen} pop={props.pop} />
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
  const Col = (props) => <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-6xl-px)" }}>{props.children}</div>;

  const numberRows = [
    tv("radius.xl", "Frame · 12px", [at("root", "top", .06)]),
    tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("root", "bottom", .3)]),
    tv("spacing.xl", "Frame padding · 16px on all sides", [at("root", "left", .2)]),
    tv("style.body.md.bold", "Previous / Next · Inter 14/20 · 600", [at("prev", "top", .5)]),
    tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("next", "bottom", .5)]),
    tv("spacing.md", "Arrow → label · 8px", [at("prev", "bottom", .25)]),
    tv("spacing.xxs", "Chip → chip · 2px", [at("pages", "top", .35)]),
    tv("radius.md", "Page chip · 8px · 40 × 40", [at("page", "top", .5)]),
    tv("style.body.md.regular", "Page number · Inter 14/20 · 400", [at("page", "bottom", .5)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("page", "left", .5)]),
    tc("color.surface.selected", "var(--colors-background-bg-brand-primary)", [at("current", "top", .5)]),
    tv("style.body.md.bold", "Current page · Inter 14/20 · 600", [at("current", "bottom", .5)]),
    tc("color.text.tertiary", "var(--colors-text-text-tertiary-600)", [at("ellipsis", "bottom", .5)])
  ];
  const WINDOWS = [
    { id: "1", label: "Page 1" }, { id: "5", label: "Page 5" }, { id: "6", label: "Page 6" }, { id: "20", label: "Page 20" }
  ];

  function NumbersDoc() {
    const [p, setP] = React.useState("5");
    return <Stage>
      <Group label={"Page " + p + " of 20"} sig={"pg/" + p} rows={numberRows}
        tools={<Seg label="Current" options={WINDOWS} value={p} onChange={setP} />}
        specimen={<div style={{ width: "100%", minWidth: 520 }}>
          <Pagination key={p} total={20} defaultPage={Number(p)} />
        </div>} />
    </Stage>;
  }

  const toolbarRows = [
    tv("radius.xl", "Frame · 12px", [at("root", "top", .06)]),
    tc("color.border.subtle", "var(--colors-border-border-secondary)", [at("root", "bottom", .3)]),
    tv("spacing.xl", "Frame padding · 16px on all sides", [at("root", "left", .2)]),
    tv("style.body.md.regular", "Record count · Inter 14/20 · 400", [at("count", "top", .5)]),
    tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("count", "bottom", .5)]),
    tv("spacing.md", "Control gap · 8px", [at("prev", "left", .1)]),
    tv("radius.md", "Arrow hit area · 8px · 36 × 36", [at("next", "top", .5)]),
    tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("next", "bottom", .5)]),
    tc("color.neutral.400", "var(--colors-gray-light-mode-400)", [at("first", "bottom", .5)], "Disabled arrow icon"),
    tv("radius.md", "Jump box · 8px", [at("jump", "top", .12)]),
    tc("color.border.default", "var(--colors-border-border-primary)", [at("jump", "left", .5)]),
    tv("shadow.xs", "0px 1px 2px 0px", [at("jump", "bottom", .6)]),
    tv("style.body.md.regular", "Page number · Inter 14/20 · 400", [at("jump", "right", .5)]),
    tv("spacing.md", "Label → select · 8px", [at("perpage", "bottom", .3)])
  ];

  function ToolbarDoc() {
    const [pp, setPp] = React.useState(10);
    return <Stage>
      <Group label="Toolbar" sig="pg/bar" rows={toolbarRows} pop
        specimen={<div style={{ width: "100%", minWidth: 700 }}>
          <Pagination variant="toolbar" totalItems={75} perPage={pp} onPerPageChange={setPp} />
        </div>} />
    </Stage>;
  }

  SH.registerPage("pagination", {
    h1: "Pagination",
    wide: true,
    lead: "Four ways through a paged list, one component. Numbers when people jump around a short list, the toolbar when they work a long table and need to land on an exact page, compact when the table is narrow, simple when the list has no count worth showing. Give it a page total, or a row total and a page size, and it works the rest out.",
    sections: [
      { id: "numbers", title: "Numbers",
        prose: ["Page one and the last page are always reachable, with the current page and its two neighbours between them and an ellipsis wherever the run breaks. The row narrows in the middle of a long list and widens at either end, because near the ends there is nothing to collapse.",
          "Every variant sits in the same frame — a hairline border, a 12px radius and 16px of padding — so the controls read as one unit under the thing they page rather than as loose links on the page.",
          "Previous and Next are plain text, not buttons. They sit at the edges of the row where nothing competes with them, and a button frame there would outweigh the numbers, which are the actual navigation."],
        render: () => <NumbersDoc /> },

      { id: "toolbar", title: "Toolbar",
        prose: ["For a table someone works through rather than browses. The record count answers where am I, the first and last arrows answer take me to the end, and the jump box answers take me to page 14 — type a number and press Enter. Records per page changes the size of the page, not the position in it.",
          "Every arrow carries a tooltip, because four chevrons in a row are not self-explanatory at a glance."],
        render: () => <ToolbarDoc /> },

      { id: "compact", title: "Compact and simple",
        prose: ["Compact keeps the record count and drops everything but one pair of arrows — for a table in a panel or a column too narrow for the toolbar. Simple drops the count as well: two links and the page position, for a list where the total is either unknown or not worth the space."],
        render: () => <Preview className="align-stretch pad-lg"><Col>
          <Eg label="Compact"><Pagination variant="compact" totalItems={75} perPage={10} /></Eg>
          <Eg label="Simple"><Pagination variant="simple" total={10} /></Eg>
        </Col></Preview> }
    ],
    faqs: [
      { q: "Which variant should a table use?", a: "The toolbar, if the table is wide enough for it and people work through the data. Compact when the table sits in a panel. Numbers suit search results and card grids, where people scan and jump rather than work in order." },
      { q: "Why does the numbered row change width?", a: "Because it always shows the first page, the last page and the current page's immediate neighbours, and near either end there is nothing to collapse into an ellipsis. A fixed-width row would mean padding the middle with pages nobody asked for." },
      { q: "What does changing records per page do to the current page?", a: "Nothing, by design — the component reports the new size through <code>onPerPageChange</code> and leaves the decision to you. Most tables should reset to page one, since page 7 of 40 is not page 7 of 8." },
      { q: "Is the jump box validated?", a: "It accepts digits only and clamps to the range on Enter, so 0 lands on page one and 900 on the last page. Escape abandons what was typed and blurring reverts it — only Enter commits." },
      { q: "How is it announced?", a: "The current chip carries <code>aria-current=\"page\"</code>, and every arrow in the toolbar has a label matching its tooltip. The jump box is labelled Page number." }
    ]
  });
})();
