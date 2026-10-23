/* Sample Health docs v2 — Developer reference.
   Renders the MDS theme token map (docs/v2/tokens.js) as five pages. */
(function () {
  const SH = window.SH;
  const React = window.React;
  const T = window.SH_TOKENS;

  /* ---- Small shared bits ---- */
  const Tok = ({ v }) => <span className="sh-mds">{v}</span>;
  const Blank = ({ label }) => <span className="sh-badge none">{label || "not defined"}</span>;
  const Note = ({ text }) => (text ? <div className="sh-tok-note">{text}</div> : <div />);

  const useThemeVersion = () => (window.SH_useThemeVersion ? window.SH_useThemeVersion() : 0);
  function Swatch({ hex, cssVar }) {
    useThemeVersion();
    if (!hex) return <Blank />;
    const shown = (window.SH_themed && window.SH_themed.color(cssVar)) || hex;
    return (
      <div className="sh-tok-color">
        <span className="sh-tok-dot" style={{ background: shown }} />
        <span className="sh-tok-hex">{shown}</span>
      </div>
    );
  }

  function Bar({ q, setQ, placeholder, children }) {
    return (
      <div className="sh-tok-bar">
        <input type="text" value={q} placeholder={placeholder} onChange={(e) => setQ(e.target.value)} aria-label={placeholder} />
        {children}
      </div>
    );
  }

  function groupBy(rows, key) {
    const out = [];
    rows.forEach(function (r) {
      const g = out.filter(function (x) { return x.key === r[key]; })[0];
      if (g) g.rows.push(r); else out.push({ key: r[key], rows: [r] });
    });
    return out;
  }

  /* ================= Overview ================= */
  function Stats() {
    const mapped = T.color.filter(function (r) { return r.light; }).length;
    const lay = T.layout.filter(function (r) { return r.value; }).length;
    const faces = T.typeBase.filter(function (r) { return r.value; }).length;
    const all = T.buildStyles();
    const styles = all.filter(function (r) { return r.px; }).length;
    const cards = [
      [mapped + " / " + T.color.length, "Colour tokens mapped", "Accent (12), neutral.150, surface.accent and text.brand.accent / link.visited have no Sample Health equivalent."],
      [lay + " / " + T.layout.length, "Layout tokens mapped", "Border widths, z-index and motion are not defined in Sample Health."],
      [faces + " / " + T.typeBase.length, "Font faces mapped", "Serif is not shipped; Roboto Mono starts at 400."],
      [styles + " / " + all.length, "Type styles resolved", "2xs and every serif style resolve to nothing."]
    ];
    return (
      <div className="sh-tok-stats">
        {cards.map(function (c) {
          return <div className="sh-tok-stat" key={c[1]}><b>{c[0]}</b><span>{c[1]}</span><em>{c[2]}</em></div>;
        })}
      </div>
    );
  }

  const DECISIONS = [
    ["Accent", "Left blank", "Sample Health has no accent ramp. Twelve accent steps, surface.accent and text.brand.accent stay empty until one is chosen."],
    ["Info", "Gray-blue ramp", "The brand ramp is already blue, so plain blue would make Info indistinguishable from Primary."],
    ["Neutral", "gray-light-mode / gray-dark-mode", "neutral.0 is white. neutral.150 has no step in our ramp and is left blank."],
    ["Dark theme", "Repeated for raw ramps", "Primary, Info, Success, Error and Warning do not change between themes. Neutral, Surface, Border and Text carry real dark values."],
    ["Border width, z-index, motion", "Left blank", "Not defined anywhere in Sample Health. Add them to tokens/ first if developers need them."],
    ["Spacing naming", "space.* \u2192 spacing.*", "The token now mirrors the CSS variable one for one (<code>--spacing-4xl-px</code> \u2192 <code>spacing.4xl</code>), and the full ladder is named: none, xxs, xs\u201411xl, plus width.*, container.* and paragraph.maxWidth. Steps beyond the template's xs\u20143xl are flagged as Sample Health additions."],
    ["Serif", "Left blank", "Sample Health is Inter-only per CLAUDE.md, so serif faces and the serif and docs styles resolve to nothing."],
    ["font.size.2xs", "Left blank", "12px is the floor in CLAUDE.md, so there is no step below xs."],
    ["Font faces", "One Google Fonts CSS2 URL", "All weights and italics ship in a single import; the weight is named per token."],
    ["Weights", "Coerced to the CLAUDE.md rule", "Sizes bind their weights: 18px and up are 600, 16 and 14 are 400 or 600, 12 is 500 or 700. Rows that moved are flagged."],
    ["Heading scale", "Settled", "Display 1/2/3 = 72/60/48 and H1\u2013H6 = 36/30/24/20/18/16, per the typography sheet. The earlier \u201cpick one\u201d choice is gone."],
    ["font.size.7xl", "Added", "The template ladder stops at 6xl. Display 1 is 72px, so Sample Health adds a step above it."],
    ["font.size.xl", "Re-pointed to 20px", "H4 introduces a 20px step, so xl moves from 24px to 20px and 2xl\u20136xl each shift one rung up the ladder."]
  ];

  SH.registerPage("tokens-overview", {
    h1: "Token map overview",
    wide: true,
    lead: "The MDS theme template names 281 tokens that developers reference instead of literal values. This section maps every one of them onto the values that already exist in Sample Health, and says plainly where no equivalent exists.",
    sections: [
      { id: "coverage", title: "Coverage", render: () => <Stats /> },
      { id: "reading", title: "How to read these tables",
        prose: ["Every table lists the <b>token name</b> the developer writes, the <b>literal value</b> it resolves to today, and the <b>Sample Health CSS variable</b> that value comes from. Prefer wiring the token to the CSS variable rather than copying the hex \u2014 that way a future brand change flows through automatically.",
          "A token shown as <i>not defined</i> has no Sample Health equivalent. Leave those cells blank in the workbook rather than inventing a value."],
        render: () => null },
      { id: "decisions", title: "Mapping decisions",
        render: () => (
          <div className="sh-tok layout">
            <div className="sh-tok-head"><div>Area</div><div>Decision</div><div>Why</div><div /></div>
            {DECISIONS.map(function (d) {
              return (
                <div className="sh-tok-row" key={d[0]}>
                  <div className="sh-tok-val">{d[0]}</div>
                  <div className="sh-tok-name">{d[1]}</div>
                  <div className="sh-tok-note">{d[2]}</div>
                  <div />
                </div>
              );
            })}
          </div>
        ) },
      { id: "font-source", title: "Font source",
        prose: ["Every font.face token resolves to this single import, already present in <code>tokens/fonts.css</code>. The weight and style named on each token select the face within it."],
        render: () => <div className="sh-url">{T.fontUrl}</div> }
    ]
  });

  /* ================= Colour ================= */
  function ColorTable() {
    const [q, setQ] = React.useState("");
    const query = q.trim().toLowerCase();
    const rows = query ? T.color.filter(function (r) { return (r.token + " " + r.name).toLowerCase().indexOf(query) !== -1; }) : T.color;
    return (
      <div>
        <Bar q={q} setQ={setQ} placeholder="Filter colour tokens…" />
        {groupBy(rows, "cat").map(function (g) {
          return (
            <div className="sh-tok-group" key={g.key}>
              <h3 className="sh-tok-group-label">{g.key} <small>{g.rows.length} tokens</small></h3>
              <div className="sh-tok color">
                <div className="sh-tok-head">
                  <div>Token name</div><div>Value</div>
                </div>
                {g.rows.map(function (r) {
                  return (
                    <div className="sh-tok-row" key={r.token}>
                      <div><Tok v={r.token} /><div className="sh-tok-note" style={{ marginTop: 4 }}>{r.name}</div></div>
                      <div><Swatch hex={r.light} cssVar={r.varLight} /><Note text={r.note} /></div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  SH.registerPage("tokens-color", {
    h1: "Colors",
    wide: true,
    lead: "Our design system leverages a purposeful set of color styles as the perfect starting point for any brand or project. When it comes to color, contrast is critical for ensuring text is legible",
    sections: [{ id: "colors", title: "All colour tokens", render: () => <ColorTable /> }]
  });

  /* ================= Layout ================= */
  function LayoutTable() {
    const [q, setQ] = React.useState("");
    const query = q.trim().toLowerCase();
    const rows = query ? T.layout.filter(function (r) { return (r.token + " " + r.name).toLowerCase().indexOf(query) !== -1; }) : T.layout;
    return (
      <div>
        <Bar q={q} setQ={setQ} placeholder="Filter layout tokens…" />
        {groupBy(rows, "cat").map(function (g) {
          return (
            <div className="sh-tok-group" key={g.key}>
              <h3 className="sh-tok-group-label">{g.key} <small>{g.rows.length} tokens</small></h3>
              <div className="sh-tok layout">
                <div className="sh-tok-head"><div>Token name</div><div>Display name</div><div>Value</div><div>Sample Health variable</div></div>
                {g.rows.map(function (r) {
                  return (
                    <div className="sh-tok-row" key={r.token}>
                      <div><Tok v={r.token} /></div>
                      <div className="sh-tok-name">{r.name}</div>
                      <div className="sh-tok-val" style={{ fontFamily: r.cat === "Shadow" ? "var(--font-mono)" : "inherit", fontSize: r.cat === "Shadow" ? 12 : 14, fontWeight: r.cat === "Shadow" ? 500 : 400 }}>
                        {r.value || <Blank />}
                      </div>
                      <div>
                        {r.cssVar ? <div className="sh-mds-var">{r.cssVar}</div> : null}
                        <Note text={r.note} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  SH.registerPage("tokens-layout", {
    h1: "Layout tokens",
    wide: true,
    lead: "Spacing, widths, containers, radius and shadow map directly onto the Sample Health scale \u2014 each token mirrors its CSS variable name. Steps noted as Sample Health additions exist in the CSS but are not named in the MDS workbook yet. Border widths, z-index and motion are not defined anywhere in this system and are deliberately left blank.",
    sections: [{ id: "layout", title: "All layout tokens", render: () => <LayoutTable /> }]
  });

  /* ================= Typography — base ================= */
  function FaceTable() {
    const [q, setQ] = React.useState("");
    const query = q.trim().toLowerCase();
    const rows = query ? T.typeBase.filter(function (r) { return (r.token + " " + r.name).toLowerCase().indexOf(query) !== -1; }) : T.typeBase;
    return (
      <div>
        <Bar q={q} setQ={setQ} placeholder="Filter font faces…" />
        {groupBy(rows, "sub").map(function (g) {
          return (
            <div className="sh-tok-group" key={g.key}>
              <h3 className="sh-tok-group-label">{g.key} <small>{g.rows.length} tokens</small></h3>
              <div className="sh-tok face">
                <div className="sh-tok-head"><div>Token name</div><div>Resolves to</div><div>Specimen</div></div>
                {g.rows.map(function (r) {
                  return (
                    <div className="sh-tok-row" key={r.token}>
                      <div><Tok v={r.token} /></div>
                      <div>
                        {r.value ? <div className="sh-tok-val">{r.value}</div> : <Blank />}
                        <Note text={r.note} />
                      </div>
                      <div className="sh-tok-sample" style={r.family ? { fontFamily: r.family === "Inter" ? "var(--font-body)" : "var(--font-mono)", fontWeight: r.weight, fontStyle: r.style, fontSize: 18 } : null}>
                        {r.family ? "Sample Health 0123" : <span className="sh-tok-note">no specimen</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function SimpleTable({ rows, valueHead }) {
    return (
      <div className="sh-tok layout">
        <div className="sh-tok-head"><div>Token name</div><div>Display name</div><div>{valueHead}</div><div>Notes</div></div>
        {rows.map(function (r) {
          return (
            <div className="sh-tok-row" key={r.token}>
              <div><Tok v={r.token} /></div>
              <div className="sh-tok-name">{r.name}</div>
              <div className="sh-tok-val">{r.value || <Blank />}</div>
              <div>{r.cssVar ? <div className="sh-mds-var">{r.cssVar}</div> : null}<Note text={r.note} /></div>
            </div>
          );
        })}
      </div>
    );
  }

  SH.registerPage("tokens-typography", {
    h1: "Typography \u2014 base",
    wide: true,
    lead: "Font faces, sizes, line heights and letter spacing. Sizes follow the CLAUDE.md scale exactly: eleven steps from 12px to 72px \u2014 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72 \u2014 and no 2xs.",
    sections: [
      { id: "faces", title: "Font faces", render: () => <FaceTable /> },
      { id: "sizes", title: "Font sizes",
        prose: ["The template ladder runs 2xs \u2192 6xl. <code>font.size.2xs</code> would need a value below the 12px floor, so it stays blank; <code>font.size.7xl</code> is added above 6xl because Display 1 is 72px. Every other step lands on a real Sample Health size."],
        render: () => <SimpleTable rows={T.sizes} valueHead="Value" /> },
      { id: "line-heights", title: "Line heights",
        prose: ["Unitless multipliers, derived from the size / line-height pairs already in <code>tokens/scale.css</code>."],
        render: () => <SimpleTable rows={T.lineHeights} valueHead="Multiplier" /> },
      { id: "letter-spacing", title: "Letter spacing",
        prose: ["Taken from the tracking Sample Health already applies to headings and uppercase labels."],
        render: () => <SimpleTable rows={T.letterSpacings} valueHead="Value" /> }
    ]
  });

  /* ================= Typography — styles ================= */
  function StyleTable() {
    const [q, setQ] = React.useState("");
    const all = T.buildStyles();
    const query = q.trim().toLowerCase();
    const rows = query ? all.filter(function (r) { return (r.token + " " + r.name).toLowerCase().indexOf(query) !== -1; }) : all;
    return (
      <div>
        <Bar q={q} setQ={setQ} placeholder="Filter styles…" />
        {groupBy(rows, "tab").map(function (g) {
          return (
            <div className="sh-tok-group" key={g.key}>
              <h3 className="sh-tok-group-label">{g.key} <small>{g.rows.length} styles</small></h3>
              <div className="sh-tok style">
                <div className="sh-tok-head"><div>Token name</div><div>Specimen</div><div>Resolves to</div></div>
                {g.rows.map(function (r) {
                  const shown = r.px ? Math.min(r.px, 36) : null;
                  return (
                    <div className="sh-tok-row" key={r.token}>
                      <div>
                        <Tok v={r.token} />
                        <div className="sh-tok-note" style={{ marginTop: 4 }}>{r.sub}</div>
                      </div>
                      <div className="sh-tok-sample" style={r.px ? {
                        fontFamily: r.family === "Roboto Mono" ? "var(--font-mono)" : "var(--font-body)",
                        fontSize: shown, fontWeight: r.weight, letterSpacing: r.letterSpacing, lineHeight: 1.25
                      } : null}>
                        {r.px ? r.name : <Blank label="no equivalent" />}
                      </div>
                      <div>
                        {r.px ? (
                          <div className="sh-tok-spec">
                            {r.family} · {r.weight} · {r.px}px / {r.lineHeight} · {r.letterSpacing}
                            {shown !== r.px ? <span> · specimen shown at {shown}px</span> : null}
                          </div>
                        ) : null}
                        {r.notes.map(function (n, i) {
                          return <div className="sh-tok-note" key={i} style={{ marginTop: 4 }}>{n}</div>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  SH.registerPage("tokens-styles", {
    h1: "Typography \u2014 styles",
    wide: true,
    lead: "Every composite style, resolved to a real family, weight, size, line height and tracking. Weights that the template declares outside the CLAUDE.md size rule are coerced and flagged in the last column.",
    sections: [{ id: "styles", title: "All type styles", render: () => <StyleTable /> }]
  });
})();
