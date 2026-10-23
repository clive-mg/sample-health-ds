/* Sample Health docs — avatars & dropdowns, v2 token maps. Registered after
   base-a/base-b so these replace the older demo pages
   registered earlier. */
(function () {
  const SH = window.SH;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Avatar, AvatarGroup, AvatarLabelGroup, Dropdown, Button } = UI;
  /* AvatarButton is new; tolerate a bundle compiled before it existed. */
  const AvatarButton = UI.AvatarButton || function (p) {
    if (!AvatarButton.warned) { AvatarButton.warned = true; console.warn("AvatarButton missing from the bundle — showing a plain Avatar until it recompiles."); }
    return <Avatar size={p.size} initials={p.initials} status={p.status} />;
  };

  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note) => ({ token, value, anchors, note });

  const C = {
    disc: ["color.surface.canvas", "var(--colors-background-bg-secondary)"],
    hairline: ["color.border.subtle", "var(--colors-border-border-secondary)"],
    initials: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
    online: ["color.success.500", "var(--colors-success-500)"],
    offline: ["color.neutral.300", "var(--colors-gray-light-mode-300)"],
    surface: ["color.surface.default", "var(--colors-background-bg-primary)"],
    title: ["color.text.primary", "var(--colors-text-text-primary-900)"],
    item: ["color.text.secondary", "var(--colors-text-text-secondary-700)"],
    hover: ["color.surface.hover", "var(--colors-background-bg-primary-hover)"],
    selected: ["color.surface.selected", "var(--colors-background-bg-brand-primary)"],
    disabled: ["color.text.disabled", "var(--colors-text-text-disabled)"],
    destructive: ["color.text.status.error", "var(--colors-text-text-error-primary-600)"],
    focusRing: ["color.focusRing", "var(--colors-effects-focus-rings-focus-ring)"]
  };
  const col = (k, anchors, note) => tc(C[k][0], C[k][1], anchors, note);
  const RAMP_NOTE = "A ramp step, so it does not invert in dark mode. Foundations publishes no semantic presence colour \u2014 raise it if presence needs a dark-mode value of its own.";

  /* A drawn stand-in for a photograph: the system ships no sample portraits. */
  const PHOTO = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#D5D7DA"/><circle cx="48" cy="37" r="15" fill="#94979C"/><path d="M13 96c0-19 16-31 35-31s35 12 35 31z" fill="#94979C"/></svg>');

  /* ---------------- shared shells ---------------- */
  function Seg(props) {
    return <div className="sh-tm-sizes">
      <span className="sh-tm-lab">{props.label || "Size"}</span>
      <div className="sh-tm-seg">{props.options.map((x) =>
        <button key={x} type="button" className={x === props.value ? "is-on" : ""}
          onClick={() => props.onChange(x)}>{x}</button>)}</div>
    </div>;
  }

  function MapDoc(props) {
    const [size, setSize] = SH.React.useState((props.sizes || ["md"])[0]);
    return <Preview className="align-stretch canvas pad-tm">
      <div className={"sh-tm-set" + (props.wide ? " sh-tm-wide" : "")}>
        {props.states.map((s, i) => <div className="sh-tm-group" key={s.id}>
          <div className="sh-tm-head">
            <SH.StateMark>{s.label}</SH.StateMark>
            {i === 0 && props.sizes ? <Seg options={props.sizes} value={size} onChange={setSize} /> : null}
          </div>
          <SH.TokenMap sig={props.sig + "/" + s.id + "/" + size}
            rows={props.rows(s.id, size)} specimen={props.spec(s.id, size)} />
        </div>)}
      </div>
    </Preview>;
  }

  function Parts(props) {
    return <div className="sh-parts">{props.items.map((p) => <React.Fragment key={p[0]}>
      <code className="sh-part-name">{p[0]}</code>
      <span className="sh-part-desc">{p[1]}</span>
    </React.Fragment>)}</div>;
  }

  function Matrix(props) {
    return <Preview className="align-stretch canvas pad-tm"><div className="sh-matrix">
      {props.cells.map((c) => <div className="sh-matrix-cell" key={c[0]}>
        <span className="sh-matrix-lab">{c[0]}</span>
        <div className="sh-matrix-art">{c[1]}</div>
        {c[2] ? <span className="sh-matrix-note">{c[2]}</span> : null}
      </div>)}
    </div></Preview>;
  }

  /* ================= AVATARS ================= */
  const AV_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"];
  const AVZ = {
    xs: { d: "24px", dot: "6px", type: ["style.body.sm", "Inter \u00b7 12/18 \u00b7 500"] },
    sm: { d: "32px", dot: "8px", type: ["style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600"] },
    md: { d: "40px", dot: "12px", type: ["style.body.lg.bold", "Inter \u00b7 16/24 \u00b7 600"] },
    lg: { d: "48px", dot: "12px", type: ["style.heading.h5", "Inter \u00b7 18/22 \u00b7 600"] },
    xl: { d: "56px", dot: "16px", type: ["style.heading.h4", "Inter \u00b7 20/24 \u00b7 600"] },
    "2xl": { d: "64px", dot: "16px", type: ["style.heading.h3", "Inter \u00b7 24/28 \u00b7 600"] }
  };

  function avatarRows(state, size) {
    const z = AVZ[size] || AVZ.md;
    if (state === "structure") return [
      tv("control.size", z.d + " square", [at("disc", "top", .5)]),
      tv("radius.full", "9999px", [at("disc", "left", .15)]),
      tv("border.width.hairline", "1px inset", [at("disc", "right", .35)]),
      tv(z.type[0], z.type[1], [at("content", "bottom", .5)])
    ];
    return [
      col("disc", [at("disc", "left", .5)]),
      col("hairline", [at("disc", "top", .8)]),
      col("initials", [at("content", "bottom", .5)])
    ];
  }
  const avatarSpec = (state, size) => <Avatar size={size} initials="OR" />;

  function presenceRows(state, size) {
    const z = AVZ[size] || AVZ.md;
    if (state === "structure") return [
      tv("control.size", z.dot, [at("status", "bottom", .5)]),
      tv("radius.full", "9999px", [at("status", "right", .5)]),
      tv("spacing.xxs", "Ring \u00b7 2px", [at("status", "top", .5)]),
      col("surface", [at("status", "left", .5)], "The ring is the page surface, so the dot stays legible on a photo.")
    ];
    if (state === "online") return [
      col("online", [at("status", "right", .5)], RAMP_NOTE),
      col("surface", [at("status", "top", .5)])
    ];
    return [
      col("offline", [at("status", "right", .5)], RAMP_NOTE),
      col("surface", [at("status", "top", .5)])
    ];
  }
  const presenceSpec = (state, size) => <Avatar size={size} initials="LS" status={state === "offline" ? "offline" : "online"} />;

  const GRP = { xs: "8px", sm: "8px", md: "12px", lg: "16px" };
  function groupRows(state, size) {
    if (state === "structure") return [
      tv("spacing." + (GRP[size] === "8px" ? "md" : GRP[size] === "12px" ? "lg" : "xl"), "Overlap \u00b7 \u2212" + GRP[size], [at("av", "left", .5)]),
      tv("spacing.xxs", "Ring \u00b7 2px", [at("av-first", "top", .5)]),
      col("surface", [at("av-first", "left", .3)])
    ];
    return [
      col("disc", [at("overflow", "bottom", .5)]),
      col("initials", [at("overflow", "right", .5)]),
      tv(size === "md" || size === "lg" ? "style.body.md.bold" : "style.body.sm.bold",
        size === "md" || size === "lg" ? "Inter \u00b7 14/20 \u00b7 600" : "Inter \u00b7 12/18 \u00b7 700", [at("overflow", "top", .5)])
    ];
  }
  const TEAM = [{ initials: "OR" }, { initials: "PB" }, { initials: "LS" }, { initials: "DW" }, { initials: "AM" }, { initials: "CN" }, { initials: "MK" }];
  const groupSpec = (state, size) => <AvatarGroup size={size} avatars={TEAM} max={4} />;

  const ALGZ = {
    sm: [["style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600"], ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"]],
    md: [["style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600"], ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"]],
    lg: [["style.heading.h6", "Inter \u00b7 16/20 \u00b7 600"], ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"]],
    xl: [["style.heading.h5", "Inter \u00b7 18/22 \u00b7 600"], ["style.body.lg", "Inter \u00b7 16/24 \u00b7 400"]]
  };
  function algRows(state, size) {
    const z = ALGZ[size] || ALGZ.md;
    if (state === "structure") return [
      tv("spacing.lg", "Avatar \u2192 text \u00b7 12px", [at("alg-text", "left", .5)]),
      tv(z[0][0], z[0][1], [at("alg-title", "top", .6)]),
      tv(z[1][0], z[1][1], [at("alg-sub", "bottom", .6)])
    ];
    return [
      col("title", [at("alg-title", "top", .6)]),
      col("initials", [at("alg-sub", "bottom", .6)]),
      col("disc", [at("disc", "left", .5)])
    ];
  }
  const algSpec = (state, size) => <AvatarLabelGroup size={size} initials="OR" status="online" title="Olivia Rhye" subtitle="olivia@samplehealth.com" />;

  const AVB_STATES = [{ id: "default", label: "Default" }, { id: "hover", label: "Hover" }, { id: "focus", label: "Focused" }];
  function avbRows(state) {
    if (state === "default") return [
      tv("spacing.xs", "Disc \u2192 caret \u00b7 4px", [at("chevron", "left", .5)]),
      tv("radius.full", "9999px", [at("avbtn", "bottom", .1)]),
      col("initials", [at("chevron", "right", .5)])
    ];
    if (state === "hover") return [
      col("hover", [at("avbtn", "left", .5)], "A 4px halo outside the disc \u2014 the avatar itself never changes."),
      col("disc", [at("disc", "top", .5)])
    ];
    return [
      col("focusRing", [at("avbtn", "left", .5)]),
      col("surface", [at("avbtn", "top", .5)], "A 2px gap of page surface sits between the disc and the ring.")
    ];
  }
  const avbSpec = (state) => <div className={state === "hover" ? "sh-avb-hover" : state === "focus" ? "sh-avb-focus" : null} style={{ padding: 12 }}>
    <AvatarButton size="md" initials="OR" status="online" chevron label="Open account menu" />
  </div>;

  SH.registerPage("avatars", {
    lead: "An avatar stands in for a person or an organisation \u2014 in tables, menus, comments and account areas. It shows a photograph when there is one, a person's initials when there is not, and a neutral glyph when there is neither, so the shape holds its place either way. Six sizes step from 24 to 64px; everything inside, including the initials and the presence dot, steps with them.",
    sections: [
      { id: "anatomy", title: "Anatomy",
        prose: ["One disc, one piece of content, one optional dot. The disc is a full-radius surface with a hairline inset border, which is what keeps a light photograph from bleeding into a white page. Initials are centred on the type scale and step with the size; they are the only text an avatar carries."],
        render: () => <div className="sh-stack">
          <MapDoc sig="avatar" sizes={AV_SIZES} states={[{ id: "structure", label: "Structure" }, { id: "color", label: "Colour" }]} rows={avatarRows} spec={avatarSpec} />
          <Parts items={[
            ["avatar", "Positioning root. Sized square; carries the presence dot."],
            ["disc", "The clipped circle: surface, hairline border and the type the initials inherit."],
            ["content", "Whichever of photo, initials or placeholder glyph is in use."],
            ["status", "Presence dot, pinned to the lower-right corner."]
          ]} />
        </div> },
      { id: "content", title: "Photo, initials, placeholder",
        prose: ["Three ways to fill the disc, in order of preference. A photograph is clipped to the circle and covers it. Initials are one or two letters, centred. With neither, a neutral glyph keeps the row aligned rather than leaving a hole \u2014 which matters most in tables, where an empty cell would break the rhythm."],
        render: () => <Matrix cells={[
          ["Photo", <Avatar size="lg" src={PHOTO} alt="" />, "src, clipped to the circle"],
          ["Initials", <Avatar size="lg" initials="OR" />, "One or two letters"],
          ["Placeholder", <Avatar size="lg" />, "Neither photo nor initials"],
          ["Photo + presence", <Avatar size="lg" src={PHOTO} alt="" status="online" />, null],
          ["Initials + presence", <Avatar size="lg" initials="PB" status="offline" />, null],
          ["In a group", <AvatarGroup size="lg" avatars={TEAM} max={3} />, null]
        ]} /> },
      { id: "presence", title: "Presence indicator",
        prose: ["A dot in the lower-right corner says whether someone is available. It is stepped on the spacing scale rather than as a fraction of the disc, and it sits on a 2px ring of page surface so it stays visible over a dark photograph. Presence is a status, not a decoration: leave it off wherever the product cannot actually tell."],
        render: () => <MapDoc sig="presence" sizes={["sm", "md", "lg", "xl"]}
          states={[{ id: "structure", label: "Structure" }, { id: "online", label: "Online" }, { id: "offline", label: "Offline" }]}
          rows={presenceRows} spec={presenceSpec} /> },
      { id: "sizes", title: "Sizes",
        prose: ["Six steps. The disc, the initials and the dot move together, so picking a size settles all three. Use xs and sm inside dense rows and menus, md and lg for people in lists and cards, xl and 2xl on profile and account surfaces."],
        render: () => <Preview className="align-stretch canvas pad-tm"><div className="sh-ladder">
          {AV_SIZES.map((s) => <div className="sh-ladder-cell" key={s}>
            <Avatar size={s} initials="OR" status="online" />
            <span className="sh-ladder-size">{s}</span>
            <span className="sh-ladder-spec">{AVZ[s].d}</span>
            <span className="sh-ladder-spec">{AVZ[s].type[1]}</span>
            <span className="sh-ladder-spec">dot {AVZ[s].dot}</span>
          </div>)}
        </div></Preview> },
      { id: "groups", title: "Avatar groups",
        prose: ["Overlapping avatars stand for a set of people. Each one carries a 2px ring of page surface so the stack stays countable, and the overlap steps on the spacing scale instead of a percentage of the disc. Past the maximum, the remainder collapses into a +N counter that keeps the disc but drops the border."],
        render: () => <MapDoc sig="avatar-group" sizes={["xs", "sm", "md", "lg"]}
          states={[{ id: "structure", label: "Structure" }, { id: "overflow", label: "Overflow counter" }]}
          rows={groupRows} spec={groupSpec} /> },
      { id: "label-group", title: "Avatar with text",
        prose: ["A name and a supporting line, 12px right of the avatar. The name is semibold and the supporting line regular, one step down or level with it, never larger \u2014 the pair reads as one person, not two facts."],
        render: () => <MapDoc sig="avatar-label" sizes={["sm", "md", "lg", "xl"]}
          states={[{ id: "structure", label: "Structure" }, { id: "color", label: "Colour" }]}
          rows={algRows} spec={algSpec} /> },
      { id: "button", title: "Clickable avatar",
        prose: ["An avatar that is a real control \u2014 the account menu in a header, a link into a profile. Nothing inside the disc changes: hover paints a halo around it and keyboard focus swaps that halo for the focus ring on a gap of page surface, so the ring never lands on the photograph. It is a button, so it needs an accessible name; the avatar supplies none."],
        render: () => <div className="sh-stack">
          <MapDoc sig="avatar-button" states={AVB_STATES} rows={avbRows} spec={avbSpec} />
          <Preview className="pad-lg" style={{ minHeight: 260 }}>
            <Dropdown align="right" trigger={<AvatarButton size="md" initials="OR" status="online" chevron label="Open account menu" />} items={[
              { label: "View profile", icon: <Icon name="User01" size={16} />, shortcut: "\u2318K" },
              { label: "Account settings", icon: <Icon name="Settings01" size={16} /> },
              { divider: true },
              { label: "Sign out", icon: <Icon name="LogOut01" size={16} />, destructive: true }
            ]} />
          </Preview>
        </div> }
    ],
    faqs: [
      { q: "What sizes are available?", a: "Six: <code>xs</code> 24px, <code>sm</code> 32px, <code>md</code> 40px, <code>lg</code> 48px, <code>xl</code> 56px and <code>2xl</code> 64px. Initials and the presence dot step with them." },
      { q: "How do I show initials instead of a photo?", a: "Pass <code>initials</code> and omit <code>src</code>. With neither, the avatar falls back to a neutral placeholder glyph." },
      { q: "Why is the presence dot not a percentage of the disc?", a: "A fraction lands off the spacing scale at most sizes \u2014 10px at md, 14px at xl. The dot steps on the scale instead: 6, 8, 12, 12, 16, 16." },
      { q: "Does the presence colour work in dark mode?", a: "It is a ramp step, so it holds the same value in both themes. Foundations publishes no semantic presence colour; if one is needed, it should be added there rather than invented in the component." }
    ]
  });

  /* ================= DROPDOWNS ================= */
  const MENU = [
    { header: "Account" },
    { label: "View profile", icon: <Icon name="User01" size={16} />, shortcut: "\u2318K" },
    { label: "Settings", icon: <Icon name="Settings01" size={16} /> },
    { divider: true },
    { header: "Team" },
    { label: "Invite people", icon: <Icon name="Users01" size={16} /> },
    { label: "Sign out", icon: <Icon name="LogOut01" size={16} />, destructive: true }
  ];

  function Stage(props) {
    return <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Dropdown inline open items={props.items} />
    </div>;
  }

  function menuRows(state) {
    if (state === "structure") return [
      tv("spacing.xs", "Menu padding \u00b7 4px", [at("menu", "left", .12)]),
      tv("radius.md", "8px", [at("menu", "bottom", .06)]),
      tv("border.width.hairline", "1px", [at("menu", "top", .7)]),
      tv("min-width", "240px", [at("menu", "bottom", .6)]),
      tv("shadow.lg", null, [at("menu", "right", .9)])
    ];
    return [
      col("surface", [at("menu", "left", .4)]),
      col("hairline", [at("menu", "right", .2)]),
      col("item", [at("item-label", "right", .5)])
    ];
  }
  const menuSpec = () => <Stage items={MENU} />;

  const ITEM_STATES = [
    { id: "default", label: "Default" },
    { id: "hover", label: "Hover" },
    { id: "focus", label: "Focused" },
    { id: "selected", label: "Selected" },
    { id: "disabled", label: "Disabled" },
    { id: "destructive", label: "Destructive" }
  ];
  function itemRows(state) {
    if (state === "default") return [
      tv("spacing.md", "Block padding \u00b7 8px \u00b7 36px tall", [at("item", "left", .18)]),
      tv("spacing.lg", "Inline padding \u00b7 12px", [at("item", "right", .5)]),
      tv("spacing.md", "Icon \u2192 label \u00b7 8px", [at("item-label", "left", .5)]),
      tv("radius.sm", "6px", [at("item", "bottom", .08)]),
      tv("style.body.md", "Inter \u00b7 14/20 \u00b7 400", [at("item-label", "bottom", .6)]),
      col("item", [at("item-label", "top", .6)])
    ];
    if (state === "hover") return [col("hover", [at("item", "left", .5)]), col("item", [at("item-label", "top", .6)])];
    if (state === "focus") return [col("focusRing", [at("item", "bottom", .5)]), col("item", [at("item-label", "top", .6)])];
    if (state === "selected") return [
      col("selected", [at("item", "left", .5)]),
      tv("style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600", [at("item-label", "bottom", .6)]),
      col("item", [at("item-label", "top", .6)])
    ];
    if (state === "disabled") return [
      col("disabled", [at("item-label", "top", .6)]),
      tv("cursor", "default \u00b7 no hover surface", [at("item", "left", .5)])
    ];
    return [
      col("destructive", [at("item-label", "top", .6)]),
      col("hover", [at("item", "left", .5)], "Destructive items take the same hover surface \u2014 the colour is in the label and icon, not the fill.")
    ];
  }
  /* One real menu holding one real item, with no trigger above it — the
     matrix wants a single row, not a whole menu. */
  function MiniMenu(props) {
    return <div className={props.state === "hover" ? "sh-dd-hover" : props.state === "focus" ? "sh-dd-focus" : null}>
      <Dropdown inline open items={[ONE_ITEM[props.state]]} />
    </div>;
  }

  const ONE_ITEM = {
    default: { label: "View profile", icon: <Icon name="User01" size={16} /> },
    hover: { label: "View profile", icon: <Icon name="User01" size={16} /> },
    focus: { label: "View profile", icon: <Icon name="User01" size={16} /> },
    selected: { label: "Grid view", icon: <Icon name="DotsGrid" size={16} />, selected: true },
    disabled: { label: "Export as CSV", icon: <Icon name="Download01" size={16} />, disabled: true },
    destructive: { label: "Delete claim", icon: <Icon name="Trash01" size={16} />, destructive: true }
  };

  function itemSpec(state) {
    const one = {
      default: [{ label: "View profile", icon: <Icon name="User01" size={16} /> }],
      hover: [{ label: "View profile", icon: <Icon name="User01" size={16} /> }],
      focus: [{ label: "View profile", icon: <Icon name="User01" size={16} /> }],
      selected: [{ label: "Grid view", icon: <Icon name="DotsGrid" size={16} />, selected: true }],
      disabled: [{ label: "Export as CSV", icon: <Icon name="Download01" size={16} />, disabled: true }],
      destructive: [{ label: "Delete claim", icon: <Icon name="Trash01" size={16} />, destructive: true }]
    }[state];
    return <div className={state === "hover" ? "sh-dd-hover" : state === "focus" ? "sh-dd-focus" : null} style={{ display: "flex", justifyContent: "flex-end" }}>
      <Dropdown inline open items={one} />
    </div>;
  }

  function sectionRows(state) {
    if (state === "structure") return [
      tv("spacing.md", "Heading top \u00b7 8px", [at("header", "left", .2)]),
      tv("spacing.xs", "Heading \u2192 first item \u00b7 4px", [at("header", "right", .9)]),
      tv("spacing.xs", "Divider margin \u00b7 4px", [at("divider", "right", .5)]),
      tv("style.overline", "Inter \u00b7 12/18 \u00b7 700 \u00b7 +6% \u00b7 uppercase", [at("header", "bottom", .5)])
    ];
    return [
      col("initials", [at("header", "bottom", .5)]),
      col("hairline", [at("divider", "left", .5)]),
      col("item", [at("item-label", "right", .5)])
    ];
  }
  const sectionSpec = () => <Stage items={MENU} />;

  SH.registerPage("dropdowns", {
    lead: "A dropdown reveals a list of actions from a trigger. One surface, one item size: the menu floats on the lg shadow and every item is 36px tall, the same control step as a small button, so a menu sits comfortably beside the toolbar that opened it. Items carry an icon, a keyboard shortcut, or both, and can be grouped under headings.",
    sections: [
      { id: "anatomy", title: "Anatomy",
        prose: ["A trigger and a floating panel, 8px apart. The panel is padded 4px so the first and last items clear the rounded corners, and its 240px minimum keeps short menus from collapsing to the width of their longest word. Nothing about the panel changes with the trigger \u2014 only which edge it aligns to. The diagrams below show the panel on its own, in flow; the last section opens it from real triggers."],
        render: () => <div className="sh-stack">
          <MapDoc sig="menu" wide states={[{ id: "structure", label: "Structure" }, { id: "color", label: "Colour" }]} rows={menuRows} spec={menuSpec} />
          <Parts items={[
            ["trigger", "Whatever opens the menu: a button, an icon button, an avatar."],
            ["menu", "The floating panel \u2014 surface, hairline, radius and shadow."],
            ["header", "Uppercase heading that opens a labelled section."],
            ["item", "One action. 36px tall; holds the icon, label and shortcut."],
            ["divider", "Hairline rule closing a group."]
          ]} />
        </div> },
      { id: "item-states", title: "Item states",
        prose: ["Six states on one item. Hover and keyboard focus are separate: hover fills the surface, focus draws the ring, and an item being pointed at is not the same as an item the keyboard has landed on. Selected marks the current choice with a brand-tinted surface and a semibold label. Disabled drops to the disabled text colour and takes no hover fill at all, so it never looks live."],
        render: () => <MapDoc sig="menu-item" wide states={ITEM_STATES} rows={itemRows} spec={itemSpec} /> },
      { id: "matrix", title: "States side by side",
        prose: ["The same item across every state, at the size it ships."],
        render: () => <Matrix cells={ITEM_STATES.map((s) => [s.label, <MiniMenu state={s.id} />, null])} /> },
      { id: "sections", title: "Section headings & dividers",
        prose: ["Two ways to group. A heading names a section in uppercase 12px above its items; a divider separates two groups that need no names. Use one or the other in a run \u2014 a heading directly under a divider spends 12px of space saying the same thing twice."],
        render: () => <MapDoc sig="menu-sections" wide states={[{ id: "structure", label: "Structure" }, { id: "color", label: "Colour" }]} rows={sectionRows} spec={sectionSpec} /> },
      { id: "triggers", title: "Triggers & alignment",
        prose: ["The menu hangs 8px below the trigger, from its left edge by default and from its right with <code>align=\"right\"</code>, which is what keeps a menu opened from a table row inside the table. Live \u2014 click any of them."],
        render: () => <Preview className="pad-lg" style={{ minHeight: 300 }}><div className="sh-row" style={{ gap: 40, alignItems: "flex-start" }}>
          <Dropdown trigger={<Button hierarchy="secondary" iconTrailing={<Icon name="ChevronDown" size={20} />}>Options</Button>} items={MENU} />
          <Dropdown align="right" trigger={<Button hierarchy="tertiary" iconOnly iconLeading={<Icon name="DotsVertical" size={20} />} aria-label="Row actions" />} items={[
            { label: "Edit", icon: <Icon name="Edit01" size={16} /> },
            { label: "Duplicate", icon: <Icon name="Copy01" size={16} />, shortcut: "\u2318D" },
            { label: "Share", icon: <Icon name="Share01" size={16} /> },
            { divider: true },
            { label: "Delete", icon: <Icon name="Trash01" size={16} />, destructive: true }
          ]} />
          <Dropdown trigger={<AvatarButton size="md" initials="OR" status="online" chevron label="Open account menu" />} items={MENU} />
        </div></Preview> }
    ],
    faqs: [
      { q: "How tall is a menu item?", a: "36px \u2014 8px block padding over a 20px line. That matches the small button and the small input, so a menu lines up with the toolbar that opened it." },
      { q: "Can an item be both selected and destructive?", a: "It can, but it should not be: a destructive action is not a current choice. Selected is for menus that pick a value, destructive for menus that perform one." },
      { q: "How do I keep the menu open for a screenshot?", a: "Pass <code>open</code>. The menu then ignores outside clicks, which is how every diagram on this page is rendered from the real component." }
    ]
  });

})();
