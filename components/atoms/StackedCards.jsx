import React from "react";

/** Untitled UI PRO — Stacked cards (internal). Layered card stack decorative effect. */
export function StackedCards({ children, style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", ...style }} {...rest}>
      <div style={{ position: "absolute", inset: "12px -8px -12px -8px", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-secondary)", opacity: 0.5 }} />
      <div style={{ position: "absolute", inset: "6px -4px -6px -4px", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-secondary)" }} />
      <div style={{ position: "relative", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", boxShadow: "0px 4px 8px -2px var(--colors-effects-shadows-shadow-md-01)" }}>{children}</div>
    </div>
  );
}
export default StackedCards;
