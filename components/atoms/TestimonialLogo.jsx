import React from "react";

/** Untitled UI PRO — Testimonial logo (internal). Company wordmark used above a testimonial. */
export function TestimonialLogo({ name = "Acme", dark = false, style = {}, ...rest }) {
  return <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: dark ? "#fff" : "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>{name}</span>;
}
export default TestimonialLogo;
