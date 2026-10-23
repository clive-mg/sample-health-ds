import React from "react";
import { Change } from "./Change.jsx";

/** Untitled UI PRO — Metric item (internal). Compact KPI: label, value, trend change. */
export function MetricItem({ label, value, delta, trend = "up", style = {}, ...rest }) {
  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 8 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{value}</span>
        {delta != null && <Change value={delta} trend={trend} />}
      </div>
    </div>
  );
}
export default MetricItem;
