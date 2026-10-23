import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — App store badge. "Download on the" pill for App Store / Google Play. */
export function AppStoreBadge({ store = "apple", style = {}, ...rest }) {
  const apple = store === "apple";
  return (
    <a href="#" onClick={(e) => e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: "var(--radius-md-px)", background: "var(--colors-gray-light-mode-950)", color: "#fff", textDecoration: "none", ...style }} {...rest}>
      <Icon name={apple ? "Command" : "Play"} size={24} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.1, fontFamily: "var(--font-body)" }}>
        <span style={{ fontSize: 12, opacity: 0.8 }}>{apple ? "Download on the" : "GET IT ON"}</span>
        <span style={{ fontSize: 16, fontWeight: 600 }}>{apple ? "App Store" : "Google Play"}</span>
      </span>
    </a>
  );
}
export default AppStoreBadge;
