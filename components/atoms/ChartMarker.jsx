import React from "react";

/** Untitled UI PRO — Chart marker (internal). Data point marker/tooltip anchor on charts. */
export function ChartMarker({ type = "dot", color = "var(--colors-brand-600)", size = 12, style = {}, ...rest }) {
  if (type === "line") return <span style={{ display: "inline-block", width: 2, height: 40, background: color, ...style }} {...rest} />;
  return <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: "var(--colors-background-bg-primary)", border: `3px solid ${color}`, boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)", ...style }} {...rest} />;
}
export default ChartMarker;
