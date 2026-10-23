import React from "react";
import { SampleHealthLogo } from "../brand/SampleHealthLogo.jsx";

/** Untitled UI PRO — Marketing footer. Wordmark, link columns, legal row. */
export function Footer({ brand = "Untitled UI", logo, columns = [], style = {}, ...rest }) {
  /* Sample Health gets its real lockup in the theme primary; other brands keep the initial square. */
  const showLogo = logo ?? brand === "Sample Health";
  return (
    <footer style={{ padding: "48px 32px 32px", background: "var(--colors-background-bg-primary)", borderTop: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}>
        {showLogo ? <SampleHealthLogo height={64} data-sh-part="logo" /> : <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--colors-background-bg-brand-solid)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 18 }}>{brand[0]}</div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{brand}</span>
        </div>}
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          {columns.map((col, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-quaternary-500)" }}>{col.title}</div>
              {(col.links || []).map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-tertiary-600)", textDecoration: "none" }}>{l}</a>)}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--colors-border-border-secondary)", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>© 2026 {brand}. All rights reserved.</div>
    </footer>
  );
}
export default Footer;
