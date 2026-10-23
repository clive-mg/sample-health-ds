import React from "react";
import { LogoStrip } from "./LogoStrip.jsx";

/** Untitled UI PRO — Social proof (logos) section (internal). Heading + muted logo row band. */
export function SocialProofLogos({ heading = "Join 4,000+ companies already growing", logos, dark = false, style = {}, ...rest }) {
  return (
    <section style={{ padding: "48px 32px", textAlign: "center", background: dark ? "var(--colors-background-bg-brand-section)" : "transparent", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {heading && <p style={{ margin: "0 0 32px", fontSize: 16, fontWeight: 600, color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-tertiary-600)" }}>{heading}</p>}
      <LogoStrip logos={logos} dark={dark} />
    </section>
  );
}
export default SocialProofLogos;
