import React from "react";

/** Untitled UI PRO — Metrics item (with chart) (internal). KPI + inline sparkline. */
import { ChartMini } from "./ChartMini.jsx";
import { Change } from "./Change.jsx";
export function MetricItemChart({ label, value, delta, trend = "up", data = [4, 6, 5, 8, 7, 10, 12], style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: 20, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}><span style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{value}</span>{delta != null && <Change value={delta} trend={trend} />}</div>
      </div>
      <ChartMini data={data} trend={trend} />
    </div>
  );
}
export default MetricItemChart;
