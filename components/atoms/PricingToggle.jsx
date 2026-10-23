import React from "react";

/** Untitled UI PRO — Pricing toggle (internal). Monthly/annual billing switch with save badge. */
import { Badge } from "../data-display/Badge.jsx";
export function PricingToggle({ annual = false, onChange, style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ fontSize: 14, fontWeight: 700, color: !annual ? "var(--colors-text-text-primary-900)" : "var(--colors-text-text-tertiary-600)" }}>Monthly</span>
      <span onClick={() => onChange && onChange(!annual)} style={{ position: "relative", width: 44, height: 24, borderRadius: 9999, cursor: "pointer", background: annual ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-tertiary)" }}>
        <span style={{ position: "absolute", top: 2, left: annual ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)", transition: "left 150ms ease" }} />
      </span>
      <span style={{ fontSize: 14, fontWeight: 700, color: annual ? "var(--colors-text-text-primary-900)" : "var(--colors-text-text-tertiary-600)" }}>Annual</span>
      <Badge color="success" size="sm">Save 20%</Badge>
    </div>
  );
}
export default PricingToggle;
