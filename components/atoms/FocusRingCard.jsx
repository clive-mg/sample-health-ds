import React from "react";

/** Untitled UI PRO — Focus ring card (internal). Selectable card with brand focus ring when active. */
export function FocusRingCard({ children, selected = false, onClick, style = {}, ...rest }) {
  return <div onClick={onClick} tabIndex={0} style={{ padding: 20, borderRadius: "var(--radius-md-px)", cursor: "pointer", background: "var(--colors-background-bg-primary)", border: `1px solid ${selected ? "var(--colors-border-border-brand)" : "var(--colors-border-border-secondary)"}`, boxShadow: selected ? "0 0 0 4px var(--colors-brand-100)" : "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", outline: "none", ...style }} {...rest}>{children}</div>;
}
export default FocusRingCard;
