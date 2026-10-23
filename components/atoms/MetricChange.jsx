import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Metric change (internal). Trend pill (badge style) with arrow + delta. */
export function MetricChange({ value = "10%", trend = "up", style = {}, ...rest }) {
  const up = trend === "up";
  const c = up ? "success" : "error";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2, padding: "2px 8px", borderRadius: 9999, background: `var(--component-colors-utility-${c}-utility-${c}-50)`, color: `var(--component-colors-utility-${c}-utility-${c}-700)`, fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, ...style }} {...rest}>
      <Icon name={up ? "TrendUp01" : "TrendDown01"} size={12} />{value}
    </span>
  );
}
export default MetricChange;
