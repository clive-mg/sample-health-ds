import React from "react";

/** Untitled UI PRO — Dot. Small status indicator; optional outline ring. */
const D = { sm: 6, md: 8, lg: 10 };
export function Dot({ size = "md", color = "success", outline = false, style = {}, ...rest }) {
  const d = D[size] || 8;
  const c = color === "gray" ? "var(--colors-fg-quaternary-400, var(--colors-foreground-fg-quaternary-400))" : `var(--colors-${color}-500)`;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }} {...rest}>
      <span style={{ width: d, height: d, borderRadius: "50%", background: c, boxShadow: outline ? `0 0 0 ${Math.round(d/2)}px color-mix(in srgb, ${c} 24%, transparent)` : "none" }} />
    </span>
  );
}
export default Dot;
