import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Header banner (internal). Slim announcement bar with link and dismiss. */
export function HeaderBanner({ children, cta, onClose, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "12px 16px", background: "var(--colors-background-bg-brand-solid)", color: "#fff", fontFamily: "var(--font-body)", fontSize: 14, ...style }} {...rest}>
      <span>{children}</span>
      {cta && <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#fff", fontWeight: 600, textDecoration: "underline" }}>{cta}</a>}
      {onClose && <button type="button" onClick={onClose} aria-label="Dismiss" style={{ marginLeft: "auto", border: "none", background: "transparent", color: "#fff", cursor: "pointer", opacity: 0.8, display: "inline-flex" }}><Icon name="XClose" size={20} /></button>}
    </div>
  );
}
export default HeaderBanner;
