import React from "react";

/** Untitled UI PRO — Progress bar (label above) (internal). Track with a caption label on top. */
export function ProgressBarLabeled({ value = 60, label = "Progress", style = {}, ...rest }) {
  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}><span>{label}</span><span>{value}%</span></div>
      <div style={{ height: 8, borderRadius: 9999, background: "var(--colors-background-bg-tertiary)" }}><div style={{ width: `${value}%`, height: "100%", borderRadius: 9999, background: "var(--colors-background-bg-brand-solid)" }} /></div>
    </div>
  );
}
export default ProgressBarLabeled;
