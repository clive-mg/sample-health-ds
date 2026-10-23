import React from "react";
import { ProgressBar } from "../feedback/ProgressBar.jsx";

/** Untitled UI PRO — Budget card (internal). Dashboard card: label, amount, progress vs total. */
export function BudgetCard({ label = "Monthly budget", spent = 3200, total = 5000, style = {}, ...rest }) {
  const pct = Math.min(100, Math.round((spent / total) * 100));
  return (
    <div style={{ padding: 20, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div>
      <div style={{ margin: "8px 0 12px", fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>${spent.toLocaleString()} <span style={{ fontSize: 16, fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>/ ${total.toLocaleString()}</span></div>
      <ProgressBar value={pct} />
    </div>
  );
}
export default BudgetCard;
