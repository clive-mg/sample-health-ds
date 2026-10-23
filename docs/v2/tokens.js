/* Sample Health — MDS theme token map.
   Maps the token names from "SH - MDS Theme template.xlsx" onto the literal
   values that already exist in this design system (tokens/*.css).

   Rules applied (agreed with the design lead):
   - Accent           : not defined in Sample Health -> left blank.
   - Info             : mapped to the gray-blue ramp (brand is already blue).
   - Neutral          : gray-light-mode (light) / gray-dark-mode (dark);
                        neutral.0 = white; neutral.150 has no equivalent.
   - Dark column      : raw ramps do not change between themes, so the same
                        value is repeated; only neutral + semantic tokens differ.
   - border.width / zIndex / motion.* : not defined in Sample Health -> blank.
   - Serif            : Sample Health is Inter-only -> every serif token blank.
   - font.size.2xs    : below our 12px floor -> blank.
   - Font faces       : the single Google Fonts CSS2 import, weight noted.
   - Weights          : coerced to the size-bound weights in CLAUDE.md; every
                        coerced row carries a note. */
window.SH_TOKENS = (function () {
  const FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap';

  /* ---------------- Colour ramps (hex, from tokens/*.css) ---------------- */
  const RAMPS = {
    brand:  ["#F5FAFF","#EFF8FF","#D1E9FF","#B2DDFF","#84CAFF","#53B1FD","#2E90FA","#1570EF","#175CD3","#1849A9","#194185","#102A56"],
    grayBlue:["#FCFCFD","#F8F9FC","#EAECF5","#D5D9EB","#B3B8DB","#717BBC","#4E5BA6","#3E4784","#363F72","#293056","#101323","#0D0F1C"],
    success:["#F6FEF9","#ECFDF3","#DCFAE6","#ABEFC6","#75E0A7","#47CD89","#17B26A","#079455","#067647","#085D3A","#074D31","#053321"],
    error:  ["#FFFBFA","#FEF3F2","#FEE4E2","#FECDCA","#FDA29B","#F97066","#F04438","#D92D20","#B42318","#912018","#7A271A","#55160C"],
    warning:["#FFFCF5","#FFFAEB","#FEF0C7","#FEDF89","#FEC84B","#FDB022","#F79009","#DC6803","#B54708","#93370D","#7A2E0E","#4E1D09"],
    grayL:  ["#FDFDFD","#FAFAFA","#F5F5F5","#E9EAEB","#D5D7DA","#A4A7AE","#717680","#535862","#414651","#252B37","#181D27","#0A0D12"],
    grayD:  ["#FAFAFA","#F7F7F7","#F0F0F1","#ECECED","#CECFD2","#94979C","#85888E","#61656C","#373A41","#22262F","#13161B","#0C0E12"]
  };
  const STEPS = ["25","50","100","200","300","400","500","600","700","800","900","950"];

  function rampRows(cat, ns, ramp, cssBase, darkRamp, darkCssBase) {
    return STEPS.map((s, i) => ({
      cat: cat,
      token: "color." + ns + "." + s,
      name: cat + " " + s,
      light: ramp[i],
      dark: (darkRamp || ramp)[i],
      varLight: "--colors-" + cssBase + "-" + s,
      varDark: "--colors-" + (darkCssBase || cssBase) + "-" + s
    }));
  }

  /* Semantic rows: [token, displayName, lightHex, darkHex, varLight, varDark, note] */
  function semRows(cat, defs) {
    return defs.map(function (d) {
      return { cat: cat, token: d[0], name: d[1], light: d[2], dark: d[3], varLight: d[4], varDark: d[5], note: d[6] || null };
    });
  }

  const color = [].concat(
    rampRows("Primary", "primary", RAMPS.brand, "brand"),
    STEPS.map(function (s) {
      return { cat: "Accent", token: "color.accent." + s, name: "Accent " + s, light: null, dark: null,
               note: "Sample Health has no accent ramp." };
    }),
    rampRows("Info", "info", RAMPS.grayBlue, "gray-blue"),
    rampRows("Success", "success", RAMPS.success, "success"),
    rampRows("Error", "error", RAMPS.error, "error"),
    rampRows("Warning", "warning", RAMPS.warning, "warning"),
    [{ cat: "Neutral", token: "color.neutral.0", name: "Neutral 0", light: "#FFFFFF", dark: "#FFFFFF",
       varLight: "--colors-base-white", varDark: "--colors-base-white" }],
    STEPS.slice(0, 3).map(function (s, i) {
      return { cat: "Neutral", token: "color.neutral." + s, name: "Neutral " + s, light: RAMPS.grayL[i], dark: RAMPS.grayD[i],
               varLight: "--colors-gray-light-mode-" + s, varDark: "--colors-gray-dark-mode-" + s };
    }),
    [{ cat: "Neutral", token: "color.neutral.150", name: "Neutral 150", light: null, dark: null,
       note: "No 150 step in the Sample Health gray ramp." }],
    STEPS.slice(3).map(function (s, i) {
      return { cat: "Neutral", token: "color.neutral." + s, name: "Neutral " + s, light: RAMPS.grayL[i + 3], dark: RAMPS.grayD[i + 3],
               varLight: "--colors-gray-light-mode-" + s, varDark: "--colors-gray-dark-mode-" + s };
    }),
    semRows("Surface", [
      ["color.surface.canvas", "Surface Canvas", "#FAFAFA", "#13161B", "--colors-background-bg-secondary", "--colors-background-bg-secondary"],
      ["color.surface.default", "Surface Default", "#FFFFFF", "#0C0E12", "--colors-background-bg-primary", "--colors-background-bg-primary"],
      ["color.surface.subtle", "Surface Subtle", "#FDFDFD", "#13161B", "--colors-background-bg-secondary-subtle", "--colors-background-bg-secondary-subtle"],
      ["color.surface.elevated", "Surface Elevated", "#FFFFFF", "#13161B", "--colors-background-bg-primary-alt", "--colors-background-bg-primary-alt"],
      ["color.surface.hover", "Surface Hover", "#FAFAFA", "#22262F", "--colors-background-bg-primary-hover", "--colors-background-bg-primary-hover"],
      ["color.surface.active", "Surface Active", "#FAFAFA", "#22262F", "--colors-background-bg-active", "--colors-background-bg-active"],
      ["color.surface.selected", "Surface Selected", "#EFF8FF", "#2E90FA", "--colors-background-bg-brand-primary", "--colors-background-bg-brand-primary"],
      ["color.surface.selected.hover", "Surface Selected Hover", "#D1E9FF", "#1570EF", "--colors-background-bg-brand-secondary", "--colors-background-bg-brand-secondary"],
      ["color.surface.disabled", "Surface Disabled", "#F5F5F5", "#22262F", "--colors-background-bg-disabled", "--colors-background-bg-disabled"],
      ["color.surface.primary", "Surface Primary", "#1570EF", "#1570EF", "--colors-background-bg-brand-solid", "--colors-background-bg-brand-solid"],
      ["color.surface.primary.hover", "Surface Primary Hover", "#175CD3", "#2E90FA", "--colors-background-bg-brand-solid-hover", "--colors-background-bg-brand-solid-hover"],
      ["color.surface.accent", "Surface Accent", null, null, null, null, "Depends on the accent ramp, which is not defined."],
      ["color.surface.inverse", "Surface Inverse", "#0A0D12", "#13161B", "--colors-background-bg-primary-solid", "--colors-background-bg-primary-solid"],
      ["color.surface.overlay", "Surface Overlay", "#0A0D12", "#22262F", "--colors-background-bg-overlay", "--colors-background-bg-overlay", "Rendered at 70% opacity by the Modal component."]
    ]),
    semRows("Border", [
      ["color.border.subtle", "Border Subtle", "#E9EAEB", "#22262F", "--colors-border-border-secondary", "--colors-border-border-secondary"],
      ["color.border.default", "Border Default", "#D5D7DA", "#373A41", "--colors-border-border-primary", "--colors-border-border-primary"],
      ["color.border.strong", "Border Strong", "#A4A7AE", "#61656C", "--colors-gray-light-mode-400", "--colors-gray-dark-mode-600", "No named 'strong' border token; taken from the neutral ramp."],
      ["color.border.primary", "Border Primary", "#2E90FA", "#53B1FD", "--colors-border-border-brand", "--colors-border-border-brand"],
      ["color.border.error", "Border Error", "#F04438", "#F97066", "--colors-border-border-error", "--colors-border-border-error"],
      ["color.border.success", "Border Success", "#17B26A", "#47CD89", "--colors-success-500", "--colors-success-400", "No named success border token; taken from the ramp."],
      ["color.border.warning", "Border Warning", "#F79009", "#FDB022", "--colors-warning-500", "--colors-warning-400", "No named warning border token; taken from the ramp."],
      ["color.border.info", "Border Info", "#4E5BA6", "#717BBC", "--colors-gray-blue-500", "--colors-gray-blue-400", "Follows the Info ramp decision."],
      ["color.border.inverse", "Border Inverse", "#FFFFFF", "#D5D7DA", "--colors-base-white", "--colors-gray-light-mode-300", "Border drawn on an inverse surface."]
    ]),
    semRows("Text", [
      ["color.text.primary", "Text Primary", "#181D27", "#FAFAFA", "--colors-text-text-primary-900", "--colors-text-text-primary-900"],
      ["color.text.secondary", "Text Secondary", "#414651", "#CECFD2", "--colors-text-text-secondary-700", "--colors-text-text-secondary-700"],
      ["color.text.tertiary", "Text Tertiary", "#535862", "#94979C", "--colors-text-text-tertiary-600", "--colors-text-text-tertiary-600"],
      ["color.text.disabled", "Text Disabled", "#717680", "#85888E", "--colors-text-text-disabled", "--colors-text-text-disabled"],
      ["color.text.placeholder", "Text Placeholder", "#717680", "#85888E", "--colors-text-text-placeholder", "--colors-text-text-placeholder"],
      ["color.text.inverse", "Text Inverse", "#FFFFFF", "#0C0E12", "--colors-text-text-white", "--colors-gray-dark-mode-950"],
      ["color.text.brand.primary", "Text Brand Primary", "#194185", "#F7F7F7", "--colors-text-text-brand-primary-900", "--colors-text-text-brand-primary-900"],
      ["color.text.brand.accent", "Text Brand Accent", null, null, null, null, "Depends on the accent ramp, which is not defined."],
      ["color.text.link", "Text Link", "#1570EF", "#53B1FD", "--colors-brand-600", "--colors-brand-400"],
      ["color.text.link.hover", "Text Link Hover", "#175CD3", "#84CAFF", "--colors-brand-700", "--colors-brand-300"],
      ["color.text.link.visited", "Text Link Visited", null, null, null, null, "Sample Health does not style visited links."],
      ["color.text.status.error", "Text Status Error", "#D92D20", "#F97066", "--colors-text-text-error-primary-600", "--colors-text-text-error-primary-600"],
      ["color.text.status.warning", "Text Status Warning", "#DC6803", "#FDB022", "--colors-text-text-warning-primary-600", "--colors-text-text-warning-primary-600"],
      ["color.text.status.success", "Text Status Success", "#079455", "#47CD89", "--colors-text-text-success-primary-600", "--colors-text-text-success-primary-600"],
      ["color.text.status.info", "Text Status Info", "#3E4784", "#717BBC", "--colors-gray-blue-600", "--colors-gray-blue-400", "Follows the Info ramp decision."],
      ["color.text.on.brand", "Text On Brand", "#FFFFFF", "#F7F7F7", "--colors-text-text-primary-on-brand", "--colors-text-text-primary-on-brand"],
      ["color.text.on.status.error", "Text On Status Error", "#FFFFFF", "#FFFFFF", "--colors-base-white", "--colors-base-white"],
      ["color.text.on.status.warning", "Text On Status Warning", "#FFFFFF", "#FFFFFF", "--colors-base-white", "--colors-base-white"],
      ["color.text.on.status.success", "Text On Status Success", "#FFFFFF", "#FFFFFF", "--colors-base-white", "--colors-base-white"],
      ["color.text.on.status.info", "Text On Status Info", "#FFFFFF", "#FFFFFF", "--colors-base-white", "--colors-base-white"]
    ])
  );

  /* ---------------- Layout ---------------- */
  const NOT_DEFINED = "Not defined in Sample Health.";
  const ADDED = "Sample Health step \u2014 not named in the MDS template. Add it to the workbook.";
  function lay(cat, token, name, value, cssVar, note) {
    return { cat: cat, token: token, name: name, value: value || null, cssVar: cssVar || null, note: note || null };
  }
  const layout = [
    lay("Border Width", "border.width.hairline", "Hairline", null, null, NOT_DEFINED),
    lay("Border Width", "border.width.default", "Default", null, null, NOT_DEFINED),
    lay("Border Width", "border.width.emphasis", "Emphasis", null, null, NOT_DEFINED),
    lay("Border Width", "border.width.thick", "Thick", null, null, NOT_DEFINED),

    lay("Shadow", "shadow.xs", "xs", "0px 1px 2px 0px rgba(10,13,18,0.05)", "--colors-effects-shadows-shadow-xs"),
    lay("Shadow", "shadow.sm", "sm", "0px 1px 3px 0px rgba(10,13,18,0.10), 0px 1px 2px 0px rgba(10,13,18,0.10)", "--colors-effects-shadows-shadow-sm-01 / -02"),
    lay("Shadow", "shadow.md", "md", "0px 4px 8px -2px rgba(10,13,18,0.10), 0px 2px 4px -2px rgba(10,13,18,0.06)", "--colors-effects-shadows-shadow-md-01 / -02"),
    lay("Shadow", "shadow.lg", "lg", "0px 12px 16px -4px rgba(10,13,18,0.08), 0px 4px 6px -2px rgba(10,13,18,0.03)", "--colors-effects-shadows-shadow-lg-01 / -02"),
    lay("Shadow", "shadow.xl", "xl", "0px 20px 24px -4px rgba(10,13,18,0.08), 0px 8px 8px -4px rgba(10,13,18,0.03)", "--colors-effects-shadows-shadow-xl-01 / -02"),
    lay("Shadow", "shadow.2xl", "2xl", "0px 24px 48px -12px rgba(10,13,18,0.18)", "--colors-effects-shadows-shadow-2xl-01", ADDED),
    lay("Shadow", "shadow.3xl", "3xl", "0px 32px 64px -12px rgba(10,13,18,0.14)", "--colors-effects-shadows-shadow-3xl-01", ADDED),

    lay("Border Radius", "radius.none", "none", "0px", "--radius-none-px", ADDED),
    lay("Border Radius", "radius.xxs", "xxs", "2px", "--radius-xxs-px", ADDED),
    lay("Border Radius", "radius.xs", "xs", "4px", "--radius-xs-px"),
    lay("Border Radius", "radius.sm", "sm", "6px", "--radius-sm-px"),
    lay("Border Radius", "radius.md", "md", "8px", "--radius-md-px"),
    lay("Border Radius", "radius.lg", "lg", "10px", "--radius-lg-px"),
    lay("Border Radius", "radius.xl", "xl", "12px", "--radius-xl-px"),
    lay("Border Radius", "radius.2xl", "2xl", "16px", "--radius-2xl-px", ADDED),
    lay("Border Radius", "radius.3xl", "3xl", "20px", "--radius-3xl-px", ADDED),
    lay("Border Radius", "radius.4xl", "4xl", "24px", "--radius-4xl-px", ADDED),
    lay("Border Radius", "radius.full", "full", "9999px", "--radius-full-px"),

    lay("Spacing", "spacing.none", "none", "0px", "--spacing-none-px", ADDED),
    lay("Spacing", "spacing.xxs", "xxs", "2px", "--spacing-xxs-px", ADDED),
    lay("Spacing", "spacing.xs", "xs", "4px", "--spacing-xs-px"),
    lay("Spacing", "spacing.sm", "sm", "6px", "--spacing-sm-px"),
    lay("Spacing", "spacing.md", "md", "8px", "--spacing-md-px"),
    lay("Spacing", "spacing.lg", "lg", "12px", "--spacing-lg-px"),
    lay("Spacing", "spacing.xl", "xl", "16px", "--spacing-xl-px"),
    lay("Spacing", "spacing.2xl", "2xl", "20px", "--spacing-2xl-px"),
    lay("Spacing", "spacing.3xl", "3xl", "24px", "--spacing-3xl-px"),
    lay("Spacing", "spacing.4xl", "4xl", "32px", "--spacing-4xl-px", ADDED),
    lay("Spacing", "spacing.5xl", "5xl", "40px", "--spacing-5xl-px", ADDED),
    lay("Spacing", "spacing.6xl", "6xl", "48px", "--spacing-6xl-px", ADDED),
    lay("Spacing", "spacing.7xl", "7xl", "64px", "--spacing-7xl-px", ADDED),
    lay("Spacing", "spacing.8xl", "8xl", "80px", "--spacing-8xl-px", ADDED),
    lay("Spacing", "spacing.9xl", "9xl", "96px", "--spacing-9xl-px", ADDED),
    lay("Spacing", "spacing.10xl", "10xl", "128px", "--spacing-10xl-px", ADDED),
    lay("Spacing", "spacing.11xl", "11xl", "160px", "--spacing-11xl-px", ADDED),
    lay("Width", "width.xxs", "xxs", "320px", null, ADDED),
    lay("Width", "width.xs", "xs", "384px", null, ADDED),
    lay("Width", "width.sm", "sm", "480px", null, ADDED),
    lay("Width", "width.md", "md", "560px", null, ADDED),
    lay("Width", "width.lg", "lg", "640px", null, ADDED),
    lay("Width", "width.xl", "xl", "768px", null, ADDED),
    lay("Width", "width.2xl", "2xl", "1024px", null, ADDED),
    lay("Width", "width.3xl", "3xl", "1280px", null, ADDED),
    lay("Width", "width.4xl", "4xl", "1440px", null, ADDED),
    lay("Width", "width.5xl", "5xl", "1600px", null, ADDED),
    lay("Width", "width.6xl", "6xl", "1920px", null, ADDED),
    lay("Container", "container.padding.mobile", "Padding \u2014 mobile", "16px", null, ADDED),
    lay("Container", "container.padding.desktop", "Padding \u2014 desktop", "32px", null, ADDED),
    lay("Container", "container.maxWidth.desktop", "Max width \u2014 desktop", "1280px", null, ADDED),
    lay("Container", "paragraph.maxWidth", "Paragraph max width", "720px", null, ADDED)
  ].concat(
    ["base", "raised", "dropdown", "sticky", "overlay", "modal", "tooltip", "toast"].map(function (k) {
      return lay("z-index", "zIndex." + k, "z-index " + k, null, null, NOT_DEFINED);
    }),
    ["fast", "normal", "slow"].map(function (k) {
      return lay("Duration", "motion.duration." + k, "Motion " + k, null, null, NOT_DEFINED);
    }),
    ["decelerate", "accelerate", "standard", "linear", "emphasized"].map(function (k) {
      return lay("Easing", "motion.easing." + k, "Motion " + k, null, null, NOT_DEFINED);
    })
  );

  /* ---------------- Typography — base ---------------- */
  const WEIGHTS = { thin: 100, extralight: 200, light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
  const INTER_W = ["thin", "extralight", "light", "regular", "medium", "semibold", "bold", "extrabold", "black"];
  const MONO_W = ["light", "regular", "medium", "semibold", "bold"];
  const SERIF_NOTE = "Sample Health is Inter-only; no serif face is shipped.";
  const MONO_MISSING = "Roboto Mono is loaded at weights 400\u2013700 only.";

  function face(sub, token, name, family, weight, italic, note) {
    return { cat: "Font Face", sub: sub, token: token, name: name,
      family: family, weight: weight, style: italic ? "italic" : "normal",
      value: family ? family + " \u00b7 " + weight + " \u00b7 " + (italic ? "italic" : "normal") : null,
      url: family ? FONT_URL : null, note: note || null };
  }

  const typeBase = [].concat(
    INTER_W.map(function (w) { return face("Base", "font.face.base." + w, "Base " + w.charAt(0).toUpperCase() + w.slice(1), "Inter", WEIGHTS[w], false); }),
    MONO_W.map(function (w) {
      const ok = WEIGHTS[w] >= 400;
      return face("Mono", "font.face.mono." + w, "Mono " + w.charAt(0).toUpperCase() + w.slice(1),
        ok ? "Roboto Mono" : null, ok ? WEIGHTS[w] : null, false, ok ? "Code and numeric data only." : MONO_MISSING);
    }),
    ["regular", "semibold", "bold"].map(function (w) { return face("Serif", "font.face.serif." + w, "Serif " + w, null, null, false, SERIF_NOTE); }),
    INTER_W.map(function (w) { return face("Base Italic", "font.face.base." + w + ".italic", "Base " + w + " \u2014 Italic", "Inter", WEIGHTS[w], true); }),
    ["regular", "bold", "semibold"].map(function (w) { return face("Mono Italic", "font.family.mono." + w + ".italic", "Mono " + w + " \u2014 Italic", "Roboto Mono", WEIGHTS[w], true, "Code and numeric data only."); }),
    ["regular", "bold", "semibold"].map(function (w) { return face("Serif Italic", "font.family.serif." + w + ".italic", "Serif " + w + " \u2014 Italic", null, null, true, SERIF_NOTE); })
  );

  /* Size steps. 2xs sits below the 12px floor in CLAUDE.md. 7xl is a Sample Health
     addition: the template ladder stops at 6xl, but Display 1 needs a 72px step. */
  const SIZES = { "2xs": null, xs: 12, sm: 14, md: 16, lg: 18, xl: 20, "2xl": 24, "3xl": 30, "4xl": 36, "5xl": 48, "6xl": 60, "7xl": 72 };
  const SIZE_VAR = { xs: "--text-xs-size", sm: "--text-sm-size", md: "--text-md-size", lg: "--text-lg-size",
    xl: "--text-xl-size", "2xl": "--text-display-xs-size", "3xl": "--text-display-sm-size",
    "4xl": "--text-display-md-size", "5xl": "--text-display-lg-size", "6xl": "--text-display-xl-size",
    "7xl": "--text-display-2xl-size" };
  /* Documented line-height pairs. A heading step and a body step can share a pixel
     size — 16px is H6 (20px line) and Body Large (24px) — so the maps are separate. */
  const HEAD_LINE = { 16: 20, 18: 22, 20: 24, 24: 28, 30: 36, 36: 44, 48: 58, 60: 72, 72: 86 };
  const BODY_LINE = { 12: 18, 14: 20, 16: 24 };

  const SIZE_NOTE = { "7xl": "Added beyond the template ladder \u2014 Display 1 needs a 72px step." };
  const sizes = Object.keys(SIZES).map(function (k) {
    const px = SIZES[k];
    return { cat: "Font Size", token: "font.size." + k, name: k, value: px ? px + "px" : null,
      cssVar: SIZE_VAR[k] || null, note: px ? (SIZE_NOTE[k] || null) : "Below the 12px floor set in CLAUDE.md." };
  });

  const lineHeights = [
    ["none", "1", "Buttons, badges, nav items \u2014 single-line UI."],
    ["tight", "1.2", "Display 1\u20133 and H1\u2013H6: 72/86, 60/72, 48/58, 36/44, 30/36, 24/28, 20/24, 18/22, 16/20."],
    ["snug", "1.25", "Caption and overline."],
    ["normal", "1.5", "Body Large and Small: 16/24, 12/18. Body Medium takes the 20px control step instead \u2014 14/20."],
    ["relaxed", "1.625", "Long-form paragraphs."],
    ["loose", "1.75", "Code blocks."],
    ["extraLoose", "2", "Document reading measure."]
  ].map(function (r) { return { cat: "Line Height", token: "font.lineHeight." + r[0], name: r[0], value: r[1], note: r[2] }; });

  const letterSpacings = [
    ["tighter", "-0.02em", "Display 1\u20133 and H1 \u2014 36px and up."],
    ["tight", "-0.01em", "Available for H2\u2013H4; the scale ships them at 0."],
    ["normal", "0em", "Everything else."],
    ["wide", "0.05em", "Uppercase labels."],
    ["wider", "0.06em", "Overline / eyebrow text."]
  ].map(function (r) { return { cat: "Letter Spacing", token: "font.letterSpacing." + r[0], name: r[0], value: r[1], note: r[2] }; });

  /* ---------------- Typography — styles ---------------- */
  /* [tab, sub, token, name, faceToken, sizeKey, lineHeightKey, letterSpacingKey] */
  const STYLE_DEFS = [
    ["Basic", "Size style / base", "style.base.2xs", "Base 2xs", "base.regular", "2xs", "snug", "wide"],
    ["Basic", "Size style / base", "style.base.xs", "Base xs", "base.regular", "xs", "snug", "wide"],
    ["Basic", "Size style / base", "style.base.sm.regular", "Base sm", "base.regular", "sm", "normal", "normal"],
    ["Basic", "Size style / base", "style.base.md.regular", "Base md", "base.regular", "md", "normal", "normal"],
    ["Basic", "Size style / base", "style.base.lg.regular", "Base lg", "base.regular", "lg", "normal", "normal"],
    ["Basic", "Size style / base", "style.base.sm.bold", "Base sm bold", "base.bold", "sm", "normal", "normal"],
    ["Basic", "Size style / base", "style.base.md.bold", "Base md bold", "base.bold", "md", "normal", "normal"],
    ["Basic", "Size style / base", "style.base.lg.bold", "Base lg bold", "base.bold", "lg", "normal", "normal"],
    ["Basic", "Size style / base", "style.base.xl", "Base xl", "base.regular", "xl", "snug", "normal"],
    ["Basic", "Size style / base", "style.base.2xl", "Base 2xl", "base.regular", "2xl", "snug", "normal"],
    ["Basic", "Size style / base", "style.base.3xl", "Base 3xl", "base.regular", "3xl", "snug", "normal"],
    ["Basic", "Size style / base", "style.base.4xl", "Base 4xl", "base.regular", "4xl", "tight", "tight"],
    ["Basic", "Size style / base", "style.base.5xl", "Base 5xl", "base.regular", "5xl", "tight", "tight"],
    ["Basic", "Size style / base", "style.base.6xl", "Base 6xl", "base.regular", "6xl", "none", "tight"],
    ["Basic", "Size style / mono", "style.mono.2xs", "Mono 2xs", "mono.regular", "2xs", "snug", "normal"],
    ["Basic", "Size style / mono", "style.mono.xs", "Mono xs", "mono.regular", "xs", "snug", "normal"],
    ["Basic", "Size style / mono", "style.mono.sm", "Mono sm", "mono.regular", "sm", "snug", "normal"],
    ["Basic", "Size style / mono", "style.mono.md", "Mono md", "mono.regular", "md", "normal", "normal"],
    ["Basic", "Size style / mono", "style.mono.lg", "Mono lg", "mono.regular", "lg", "normal", "normal"],
    ["Basic", "Size style / mono", "style.mono.xl", "Mono xl", "mono.regular", "xl", "normal", "normal"],
    ["Basic", "Size style / serif", "style.serif.sm", "Serif sm", "serif.regular", "sm", "normal", "normal"],
    ["Basic", "Size style / serif", "style.serif.md", "Serif md", "serif.regular", "md", "normal", "normal"],
    ["Basic", "Size style / serif", "style.serif.lg", "Serif lg", "serif.regular", "lg", "normal", "normal"],
    ["Basic", "Size style / serif", "style.serif.xl", "Serif xl", "serif.regular", "xl", "normal", "normal"],
    ["Basic", "Display", "style.display.1", "Display 1", "base.semibold", "7xl", "tight", "tighter"],
    ["Basic", "Display", "style.display.2", "Display 2", "base.semibold", "6xl", "tight", "tighter"],
    ["Basic", "Display", "style.display.3", "Display 3", "base.semibold", "5xl", "tight", "tighter"],
    ["Basic", "Heading", "style.heading.h1", "Heading 1", "base.semibold", "4xl", "tight", "tighter"],
    ["Basic", "Heading", "style.heading.h2", "Heading 2", "base.semibold", "3xl", "tight", "normal"],
    ["Basic", "Heading", "style.heading.h3", "Heading 3", "base.semibold", "2xl", "tight", "normal"],
    ["Basic", "Heading", "style.heading.h4", "Heading 4", "base.semibold", "xl", "tight", "normal"],
    ["Basic", "Heading", "style.heading.h5", "Heading 5", "base.semibold", "lg", "tight", "normal"],
    ["Basic", "Heading", "style.heading.h6", "Heading 6", "base.semibold", "md", "tight", "normal"],
    ["Interactive UI", "Body", "style.body.lg.regular", "Body lg regular", "base.regular", "md", "normal", "normal"],
    ["Interactive UI", "Body", "style.body.lg.bold", "Body lg bold", "base.semibold", "md", "normal", "normal"],
    ["Interactive UI", "Body", "style.body.md.regular", "Body md regular", "base.regular", "sm", "normal", "normal"],
    ["Interactive UI", "Body", "style.body.md.bold", "Body md bold", "base.semibold", "sm", "normal", "normal"],
    ["Interactive UI", "Body / Mono", "style.body.md.mono.regular", "Body md regular \u2014 Mono", "mono.regular", "sm", "normal", "normal"],
    ["Interactive UI", "Body", "style.body.sm.regular", "Body sm regular", "base.medium", "xs", "normal", "normal"],
    ["Interactive UI", "Body", "style.body.sm.bold", "Body sm bold", "base.bold", "xs", "normal", "normal"],
    ["Interactive UI", "Caption", "style.caption", "Caption", "base.medium", "xs", "snug", "wide"],
    ["Interactive UI", "Micro", "style.micro", "Micro", "base.regular", "2xs", "snug", "wide"],
    ["Interactive UI", "Button", "style.button.md", "Button md", "base.medium", "md", "none", "normal"],
    ["Interactive UI", "Button", "style.button.sm", "Button sm", "base.medium", "sm", "none", "normal"],
    ["Interactive UI", "Form", "style.form.label", "Form label", "base.medium", "sm", "snug", "normal"],
    ["Interactive UI", "Form", "style.form.input", "Form input", "base.regular", "md", "normal", "normal"],
    ["Interactive UI", "Form", "style.form.helper", "Form helper text", "base.regular", "xs", "snug", "normal"],
    ["Interactive UI", "Input / Mono", "style.input.mono", "Form input \u2014 Mono", "mono.regular", "md", "normal", "normal"],
    ["Interactive UI", "Label", "style.label", "Label", "base.medium", "sm", "snug", "normal"],
    ["Interactive UI", "Label", "style.overline", "Overline", "base.semibold", "xs", "none", "wider"],
    ["Interactive UI", "Navigation", "style.nav.item", "Nav Item", "base.medium", "md", "none", "normal"],
    ["Interactive UI", "Badge", "style.badge", "Badge", "base.medium", "xs", "none", "wide"],
    ["Interactive UI", "Table", "style.table.header", "Table Header", "base.semibold", "md", "snug", "wide"],
    ["Interactive UI", "Table", "style.table.cell", "Table Cell", "base.regular", "md", "snug", "normal"],
    ["Interactive UI", "Link", "style.link", "Link", "base.bold", "md", "normal", "normal"],
    ["Data & Code", "Data / Mono", "style.data.mono", "Numeric Data", "mono.regular", "md", "normal", "tight"],
    ["Data & Code", "Code / Mono", "style.code.inline", "Code Inline", "mono.regular", "md", "snug", "normal"],
    ["Data & Code", "Code / Mono", "style.code.block", "Code Block", "mono.regular", "md", "loose", "normal"],
    ["Data & Code", "Terminal / Mono", "style.terminal.output", "Terminal Output", "mono.regular", "sm", "normal", "normal"],
    ["Editorial Content", "Docs / Serif / Base", "style.docs.body", "Document body default", "serif.regular", "md", "relaxed", "normal"],
    ["Editorial Content", "Docs / Serif / Base", "style.docs.reading", "Document Reading", "serif.regular", "lg", "extraLoose", "normal"]
  ];

  /* CLAUDE.md binds weights to sizes. Coerce and flag anything that moves. */
  function allowedWeights(px) {
    if (px >= 18) return [600];      /* Display 1-3 and H1-H5 */
    if (px === 16) return [400, 600]; /* H6, or Body Large */
    if (px === 14) return [400, 600]; /* Body Medium */
    return [500, 700];               /* 12px - Body Small, caption, overline */
  }
  function coerce(px, w) {
    const allow = allowedWeights(px);
    if (allow.indexOf(w) !== -1) return w;
    if (allow.length === 1) return allow[0];
    return w <= allow[0] ? allow[0] : allow[1];
  }

  const LH = {}; lineHeights.forEach(function (r) { LH[r.token.split(".").pop()] = parseFloat(r.value); });
  const LS = {}; letterSpacings.forEach(function (r) { LS[r.token.split(".").pop()] = r.value; });

  function buildStyles() {
    return STYLE_DEFS.map(function (d) {
      const faceTok = d[4];
      const sizeKey = d[5];
      const px = sizeKey ? SIZES[sizeKey] : null;
      const isSerif = faceTok.indexOf("serif") === 0;
      const isMono = faceTok.indexOf("mono") === 0;
      const declared = WEIGHTS[faceTok.split(".").pop()];
      const row = {
        tab: d[0], sub: d[1], token: d[2], name: d[3],
        faceToken: "font.face." + faceTok, sizeToken: sizeKey ? "font.size." + sizeKey : null,
        lhToken: "font.lineHeight." + d[6], lsToken: "font.letterSpacing." + d[7],
        family: null, weight: null, px: px, lineHeight: null, letterSpacing: LS[d[7]], notes: []
      };
      if (isSerif) { row.notes.push(SERIF_NOTE); row.px = null; row.letterSpacing = null; return row; }
      if (!sizeKey) { row.notes.push("font.size.2xs is not defined in Sample Health."); return row; }
      if (px === null) { row.notes.push("font.size.2xs is below the 12px floor in CLAUDE.md."); return row; }
      row.family = isMono ? "Roboto Mono" : "Inter";
      row.weight = coerce(px, declared);
      if (row.weight !== declared) row.notes.push("Weight " + declared + " \u2192 " + row.weight + " to satisfy the " + px + "px weight rule in CLAUDE.md.");
      if (d[6] === "none") row.lineHeight = px + "px";
      else if (d[6] === "tight") row.lineHeight = (HEAD_LINE[px] || Math.round(px * 1.2)) + "px";
      else if (d[6] === "normal") row.lineHeight = (BODY_LINE[px] || HEAD_LINE[px] || Math.round(px * 1.5)) + "px";
      else row.lineHeight = Math.round(px * LH[d[6]]) + "px";
      return row;
    });
  }

  return {
    fontUrl: FONT_URL,
    color: color,
    layout: layout,
    typeBase: typeBase,
    sizes: sizes,
    lineHeights: lineHeights,
    letterSpacings: letterSpacings,
    buildStyles: buildStyles,
    SIZES: SIZES,
    HEAD_LINE: HEAD_LINE,
    BODY_LINE: BODY_LINE
  };
})();
