import React from "react";

/** Untitled UI PRO — Loading dots (internal). Three-dot bouncing loader. */
export function LoadingDots({ size = 8, color = "var(--colors-foreground-fg-brand-primary-600)", style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", gap: size / 2, alignItems: "center", ...style }} {...rest}>
      {[0, 1, 2].map((i) => <span key={i} style={{ width: size, height: size, borderRadius: "50%", background: color, animation: `uui-bounce 1s ${i * 0.15}s infinite ease-in-out` }} />)}
      <style>{"@keyframes uui-bounce{0%,80%,100%{transform:scale(0.6);opacity:0.5}40%{transform:scale(1);opacity:1}}"}</style>
    </span>
  );
}
export default LoadingDots;
