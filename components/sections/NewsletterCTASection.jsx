import React from "react";
import { Button } from "../buttons/Button.jsx";
import { Input } from "../forms/Input.jsx";

/** Untitled UI PRO — Newsletter CTA section. Heading + inline email capture. */
export function NewsletterCTASection({ title = "Stay in the loop", description = "Join our newsletter. No spam, unsubscribe any time.", dark = false, style = {}, ...rest }) {
  return (
    <section style={{ padding: "64px 32px", textAlign: "center", background: dark ? "var(--colors-background-bg-brand-section)" : "var(--colors-background-bg-secondary)", color: dark ? "#fff" : "var(--colors-text-text-primary-900)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>{title}</h2>
      {description && <p style={{ margin: "12px auto 0", maxWidth: 480, fontSize: 16, color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ flex: 1 }}><Input placeholder="Enter your email" /></div>
        <Button size="lg">Subscribe</Button>
      </div>
    </section>
  );
}
export default NewsletterCTASection;
