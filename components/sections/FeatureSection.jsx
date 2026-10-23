import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { FeatureText } from "../marketing/FeatureText.jsx";

/** Untitled UI PRO — Feature section. Section header + responsive grid of feature blocks. */
export function FeatureSection({ eyebrow = "Features", title = "Everything you need", description, features = [], columns = 3, style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} align="center" />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 40, marginTop: 56 }}>
          {features.map((f, i) => <FeatureText key={i} icon={f.icon} title={f.title} align="center">{f.text}</FeatureText>)}
        </div>
      </div>
    </section>
  );
}
export default FeatureSection;
