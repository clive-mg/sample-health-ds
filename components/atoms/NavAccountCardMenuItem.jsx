import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Nav account card menu item (internal). Account row inside a nav dropdown. */
export function NavAccountCardMenuItem({ icon, children, current = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px", border: "none", borderRadius: 6, cursor: "pointer", textAlign: "left", background: current ? "var(--colors-background-bg-active)" : "transparent", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = current ? "var(--colors-background-bg-active)" : "transparent")} {...rest}>
      {icon && <span style={{ color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}>{icon}</span>}{children}
    </button>
  );
}
export default NavAccountCardMenuItem;
