/* Sample Health docs — Tabs. Three types, each with an annotated token map:
   hover a chip or a part of the strip to trace where the token lands.
   Registered after app-e so this replaces the older demo page. */
(function () {
  const SH = window.SH;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Tabs } = SH.ui;

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const C = {
    selected: ["color.surface.selected", "var(--colors-background-bg-brand-primary)"],
    selectedStrong: ["color.surface.selected.hover", "var(--colors-background-bg-brand-secondary)"],
    lift: ["color.surface.default", "var(--colors-background-bg-primary)"],
    canvas: ["color.surface.canvas", "var(--colors-background-bg-secondary)"],
    hover: ["color.surface.hover", "var(--colors-background-bg-primary-hover)"],
    offSurface: ["color.surface.disabled", "var(--colors-background-bg-disabled)"],
    rule: ["color.border.subtle", "var(--colors-border-border-secondary)"],
    frame: ["color.border.default", "var(--colors-border-border-primary)"],
    indicator: ["color.primary.600", "var(--colors-brand-600)"],
    onText: ["color.primary.600", "var(--colors-brand-600)"],
    hoverText: ["color.text.secondary", "var(--colors-text-text-secondary-700)"],
    offText: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    disabled: ["color.text.disabled", "var(--colors-text-text-disabled)"],
    chipRest: ["color.neutral.100", "var(--colors-gray-light-mode-100)"],
    chipHover: ["color.neutral.200", "var(--colors-gray-light-mode-200)"],
    chipOn: ["color.neutral.700", "var(--colors-gray-light-mode-700)"],
    chipOnText: ["color.text.on.brand", "var(--colors-text-text-primary-on-brand)"],
    chipText: ["color.text.secondary", "var(--colors-text-text-secondary-700)"],
    ring: ["color.primary.100", "var(--colors-brand-100)"]
  };
  const col = (k, anchors, note) => tc(C[k][0], C[k][1], anchors, note);
  const TYPE_SM = tv("style.body.md", "Rest label \u00b7 Inter 14/20 \u00b7 400", [at("item", "bottom", .75)]);
  const TYPE_ON = tv("style.body.md.bold", "Selected label \u00b7 Inter 14/20 \u00b7 600", [at("item-on", "bottom", .75)]);

  const ITEMS = [{ label: "Overview" }, { label: "Claims" }, { label: "Members" }, { label: "Settings" }];
  const SEL = "Claims";
  const RICH = [
    { label: "Overview", icon: <Icon name="Home01" size={18} /> },
    { label: "Claims", icon: <Icon name="File02" size={18} />, count: 24, countLabel: "24 open claims" },
    { label: "Members", icon: <Icon name="Users01" size={18} />, count: 12, countLabel: "12 members" },
    { label: "Settings", icon: <Icon name="Settings01" size={18} /> }
  ];
  const strip = (props) => <Tabs items={ITEMS} defaultValue={SEL} {...props} />;
  const rich = (props) => <Tabs items={RICH} defaultValue={SEL} {...props} />;
  const rail = (el) => <div style={{ width: 220, maxWidth: "100%" }}>{el}</div>;

  /* A filter row: "All" leads and is the default, so selecting it is how the
     scope clears — single-select means no separate reset is needed. Long enough
     to overflow the stage and show the row scrolling. */
  const CHIPS = [
    { label: "All" },
    { label: "Primary care", count: 18, countLabel: "18 primary care visits" },
    { label: "Labs", icon: <Icon name="Thermometer01" size={18} /> },
    { label: "Imaging" },
    { label: "Pharmacy", count: 6, countLabel: "6 pharmacy claims" },
    { label: "Behavioral health" },
    { label: "Care management" }
  ];
  const chips = (props) => <Tabs type="chip" items={CHIPS} defaultValue="All" {...props} />;

  /* ---------------- rows ---------------- */
  const lineRows = [
    tv("spacing.md", "Label padding \u00b7 top \u00b7 8px", [at("item", "top", .35)]),
    tv("spacing.lg", "Label \u2192 indicator \u00b7 12px", [at("item", "left", .5)]),
    tv("spacing.lg", "Gap between tabs \u00b7 12px", [at("item", "right", .5)]),
    tv("Indicator", "2px, sitting on the rule", [at("indicator", "left", .5)]),
    col("indicator", [at("indicator", "right", .5)]),
    col("rule", [at("list", "bottom", .88)]),
    col("onText", [at("item-on", "top", .5)]),
    col("offText", [at("item", "bottom", .35)]),
    TYPE_SM,
    TYPE_ON
  ];

  const buttonRows = (vertical) => [
    tv("spacing.md", "Item padding \u00b7 top & bottom \u00b7 8px", [at("item", "top", .35)]),
    tv("spacing.lg", "Item padding \u00b7 left & right \u00b7 12px", [at("item", "left", .5)]),
    tv("spacing.xs", "Gap between tabs \u00b7 4px", [at("item", vertical ? "bottom" : "right", .5)]),
    tv("radius.md", "Item \u00b7 8px", [at("item-on", "top", .12)]),
    col("selected", [at("item-on", "bottom", .5)]),
    col("onText", [at("item-on", vertical ? "right" : "top", .5)]),
    col("offText", [at("item", "bottom", .35)]),
    TYPE_SM,
    TYPE_ON
  ];

  const segRows = [
    tv("spacing.md", "Segment padding \u00b7 top & bottom \u00b7 8px", [at("item", "top", .35)]),
    tv("spacing.lg", "Segment padding \u00b7 left & right \u00b7 12px", [at("item", "left", .5)]),
    tv("radius.md", "Frame \u00b7 8px", [at("list", "bottom", .06)]),
    tv("Divider", "1px between segments", [at("item", "right", .5)]),
    tv("shadow.xs", null, [at("list", "left", .85)]),
    col("frame", [at("list", "top", .85)]),
    col("lift", [at("item", "bottom", .7)]),
    col("selected", [at("item-on", "bottom", .35)]),
    col("onText", [at("item-on", "top", .5)]),
    TYPE_SM,
    TYPE_ON
  ];

  const countRows = [    tv("spacing.md", "Label \u2192 count \u00b7 8px", [at("count", "left", .5)]),
    tv("spacing.md", "Count padding \u00b7 left & right \u00b7 8px", [at("count", "top", .5)]),
    tv("radius.full", "9999px", [at("count", "bottom", .12)]),
    tv("style.body.sm", "Inter \u00b7 12/18 \u00b7 500", [at("count", "bottom", .7)]),
    col("selectedStrong", [at("count-on", "top", .5)]),
    col("onText", [at("count-on", "right", .5)]),
    col("canvas", [at("count", "right", .5)])
  ];
  const iconRows = [
    tv("spacing.md", "Icon \u2192 label \u00b7 8px", [at("icon", "right", .5)]),
    tv("Icon size", "18px at sm \u00b7 20px at md", [at("icon", "top", .5)]),
    col("offText", [at("icon", "bottom", .5)]),
    col("onText", [at("icon-on", "bottom", .5)])
  ];

  const chipRows = (size) => [
    tv(size === "sm" ? "spacing.md" : "spacing.lg", "Chip padding \u00b7 top & bottom \u00b7 " + (size === "sm" ? "8px" : "12px"), [at("item", "top", .35)]),
    tv(size === "sm" ? "spacing.xl" : "spacing.2xl", "Chip padding \u00b7 left & right \u00b7 " + (size === "sm" ? "16px" : "20px"), [at("item", "left", .5)]),
    tv("radius.md", "Chip \u00b7 8px", [at("item-on", "top", .12)]),
    tv(size === "sm" ? "spacing.md" : "spacing.lg", "Gap between chips \u00b7 " + (size === "sm" ? "8px" : "12px"), [at("item", "right", .5)]),
    tv("Chip height", (size === "sm" ? "36px" : "48px") + " \u00b7 padding + line height", [at("item-on", "right", .5)]),
    col("chipOn", [at("item-on", "bottom", .5)]),
    col("chipOnText", [at("item-on", "top", .5)]),
    col("chipRest", [at("item", "bottom", .7)]),
    col("chipText", [at("item", "bottom", .35)])
  ];

  const sizeRows = (size) => [
    tv(size === "sm" ? "spacing.md" : "spacing.lg", "Item padding \u00b7 top & bottom \u00b7 " + (size === "sm" ? "8px" : "12px"), [at("item", "top", .35)]),
    tv(size === "sm" ? "spacing.lg" : "spacing.xl", "Item padding \u00b7 left & right \u00b7 " + (size === "sm" ? "12px" : "16px"), [at("item", "left", .5)]),
    tv(size === "sm" ? "style.body.md" : "style.body.lg", "Rest label \u00b7 " + (size === "sm" ? "14/20" : "16/24") + " \u00b7 400", [at("item", "bottom", .75)]),
    tv(size === "sm" ? "style.body.md.bold" : "style.body.lg.bold", "Selected label \u00b7 " + (size === "sm" ? "14/20" : "16/24") + " \u00b7 600", [at("item-on", "bottom", .75)]),
    tv("Row height", (size === "sm" ? "36px" : "48px") + " \u00b7 padding + line height", [at("item-on", "right", .5)]),
    col("selected", [at("item-on", "bottom", .5)])
  ];

  const stateGroups = [
    { id: "hover", label: "Hover", cls: "sh-tab-hover",
      rows: [col("hover", [at("item-hover", "bottom", .5)]),
        col("hoverText", [at("item-hover", "top", .5)])],
      spec: <Tabs type="button" defaultValue={SEL} items={[
        { label: "Overview", part: "item-hover" }, { label: "Claims" }, { label: "Members" }, { label: "Settings" }]} /> },
    { id: "focus", label: "Focused", cls: "sh-tab-focus",
      rows: [col("ring", [at("item-focus", "bottom", .5)]),
        tv("Focus ring", "0 0 6px 1px \u00b7 keyboard focus only", [at("item-focus", "top", .5)])],
      spec: <Tabs type="button" defaultValue={SEL} items={[
        { label: "Overview", part: "item-focus" }, { label: "Claims" }, { label: "Members" }, { label: "Settings" }]} /> },
    { id: "disabled", label: "Disabled",
      rows: [col("disabled", [at("item-off", "top", .5)]),
        col("offSurface", [at("count-off", "bottom", .5)])],
      spec: <Tabs type="button" defaultValue={SEL} items={[
        { label: "Overview" }, { label: "Claims" },
        { label: "Members", disabled: true, part: "item-off" },
        { label: "Settings", count: 8, disabled: true, part: "count-off" }]} /> }
  ];

  /* ---------------- shell ---------------- */
  function TabDoc(props) {
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {props.groups.map((g) => <div className={"sh-tm-group" + (g.cls ? " " + g.cls : "")} key={g.id}>
          <div className="sh-tm-head"><SH.StateMark>{g.label}</SH.StateMark></div>
          <SH.TokenMap sig={props.sig + "/" + g.id} rows={g.rows} specimen={g.spec} />
        </div>)}
      </div>
    </Preview>;
  }
  const one = (sig, label, rows, spec) => <TabDoc sig={sig} groups={[{ id: "map", label: label, rows: rows, spec: spec }]} />;

  /* ---------------- page ---------------- */
  SH.registerPage("tabs", {
    h1: "Tab components",
    lead: "Tabs switch between sibling views inside one page. Four types: line for page-level navigation, button where the set reads as a control, segmented where it reads as one object, and chip for scoping a result set. Every type takes an optional leading icon and a count, comes in two sizes, and is a real tablist \u2014 one tab stop, arrow keys to move, and a keyboard-only focus ring. Hover any token chip \u2014 or any part of a strip \u2014 to trace where the token lands.",
    sections: [
      { id: "line", title: "Line tabs",
        prose: ["A hairline rule spans the tablist and the selected tab carries a 2px indicator that sits on the rule, so the pair reads as one mark rather than a bar floating above a line. Selection also changes the label colour \u2014 nothing else moves. This is the default and the right choice for page-level navigation."],
        render: () => one("tabs/line", "Structure", lineRows, strip({})) },
      { id: "button", title: "Button tabs",
        prose: ["Tabs sit transparent until they are hovered or selected: the selected tab lifts onto the brand tint with a brand label. Corners are the md radius and the tabs are 4px apart, so the group reads as a row of controls rather than a rule. Stacked into a vertical rail nothing changes but the direction \u2014 tabs stretch to the rail width and labels align left."],
        render: () => <TabDoc sig="tabs/button" groups={[
          { id: "h", label: "Horizontal", rows: buttonRows(false), spec: strip({ type: "button" }) },
          { id: "v", label: "Vertical", rows: buttonRows(true), spec: rail(strip({ type: "button", orientation: "vertical" })) }
        ]} /> },
      { id: "segmented", title: "Segmented tabs",
        prose: ["The same selected treatment inside one framed group: a hairline frame on the default surface with the xs shadow, hairline dividers between segments and no gap. Use it for two to four short, mutually exclusive views \u2014 a date range, a chart mode \u2014 where the set should read as a single object."],
        render: () => one("tabs/segmented", "Structure", segRows, strip({ type: "segmented" })) },
      { id: "chip", title: "Chip tabs",
        prose: ["Filter chips on a row that scrolls rather than wraps, for scoping a result set \u2014 a claims list, a search result, a feed. The chip sits on a filled neutral at rest and goes to a near-black neutral with a white label when selected, so the active scope is legible at a glance across a long row without spending the brand colour on a filter. Corners are the md radius, matching button tabs, and the chips are 8px apart, which reads as a set of filters rather than a row of controls.", "Because it is single-select, the leading chip is conventionally <code>All</code> and is the default: selecting it is how the scope clears, so no separate reset control is needed. Counts and leading icons work here as they do everywhere else.", "All four chip fills come from the neutral ramp \u2014 resting, hover, selected and selected-hover \u2014 because Foundations publishes no surface token that reads as an unselected chip against a white page, and none at the dark end that is not the brand or the near-black surface.inverse. None of them inverts in dark mode; that is a Foundations gap to raise, not a reason to alias around it. The selected label takes color.text.on.brand, which is a poor name on a neutral chip but the only published text token that stays light in both themes."],
        render: () => <TabDoc sig="tabs/chip" groups={[
          { id: "sm", label: "sm", rows: chipRows("sm"), spec: chips({}) },
          { id: "md", label: "md", rows: chipRows("md"), spec: chips({ size: "md" }) }
        ]} /> },
      { id: "icons-counts", title: "Icons & counts",
        prose: ["Both are per-item and both work on all three types. A leading icon inherits the label colour, so it lights with the tab rather than ahead of it, and it is hidden from assistive tech \u2014 it repeats the label, it does not add to it. A count follows the label 8px behind, in 12/18 medium: the smallest type in the system and the only place a tab drops below 14px. On a selected tab it takes the next step of the selected surface, so the chip still reads as a chip against the tab beneath it. Give a count a countLabel when the number alone would be ambiguous out of context."],
        render: () => <TabDoc sig="tabs/extras" groups={[
          { id: "count", label: "Counts", rows: countRows, spec: rich({}) },
          { id: "icon", label: "Leading icons", rows: iconRows, spec: rich({ type: "button" }) }
        ]} /> },
      { id: "sizes", title: "Sizes",
        prose: ["Two sizes, stepping padding and type together \u2014 sm is 14/20 in 8/12 padding, md is 16/24 in 12/16. Rest labels are regular, the selected label semibold \u2014 the two weights the scale binds to those sizes. Height is never pinned: it derives from block padding and line height, which puts button and segmented tabs on the same 36 and 48px rungs as buttons and form fields. Line tabs land 4px taller at each rung because the bottom padding also makes room for the indicator."],
        render: () => <TabDoc sig="tabs/sizes" groups={[
          { id: "sm", label: "sm", rows: sizeRows("sm"), spec: strip({ type: "button", size: "sm" }) },
          { id: "md", label: "md", rows: sizeRows("md"), spec: strip({ type: "button", size: "md" }) }
        ]} /> },
      { id: "states", title: "States",
        prose: ["Three states sit on top of selection. Hover fills an unselected tab and steps its label from tertiary to secondary. Focus draws the same soft brand halo the form fields use, and only on keyboard focus \u2014 clicking a tab does not ring it. Disabled swaps the label for the disabled colour and stays in the list, announced but unselectable. Hover and focus are frozen in the first two diagrams so they can be read; the third is live."],
        render: () => <TabDoc sig="tabs/states" groups={stateGroups} /> }
    ],
    faqs: [
      { q: "How do I control selection?", a: "Pass <code>value</code> and <code>onChange</code> to drive it from your own state, or <code>defaultValue</code> to let the component own it." },
      { q: "Which type should I use?", a: "Line for page-level navigation, where the tabs sit under a page header. Button when the tabs filter or switch content inside a card or toolbar. Segmented for two to four short, mutually exclusive views that should read as one control. Chip when the set scopes a list or feed and there are more options than fit comfortably in a row." },
      { q: "What does the keyboard do?", a: "The tablist is one tab stop. Arrow keys move selection and focus \u2014 left/right, or up/down when vertical \u2014 Home and End jump to the ends, and disabled tabs are skipped. Selection follows focus, so the view changes as you move; pass an <code>id</code> and <code>controls</code> to wire each tab to its panel with <code>aria-controls</code>." },
      { q: "Can a tab be vertical and segmented?", a: "No. Segmented is horizontal by definition \u2014 a stacked frame with dividers is a menu, not a segmented control. Chip is horizontal for the same reason: stacked pills are a list. Line and button both take <code>orientation=\"vertical\"</code>." },
      { q: "Can chips be multi-select?", a: "Not through Tabs. A <code>tablist</code> is single-select by ARIA, and one tab always owns the selection. A multi-select filter row is a group of toggle controls, not tabs \u2014 it needs its own component." }
    ]
  });
})();
