import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Social sign-in button. Bordered full-width button with a brand glyph. */
const LABELS = { google: ["Chrome", "Sign in with Google"], apple: ["Command", "Sign in with Apple"], github: ["Codepen", "Sign in with GitHub"], figma: ["Figma", "Sign in with Figma"] };
export function SocialButton({ provider = "google", children, style = {}, ...rest }) {
  const [icon, label] = LABELS[provider] || LABELS.google;
  return (
    <button type="button" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12, width: "100%", height: 44, padding: "0 16px", border: "1px solid var(--component-colors-components-buttons-secondary-button-secondary-border)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      <Icon name={icon} size={20} />{children || label}
    </button>
  );
}
export default SocialButton;
