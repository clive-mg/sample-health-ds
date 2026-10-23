import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Stat card (icon + trend) (internal). Dashboard KPI card with icon and change. */
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Change } from "./Change.jsx";
export function DashboardStatCard({ icon = "Users01", label, value, delta, trend = "up", style = {}, ...rest }) {
  return (
    <div style={{ padding: 20, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div>
        <FeaturedIcon color="brand" size="sm"><Icon name={icon} /></FeaturedIcon>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{value}</span>
        {delta != null && <div style={{ marginBottom: 6 }}><Change value={delta} trend={trend} /></div>}
      </div>
    </div>
  );
}
export default DashboardStatCard;
