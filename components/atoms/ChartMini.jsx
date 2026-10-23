import React from "react";

/** Untitled UI PRO — Chart mini (internal). Tiny sparkline for metric cards. data:number[]. */
export function ChartMini({ data = [], width = 96, height = 32, trend = "up", style = {}, ...rest }) {
  const max = Math.max(1, ...data), min = Math.min(0, ...data), range = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : width;
  const pts = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`).join(" ");
  const color = trend === "down" ? "var(--colors-error-500)" : "var(--colors-success-500)";
  return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style} {...rest}><polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export default ChartMini;
