import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { PricingTierCard } from "../marketing/PricingTierCard.jsx";

/** Untitled UI PRO — Pricing section. Header + row of pricing tier cards. */
export function PricingSection({ eyebrow = "Pricing", title = "Plans for teams of all sizes", description, tiers = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} align="center" />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(tiers.length || 1, 3)}, 1fr)`, gap: 24, marginTop: 56, alignItems: "start" }}>
          {tiers.map((t, i) => <PricingTierCard key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
}
export default PricingSection;
