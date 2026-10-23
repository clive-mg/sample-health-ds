import React from "react";

/** Untitled UI PRO — Line/area chart. Smooth SVG line with gradient fill. data:number[]. */
export function LineChart({ data = [], height = 200, area = true, color = "var(--colors-brand-600)", style = {}, ...rest }) {
  const w = 640, h = height, max = Math.max(1, ...data), min = Math.min(0, ...data);
  const range = max - min || 1;
  const step = data.length > 1 ? w / (data.length - 1) : w;
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(" ");
  const gid = "uui-lc-" + Math.random().toString(36).slice(2, 8);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height, display: "block", ...style }} {...rest}>
      <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.22" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      {area && <polygon points={`0,${h} ${pts} ${w},${h}`} fill={`url(#${gid})`} />}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export default LineChart;
