import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Search bar (large) (internal). Prominent rounded search field. */
export function SearchBarLarge({ placeholder = "Search for anything…", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 56, padding: "0 20px", borderRadius: 9999, border: "1px solid var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Icon name="SearchLg" size={24} style={{ color: "var(--colors-foreground-fg-quaternary-400)" }} />
      <input placeholder={placeholder} style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 16, color: "var(--colors-text-text-primary-900)" }} />
    </div>
  );
}
export default SearchBarLarge;
