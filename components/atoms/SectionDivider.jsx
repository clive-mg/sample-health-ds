import React from "react";

/** Untitled UI PRO — Section divider (internal). Labeled full-width divider between page sections. */
export function SectionDivider({ label, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, ...style }} {...rest}>
      <span style={{ flex: 1, height: 1, background: "var(--colors-border-border-secondary)" }} />
      {label && <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-quaternary-500)" }}>{label}</span>}
      <span style={{ flex: 1, height: 1, background: "var(--colors-border-border-secondary)" }} />
    </div>
  );
}
export default SectionDivider;
