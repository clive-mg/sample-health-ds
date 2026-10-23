import React from "react";
import { Button } from "../buttons/Button.jsx";
import { BadgeGroup } from "../data-display/BadgeGroup.jsx";

/** Untitled UI PRO — Hero section. Centered eyebrow badge, headline, subtext and CTAs. */
export function HeroSection({ badge, title = "Beautiful UI, shipped faster", subtitle, primaryCta = "Get started", secondaryCta = "Learn more", onPrimary, onSecondary, style = {}, ...rest }) {
  return (
    <section style={{ textAlign: "center", padding: "96px 32px", maxWidth: 880, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {badge && <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><BadgeGroup badge={badge.label || "New"} color="brand">{badge.text}</BadgeGroup></div>}
      <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 60, lineHeight: "72px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{title}</h1>
      {subtitle && <p style={{ margin: "24px auto 0", maxWidth: 680, fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{subtitle}</p>}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 40 }}>
        {secondaryCta && <Button hierarchy="secondary" size="xl" onClick={onSecondary}>{secondaryCta}</Button>}
        {primaryCta && <Button size="xl" onClick={onPrimary}>{primaryCta}</Button>}
      </div>
    </section>
  );
}
export default HeroSection;
