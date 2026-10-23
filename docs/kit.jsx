/* Sample Health docs — shared kit: component registry, preview primitives,
   FAQ accordion and an error boundary. Exposed on window.SH for page modules
   and the shell (Babel scripts don't share scope). */
(function () {
  const React = window.React;
  const UI = window.UntitledUIPRODesignSystem_380e88 || {}; /* auto-generated DS bundle namespace (not shown to users) */
  const h = React.createElement;

  const SH = window.SH || {};
  SH.React = React;
  SH.ui = UI;                 // all design-system components
  SH.Icon = UI.Icon;          // convenience
  SH.pages = SH.pages || {};
  SH.registerPage = function (slug, def) { SH.pages[slug] = def; };

  /* ---- Preview surface ---- */
  function Preview(props) {
    const cls = ["sh-preview", props.className || ""].join(" ").trim();
    const bodyStyle = {};
    if (props.minHeight) bodyStyle.minHeight = props.minHeight;
    return h("div", { className: cls },
      h("div", { className: "sh-preview-body", style: bodyStyle }, props.children));
  }
  SH.Preview = Preview;

  /* ---- Layout atoms (thin className wrappers) ---- */
  SH.Row = (p) => h("div", { className: "sh-row" + (p.className ? " " + p.className : ""), style: p.style }, p.children);
  SH.Col = (p) => h("div", { className: "sh-col" + (p.className ? " " + p.className : ""), style: p.style }, p.children);
  SH.VLabel = (p) => h("div", { className: "sh-vlabel" }, p.children);

  /* ---- FAQ accordion ---- */
  function FAQList(props) {
    const [open, setOpen] = React.useState(-1);
    return h("div", { className: "sh-faqs" },
      h("h2", { className: "sh-h2", id: "faqs", style: { marginBottom: 8 } }, "Frequently asked questions"),
      props.items.map((it, i) =>
        h("div", { key: i, className: "sh-faq" + (open === i ? " open" : "") },
          h("button", { className: "sh-faq-q", onClick: () => setOpen(open === i ? -1 : i) },
            h("span", null, it.q),
            h(Chevron, { dir: "down", size: 20 })),
          h("div", { className: "sh-faq-a" },
            h("div", { className: "sh-faq-a-inner", dangerouslySetInnerHTML: { __html: it.a } })))));
  }
  SH.FAQList = FAQList;

  /* ---- Small inline chrome icons (independent of the DS bundle) ---- */
  function Chevron(props) {
    const s = props.size || 16, r = { down: 0, up: 180, right: -90, left: 90 }[props.dir || "down"];
    return h("svg", { width: s, height: s, viewBox: "0 0 24 24", fill: "none", style: { transform: `rotate(${r}deg)` } },
      h("path", { d: "M6 9l6 6 6-6", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }));
  }
  SH.Chevron = Chevron;

  /* ---- Error boundary so one broken demo can't blank the page ---- */
  class Boundary extends React.Component {
    constructor(p) { super(p); this.state = { err: null }; }
    static getDerivedStateFromError(err) { return { err }; }
    componentDidCatch(err) { console.warn("[demo error]", this.props.label, err); }
    render() {
      if (this.state.err) {
        return h("div", { style: { padding: "16px 20px", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-quaternary-500)" } },
          "This example could not render.");
      }
      return this.props.children;
    }
  }
  SH.Boundary = Boundary;

  window.SH = SH;
})();
