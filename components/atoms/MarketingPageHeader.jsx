import React from "react";

/** Untitled UI PRO — Page header (marketing) (internal). Eyebrow + title + description hero-lite. */
export function MarketingPageHeader({ eyebrow, title, description, align = "center", style = {}, ...rest }) {
  const center = align === "center";
  return (
    <header style={{ padding: "64px 32px 40px", textAlign: align, maxWidth: center ? 768 : 1000, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {eyebrow && <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)" }}>{eyebrow}</div>}
      <h1 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: "60px", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>
      {description && <p style={{ margin: "20px 0 0", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
    </header>
  );
}
export default MarketingPageHeader;
