import React from "react";

/** Untitled UI PRO — Section footer. Simple centered footer band with links and legal row. */
export function SectionFooter({ links = ["Overview", "Features", "Pricing", "Careers", "Help", "Privacy"], brand = "Untitled UI", style = {}, ...rest }) {
  return (
    <footer style={{ padding: "48px 32px", textAlign: "center", borderTop: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <nav style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
        {links.map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-tertiary-600)", textDecoration: "none" }}>{l}</a>)}
      </nav>
      <div style={{ marginTop: 32, fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>© 2026 {brand}. All rights reserved.</div>
    </footer>
  );
}
export default SectionFooter;
