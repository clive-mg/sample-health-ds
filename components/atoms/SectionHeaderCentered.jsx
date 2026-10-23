import React from "react";

/** Untitled UI PRO — Section header (marketing, centered eyebrow variant, internal). */
export function SectionHeaderCentered({ eyebrow, title, description, style = {}, ...rest }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 768, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {eyebrow && <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)" }}>{eyebrow}</div>}
      {title && <h2 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{title}</h2>}
      {description && <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
    </div>
  );
}
export default SectionHeaderCentered;
