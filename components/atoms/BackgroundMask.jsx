import React from "react";

/** Untitled UI PRO — Background mask (internal). Directional fade overlay to soften edges. */
export function BackgroundMask({ direction = "bottom", color = "var(--colors-background-bg-primary)", style = {}, ...rest }) {
  const map = { top: "to top", bottom: "to bottom", left: "to left", right: "to right", radial: "circle at center" };
  const g = direction === "radial" ? `radial-gradient(${map.radial}, transparent, ${color})` : `linear-gradient(${map[direction] || "to bottom"}, transparent, ${color})`;
  return <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: g, pointerEvents: "none", ...style }} {...rest} />;
}
export default BackgroundMask;
