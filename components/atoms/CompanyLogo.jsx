import React from "react";

/** Untitled UI PRO — Company logo (internal). Wordmark placeholder rendered in type (no source logo). */
export function CompanyLogo({ name = "Untitled UI", style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, ...style }} {...rest}>
      <span style={{ width: 32, height: 32, borderRadius: 8, background: "var(--colors-background-bg-brand-solid)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18 }}>{name[0]}</span>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</span>
    </span>
  );
}
export default CompanyLogo;
