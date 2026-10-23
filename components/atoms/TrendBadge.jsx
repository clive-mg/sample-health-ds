import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Trend badge (internal). Positive/negative trend pill with arrow. */
export function TrendBadge({ value = "10%", trend = "up", style = {}, ...rest }) {
  const up = trend === "up";
  const c = up ? "success" : "error";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 9999, background: `var(--component-colors-utility-${c}-utility-${c}-50)`, border: `1px solid var(--component-colors-utility-${c}-utility-${c}-200)`, color: `var(--component-colors-utility-${c}-utility-${c}-700)`, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, ...style }} {...rest}>
      <Icon name={up ? "ArrowUp" : "ArrowDown"} size={12} />{value}
    </span>
  );
}
export default TrendBadge;
