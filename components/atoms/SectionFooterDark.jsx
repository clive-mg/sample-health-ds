import React from "react";

/** Untitled UI PRO — Section footer (dark) (internal). Dark-theme footer band with links. */
export function SectionFooterDark({ links = ["Overview", "Features", "Pricing", "Careers", "Help"], brand = "Untitled UI", style = {}, ...rest }) {
  return (
    <footer style={{ padding: "48px 32px", textAlign: "center", background: "var(--colors-background-bg-brand-section)", color: "#fff", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <nav style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>{links.map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-brand-200)", textDecoration: "none" }}>{l}</a>)}</nav>
      <div style={{ marginTop: 32, fontSize: 16, color: "var(--colors-brand-200)" }}>© 2026 {brand}. All rights reserved.</div>
    </footer>
  );
}
export default SectionFooterDark;
