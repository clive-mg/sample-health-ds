import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { TestimonialCard } from "../marketing/TestimonialCard.jsx";

/** Untitled UI PRO — Testimonial section. Header + grid of testimonial cards. */
export function TestimonialSection({ eyebrow = "Testimonials", title = "Loved by teams everywhere", testimonials = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", background: "var(--colors-background-bg-secondary-subtle)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader eyebrow={eyebrow} title={title} align="center" />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(testimonials.length || 1, 3)}, 1fr)`, gap: 24, marginTop: 56 }}>
          {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
      </div>
    </section>
  );
}
export default TestimonialSection;
