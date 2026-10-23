import React from "react";

/** Untitled UI PRO — Email template header (internal). Branded header band for emails. */
export function EmailTemplateHeader({ brand = "Untitled UI", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "24px 32px", borderBottom: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--colors-background-bg-brand-solid)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{brand[0]}</div>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{brand}</span>
    </div>
  );
}
export default EmailTemplateHeader;
