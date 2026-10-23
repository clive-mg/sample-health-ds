import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Testimonial (large) (internal). Big centered quote with logo + author. */
export function TestimonialLarge({ quote, name, title, logo, initials, style = {}, ...rest }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 768, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {logo && <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--colors-text-text-quaternary-500)", marginBottom: 24 }}>{logo}</div>}
      <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, lineHeight: "40px", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--colors-text-text-primary-900)" }}>"{quote}"</p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 32 }}>
        <Avatar size="lg" initials={initials} />
        <div><div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div><div style={{ fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{title}</div></div>
      </div>
    </div>
  );
}
export default TestimonialLarge;
