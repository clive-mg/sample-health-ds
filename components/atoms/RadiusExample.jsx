import React from "react";

/** Untitled UI PRO — Radius example (internal). Swatch demonstrating a corner-radius token. */
export function RadiusExample({ radius = "8px", label, style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ width: 56, height: 56, background: "var(--colors-brand-100)", border: "1.5px solid var(--colors-brand-500)", borderRadius: radius }} />
      {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{label}</span>}
    </div>
  );
}
export default RadiusExample;
