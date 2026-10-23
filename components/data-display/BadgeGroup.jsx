import React from "react";
import { Badge } from "./Badge.jsx";

const sp = (k) => `var(--spacing-${k}-px)`;

/**
 * Untitled UI PRO — Badge group: a leading pill label + trailing text, in one
 * bordered/filled container. Padding and gap are spacing steps; the trailing
 * text takes the weight its size is bound to (12px → 500, 14px → 400).
 */
const SIZES = {
  sm: { py: "xxs", pr: "lg", pl: "xs", gap: "sm", font: 12, line: "18px", weight: 500 },
  md: { py: "xxs", pr: "lg", pl: "xs", gap: "md", font: 14, line: "20px", weight: 400 },
  lg: { py: "xs", pr: "lg", pl: "xs", gap: "md", font: 14, line: "20px", weight: 400 },
};

export function BadgeGroup({ size = "md", color = "brand", theme = "light", badge = "New", children, iconTrailing = null, badgeProps = {}, style = {}, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const light = theme === "light";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: sp(s.gap),
      padding: `${sp(s.py)} ${sp(s.pr)} ${sp(s.py)} ${sp(s.pl)}`,
      borderRadius: "var(--radius-full-px)",
      background: light ? "var(--colors-background-bg-primary)" : "var(--colors-gray-light-mode-50)",
      border: "1px solid var(--colors-border-border-primary)",
      boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)",
      fontFamily: "var(--font-body)", fontSize: s.font, lineHeight: s.line, fontWeight: s.weight,
      color: "var(--colors-text-text-secondary-700)", whiteSpace: "nowrap", ...style,
    }} {...rest}>
      <Badge size={size} color={color} type="pill-color" {...badgeProps}>{badge}</Badge>
      <span>{children}</span>
      {iconTrailing}
    </span>
  );
}
export default BadgeGroup;
