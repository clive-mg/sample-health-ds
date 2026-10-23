import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Inline CTA (banner) (internal). Slim promo bar with icon + text + link. */
export function InlineCTABanner({ icon = "Announcement01", children, cta = "Learn more", onClick, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-brand-primary)", border: "1px solid var(--colors-border-border-brand)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Icon name={icon} size={20} style={{ color: "var(--colors-foreground-fg-brand-primary-600)", flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 14, color: "var(--colors-text-text-secondary-700)" }}>{children}</span>
      <a href="#" onClick={(e) => { e.preventDefault(); onClick && onClick(); }} style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-brand-secondary-700)", textDecoration: "none", whiteSpace: "nowrap" }}>{cta}</a>
    </div>
  );
}
export default InlineCTABanner;
