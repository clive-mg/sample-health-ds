import React from "react";

/** Untitled UI PRO — Vertical nav item. Sidebar row with icon, label, optional badge; active state. */
export function NavItemButton({ icon, label, active = false, badge, onClick, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "8px 12px", border: "none", cursor: "pointer", borderRadius: 6, textAlign: "left",
        fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, lineHeight: "24px",
        background: active ? "var(--colors-background-bg-active)" : hover ? "var(--colors-background-bg-primary-hover)" : "transparent",
        color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      {icon && <span style={{ color: active ? "var(--colors-foreground-fg-brand-primary-600)" : "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex" }}>{icon}</span>}
      <span style={{ flex: 1 }}>{label}</span>
      {badge != null && <span style={{ padding: "2px 8px", borderRadius: 9999, fontSize: 12, fontWeight: 500, background: "var(--colors-background-bg-secondary)", color: "var(--colors-text-text-secondary-700)" }}>{badge}</span>}
    </button>
  );
}
export default NavItemButton;
