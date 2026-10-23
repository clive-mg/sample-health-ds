import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Slider label (internal). Value bubble shown above a slider handle. */
export function SliderLabel({ value = "50%", style = {}, ...rest }) {
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "2px 8px", borderRadius: 6, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>{value}</span>;
}
export default SliderLabel;
