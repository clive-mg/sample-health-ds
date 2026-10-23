import React from "react";

/**
 * Untitled UI PRO — Progress bar. An 8px full-radius track that fills left to
 * right; the fill takes the brand solid surface or a status ramp step. Optional
 * percentage label sits right of the track or under its right edge.
 */
const BAR_H = 8;
const FILL = {
  brand: "var(--colors-background-bg-brand-solid)",
  success: "var(--colors-success-600)",
  warning: "var(--colors-warning-600)",
  error: "var(--colors-error-600)"
};
export function ProgressBar({ value = 40, max = 100, color = "brand", label = "none", style = {}, ...rest }) {
  const h = BAR_H;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const text = `${Math.round(pct)}%`;
  const fill = FILL[color] || FILL.brand;
  const bar = (
    <div data-sh-part="track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}
      style={{ position: "relative", height: h, borderRadius: "var(--radius-full-px)", background: "var(--colors-background-bg-disabled)", overflow: "hidden", flex: 1 }}>
      <div data-sh-part="fill" style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: `${pct}%`, borderRadius: "var(--radius-full-px)", background: fill, transition: "width 200ms ease" }} />
    </div>
  );
  const lab = <span data-sh-part="label" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, lineHeight: "20px", color: "var(--colors-text-text-secondary-700)" }}>{text}</span>;
  if (label === "right") return <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-lg-px)", ...style }} {...rest}>{bar}{lab}</div>;
  if (label === "bottom") return <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md-px)", ...style }} {...rest}>{bar}<div style={{ textAlign: "right" }}>{lab}</div></div>;
  return <div style={{ display: "flex", ...style }} {...rest}>{bar}</div>;
}
export default ProgressBar;
