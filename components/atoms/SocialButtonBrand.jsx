import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Social button (brand-colored) (internal). Filled social button. */
const MAP = { google: ["Chrome", "#DB4437", "Google"], facebook: ["Command", "#1877F2", "Facebook"], x: ["X", "#000000", "X"], apple: ["Command", "#000000", "Apple"] };
export function SocialButtonBrand({ provider = "google", style = {}, ...rest }) {
  const [icon, color, label] = MAP[provider] || MAP.google;
  return (
    <button type="button" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", height: 44, borderRadius: "var(--radius-md-px)", border: "none", cursor: "pointer", background: color, color: "#fff", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, ...style }} {...rest}>
      <Icon name={icon} size={20} />Continue with {label}
    </button>
  );
}
export default SocialButtonBrand;
