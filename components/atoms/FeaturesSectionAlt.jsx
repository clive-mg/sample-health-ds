import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { FeatureText } from "../marketing/FeatureText.jsx";

/** Untitled UI PRO — Features section (alt, two-column) (internal). Header left, feature list right. */
export function FeaturesSectionAlt({ eyebrow = "Features", title = "Everything you need", features = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>{features.map((f, i) => <FeatureText key={i} icon={f.icon} title={f.title}>{f.text}</FeatureText>)}</div>
      </div>
    </section>
  );
}
export default FeaturesSectionAlt;
