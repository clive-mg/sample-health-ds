import React from "react";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — 404 / not-found section. Eyebrow, big heading, help text and actions. */
export function NotFoundSection({ code = "404", title = "We can't find that page", description = "Sorry, the page you are looking for doesn't exist or has been moved.", style = {}, ...rest }) {
  return (
    <section style={{ padding: "96px 32px", textAlign: "center", maxWidth: 640, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)" }}>{code} error</div>
      <h1 style={{ margin: "12px 0 0", fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: "60px", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>
      <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 40 }}>
        <Button hierarchy="secondary" size="lg">Go back</Button>
        <Button size="lg">Take me home</Button>
      </div>
    </section>
  );
}
export default NotFoundSection;
