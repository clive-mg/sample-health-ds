import React from "react";

/**
 * Untitled UI PRO — Progress circle. An SVG ring, or a half-circle gauge, with
 * an optional centred percentage. Four diameters: 64 / 80 / 120 / 160. The
 * label is a type-scale step, not a fraction of the diameter — 12/700 at sm,
 * then 16, 24 and 30 at 600.
 */
const SZ = { sm: 64, md: 80, lg: 120, xl: 160 };
const LABEL = {
  sm: { size: 12, line: "18px", weight: 700 },
  md: { size: 16, line: "24px", weight: 600 },
  lg: { size: 24, line: "28px", weight: 600 },
  xl: { size: 30, line: "36px", weight: 600 }
};
export function ProgressCircle({ value = 40, max = 100, size = "md", variant = "circle", showLabel = true, style = {}, ...rest }) {
  const d = SZ[size] || SZ.md;
  const stroke = 8;
  const r = (d - stroke) / 2;
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const t = LABEL[size] || LABEL.md;
  const half = variant === "half";
  const len = half ? Math.PI * r : 2 * Math.PI * r;
  const boxH = half ? d / 2 + stroke / 2 : d;
  const arc = `M ${stroke / 2} ${d / 2} A ${r} ${r} 0 0 1 ${d - stroke / 2} ${d / 2}`;
  const common = { fill: "none", strokeWidth: stroke, strokeLinecap: "round" };
  return (
    <span data-sh-part="root" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}
      style={{ position: "relative", display: "inline-flex", width: d, height: boxH, ...style }} {...rest}>
      <svg width={d} height={boxH} style={half ? undefined : { transform: "rotate(-90deg)" }}>
        {half
          ? <path data-sh-part="track" d={arc} stroke="var(--colors-background-bg-disabled)" {...common} />
          : <circle data-sh-part="track" cx={d / 2} cy={d / 2} r={r} stroke="var(--colors-background-bg-disabled)" {...common} />}
        {half
          ? <path data-sh-part="fill" d={arc} stroke="var(--colors-background-bg-brand-solid)" strokeDasharray={len} strokeDashoffset={len * (1 - pct / 100)} style={{ transition: "stroke-dashoffset 240ms ease" }} {...common} />
          : <circle data-sh-part="fill" cx={d / 2} cy={d / 2} r={r} stroke="var(--colors-background-bg-brand-solid)" strokeDasharray={len} strokeDashoffset={len * (1 - pct / 100)} style={{ transition: "stroke-dashoffset 240ms ease" }} {...common} />}
      </svg>
      {showLabel && (
        <span data-sh-part="label" style={{
          position: "absolute", inset: 0, display: "flex", alignItems: half ? "flex-end" : "center", justifyContent: "center",
          fontFamily: "var(--font-body)", fontWeight: t.weight, fontSize: t.size, lineHeight: t.line,
          color: "var(--colors-text-text-primary-900)"
        }}>{Math.round(pct)}%</span>
      )}
    </span>
  );
}
export default ProgressCircle;
