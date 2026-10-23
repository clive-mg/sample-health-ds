import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Testimonial card. Star rating, quote, author identity. */
export function TestimonialCard({ quote, name, title, rating = 5, initials, src, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, padding: 32, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-2xl-px)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      <div style={{ display: "flex", gap: 2, color: "var(--colors-warning-400)" }}>
        {Array.from({ length: rating }).map((_, i) => <Icon key={i} name="Star01" size={20} />)}
      </div>
      <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, lineHeight: "30px", fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>"{quote}"</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <Avatar size="md" initials={initials} src={src} />
        <div><div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div><div style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{title}</div></div>
      </div>
    </div>
  );
}
export default TestimonialCard;
