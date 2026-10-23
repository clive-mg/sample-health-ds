import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Stat with icon (internal). Featured-icon KPI tile. */
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
export function StatWithIcon({ icon = "BarChart07", label, value, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 20, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <FeaturedIcon color="brand" size="lg"><Icon name={icon} /></FeaturedIcon>
      <div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div><div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{value}</div></div>
    </div>
  );
}
export default StatWithIcon;
