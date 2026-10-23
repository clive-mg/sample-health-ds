import React from "react";
import { Badge } from "./Badge.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Metric card. KPI value with trend badge and optional label. */
export function MetricCard({ label, value, delta, trend = "up", style = {}, ...rest }) {
  const up = trend === "up";
  return (
    <div style={{ padding: 20, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12, marginTop: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{value}</span>
        {delta != null && <Badge color={up ? "success" : "error"} size="sm"><span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}><Icon name={up ? "TrendUp01" : "TrendDown01"} size={12} />{delta}</span></Badge>}
      </div>
    </div>
  );
}
export default MetricCard;
