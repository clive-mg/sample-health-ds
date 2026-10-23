import React from "react";

/** Untitled UI PRO — Quote image bottom panel (internal). Testimonial caption bar under an image. */
import { Avatar } from "../data-display/Avatar.jsx";
export function QuoteImageBottomPanel({ quote, name, title, initials, style = {}, ...rest }) {
  return (
    <div style={{ padding: 24, background: "var(--component-colors-alpha-alpha-white-70, rgba(255,255,255,0.7))", backdropFilter: "blur(12px)", borderRadius: "var(--radius-md-px)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {quote && <p style={{ margin: "0 0 16px", fontSize: 18, lineHeight: "26px", fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>"{quote}"</p>}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Avatar size="md" initials={initials} />
        <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{name}</div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{title}</div></div>
      </div>
    </div>
  );
}
export default QuoteImageBottomPanel;
