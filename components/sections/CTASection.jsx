import React from "react";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — CTA section. Headline + supporting text + actions on a brand or subtle panel. */
export function CTASection({ title = "Start building today", description, primaryCta = "Get started", secondaryCta = "Chat to sales", dark = true, onPrimary, onSecondary, style = {}, ...rest }) {
  return (
    <section style={{ padding: "72px 32px", textAlign: "center", background: dark ? "var(--colors-background-bg-brand-section)" : "var(--colors-background-bg-secondary)", color: dark ? "#fff" : "var(--colors-text-text-primary-900)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: "44px" }}>{title}</h2>
      {description && <p style={{ margin: "16px auto 0", maxWidth: 520, fontSize: 16, lineHeight: "24px", color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
        {secondaryCta && <Button hierarchy="secondary" size="lg" onClick={onSecondary}>{secondaryCta}</Button>}
        {primaryCta && <Button size="lg" onClick={onPrimary}>{primaryCta}</Button>}
      </div>
    </section>
  );
}
export default CTASection;
