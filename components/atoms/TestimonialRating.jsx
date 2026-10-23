import React from "react";

/** Untitled UI PRO — Testimonial star rating (internal). Five stars with a numeric score. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function TestimonialRating({ rating = 5, style = {}, ...rest }) {
  return <span style={{ display: "inline-flex", gap: 2, color: "var(--colors-warning-400)", ...style }} {...rest}>{Array.from({ length: rating }).map((_, i) => <Icon key={i} name="Star01" size={20} />)}</span>;
}
export default TestimonialRating;
