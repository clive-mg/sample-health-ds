import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Featured card (nav) (internal). Promo tile with image band, title, link. */
export function NavPromoCard({ title = "What's new", description, cta = "Learn more", style = {}, ...rest }) {
  return (
    <div style={{ borderRadius: "var(--radius-lg-px)", overflow: "hidden", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ height: 88, background: "linear-gradient(135deg,var(--colors-brand-500),var(--colors-brand-700))" }} />
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
        {description && <div style={{ marginTop: 4, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}
        <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-brand-secondary-700)" }}>{cta}<Icon name="ArrowRight" size={16} /></div>
      </div>
    </div>
  );
}
export default NavPromoCard;
