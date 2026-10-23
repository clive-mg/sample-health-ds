import React from "react";

/**
 * Untitled UI PRO — Featured icon. The circular/rounded icon chip used atop
 * alerts, empty states, modals and feature lists.
 * sizes sm40 md64 lg80 · 5 colors · circle or square.
 *
 * Colours come from the Foundations layer: brand is the color.primary ramp,
 * gray is color.neutral. Ramp variables are declared once in :root, so a chip
 * keeps its light-mode value on a dark surface. The neutral chip adds a
 * color.border.default hairline — its 50 fill is the canvas colour, so without
 * one there is no chip to see.
 */
const SZ = { sm: 40, md: 64, lg: 80 };
const ICON = { sm: 20, md: 32, lg: 40 };
const RAMP = { brand: "brand", gray: "gray-light-mode", success: "success", error: "error", warning: "warning" };
const step = (color, s) => `var(--colors-${RAMP[color] || RAMP.brand}-${s})`;

export function FeaturedIcon({ size = "md", color = "brand", shape = "circle", children, style = {}, ...rest }) {
  const d = SZ[size] || SZ.md;
  const radius = shape === "circle" ? "var(--radius-full-px)" : "var(--radius-lg-px)";
  const bg = step(color, 50);
  const fg = step(color, 600);
  const border = color === "gray" ? "1px solid var(--colors-border-border-primary)" : "none";
  return (
    <span data-sh-part="chip" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: d, height: d, flexShrink: 0, borderRadius: radius, background: bg, color: fg, border, ...style }} {...rest}>
      <span data-sh-part="glyph" style={{ display: "inline-flex" }}>
        {React.isValidElement(children) ? React.cloneElement(children, { size: ICON[size] || ICON.md }) : children}
      </span>
    </span>
  );
}
export default FeaturedIcon;
