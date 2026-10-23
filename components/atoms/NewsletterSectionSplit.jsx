import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Newsletter section (split) (internal). Copy left, email capture right. */
import { Input } from "../forms/Input.jsx";
export function NewsletterSectionSplit({ title = "Sign up for our newsletter", description = "The latest news, articles and resources, sent weekly.", dark = false, style = {}, ...rest }) {
  return (
    <section style={{ padding: "64px 32px", background: dark ? "var(--colors-background-bg-brand-section)" : "var(--colors-background-bg-secondary)", color: dark ? "#fff" : "var(--colors-text-text-primary-900)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div><h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>{title}</h2><p style={{ margin: "12px 0 0", fontSize: 16, color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-tertiary-600)" }}>{description}</p></div>
        <div style={{ display: "flex", gap: 12 }}><div style={{ flex: 1 }}><Input placeholder="Enter your email" /></div><Button size="lg">Subscribe</Button></div>
      </div>
    </section>
  );
}
export default NewsletterSectionSplit;
