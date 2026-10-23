import React from "react";

/** Untitled UI PRO — Progress circle (small) (internal). Compact ring progress for tables/lists. */
export function ProgressRingSmall({ value = 60, size = 36, style = {}, ...rest }) {
  const stroke = 4, r = (size - stroke) / 2, circ = 2 * Math.PI * r;
  return (
    <span style={{ position: "relative", display: "inline-flex", width: size, height: size, ...style }} {...rest}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--colors-background-bg-tertiary)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--colors-background-bg-brand-solid)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - value / 100)} />
      </svg>
    </span>
  );
}
export default ProgressRingSmall;
