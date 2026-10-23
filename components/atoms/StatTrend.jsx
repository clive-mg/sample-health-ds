import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Stat trend (internal). KPI value with inline up/down trend and period. */
export function StatTrend({ value, delta, trend = "up", period = "vs last month", style = {}, ...rest }) {
  const up = trend === "up";
  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, fontSize: 14 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 2, color: up ? "var(--colors-text-text-success-primary-600)" : "var(--colors-text-text-error-primary-600)" }}><Icon name={up ? "ArrowUp" : "ArrowDown"} size={16} />{delta}</span>
        <span style={{ color: "var(--colors-text-text-tertiary-600)" }}>{period}</span>
      </div>
    </div>
  );
}
export default StatTrend;
