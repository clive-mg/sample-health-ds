import React from "react";

/** Untitled UI PRO — Decorative background pattern. Concentric circles or squares, radially masked. */
export function BackgroundPatternDecorative({ type = "circles", size = 480, style = {}, ...rest }) {
  const line = "var(--colors-border-border-secondary)";
  const rings = [0.2, 0.4, 0.6, 0.8, 1];
  const mask = { WebkitMaskImage: "radial-gradient(circle at center, #000 0%, transparent 72%)", maskImage: "radial-gradient(circle at center, #000 0%, transparent 72%)" };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ ...mask, ...style }} {...rest}>
      {rings.map((r, i) => type === "squares"
        ? <rect key={i} x={size / 2 - (size / 2) * r} y={size / 2 - (size / 2) * r} width={size * r} height={size * r} fill="none" stroke={line} />
        : <circle key={i} cx={size / 2} cy={size / 2} r={(size / 2) * r} fill="none" stroke={line} />)}
    </svg>
  );
}
export default BackgroundPatternDecorative;
