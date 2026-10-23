import React from "react";
import { Badge } from "../data-display/Badge.jsx";

/** Untitled UI PRO — Nav item card (internal). Rich sidebar/menu card: icon, title, badge. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function NavItemCard({ icon = "Zap", title, badge, description, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", gap: 12, width: "100%", textAlign: "left", padding: 12, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-lg-px)", background: "var(--colors-background-bg-primary)", cursor: "pointer", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, background: "var(--colors-background-bg-secondary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-foreground-fg-brand-primary-600)" }}><Icon name={icon} size={22} /></span>
      <span style={{ flex: 1 }}><span style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</span>{badge && <Badge size="sm" color="brand">{badge}</Badge>}</span>{description && <span style={{ display: "block", marginTop: 2, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</span>}</span>
    </button>
  );
}
export default NavItemCard;
