import React from "react";

/** Untitled UI PRO — Pricing feature row (internal). Feature label with included/excluded state. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function PricingFeatureRow({ label, included = true, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", fontSize: 16, color: included ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>
      <Icon name={included ? "CheckCircle" : "XCircle"} size={24} style={{ color: included ? "var(--colors-foreground-fg-brand-primary-600)" : "var(--colors-foreground-fg-disabled)", flexShrink: 0 }} />{label}
    </div>
  );
}
export default PricingFeatureRow;
