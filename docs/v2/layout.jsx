/* Sample Health docs — Foundations › Layout: breakpoints and the page container. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const { Table } = SH.ui;

  const BPS = [
    { name: "Small", tok: "breakpoint.sm", view: "≥992px", max: "100%", ctok: "—" },
    { name: "Medium", tok: "breakpoint.md", view: "≥1200px", max: "1140px", ctok: "container.maxWidth.md" },
    { name: "Large", tok: "breakpoint.lg", view: "≥1400px", max: "1320px", ctok: "container.maxWidth.lg" },
  ];
  const tok = (v) => v === "—" ? v : <span className="sh-mds">{v}</span>;
  const BP_COLS = [
    { key: "name", header: "Breakpoint" },
    { key: "tok", header: "Token", render: (r) => tok(r.tok) },
    { key: "view", header: "Viewport" },
    { key: "max", header: "Container max-width" },
    { key: "ctok", header: "Container token", render: (r) => tok(r.ctok) },
  ];
  SH.registerPage("layout", {
    h1: "Layout",
    wide: true,
    lead: "Every page template centres its content in one responsive container. The container fills the viewport below 1200px, with 16px of padding on each side, then steps to a fixed max-width at each breakpoint. Header, main content and footer share the same container, so their edges line up; the header and footer backgrounds stay full-bleed.",
    sections: [
      { id: "breakpoints", title: "Breakpoints",
        render: () => <Table columns={BP_COLS} data={BPS} /> },
    ],
  });
})();
