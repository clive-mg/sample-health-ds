import React from "react";

/** Untitled UI PRO — Widths example (internal). Bar demonstrating a width token. */
export function WidthExample({ width = "320px", label, style = {}, ...rest }) {
  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ width, maxWidth: "100%", height: 12, borderRadius: 4, background: "var(--colors-brand-500)" }} />
      {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{label}</span>}
    </div>
  );
}
export default WidthExample;
