import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Nav menu item card (internal). Featured card row in mega-menus with image area. */
export function NavMenuItemCard({ title, description, badge, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "block", width: "100%", textAlign: "left", padding: 0, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-lg-px)", overflow: "hidden", cursor: "pointer", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ height: 96, background: "linear-gradient(135deg,var(--colors-brand-100),var(--colors-brand-50))" }} />
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</span>{badge}</div>
        {description && <div style={{ marginTop: 4, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}
      </div>
    </button>
  );
}
export default NavMenuItemCard;
