import React from "react";

/** Untitled UI PRO — Section header (with actions) (internal). Title + description + trailing buttons. */
export function SectionHeaderActions({ title, description, actions, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", paddingBottom: 20, borderBottom: "1px solid var(--colors-border-border-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div><h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{title}</h2>{description && <p style={{ margin: "8px 0 0", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}</div>
      {actions && <div style={{ display: "flex", gap: 12 }}>{actions}</div>}
    </div>
  );
}
export default SectionHeaderActions;
