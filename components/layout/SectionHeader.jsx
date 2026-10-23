import React from "react";

/** Untitled UI PRO — Section header. Eyebrow + heading + description for marketing sections. */
export function SectionHeader({ eyebrow, title, description, align = "left", style = {}, ...rest }) {
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? 768 : undefined, margin: align === "center" ? "0 auto" : undefined, ...style }} {...rest}>
      {eyebrow && <div style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)" }}>{eyebrow}</div>}
      {title && <h2 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: "44px", color: "var(--colors-text-text-primary-900)" }}>{title}</h2>}
      {description && <p style={{ margin: "16px 0 0", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
    </div>
  );
}
export default SectionHeader;
