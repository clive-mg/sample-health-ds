/* Sample Health docs v2 — Elements (foundations).
   Same pages as v1, plus a leading "Token name" column that names the token
   behind each value. Mapping rules live in docs/v2/tokens.js. */
(function () {
  const SH = window.SH;
  const React = window.React;

  const STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
  const ramp = (hexes, ns) => STEPS.map((s, i) => ({ name: s, hex: hexes[i], tok: ns ? "color." + ns + "." + s : null }));

  const PALETTES = [
    { id: "base", title: "Base",
      desc: "These are base black and white color styles to quickly swap out if you need to.",
      swatches: [{ name: "White", hex: "#FFFFFF", tok: "color.neutral.0" }, { name: "Black", hex: "#000000" }] },
    { id: "neutral", title: "Neutral",
      desc: "Gray is a neutral color and is the foundation of the color system. Almost everything in UI design—text, form fields, backgrounds, dividers—are usually gray.",
      swatches: ramp(["#FAFAFA", "#F5F5F5", "#E9EAEB", "#D5D7DA", "#A4A7AE", "#717680", "#535862", "#414651", "#252B37", "#181D27"], "neutral") },
    { id: "brand", title: "Brand Primary",
      desc: "The brand color is your \"primary\" color, and is used across all interactive elements such as buttons, links, inputs, etc. This color can define the overall feel and can elicit emotion.",
      swatches: ramp(["#EFF8FF", "#D1E9FF", "#B2DDFF", "#84CAFF", "#53B1FD", "#2E90FA", "#1570EF", "#175CD3", "#1849A9", "#102A56"], "primary") },
    { id: "error", title: "Error",
      desc: "Error colors are used across error states and in \"destructive\" actions. They communicate a destructive/negative action, such as removing a user from your team.",
      swatches: ramp(["#FEF3F2", "#FEE4E2", "#FECDCA", "#FDA29B", "#F97066", "#F04438", "#D92D20", "#B42318", "#912018", "#7A271A"], "error") },
    { id: "warning", title: "Warning",
      desc: "Warning colors can communicate that an action is potentially destructive or \"on-hold\". These colors are commonly used in confirmations to grab the users' attention.",
      swatches: ramp(["#FFFAEB", "#FEF0C7", "#FEDF89", "#FEC84B", "#FDB022", "#F79009", "#DC6803", "#B54708", "#93370D", "#7A2E0E"], "warning") },
    { id: "success", title: "Success",
      desc: "Success colors communicate a positive action, positive trend, or a successful confirmation. If you're using green as your primary color, it can be helpful to introduce a different hue for your success green.",
      swatches: ramp(["#ECFDF3", "#DCFAE6", "#ABEFC6", "#75E0A7", "#47CD89", "#17B26A", "#079455", "#067647", "#085D3A", "#074D31"], "success") },
  ];

  function Swatches({ items }) {
    return (
      <div className="sh-swatches">
        {items.map((sw, i) => (
          <div key={i}>
            <div className="sh-swatch-chip" style={{ background: sw.hex }} />
            <div className="sh-swatch-name">{sw.name}</div>
            <div className="sh-swatch-hex">{sw.hex}</div>
            {sw.tok ? <div className="sh-swatch-token"><span className="sh-mds">{sw.tok}</span></div> : null}
          </div>
        ))}
      </div>
    );
  }

  SH.registerPage("colors", {
    h1: "Colors",
    wide: true,
    lead: "The Sample Health palette pairs a neutral gray foundation with the brand blue and three semantic scales — error, warning and success. Every color runs from 50, the lightest tint, through 900, the deepest shade. Each swatch carries the MDS theme token developers reference in code — the full map, including the 25 and 950 steps and every semantic surface, border and text token, is in Developer reference › Color tokens.",
    sections: PALETTES.map((p) => ({
      id: p.id, title: p.title, split: true, prose: [p.desc],
      render: () => <Swatches items={p.swatches} />,
    })),
  });

  /* ---- Icons: filter the raw glyph set down to the clean monochrome line
     icons (24x24, currentColor, no baked-in color literals), then present a
     searchable grid. Clicking a cell copies that icon's raw SVG markup. ---- */
  const LINE_ICONS = (() => {
    const data = (typeof window !== "undefined" && window.__UUI_ICONS) || {};
    return Object.keys(data)
      .filter((n) => {
        const d = data[n];
        return d && d.viewBox === "0 0 24 24" && d.body.indexOf("currentColor") !== -1 && d.body.indexOf("rgb") === -1;
      })
      .sort((a, b) => a.localeCompare(b));
  })();

  function legacyCopy(text) {
    return new Promise((resolve) => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.top = "-1000px"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) { /* ignore */ }
      document.body.removeChild(ta); resolve();
    });
  }
  function writeClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
    }
    return legacyCopy(text);
  }

  const SearchGlyph = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  function IconsExplorer() {
    const [q, setQ] = React.useState("");
    const [copied, setCopied] = React.useState(null);
    const timer = React.useRef(0);
    const query = q.trim().toLowerCase();
    const list = query ? LINE_ICONS.filter((n) => n.toLowerCase().indexOf(query) !== -1) : LINE_ICONS;

    const onCopy = (name) => {
      const d = window.__UUI_ICONS[name];
      if (!d) return;
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="' + d.viewBox + '" fill="none">' + d.body + '</svg>';
      writeClipboard(svg).then(() => {
        setCopied(name);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(null), 1400);
      });
    };

    return (
      <div className="sh-icons-explorer">
        <div className="sh-icons-bar">
          <div className="sh-icons-search">
            <SearchGlyph />
            <input type="text" placeholder="Search icons…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search icons" />
          </div>
        </div>
        {list.length ? (
          <div className="sh-icons-grid">
            {list.map((name) => (
              <button key={name} type="button" className={"sh-icon-cell" + (copied === name ? " is-copied" : "")} onClick={() => onCopy(name)} title={"Copy SVG \u2014 " + name}>
                <span className="sh-icon-glyph"><SH.Icon name={name} size={24} /></span>
                <span className="sh-icon-name">{name}</span>
                <span className="sh-icon-copied" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Copied
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="sh-icons-empty">No icons match “{q}”.</div>
        )}
      </div>
    );
  }

  const HEADINGS = [
    { el: "Display 1", size: 72, line: 86, spec: " - 72 | Semibold - 600", tok: "style.display.1" },
    { el: "Display 2", size: 60, line: 72, spec: " - 60 | Semibold - 600", tok: "style.display.2" },
    { el: "Display 3", size: 48, line: 58, spec: " - 48 | Semibold - 600", tok: "style.display.3" },
    { el: "H1", size: 36, line: 44, spec: " - 36 | Semibold - 600", tok: "style.heading.h1" },
    { el: "H2", size: 30, line: 36, spec: " - 30 | Semibold - 600", tok: "style.heading.h2" },
    { el: "H3", size: 24, line: 28, spec: " - 24 | Semibold - 600", tok: "style.heading.h3" },
    { el: "H4", size: 20, line: 24, spec: " - 20 | Semibold - 600", tok: "style.heading.h4" },
    { el: "H5", size: 18, line: 22, spec: " - 18 | Semibold - 600", tok: "style.heading.h5" },
    { el: "H6", size: 16, line: 20, spec: " - 16 | Semibold - 600", tok: "style.heading.h6" },
  ];
  const BODY = [
    { label: "Body - Large", size: 16, line: 24, normal: 400, bold: 600, spec: " - 16 | Regular - 400 | Semibold - 600", tok: "style.body.lg.regular / style.body.lg.bold" },
    { label: "Body - Medium", size: 14, line: 20, normal: 400, bold: 600, spec: " - 14 | Regular - 400 | Semibold - 600", tok: "style.body.md.regular / style.body.md.bold" },
    { label: "Body - Small", size: 12, line: 18, normal: 500, bold: 700, spec: " - 12 | Medium - 500 | Bold - 700", tok: "style.body.sm.regular / style.body.sm.bold" },
  ];
  const SUPPORT = [
    { label: "Caption text", size: 12, line: 18, weight: 500, spec: " - 12 | Medium - 500", tok: "style.caption", note: "Helper text under a field, table meta, timestamps." },
    { label: "Overline", size: 12, line: 18, weight: 700, upper: true, spec: " - 12 | Bold - 700 | +6% tracking", tok: "style.overline", note: "Eyebrows and section kickers. Uppercase." },
  ];

  const useThemeVersion = () => (window.SH_useThemeVersion ? window.SH_useThemeVersion() : 0);
  const TH = () => window.SH_themed || { font: () => "Inter", spacing: (n) => n, radius: (n) => n };
  const WNAME = { 100: "Thin", 200: "Extra Light", 300: "Light", 400: "Regular", 500: "Medium", 600: "Semibold", 700: "Bold", 800: "Extra Bold", 900: "Black" };
  /* Heading rows follow the saved theme's family, size, line height and weight; body rows its body family. */
  const themedType = (tok) => (TH().type ? TH().type(tok) : null);
  const pxLabel = (n) => n.toLocaleString("en-US") + "px";
  function TypeSpec({ spec, heading, tok }) {
    useThemeVersion();
    const t = heading ? themedType(tok) : null;
    const fam = heading ? (t ? t.family : (TH().headingFont ? TH().headingFont() : TH().font())) : TH().font();
    return <div className="sh-type-spec"><b>{fam}</b>{t ? " - " + t.size + " | " + (WNAME[t.weight] || "") + " - " + t.weight : spec}</div>;
  }
  function HeadingRow({ r }) {
    useThemeVersion();
    const t = themedType(r.tok), size = t ? t.size : r.size;
    return <div className="sh-type-row">
      <TokCell tok={r.tok} />
      <div className="sh-type-el" style={{ fontFamily: t && t.family ? '"' + t.family + '", var(--font-display)' : "var(--font-display)", fontSize: size, fontWeight: t ? t.weight : 600, lineHeight: (t ? t.line : r.line) + "px", letterSpacing: size >= 36 ? "-0.02em" : "normal" }}>{r.el}</div>
      <TypeSpec spec={r.spec} heading tok={r.tok} />
    </div>;
  }
  const TokCell = ({ tok }) => (
    <div className="sh-col" style={{ gap: 4, alignItems: "flex-start" }}>
      {String(tok || "—").split(" / ").map((t) => <span className="sh-mds" key={t}>{t}</span>)}
    </div>
  );

  function TypeTable() {
    return (
      <div className="sh-type-table mds">
        <div className="sh-type-head">
          <div>Token name</div>
          <div>Element</div>
          <div>Font - Size | Style - Weight</div>
        </div>
        {HEADINGS.map((r) => <HeadingRow key={r.el} r={r} />)}
        {BODY.map((r) => (
          <div className="sh-type-row" key={r.label}>
            <TokCell tok={r.tok} />
            <div className="sh-type-el" style={{ fontFamily: "var(--font-body)", fontSize: r.size, lineHeight: r.line + "px", color: "var(--colors-text-text-primary-900)" }}>
              <span style={{ fontWeight: r.normal }}>{r.label}</span>
              <span style={{ color: "var(--colors-text-text-quaternary-500)", margin: "0 10px" }}>|</span>
              <span style={{ fontWeight: r.bold }}>{r.label} (Bold Text)</span>
            </div>
            <TypeSpec spec={r.spec} />
          </div>
        ))}
      </div>
    );
  }

  function SupportTable() {
    return (
      <div className="sh-type-table mds">
        <div className="sh-type-head">
          <div>Token name</div>
          <div>Element</div>
          <div>Font - Size | Style - Weight</div>
        </div>
        {SUPPORT.map((r) => (
          <div className="sh-type-row" key={r.label}>
            <TokCell tok={r.tok} />
            <div style={{ minWidth: 0 }}>
              <div className="sh-type-el" style={{ fontFamily: "var(--font-body)", fontSize: r.size, lineHeight: r.line + "px", fontWeight: r.weight, letterSpacing: r.upper ? "0.06em" : "normal", textTransform: r.upper ? "uppercase" : "none" }}>{r.label}</div>
              <div className="sh-type-spec" style={{ marginTop: 6 }}>{r.note}</div>
            </div>
            <TypeSpec spec={r.spec} />
          </div>
        ))}
      </div>
    );
  }

  SH.registerPage("typography", {
    h1: "Typography",
    wide: true,
    lead: "Our design system leverages a purposeful set of typographic styles. We\u2019ve stress-tested this typographic scale across dozens of projects to make sure it\u2019s robust enough to use across (almost) any project, while remaining as accessible as possible for everyone.",
    sections: [
      { id: "scale", title: "Type scale", render: () => <TypeTable /> },
      { id: "support", title: "Caption and overline",
        prose: ["Both sit at 12px alongside Body \u2014 Small but are documented apart: they are labels, not running text, and carry their own weight and tracking."],
        render: () => <SupportTable /> },
    ],
  });

  SH.registerPage("icons", {
    h1: "Icons",
    wide: true,
    lead: "Every Sample Health icon is a 24\u00d724 line glyph that inherits the current text color. Search the full set below and click any icon to copy its SVG markup.",
    sections: [{ id: "library", title: "Line icons", render: () => <IconsExplorer /> }],
  });

  /* ---- Spacing / Radius / Shadows: token scale documentation. Each row is
     [name, rem, px-label, px-number]; the visual is drawn at true pixel size
     (clipped by the column) so bigger tokens read as visibly wider. ---- */
  const PRIMITIVES = [
    ["0", "0rem", "0px", 0], ["0.5", "0.125rem", "2px", 2], ["1", "0.25rem", "4px", 4],
    ["2", "0.5rem", "8px", 8], ["3", "0.75rem", "12px", 12], ["4", "1rem", "16px", 16],
    ["5", "1.25rem", "20px", 20], ["6", "1.5rem", "24px", 24], ["8", "2rem", "32px", 32],
    ["10", "2.5rem", "40px", 40], ["12", "3rem", "48px", 48], ["16", "4rem", "64px", 64],
    ["20", "5rem", "80px", 80], ["24", "6rem", "96px", 96], ["32", "8rem", "128px", 128],
    ["40", "10rem", "160px", 160], ["48", "12rem", "192px", 192], ["56", "14rem", "224px", 224],
    ["64", "16rem", "256px", 256], ["80", "20rem", "320px", 320], ["96", "24rem", "384px", 384],
    ["120", "30rem", "480px", 480], ["140", "35rem", "560px", 560], ["160", "40rem", "640px", 640],
    ["180", "45rem", "720px", 720], ["192", "48rem", "768px", 768], ["256", "64rem", "1,024px", 1024],
    ["320", "80rem", "1,280px", 1280], ["360", "90rem", "1,440px", 1440], ["400", "100rem", "1,600px", 1600],
    ["480", "120rem", "1,920px", 1920],
  ];
  const SPACINGS = [
    ["spacing-none", "0rem", "0px", 0], ["spacing-xxs", "0.125rem", "2px", 2], ["spacing-xs", "0.25rem", "4px", 4],
    ["spacing-sm", "0.375rem", "6px", 6], ["spacing-md", "0.5rem", "8px", 8], ["spacing-lg", "0.75rem", "12px", 12],
    ["spacing-xl", "1rem", "16px", 16], ["spacing-2xl", "1.25rem", "20px", 20], ["spacing-3xl", "1.5rem", "24px", 24],
    ["spacing-4xl", "2rem", "32px", 32], ["spacing-5xl", "2.5rem", "40px", 40], ["spacing-6xl", "3rem", "48px", 48],
    ["spacing-7xl", "4rem", "64px", 64], ["spacing-8xl", "5rem", "80px", 80], ["spacing-9xl", "6rem", "96px", 96],
    ["spacing-10xl", "8rem", "128px", 128], ["spacing-11xl", "10rem", "160px", 160],
  ];
  const WIDTHS = [
    ["width-xxs", "20rem", "320px", 320], ["width-xs", "24rem", "384px", 384], ["width-sm", "30rem", "480px", 480],
    ["width-md", "35rem", "560px", 560], ["width-lg", "40rem", "640px", 640], ["width-xl", "48rem", "768px", 768],
    ["width-2xl", "64rem", "1,024px", 1024], ["width-3xl", "80rem", "1,280px", 1280], ["width-4xl", "90rem", "1,440px", 1440],
    ["width-5xl", "100rem", "1,600px", 1600], ["width-6xl", "120rem", "1,920px", 1920],
  ];
  const CONTAINERS = [
    ["container-padding-mobile", "1rem", "16px", 16],
    ["container-padding-desktop", "2rem", "32px", 32],
    ["container-max-width-desktop", "80rem", "1,280px", 1280],
  ];
  const PARAGRAPH = [
    ["paragraph-max-width", "45rem", "720px", 720],
  ];
  const RADII = [
    ["radius-none", "0rem", "0px", 0], ["radius-xxs", "0.125rem", "2px", 2], ["radius-xs", "0.25rem", "4px", 4],
    ["radius-sm", "0.375rem", "6px", 6], ["radius-md", "0.5rem", "8px", 8], ["radius-lg", "0.625rem", "10px", 10],
    ["radius-xl", "0.75rem", "12px", 12], ["radius-2xl", "1rem", "16px", 16], ["radius-3xl", "1.25rem", "20px", 20],
    ["radius-4xl", "1.5rem", "24px", 24], ["radius-full", "\u221e", "9999px", 9999],
  ];
  const SHADOWS = [
    ["shadow-xs", "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)"],
    ["shadow-sm", "0px 1px 3px 0px var(--colors-effects-shadows-shadow-sm-01), 0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-02)"],
    ["shadow-md", "0px 4px 8px -2px var(--colors-effects-shadows-shadow-md-01), 0px 2px 4px -2px var(--colors-effects-shadows-shadow-md-02)"],
    ["shadow-lg", "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0px 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)"],
    ["shadow-xl", "0px 20px 24px -4px var(--colors-effects-shadows-shadow-xl-01), 0px 8px 8px -4px var(--colors-effects-shadows-shadow-xl-02)"],
    ["shadow-2xl", "0px 24px 48px -12px var(--colors-effects-shadows-shadow-2xl-01)"],
    ["shadow-3xl", "0px 32px 64px -12px var(--colors-effects-shadows-shadow-3xl-01)"],
  ];

  /* Token names for the Sample Health scales. Steps the MDS template never
     named are listed in ADDED and flagged with a warning icon in the table. */
  const ADDED = new Set([
    "spacing.none", "spacing.xxs", "spacing.4xl", "spacing.5xl", "spacing.6xl", "spacing.7xl",
    "spacing.8xl", "spacing.9xl", "spacing.10xl", "spacing.11xl",
    "width.xxs", "width.xs", "width.sm", "width.md", "width.lg", "width.xl",
    "width.2xl", "width.3xl", "width.4xl", "width.5xl", "width.6xl",
    "container.padding.mobile", "container.padding.desktop", "container.maxWidth.desktop",
    "paragraph.maxWidth",
    "radius.none", "radius.xxs", "radius.2xl", "radius.3xl", "radius.4xl",
    "shadow.2xl", "shadow.3xl",
  ]);

  const MdsCell = ({ tok }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
      {tok ? <span className="sh-mds">{tok}</span> : <span className="sh-mds is-blank">—</span>}
      {tok && ADDED.has(tok) ? (
        <SH.ui.Tooltip title="This token was not present in the original sheet and has been added for the Sample Health design system.">
          <span className="sh-added" aria-label="Added for Sample Health">
            <SH.Icon name="AlertTriangle" size={16} />
          </span>
        </SH.ui.Tooltip>
      ) : null}
    </div>
  );

  function ScaleTable({ rows, measure, wideName, tokens, themed }) {
    useThemeVersion();
    return (
      <div className={"sh-scale-table" + (wideName ? " wide-name" : "") + (tokens ? " mds" : "")}>
        <div className="sh-scale-head">
          {tokens ? <div>Token name</div> : null}<div>Pixels</div>
        </div>
        {rows.map((r) => (
          <div className="sh-scale-row" key={r[0]}>
            {tokens ? <MdsCell tok={tokens[r[0]]} /> : null}
            <div className="sh-scale-px">{themed ? pxLabel(TH().spacing(r[3])) : r[2]}</div>
          </div>
        ))}
      </div>
    );
  }

  const SPACE_TOKENS = { "spacing-none": "spacing.none", "spacing-xxs": "spacing.xxs", "spacing-xs": "spacing.xs",
    "spacing-sm": "spacing.sm", "spacing-md": "spacing.md", "spacing-lg": "spacing.lg", "spacing-xl": "spacing.xl",
    "spacing-2xl": "spacing.2xl", "spacing-3xl": "spacing.3xl", "spacing-4xl": "spacing.4xl", "spacing-5xl": "spacing.5xl",
    "spacing-6xl": "spacing.6xl", "spacing-7xl": "spacing.7xl", "spacing-8xl": "spacing.8xl", "spacing-9xl": "spacing.9xl",
    "spacing-10xl": "spacing.10xl", "spacing-11xl": "spacing.11xl" };
  const WIDTH_TOKENS = { "width-xxs": "width.xxs", "width-xs": "width.xs", "width-sm": "width.sm", "width-md": "width.md",
    "width-lg": "width.lg", "width-xl": "width.xl", "width-2xl": "width.2xl", "width-3xl": "width.3xl",
    "width-4xl": "width.4xl", "width-5xl": "width.5xl", "width-6xl": "width.6xl" };
  const CONTAINER_TOKENS = { "container-padding-mobile": "container.padding.mobile",
    "container-padding-desktop": "container.padding.desktop", "container-max-width-desktop": "container.maxWidth.desktop" };
  const PARAGRAPH_TOKENS = { "paragraph-max-width": "paragraph.maxWidth" };
  const RADIUS_TOKENS = { "radius-none": "radius.none", "radius-xxs": "radius.xxs", "radius-xs": "radius.xs",
    "radius-sm": "radius.sm", "radius-md": "radius.md", "radius-lg": "radius.lg", "radius-xl": "radius.xl",
    "radius-2xl": "radius.2xl", "radius-3xl": "radius.3xl", "radius-4xl": "radius.4xl", "radius-full": "radius.full" };
  const SHADOW_TOKENS = { "shadow-xs": "shadow.xs", "shadow-sm": "shadow.sm", "shadow-md": "shadow.md",
    "shadow-lg": "shadow.lg", "shadow-xl": "shadow.xl", "shadow-2xl": "shadow.2xl", "shadow-3xl": "shadow.3xl" };

  function RadiusScale() {
    useThemeVersion();
    return (
      <div>
        <div className="sh-scale-table mds has-vis">
          <div className="sh-scale-head">
            <div>Token name</div><div>Pixels</div><div>Radius</div>
          </div>
          {RADII.map((r) => (
            <div className="sh-scale-row" key={r[0]}>
              <MdsCell tok={RADIUS_TOKENS[r[0]]} />
              <div className="sh-scale-px">{r[3] >= 9999 ? r[2] : pxLabel(TH().radius(r[3]))}</div>
              <div className="sh-scale-vis">
                <div className="sh-radius-corner" style={{ borderTopRightRadius: (r[3] >= 9999 ? r[3] : TH().radius(r[3])) + "px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* Resolve var(--x) references to the literal value the browser applies. */
  function resolveVars(css) {
    const S = window.SHThemes;
    let out = css, guard = 0;
    const get = (name) => (S ? S.liveVar(name) : getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    while (out.indexOf("var(") !== -1 && guard++ < 6) {
      out = out.replace(/var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)/g, (m, name) => (get(name) || "").trim() || m);
    }
    return out;
  }

  function ShadowScale() {
    useThemeVersion();
    return (
      <div className="sh-scale-table mds shadow">
        <div className="sh-scale-head">
          <div>Token name</div><div>CSS value</div><div>Preview</div>
        </div>
        {SHADOWS.map((s) => (
          <div className="sh-scale-row" key={s[0]}>
            <MdsCell tok={SHADOW_TOKENS[s[0]]} />
            <div className="sh-mds-var sh-shadow-value">{resolveVars(s[1])}</div>
            <div className="sh-scale-vis">
              <div className="sh-shadow-chip" style={{ boxShadow: s[1] }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  SH.registerPage("spacing", {
    h1: "Spacing",
    wide: true,
    lead: "Working from a pre-defined and limited spacing system allows you to work faster and consistently. These pre-defined spacing values are derived from the primitive spacing values and are useful for gaps, padding, and margin used across all of your components and designs.",
    sections: [
      { id: "spacing",
        render: () => <ScaleTable rows={SPACINGS} wideName tokens={SPACE_TOKENS} themed /> },
      { id: "widths", title: "Widths",
        prose: ["Working from a pre-defined and limited spacing system for wrapping content allows you to work faster and consistently. These pre-defined widths are derived from the primitive spacing values and are useful for defining max widths for sections such as text content and page headings."],
        render: () => <ScaleTable rows={WIDTHS} wideName tokens={WIDTH_TOKENS} /> },
      { id: "containers", title: "Containers",
        prose: ["Working from a pre-defined and limited container spacing system allows you to work faster and consistently."],
        render: () => <ScaleTable rows={CONTAINERS} wideName tokens={CONTAINER_TOKENS} /> },
      { id: "paragraph", title: "Paragraph max-widths",
        prose: ["Paragraph text such as blog post content have a max-width defined. This ensures all paragraph line lengths are optimized for readability."],
        render: () => <ScaleTable rows={PARAGRAPH} wideName tokens={PARAGRAPH_TOKENS} /> },
    ],
  });

  SH.registerPage("radius", {
    h1: "Radius",
    wide: true,
    lead: "Working from a pre-defined and limited radius system for adding border radiuses (or radii) to elements allows you to work faster and consistently. Sample Health uses a pre-defined and limited radius system derived from the primitive spacing values. Every step has a token name that mirrors its CSS variable name (radius.none through radius.4xl, plus radius.full); the ones flagged with a warning icon are Sample Health’s and are not yet in the workbook.",
    sections: [
      { id: "scale", title: "Scale", render: () => <RadiusScale /> },
    ],
  });

  SH.registerPage("shadows", {
    h1: "Shadows",
    wide: true,
    lead: "Shadows add depth and hierarchy to elements such as cards, dropdowns and modals. Sample Health uses a pre-defined and limited elevation scale, from a subtle xs lift to a pronounced 3xl float. Every step has a token name that mirrors its CSS variable name (shadow.xs through shadow.3xl); the ones flagged with a warning icon are Sample Health\u2019s and are not yet in the workbook.",
    sections: [
      { id: "elevation", title: "Elevation", render: () => <ShadowScale /> },
    ],
  });
})();
