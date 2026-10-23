import React from "react";
import { Badge } from "../data-display/Badge.jsx";

/** Untitled UI PRO — Feature card (internal). Bordered card: icon, title, text, optional badge. */
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";
export function FeatureCard({ icon = "Zap", title, children, badge, style = {}, ...rest }) {
  return (
    <div style={{ padding: 24, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><FeaturedIcon color="brand"><Icon name={icon} /></FeaturedIcon>{badge && <Badge color="brand" size="sm">{badge}</Badge>}</div>
      <div style={{ marginTop: 16, fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
      {children && <p style={{ margin: "4px 0 0", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{children}</p>}
    </div>
  );
}
export default FeatureCard;
