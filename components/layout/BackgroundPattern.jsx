import React from "react";

/** Untitled UI PRO — Background pattern. Decorative grid or dot field, optionally radially masked. */
export function BackgroundPattern({ type = "grid", size = 480, masked = true, style = {}, ...rest }) {
  const line = "var(--colors-border-border-secondary)";
  const bg = type === "dots"
    ? { backgroundImage: `radial-gradient(${line} 1px, transparent 1px)`, backgroundSize: "24px 24px" }
    : { backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`, backgroundSize: "24px 24px" };
  const mask = masked ? { WebkitMaskImage: "radial-gradient(circle at center, #000 0%, transparent 72%)", maskImage: "radial-gradient(circle at center, #000 0%, transparent 72%)" } : {};
  return <div aria-hidden="true" style={{ width: size, height: size, ...bg, ...mask, ...style }} {...rest} />;
}
export default BackgroundPattern;
