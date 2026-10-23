import React from "react";

/** Untitled UI PRO — Shadow card (internal). Swatch demonstrating an elevation token. */
export function ShadowCard({ shadow = "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", label, style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ width: 72, height: 72, borderRadius: 12, background: "var(--colors-background-bg-primary)", boxShadow: shadow }} />
      {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{label}</span>}
    </div>
  );
}
export default ShadowCard;
