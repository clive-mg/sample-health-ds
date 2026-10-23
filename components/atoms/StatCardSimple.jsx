import React from "react";

/** Untitled UI PRO — Stat card (simple) (internal). Centered big-number KPI card. */
export function StatCardSimple({ value, label, style = {}, ...rest }) {
  return (
    <div style={{ textAlign: "center", padding: 24, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-brand-primary-900)" }}>{value}</div>
      <div style={{ marginTop: 8, fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div>
    </div>
  );
}
export default StatCardSimple;
