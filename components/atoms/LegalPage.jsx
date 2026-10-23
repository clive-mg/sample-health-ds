import React from "react";

/** Untitled UI PRO — Legal page (internal). Titled long-form prose column for legal/policy pages. */
export function LegalPage({ title = "Privacy Policy", updated = "Last updated 20 Jan 2026", children, style = {}, ...rest }) {
  return (
    <article style={{ maxWidth: 720, margin: "0 auto", padding: "64px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>
      <div style={{ marginTop: 8, fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{updated}</div>
      <div style={{ marginTop: 32, fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-secondary-700)", display: "flex", flexDirection: "column", gap: 20 }}>{children}</div>
    </article>
  );
}
export default LegalPage;
