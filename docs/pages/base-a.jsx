/* Sample Health docs — Base components, batch A:
   avatars, badges, badge-groups, buttons, checkboxes. */
(function () {
  const SH = window.SH;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Avatar, AvatarGroup, AvatarLabelGroup, AvatarProfilePhoto,
    Badge, BadgeCloseX, BadgeGroup, Button, CloseButton, Checkbox } = UI;

  const TEAM = [
    { initials: "OR" }, { initials: "PB" }, { initials: "LS" },
    { initials: "DW" }, { initials: "AM" }, { initials: "CN" }, { initials: "MK" }
  ];

  /* ---------------- Avatars ---------------- */
  SH.registerPage("avatars", {
    h1: "Avatar components",
    lead: "Avatars represent a person or entity across the product — in tables, menus, comments and account areas. They render an image, initials, or a neutral placeholder, at six sizes, with an optional presence indicator.",
    sections: [
      { id: "sizes", title: "Avatar sizes", prose: ["Six sizes step from 24px through 64px. Use smaller sizes in dense lists and larger sizes for profile and account surfaces."],
        render: () => <Preview><div className="sh-row" style={{ gap: 20 }}>
          {["xs", "sm", "md", "lg", "xl", "2xl"].map((sz) => <Avatar key={sz} size={sz} initials="OR" />)}
        </div></Preview> },
      { id: "types", title: "Image, initials & placeholder", prose: ["Avatars show a photo when one is available, fall back to a person's initials, and display a neutral silhouette when there's neither."],
        render: () => <Preview><div className="sh-row" style={{ gap: 24 }}>
          <Avatar size="lg" initials="OR" />
          <Avatar size="lg" initials="PB" />
          <Avatar size="lg" />
          <Avatar size="lg" initials="AM" />
        </div></Preview> },
      { id: "status", title: "With presence indicator", prose: ["A small dot in the lower-right corner shows whether a person is online or offline."],
        render: () => <Preview><div className="sh-row" style={{ gap: 24 }}>
          {["sm", "md", "lg", "xl"].map((sz) => <Avatar key={sz} size={sz} initials="LS" status="online" />)}
          <Avatar size="lg" initials="DW" status="offline" />
        </div></Preview> },
      { id: "groups", title: "Avatar groups", prose: ["Overlapping avatars represent a group of people. When there are more than fit, the rest collapse into a “+N” counter."],
        render: () => <Preview><div className="sh-col" style={{ gap: 24, alignItems: "center" }}>
          <AvatarGroup size="md" avatars={TEAM} max={5} />
          <AvatarGroup size="lg" avatars={TEAM} max={4} />
          <AvatarGroup size="sm" avatars={TEAM} max={6} />
        </div></Preview> },
      { id: "label-group", title: "Avatar with text", prose: ["Pair an avatar with a name and supporting line for menus, comments and account cards."],
        render: () => <Preview className="align-start"><div className="sh-col" style={{ gap: 20 }}>
          <AvatarLabelGroup size="md" initials="OR" status="online" title="Olivia Rhye" subtitle="olivia@samplehealth.com" />
          <AvatarLabelGroup size="lg" initials="PB" title="Phoenix Baker" subtitle="Product designer" />
        </div></Preview> },
      { id: "profile-photo", title: "Profile photo", prose: ["A larger avatar with a contrast ring for profile headers and settings."],
        render: () => <Preview><div className="sh-row" style={{ gap: 28 }}>
          <AvatarProfilePhoto size="lg" initials="OR" status="online" />
          <AvatarProfilePhoto size="xl" initials="AM" />
        </div></Preview> }
    ],
    faqs: [
      { q: "What sizes are available?", a: "Avatars support six sizes: <code>xs</code> (24px), <code>sm</code> (32px), <code>md</code> (40px), <code>lg</code> (48px), <code>xl</code> (56px) and <code>2xl</code> (64px)." },
      { q: "How do I show initials instead of a photo?", a: "Pass the <code>initials</code> prop and omit <code>src</code>. If neither is provided, a neutral placeholder glyph is shown." },
      { q: "Can I show whether someone is online?", a: "Yes — set <code>status=\"online\"</code> for an availability dot. Any other value renders a muted offline dot." }
    ]
  });

  /* ---------------- Badges & badge groups: token application ---------------- */
  /* Shared diagram helpers live below with the buttons; they are only called at
     render time, so referencing them here is safe. */
  const BADGE_COLORS = ["brand", "white", "gray", "error", "warning", "success"];
  const BADGE_SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }, { id: "lg", label: "lg" }];
  const BADGE_STATES = [
    { id: "structure", label: "Structure" },
    { id: "default", label: "Default" },
    { id: "dot", label: "With dot" },
    { id: "icon", label: "With leading icon" },
    { id: "count", label: "With count" },
    { id: "close", label: "Dismissible" }
  ];

  /* One entry per badge size: the spacing step each padding edge takes, the gap
     and the bound type style. Nothing here is a raw px value the component pins. */
  const BADGE_SZ = {
    sm: { py: ["spacing.xxs", "2px"], px: ["spacing.md", "8px"], gap: ["spacing.xs", "4px"],
      type: ["style.body.sm", "Inter \u00b7 12/18 \u00b7 500"], dot: "6px", icon: "12px", close: "12px" },
    md: { py: ["spacing.xxs", "2px"], px: ["spacing.lg", "12px"], gap: ["spacing.sm", "6px"],
      type: ["style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600"], dot: "8px", icon: "12px", close: "14px" },
    lg: { py: ["spacing.xs", "4px"], px: ["spacing.lg", "12px"], gap: ["spacing.sm", "6px"],
      type: ["style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600"], dot: "8px", icon: "12px", close: "14px" }
  };
  /* Badge colours use the Foundations naming from Colors: brand is the Primary
     ramp, gray is Neutral, and white takes the neutral surface tokens. */
  const BADGE_RAMP = { brand: "primary", gray: "neutral", success: "success", error: "error", warning: "warning" };
  const BADGE_VAR = { brand: "brand", gray: "gray-light-mode", success: "success", error: "error", warning: "warning" };
  const cvar = (c, step) => "var(--colors-" + BADGE_VAR[c] + "-" + step + ")";
  const ctok = (c, step) => "color." + BADGE_RAMP[c] + "." + step;

  function badgeRows(type, state, size, color) {
    const z = BADGE_SZ[size] || BADGE_SZ.md;
    const pill = type === "pill-color";
    /* White reads its fill, border and label from the neutral surface tokens
       rather than a utility ramp. */
    const white = color === "white";
    const fgTok = white ? "color.text.secondary" : ctok(color, "700");
    const fgVal = white ? "var(--colors-text-text-secondary-700)" : cvar(color, "700");
    if (state === "structure") {
      return [
        tv(z.py[0], "Top & bottom \u00b7 " + z.py[1], [at("root", "top", .34), at("root", "bottom", .34)]),
        tv(z.px[0], "Left & right \u00b7 " + z.px[1], [at("root", "left", .5), at("root", "right", .5)]),
        tv(pill ? "radius.full" : "radius.sm", pill ? "9999px" : "6px", [at("root", "bottom", .06)]),
        tv("border.width", "1px", [at("root", "top", .82)]),
        tv(z.type[0], z.type[1], [at("label", "bottom", .6)])
      ];
    }
    if (state === "default") return [
      tc(white ? "color.border.default" : ctok(color, "200"),
        white ? "var(--colors-border-border-primary)" : cvar(color, "200"), [at("root", "left", .5)]),
      tc(white ? "color.surface.default" : ctok(color, "50"),
        white ? "var(--colors-background-bg-primary)" : cvar(color, "50"), [at("root", "bottom", .08)]),
      tc(fgTok, fgVal, [at("label", "bottom", .6)])
    ];
    /* The dot is currentColor, so one token paints both it and the label. */
    if (state === "dot") return [
      tv("dot.size", z.dot, [at("dot", "top", .5)]),
      tv(z.gap[0], "gap \u00b7 " + z.gap[1], [at("dot", "right", .5)]),
      tc(fgTok, fgVal, [at("dot", "bottom", .5), at("label", "bottom", .6)])
    ];
    if (state === "icon") return [
      tv("icon.size", z.icon, [at("icon", "top", .5)]),
      tv(z.gap[0], "gap \u00b7 " + z.gap[1], [at("icon", "right", .5)]),
      tc(fgTok, fgVal, [at("icon", "bottom", .5), at("label", "bottom", .6)])
    ];
    /* The count chip sits one step darker than the badge fill so it reads as a
       surface of its own without introducing a second colour. */
    if (state === "count") return [
      tc(white ? "color.neutral.100" : ctok(color, "100"),
        white ? cvar("gray", "100") : cvar(color, "100"), [at("count", "top", .5)]),
      tv(z.gap[0], "gap \u00b7 " + z.gap[1], [at("count", "left", .5)]),
      tv("spacing.xs", "Left & right \u00b7 4px", [at("count", "right", .5)]),
      tv("radius.xs", "4px", [at("count", "bottom", .18)]),
      tc(fgTok, fgVal, [at("count", "bottom", .8), at("label", "bottom", .6)])
    ];
    return [
      tv("icon.size", z.close, [at("close", "top", .5)]),
      tv(z.gap[0], "gap \u00b7 " + z.gap[1], [at("close", "left", .5)]),
      tv("radius.xxs", "2px", [at("close", "bottom", .2)]),
      tc(fgTok, fgVal, [at("close", "bottom", .8), at("label", "bottom", .6)])
    ];
  }

  function badgeSpec(type, state, size, color) {
    const z = BADGE_SZ[size] || BADGE_SZ.md;
    const label = <span data-sh-part="label">Label</span>;
    const p = { "data-sh-part": "root", size: size, color: color, type: type };
    if (state === "dot") return <Badge {...p} dot>{label}</Badge>;
    if (state === "icon") return <Badge {...p} iconLeading={
      <span data-sh-part="icon" style={{ display: "inline-flex" }}><Icon name="Zap" size={parseInt(z.icon, 10)} /></span>}>{label}</Badge>;
    if (state === "count") return <Badge {...p} count="24">{label}</Badge>;
    if (state === "close") return <Badge {...p} iconTrailing={
      <span data-sh-part="close" style={{ display: "inline-flex" }}><BadgeCloseX size={size} /></span>}>{label}</Badge>;
    return <Badge {...p}>{label}</Badge>;
  }

  function SizeColorBar(props) {
    return <div className="sh-tm-sizes">
      <span className="sh-tm-lab">Size</span>
      <div className="sh-tm-seg">{BADGE_SIZES.map((x) =>
        <button key={x.id} type="button" className={x.id === props.size ? "is-on" : ""}
          onClick={() => props.onSize(x.id)}>{x.label}</button>)}</div>
      <span className="sh-tm-lab">Color</span>
      <div className="sh-tm-dots">{BADGE_COLORS.map((c) =>
        <button key={c} type="button" title={c} aria-label={c} className={c === props.color ? "is-on" : ""}
          style={{ background: c === "white" ? "var(--colors-base-white)" : cvar(c, "500") }}
          onClick={() => props.onColor(c)} />)}</div>
    </div>;
  }

  function BadgeTokenDoc(props) {
    const type = props.type;
    const [size, setSize] = SH.React.useState(BADGE_SIZES[0].id);
    const [color, setColor] = SH.React.useState("brand");
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {BADGE_STATES.map((s) => <div className="sh-tm-group" key={s.id}>
          <div className="sh-tm-head">
            <SH.StateMark>{s.label}</SH.StateMark>
            {s.id === "structure" ? <SizeColorBar size={size} color={color} onSize={setSize} onColor={setColor} /> : null}
          </div>
          <SH.TokenMap sig={type + "/" + s.id + "/" + size + "/" + color}
            rows={badgeRows(type, s.id, size, color)}
            specimen={badgeSpec(type, s.id, size, color)} />
        </div>)}
      </div>
    </Preview>;
  }

  SH.registerPage("badges", {
    h1: "Badge components",
    lead: "Badges are compact labels for status, categories and counts. Two shapes set the corner of the chip, three sizes step the padding and type, and six colors carry the meaning.",
    sections: [
      { id: "square", title: "Square badges", prose: ["The default chip: a tinted fill, a hairline border from the same ramp and a label two steps darker. Use it for status and category labels inside dense layouts."],
        render: () => <BadgeTokenDoc type="color" /> },
      { id: "pill", title: "Pill badges", prose: ["The same colours at a full radius. Pills read as counts, tags and filters, and lead every badge group."],
        render: () => <BadgeTokenDoc type="pill-color" /> }
    ],
    faqs: [
      { q: "What sizes are available?", a: "Three, each padded from the spacing scale: <code>sm</code> (spacing.xxs / spacing.md), <code>md</code> (spacing.xxs / spacing.lg) and <code>lg</code> (spacing.xs / spacing.lg)." },
      { q: "Why isn't the height fixed?", a: "Height derives from block padding, line height and the 1px border, so the padding tokens stay the single source of truth. Pinning a height would contradict them." },
      { q: "Which colors are supported?", a: "<code>white</code>, neutral <code>gray</code>, <code>brand</code>, and the semantic <code>error</code>, <code>warning</code> and <code>success</code>. Each maps to a ramp on the Colors page — <code>brand</code> is <code>color.primary</code>, <code>gray</code> is <code>color.neutral</code> — and every tinted chip takes the same three steps from it: 50 fill, 200 border, 700 label and dot. <code>white</code> takes the neutral surface tokens instead (<code>color.surface.default</code>, <code>color.border.default</code>, <code>color.text.secondary</code>), for surfaces where a tint would clash." },
      { q: "How do I show a quantity?", a: "Pass <code>count</code>. It renders in its own chip at the trailing edge, filled one ramp step darker than the badge (<code>100</code> against the <code>50</code> fill) so it reads as a surface without adding a second colour." },
      { q: "Why do sm and md use different weights?", a: "Weight is bound to size. The 12px <code>sm</code> label takes 500; the 14px <code>md</code> and <code>lg</code> labels take 600. Neither size may use the other's weight." }
    ]
  });

  /* ---------------- Badge groups ---------------- */
  const BGRP_THEMES = [{ id: "light", label: "Light" }, { id: "gray", label: "Gray" }];
  const BGRP_STATES = [
    { id: "structure", label: "Structure" },
    { id: "default", label: "Default" },
    { id: "icon", label: "With trailing icon" }
  ];
  /* Container padding is asymmetric: the pill sits flush left, the text needs
     room on the right. */
  const BGRP_SZ = {
    sm: { py: ["spacing.xxs", "2px"], pl: ["spacing.xs", "4px"], pr: ["spacing.lg", "12px"], gap: ["spacing.sm", "6px"],
      type: ["style.body.sm", "Inter \u00b7 12/18 \u00b7 500"], icon: "14px" },
    md: { py: ["spacing.xxs", "2px"], pl: ["spacing.xs", "4px"], pr: ["spacing.lg", "12px"], gap: ["spacing.md", "8px"],
      type: ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"], icon: "14px" },
    lg: { py: ["spacing.xs", "4px"], pl: ["spacing.xs", "4px"], pr: ["spacing.lg", "12px"], gap: ["spacing.md", "8px"],
      type: ["style.body.md", "Inter \u00b7 14/20 \u00b7 400"], icon: "14px" }
  };

  function bgrpRows(theme, state, size, color) {
    const z = BGRP_SZ[size] || BGRP_SZ.md;
    const light = theme === "light";
    if (state === "structure") return [
      tv(z.py[0], "Top & bottom \u00b7 " + z.py[1], [at("root", "top", .3), at("root", "bottom", .3)]),
      tv(z.pl[0], "Left \u00b7 " + z.pl[1], [at("root", "left", .5)]),
      tv(z.pr[0], "Right \u00b7 " + z.pr[1], [at("root", "right", .5)]),
      tv("radius.full", "9999px", [at("root", "bottom", .06)]),
      tv(z.gap[0], "gap \u00b7 " + z.gap[1], [at("pill", "right", .5)]),
      tv(z.type[0], z.type[1], [at("label", "bottom", .6)]),
      tv("shadow.xs", null, [at("root", "bottom", .96)])
    ];
    if (state === "default") return [
      tc("color.border.default", "var(--colors-border-border-primary)", [at("root", "left", .5)]),
      tc(light ? "color.surface.default" : "color.neutral.50",
        light ? "var(--colors-background-bg-primary)" : cvar("gray", "50"), [at("root", "bottom", .08)]),
      tc(ctok(color, "50"), cvar(color, "50"), [at("pill", "top", .5)]),
      tc(ctok(color, "700"), cvar(color, "700"), [at("pill", "bottom", .5)]),
      tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("label", "bottom", .6)])
    ];
    return [
      tv("icon.size", z.icon, [at("icon", "top", .5)]),
      tv(z.gap[0], "gap \u00b7 " + z.gap[1], [at("icon", "left", .5)]),
      tc("color.text.secondary", "var(--colors-text-text-secondary-700)", [at("icon", "bottom", .5), at("label", "bottom", .6)])
    ];
  }

  function bgrpSpec(theme, state, size, color) {
    const z = BGRP_SZ[size] || BGRP_SZ.md;
    return <BadgeGroup data-sh-part="root" theme={theme} size={size} color={color} badge="New"
      badgeProps={{ "data-sh-part": "pill" }}
      iconTrailing={state === "icon"
        ? <span data-sh-part="icon" style={{ display: "inline-flex" }}><Icon name="ArrowRight" size={parseInt(z.icon, 10)} /></span>
        : null}>
      <span data-sh-part="label">We just shipped scheduling</span>
    </BadgeGroup>;
  }

  function BadgeGroupTokenDoc(props) {
    const theme = props.theme;
    const [size, setSize] = SH.React.useState(BADGE_SIZES[0].id);
    const [color, setColor] = SH.React.useState("brand");
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {BGRP_STATES.map((s) => <div className="sh-tm-group" key={s.id}>
          <div className="sh-tm-head">
            <SH.StateMark>{s.label}</SH.StateMark>
            {s.id === "structure" ? <SizeColorBar size={size} color={color} onSize={setSize} onColor={setColor} /> : null}
          </div>
          <SH.TokenMap sig={theme + "/" + s.id + "/" + size + "/" + color}
            rows={bgrpRows(theme, s.id, size, color)}
            specimen={bgrpSpec(theme, s.id, size, color)} />
        </div>)}
      </div>
    </Preview>;
  }

  SH.registerPage("badge-groups", {
    h1: "Badge group components",
    lead: "A badge group pairs a leading pill with a short line of trailing text — ideal for announcements, version notes and inline callouts. Two themes suit a white or a tinted surface; the pill takes any badge colour.",
    sections: [
      { id: "light", title: "Light theme", prose: ["A white container with a hairline border, for placement on the page background."],
        render: () => <BadgeGroupTokenDoc theme="light" /> },
      { id: "gray", title: "Gray theme", prose: ["The same geometry filled with color.neutral.50, for placement on a white card where a white container would disappear."],
        render: () => <BadgeGroupTokenDoc theme="gray" /> }
    ],
    faqs: [
      { q: "Why is the padding asymmetric?", a: "The pill sits flush against the left edge on <code>spacing.xs</code>, while the trailing text needs <code>spacing.lg</code> of breathing room on the right. Both edges are spacing steps." },
      { q: "Can the pill take any badge colour?", a: "Yes — <code>color</code> is passed straight through to the leading <code>Badge</code>, which always renders as <code>pill-color</code>." }
    ]
  });

  /* ---------------- Buttons: token application ---------------- */
  const at = (part, edge, pos) => ({ part, edge, pos });
  const tc = (token, color, anchors, note) => ({ token, color, anchors, note });
  const tv = (token, value, anchors, note, tip) => ({ token, value, anchors, note, tip });
  const TM_FG = [at("icon", "bottom", .5), at("label", "bottom", .6)];
  const TM_FG_LINK = [at("icon", "left", .5), at("label", "bottom", .6)];

  const TM_STATES = [
    { id: "structure", label: "Structure" },
    { id: "default", label: "Default" },
    { id: "hover", label: "Hover" },
    { id: "focus", label: "Focused" },
    { id: "disabled", label: "Disabled" }
  ];
  const TM_CFG = {
    primary: {
      kind: "solid",
      bg: ["color.surface.primary", "var(--colors-background-bg-brand-solid)"],
      bgHover: ["color.surface.primary.hover", "var(--colors-background-bg-brand-solid-hover)"],
      fg: ["color.text.on.brand", "var(--colors-text-text-primary-on-brand)"], shadow: true
    },
    secondary: {
      kind: "outline",
      border: ["color.primary.600", "var(--colors-brand-600)"],
      bg: ["color.surface.default", "var(--colors-base-white)"],
      bgHover: ["color.surface.canvas", "var(--colors-background-bg-secondary)"],
      fg: ["color.primary.600", "var(--colors-brand-600)"], shadow: true
    },
    tertiary: {
      kind: "ghost",
      border: ["color.neutral.500", "var(--colors-gray-light-mode-500)"],
      bgHover: ["color.surface.canvas", "var(--colors-background-bg-secondary)"],
      disabledBorder: ["color.border.subtle", "var(--colors-border-border-disabled-subtle)"],
      fg: ["color.text.secondary", "var(--colors-text-text-secondary-700)"]
    },
    "link-color": {
      link: true, kind: "link", fg: ["color.text.link", "var(--colors-text-text-brand-tertiary-600)"],
      fgHover: ["color.text.link.hover", "var(--colors-text-text-brand-secondary-700)"]
    },
    "link-gray": {
      link: true, kind: "link", fg: ["color.text.tertiary", "var(--colors-text-text-tertiary-600)"],
      fgHover: ["color.text.secondary", "var(--colors-text-text-tertiary-hover)"]
    }
  };

  /* One entry per button size: which spacing step each padding edge takes, and
     the resulting derived height (block padding ×2 + line height). */
  const TM_SIZES = [{ id: "sm", label: "sm" }, { id: "md", label: "md" }, { id: "lg", label: "lg" }, { id: "xl", label: "xl" }];
  const BTN_SZ = {
    sm: { py: ["spacing.md", "8px", "--spacing-md-px"], px: ["spacing.lg", "12px", "--spacing-lg-px"], height: "36px",
      type: ["style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600", "14px / 20px \u00b7 600"] },
    md: { py: ["spacing.md", "8px", "--spacing-md-px"], px: ["spacing.xl", "16px", "--spacing-xl-px"], height: "36px",
      type: ["style.body.md.bold", "Inter \u00b7 14/20 \u00b7 600", "14px / 20px \u00b7 600"] },
    lg: { py: ["spacing.lg", "12px", "--spacing-lg-px"], px: ["spacing.xl", "16px", "--spacing-xl-px"], height: "48px",
      type: ["style.body.lg.bold", "Inter \u00b7 16/24 \u00b7 600", "16px / 24px \u00b7 600"] },
    xl: { py: ["spacing.lg", "12px", "--spacing-lg-px"], px: ["spacing.2xl", "20px", "--spacing-2xl-px"], height: "48px",
      type: ["style.body.lg.bold", "Inter \u00b7 16/24 \u00b7 600", "16px / 24px \u00b7 600"] }
  };

  function tmStructRows(id, size) {
    const cfg = TM_CFG[id], z = BTN_SZ[size] || BTN_SZ.md;
    if (cfg.link) return [
      tv(z.type[0], z.type[1], [at("label", "left", .5)]),
      tv("spacing.xs", "gap \u00b7 4px", [at("icon", "bottom", 1)]),
      tv("padding", "0", [at("label", "bottom", .9)])
    ];
    const rows = [
      tv(z.py[0], "Top & bottom \u00b7 " + z.py[1], [at("root", "top", .34), at("root", "bottom", .34)], null),
      tv(z.px[0], "Left & right \u00b7 " + z.px[1], [at("root", "left", .5), at("root", "right", .5)], null),
      tv("radius.md", "8px", [at("root", "bottom", .06)]),
      tv("spacing.xs", "gap \u00b7 4px", [at("icon", "bottom", 1)]),
      tv(z.type[0], z.type[1], [at("label", "bottom", .6)])
    ];
    if (cfg.shadow) rows.push(tv("shadow.xs", null, [at("root", "bottom", .97)]));
    return rows;
  }

  function tmColorRows(id, state) {
    const cfg = TM_CFG[id], rows = [];
    /* Disabled swaps the resting colours for the disabled tokens — no opacity. */
    if (state === "disabled") {
      const fg = tc("color.text.disabled", "var(--colors-text-text-disabled)", cfg.link ? TM_FG_LINK : TM_FG);
      if (cfg.kind === "solid") return [
        tc("color.surface.disabled", "var(--colors-background-bg-disabled)", [at("root", "left", .5)]), fg];
      if (cfg.kind === "outline") return [
        tc("color.border.subtle", "var(--colors-border-border-disabled-subtle)", [at("root", "left", .5)]),
        tc("color.surface.default", "var(--colors-base-white)", [at("root", "bottom", .08)]), fg];
      if (cfg.disabledBg) return [
        tc(cfg.disabledBg[0], cfg.disabledBg[1], [at("root", "left", .5)]), fg];
      if (cfg.disabledBorder) return [
        tc(cfg.disabledBorder[0], cfg.disabledBorder[1], [at("root", "left", .5)]),
        tv("background", "transparent", [at("root", "bottom", .08)]), fg];
      return [fg];
    }
    if (cfg.border) rows.push(tc(cfg.border[0], cfg.border[1], [at("root", "left", .5)]));
    if (cfg.bg) {
      const t = state === "hover" ? cfg.bgHover : cfg.bg;
      rows.push(tc(t[0], t[1], cfg.border ? [at("root", "bottom", .08)] : [at("root", "left", .5)]));
    } else if (!cfg.link) {
      const anch = cfg.border ? [at("root", "bottom", .08)] : [at("root", "left", .5)];
      if (state === "hover") rows.push(tc(cfg.bgHover[0], cfg.bgHover[1], anch));
      else rows.push(tv("background", "transparent", anch));
    }
    const fgt = state === "hover" && cfg.fgHover ? cfg.fgHover : cfg.fg;
    rows.push(tc(fgt[0], fgt[1], cfg.link ? TM_FG_LINK : TM_FG));
    if (state === "focus") rows.push(tc("color.focusRing", "var(--colors-effects-focus-rings-focus-ring)",
      [at(cfg.link ? "label" : "root", "bottom", .97)]));
    return rows;
  }

  function tmSpec(id, state, size) {
    const cfg = TM_CFG[id], noop = () => {};
    const st = {};
    if (state === "hover") { if (cfg.link) st.color = cfg.fgHover[1]; else st.background = cfg.bgHover[1]; }
    if (state === "focus") { st.outline = "2px solid var(--colors-effects-focus-rings-focus-ring)"; st.outlineOffset = "2px"; }
    return <Button hierarchy={id} size={size || "md"} disabled={state === "disabled"} style={st}
      data-sh-part="root" onMouseEnter={noop} onMouseLeave={noop}
      iconLeading={<span data-sh-part="icon" style={{ display: "inline-flex" }}><Icon name="UserPlus01" size={20} /></span>}>
      <span data-sh-part="label">Invite user</span>
    </Button>;
  }

  function TokenApplication(props) {
    const hier = props.hier;
    const [size, setSize] = SH.React.useState("sm");
    return <Preview className="align-stretch canvas pad-tm">
      <div className="sh-tm-set">
        {TM_STATES.map((s) => <div className="sh-tm-group" key={s.id}>
          <div className="sh-tm-head">
            <SH.StateMark>{s.label}</SH.StateMark>
            {s.id === "structure" ? <div className="sh-tm-sizes">
              <span className="sh-tm-lab">Size</span>
              <div className="sh-tm-seg">{TM_SIZES.map((x) =>
                <button key={x.id} type="button" className={x.id === size ? "is-on" : ""} onClick={() => setSize(x.id)}>{x.label}</button>)}</div>
            </div> : null}
          </div>
          <SH.TokenMap sig={hier + "/" + s.id + "/" + (s.id === "structure" ? size : "md")}
            rows={s.id === "structure" ? tmStructRows(hier, size) : tmColorRows(hier, s.id)}
            specimen={tmSpec(hier, s.id === "structure" ? "default" : s.id, s.id === "structure" ? size : "md")} />
        </div>)}
      </div>
    </Preview>;
  }

  /* A hierarchy's documentation: its token diagrams, one group per state. */
  function HierarchyDoc(props) {
    return <TokenApplication hier={props.hier} />;
  }

  /* ---------------- Buttons ---------------- */
  const BTN_SIZES = ["sm", "md", "lg", "xl"];
  SH.registerPage("buttons", {
    h1: "Button components",
    lead: "Buttons are the core action controls. Five hierarchies establish emphasis, four sizes fit any surface, and every button supports leading or trailing icons, icon-only, disabled and destructive treatments.",
    sections: [
      { id: "primary", title: "Primary buttons", prose: ["The highest-emphasis action. Use one primary button per view to signal the main task."],
        render: () => <HierarchyDoc hier="primary" /> },
      { id: "secondary", title: "Secondary buttons", prose: ["A bordered, lower-emphasis action that pairs alongside a primary button."],
        render: () => <HierarchyDoc hier="secondary" /> },
      { id: "tertiary", title: "Tertiary buttons", prose: ["An outlined action for toolbars and dense layouts. A 1px <code>color.neutral.500</code> ring around <code>color.text.secondary</code> body text, with no resting fill and no shadow \u2014 that flatness is what keeps it a step below secondary, which carries a surface and <code>shadow.xs</code>."],
        render: () => <HierarchyDoc hier="tertiary" /> },
      { id: "link-color", title: "Link color buttons", prose: ["A brand-colored link button for emphasis. It reads as inline text, so it carries no padding, height or radius."],
        render: () => <HierarchyDoc hier="link-color" /> },
      { id: "link-gray", title: "Link gray buttons", prose: ["The neutral link button, for quieter actions alongside body text."],
        render: () => <HierarchyDoc hier="link-gray" /> },
      { id: "icon-leading", title: "Icon leading & trailing", prose: ["An icon can sit before or after the label to reinforce the action."],
        render: () => <Preview><div className="sh-row">
          <Button iconLeading={<Icon name="Plus" size={20} />}>Add item</Button>
          <Button hierarchy="secondary" iconTrailing={<Icon name="ChevronDown" size={20} />}>Options</Button>
          <Button hierarchy="secondary" iconLeading={<Icon name="Download01" size={20} />}>Export</Button>
        </div></Preview> },
      { id: "icon-only", title: "Icon-only buttons", prose: ["A square, icon-only control for tight spaces. It always carries an accessible label for screen readers."],
        render: () => <Preview><div className="sh-row">
          <Button iconOnly iconLeading={<Icon name="Plus" size={20} />} aria-label="Add" />
          <Button hierarchy="secondary" iconOnly iconLeading={<Icon name="Settings01" size={20} />} aria-label="Settings" />
          <Button hierarchy="tertiary" iconOnly iconLeading={<Icon name="DotsVertical" size={20} />} aria-label="More" />
        </div></Preview> },
      { id: "close", title: "Close button", prose: ["A dedicated dismiss control used to close modals, banners and slideouts."],
        render: () => <Preview><div className="sh-row">
          <CloseButton size="sm" />
          <CloseButton size="md" />
          <CloseButton size="lg" />
        </div></Preview> }
    ],
    faqs: [
      { q: "What hierarchies are available?", a: "Buttons support <code>primary</code>, <code>secondary</code>, <code>tertiary</code>, <code>link-gray</code> and <code>link-color</code>, each with a matching <code>-destructive</code> variant." },
      { q: "What sizes are available?", a: "Four sizes, each padded from the spacing scale: <code>sm</code> (spacing.md / spacing.lg, 36px tall), <code>md</code> (spacing.md / spacing.xl, 36px), <code>lg</code> (spacing.lg / spacing.xl, 48px) and <code>xl</code> (spacing.lg / spacing.2xl, 48px)." },
      { q: "Why isn't the height fixed?", a: "Height derives from block padding plus line height, so the padding tokens are the single source of truth. A pinned height would contradict them: sm and md come out 36px, lg and xl 48px." },
      { q: "How do I make an icon-only button?", a: "Set the <code>iconOnly</code> prop and pass the glyph via <code>iconLeading</code>. Always include an <code>aria-label</code> for screen readers." }
    ]
  });

  /* ---------------- Checkboxes ---------------- */
  SH.registerPage("checkboxes", {
    h1: "Checkbox components",
    lead: "Checkboxes let people select one or many options, or toggle a single setting. They support two sizes, checked, unchecked and indeterminate states, and optional label and hint text.",
    sections: [
      { id: "states", title: "States", prose: ["The core states: unchecked, checked and indeterminate."],
        render: () => <Preview><div className="sh-row" style={{ gap: 32 }}>
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
        </div></Preview> },
      { id: "sizes", title: "Sizes", prose: ["Two sizes: small (16px) and medium (20px)."],
        render: () => <Preview><div className="sh-row" style={{ gap: 32 }}>
          <Checkbox size="sm" label="Small" defaultChecked />
          <Checkbox size="md" label="Medium" defaultChecked />
        </div></Preview> },
      { id: "with-hint", title: "With hint text", prose: ["A line of hint text can explain the option; the checkbox aligns to the top of the text."],
        render: () => <Preview className="align-start"><div className="sh-col" style={{ gap: 16 }}>
          <Checkbox label="Email notifications" hint="Receive a summary of activity once a day." defaultChecked />
          <Checkbox label="Product updates" hint="Occasional news about features and improvements." />
        </div></Preview> },
      { id: "group", title: "Checkbox group", prose: ["Compose multiple checkboxes for multi-select lists and settings."],
        render: () => <Preview className="align-start"><div className="sh-col" style={{ gap: 14 }}>
          <Checkbox label="Read" defaultChecked />
          <Checkbox label="Write" defaultChecked />
          <Checkbox label="Delete" />
        </div></Preview> }
    ],
    faqs: [
      { q: "How do I show a partially-selected state?", a: "Set the <code>indeterminate</code> prop — commonly used on a parent checkbox when only some children are selected." },
      { q: "Can I add helper text?", a: "Yes — pass the <code>hint</code> prop alongside <code>label</code> to show a supporting line beneath the label." }
    ]
  });
})();
