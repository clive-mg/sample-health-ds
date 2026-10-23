import React from "react";

/** Untitled UI PRO — Tab bar (mobile) (internal). Bottom nav bar with icon+label tabs. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function MobileTabBar({ items = [], active = 0, onSelect, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", borderTop: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {items.map((it, i) => (
        <button key={i} type="button" onClick={() => onSelect && onSelect(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 0", border: "none", background: "transparent", cursor: "pointer", color: i === active ? "var(--colors-foreground-fg-brand-primary-600)" : "var(--colors-foreground-fg-quaternary-500)" }}>
          <Icon name={it.icon} size={24} /><span style={{ fontSize: 12, fontWeight: 700 }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}
export default MobileTabBar;
