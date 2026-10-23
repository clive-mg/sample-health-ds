import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Change indicator (internal). Trend delta with arrow, positive/negative. */
export function Change({ value = "10%", trend = "up", style = {}, ...rest }) {
  const up = trend === "up";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: up ? "var(--colors-text-text-success-primary-600)" : "var(--colors-text-text-error-primary-600)", ...style }} {...rest}>
      <Icon name={up ? "TrendUp01" : "TrendDown01"} size={16} />{value}
    </span>
  );
}
export default Change;
