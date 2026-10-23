import React from "react";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Nav featured card. Promo card used inside dropdown mega-menus. */
export function NavFeaturedCard({ icon = "Zap", title = "What's new", description = "Check out the latest release notes and product updates.", cta = "Read more", style = {}, ...rest }) {
  return (
    <div style={{ padding: 20, borderRadius: "var(--radius-lg-px)", background: "var(--colors-background-bg-secondary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <FeaturedIcon color="brand"><Icon name={icon} /></FeaturedIcon>
      <div style={{ marginTop: 16, fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
      {description && <div style={{ marginTop: 4, fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}
      {cta && <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-brand-secondary-700)" }}>{cta}<Icon name="ArrowRight" size={16} /></div>}
    </div>
  );
}
export default NavFeaturedCard;
