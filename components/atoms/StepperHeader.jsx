import React from "react";

/** Untitled UI PRO — Stepper header (internal). "Step X of Y" label + progress bar. */
export function StepperHeader({ step = 1, total = 4, label, style = {}, ...rest }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}><span>{label || `Step ${step} of ${total}`}</span><span>{pct}%</span></div>
      <div style={{ height: 8, borderRadius: 9999, background: "var(--colors-background-bg-tertiary)" }}><div style={{ width: `${pct}%`, height: "100%", borderRadius: 9999, background: "var(--colors-background-bg-brand-solid)" }} /></div>
    </div>
  );
}
export default StepperHeader;
