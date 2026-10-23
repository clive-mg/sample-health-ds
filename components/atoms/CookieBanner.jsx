import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Cookie banner (internal). Bottom consent bar with accept/decline. */
import { Button } from "../buttons/Button.jsx";
export function CookieBanner({ onAccept, onDecline, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", flexWrap: "wrap", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <span style={{ flex: 1, minWidth: 200, fontSize: 14, color: "var(--colors-text-text-secondary-700)" }}>We use cookies to improve your experience. See our <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--colors-text-text-brand-secondary-700)", fontWeight: 600, textDecoration: "none" }}>cookie policy</a>.</span>
      <div style={{ display: "flex", gap: 12 }}><Button hierarchy="secondary" size="sm" onClick={onDecline}>Decline</Button><Button size="sm" onClick={onAccept}>Accept all</Button></div>
    </div>
  );
}
export default CookieBanner;
