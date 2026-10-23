import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Pricing tier card. Plan name, price, feature list, CTA; optional highlight. */
export function PricingTierCard({ name, price, period = "/month", description, features = [], cta = "Get started", featured = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 32, background: "var(--colors-background-bg-primary)",
      border: `1px solid ${featured ? "var(--colors-border-border-brand)" : "var(--colors-border-border-secondary)"}`,
      borderRadius: "var(--radius-2xl-px)", boxShadow: featured ? "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)" : "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{price}</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{period}</span>
      </div>
      <div style={{ marginTop: 16, fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div>
      {description && <div style={{ marginTop: 4, fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, margin: "24px 0" }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-secondary-700)" }}>
            <span style={{ color: "var(--colors-foreground-fg-brand-primary-600)", display: "inline-flex" }}><Icon name="CheckCircle" size={24} /></span>{f}
          </div>
        ))}
      </div>
      <Button size="lg" hierarchy={featured ? "primary" : "secondary"} style={{ width: "100%", marginTop: "auto" }}>{cta}</Button>
    </div>
  );
}
export default PricingTierCard;
