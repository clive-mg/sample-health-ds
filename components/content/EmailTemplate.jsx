import React from "react";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Email template. Centered card email body with header, content and footer. */
export function EmailTemplate({ brand = "Untitled UI", heading = "Welcome aboard", children, cta = "Get started", style = {}, ...rest }) {
  return (
    <div style={{ background: "var(--colors-background-bg-secondary)", padding: 32, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 600, margin: "0 auto", background: "var(--colors-background-bg-primary)", borderRadius: "var(--radius-md-px)", overflow: "hidden", border: "1px solid var(--colors-border-border-secondary)" }}>
        <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--colors-border-border-secondary)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--colors-background-bg-brand-solid)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{brand[0]}</div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{brand}</span>
        </div>
        <div style={{ padding: 32 }}>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{heading}</h1>
          <div style={{ marginTop: 16, fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{children}</div>
          {cta && <div style={{ marginTop: 24 }}><Button size="lg">{cta}</Button></div>}
        </div>
        <div style={{ padding: "24px 32px", borderTop: "1px solid var(--colors-border-border-secondary)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>© 2026 {brand}. All rights reserved.</div>
      </div>
    </div>
  );
}
export default EmailTemplate;
