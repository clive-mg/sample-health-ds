import React from "react";

/** Untitled UI PRO — Divider. Horizontal rule; optional centered label. */
export function Divider({ label, style = {}, ...rest }) {
  if (label) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, ...style }} {...rest}>
        <span style={{ flex: 1, height: 1, background: "var(--colors-border-border-secondary)" }} />
        <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-quaternary-500)" }}>{label}</span>
        <span style={{ flex: 1, height: 1, background: "var(--colors-border-border-secondary)" }} />
      </div>
    );
  }
  return <div style={{ height: 1, background: "var(--colors-border-border-secondary)", width: "100%", ...style }} {...rest} />;
}
export default Divider;
