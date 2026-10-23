import React from "react";

/** Untitled UI PRO — Tab button (internal build-block). Single tab pill/underline unit. */
export function TabButton({ children, active = false, type = "underline", onClick, badge, style = {}, ...rest }) {
  const underline = type === "underline";
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", border: "none", background: !underline && active ? "var(--colors-background-bg-primary)" : "transparent",
      padding: underline ? "0 4px 12px" : "8px 12px", borderRadius: underline ? 0 : "var(--radius-sm-px)",
      borderBottom: underline ? `2px solid ${active ? "var(--colors-foreground-fg-brand-primary-600)" : "transparent"}` : "none",
      boxShadow: !underline && active ? "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)" : "none",
      fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: active ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>
      {children}{badge != null && <span style={{ padding: "0 8px", borderRadius: 9999, fontSize: 12, background: "var(--colors-background-bg-secondary)", color: "var(--colors-text-text-secondary-700)" }}>{badge}</span>}
    </button>
  );
}
export default TabButton;
