import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Accordion } from "../data-display/Accordion.jsx";

/** Untitled UI PRO — FAQ section. Header + accordion of questions. */
export function FAQSection({ eyebrow = "Support", title = "Frequently asked questions", description, faqs = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 768, margin: "0 auto" }}>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} align="center" />
        <div style={{ marginTop: 48 }}><Accordion items={faqs} /></div>
      </div>
    </section>
  );
}
export default FAQSection;
