import React from "react";

/** Untitled UI PRO — Radius card (internal). Specimen card demonstrating a radius token in use. */
export function RadiusCard({ radius = "12px", label = "radius-xl", style = {}, ...rest }) {
  return (
    <div style={{ padding: 16, background: "var(--colors-background-bg-secondary)", borderRadius: radius, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)", ...style }} {...rest}>{label}</div>
  );
}
export default RadiusCard;
