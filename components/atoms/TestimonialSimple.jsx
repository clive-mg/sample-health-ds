import React from "react";

/** Untitled UI PRO — Testimonial (simple) (internal). Quote + author line, no card chrome. */
import { Avatar } from "../data-display/Avatar.jsx";
export function TestimonialSimple({ quote, name, title, initials, style = {}, ...rest }) {
  return (
    <div style={{ fontFamily: "var(--font-body)", ...style }} {...rest}>
      <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, lineHeight: "34px", fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
        <Avatar size="md" initials={initials} />
        <div><div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{title}</div></div>
      </div>
    </div>
  );
}
export default TestimonialSimple;
