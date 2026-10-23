import React from "react";
import { FeaturedIcon } from "./FeaturedIcon.jsx";

/**
 * Untitled UI PRO — Empty state. A featured icon, a title, a line of
 * supporting text and the action that resolves the emptiness, centred in
 * whatever space has nothing in it. Three sizes: sm for a panel or a card, md
 * for a section, lg for a whole page. `variant="card"` draws its own frame;
 * bare leaves the framing to the parent.
 */
const sp = (k) => `var(--spacing-${k}-px)`;
const SIZES = {
  sm: { chip: "sm", pad: "2xl", width: 320, gap: "xl", actions: "2xl", title: 16, titleLine: "24px", text: 14, textLine: "20px" },
  md: { chip: "md", pad: "3xl", width: 400, gap: "xl", actions: "2xl", title: 18, titleLine: "22px", text: 14, textLine: "20px" },
  lg: { chip: "lg", pad: "4xl", width: 480, gap: "2xl", actions: "3xl", title: 24, titleLine: "28px", text: 16, textLine: "24px" },
};

export function EmptyState({
  size = "md",
  variant = "bare",
  icon,
  color = "gray",
  title,
  children,
  actions,
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const framed = variant === "card";
  return (
    <div
      data-sh-part="root"
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        gap: sp("xs"), padding: sp(s.pad), maxWidth: s.width, margin: "0 auto", boxSizing: "border-box",
        fontFamily: "var(--font-body)",
        background: framed ? "var(--colors-background-bg-primary)" : "transparent",
        border: framed ? "1px solid var(--colors-border-border-secondary)" : "none",
        borderRadius: framed ? "var(--radius-xl-px)" : 0,
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <div data-sh-part="graphic" style={{ marginBottom: sp(s.gap) }}>
          <FeaturedIcon size={s.chip} color={color} shape="circle">{icon}</FeaturedIcon>
        </div>
      )}
      {title && (
        <div data-sh-part="title" style={{ fontSize: s.title, lineHeight: s.titleLine, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
      )}
      {children && (
        <div data-sh-part="text" style={{ fontSize: s.text, lineHeight: s.textLine, fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{children}</div>
      )}
      {actions && (
        <div data-sh-part="actions" style={{ display: "flex", gap: sp("lg"), marginTop: sp(s.actions), flexWrap: "wrap", justifyContent: "center" }}>{actions}</div>
      )}
    </div>
  );
}
export default EmptyState;
