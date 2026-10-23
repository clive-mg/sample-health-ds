import React from "react";

/** Untitled UI PRO — Spacing example (internal). Specimen showing a spacing token gap. */
export function SpacingExample({ gap = "16px", label, style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", gap, alignItems: "center" }}><span style={{ width: 24, height: 24, borderRadius: 4, background: "var(--colors-brand-500)" }} /><span style={{ width: 24, height: 24, borderRadius: 4, background: "var(--colors-brand-500)" }} /></div>
      {label && <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{label}</span>}
    </div>
  );
}
export default SpacingExample;
