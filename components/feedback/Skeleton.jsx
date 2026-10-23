import React from "react";

/** Untitled UI PRO — Skeleton loading placeholder. Shimmering block; circle or line variants. */
export function Skeleton({ variant = "line", width = "100%", height, lines = 1, style = {}, ...rest }) {
  const base = { background: "linear-gradient(90deg, var(--colors-background-bg-secondary) 25%, var(--colors-background-bg-tertiary) 37%, var(--colors-background-bg-secondary) 63%)", backgroundSize: "400% 100%", animation: "uui-shimmer 1.4s ease infinite" };
  const kf = <style>{"@keyframes uui-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}"}</style>;
  if (variant === "circle") return <span style={{ display: "inline-block", width: width || 40, height: height || width || 40, borderRadius: "50%", ...base, ...style }} {...rest}>{kf}</span>;
  return (
    <span style={{ display: "flex", flexDirection: "column", gap: 8, width, ...style }} {...rest}>
      {kf}
      {Array.from({ length: lines }).map((_, i) => (
        <span key={i} style={{ height: height || 12, borderRadius: 6, width: i === lines - 1 && lines > 1 ? "70%" : "100%", ...base }} />
      ))}
    </span>
  );
}
export default Skeleton;
