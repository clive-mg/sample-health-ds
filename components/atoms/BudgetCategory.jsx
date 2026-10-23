import React from "react";

/** Untitled UI PRO — Budget category (internal). Row: color dot, label, amount, share. */
export function BudgetCategory({ color = "var(--colors-brand-500)", label, amount, share, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: color, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>{label}</span>
      <span style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{amount}</span>
      {share != null && <span style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)", width: 44, textAlign: "right" }}>{share}</span>}
    </div>
  );
}
export default BudgetCategory;
