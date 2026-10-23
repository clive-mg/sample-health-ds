import React from "react";

/** Untitled UI PRO — Content section. Prose column with heading; for legal / long-form pages. */
export function ContentSection({ title, meta, children, style = {}, ...rest }) {
  return (
    <section style={{ padding: "64px 32px", maxWidth: 720, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {title && <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: "44px", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>}
      {meta && <div style={{ marginTop: 12, fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{meta}</div>}
      <div style={{ marginTop: 32, fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-secondary-700)", display: "flex", flexDirection: "column", gap: 20 }}>{children}</div>
    </section>
  );
}
export default ContentSection;
