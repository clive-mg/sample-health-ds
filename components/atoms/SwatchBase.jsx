import React from "react";

/** Untitled UI PRO — Swatch base (internal). Color swatch tile with hex label. */
export function SwatchBase({ color = "var(--colors-brand-600)", label, dark = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ width: 64, height: 64, borderRadius: 8, background: color, border: "1px solid rgba(0,0,0,0.06)" }} />
      {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: dark ? "var(--colors-text-text-white)" : "var(--colors-text-text-tertiary-600)" }}>{label}</span>}
    </div>
  );
}
export default SwatchBase;
