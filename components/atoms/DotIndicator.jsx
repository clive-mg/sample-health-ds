import React from "react";

/** Untitled UI PRO — Dot (internal, sizes/outline). Small status dot primitive. */
export function DotIndicator({ size = "md", color = "success", outline = false, style = {}, ...rest }) {
  const d = size === "sm" ? 6 : size === "lg" ? 10 : 8;
  const c = `var(--colors-${color}-500)`;
  return <span style={{ display: "inline-block", width: d, height: d, borderRadius: "50%", background: c, boxShadow: outline ? `0 0 0 ${Math.round(d / 2)}px color-mix(in srgb, ${c} 24%, transparent)` : "none", ...style }} {...rest} />;
}
export default DotIndicator;
