import React from "react";

/** Untitled UI PRO — Pricing table cell header (internal). Column header cell for a pricing comparison. */
export function PricingTableCellHeader({ plan, price, featured = false, style = {}, ...rest }) {
  return (
    <div style={{ padding: "20px 24px", textAlign: "center", background: featured ? "var(--colors-background-bg-brand-primary)" : "transparent", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{plan}</div>
      {price && <div style={{ marginTop: 8, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{price}</div>}
    </div>
  );
}
export default PricingTableCellHeader;
