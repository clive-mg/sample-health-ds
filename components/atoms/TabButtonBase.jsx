import React from "react";

/** Untitled UI PRO — Tab button base (internal, button style). Bare segmented tab unit. */
export function TabButtonBase({ children, active = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ padding: "8px 12px", border: "none", borderRadius: "var(--radius-sm-px)", cursor: "pointer", background: active ? "var(--colors-background-bg-primary)" : "transparent", boxShadow: active ? "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)" : "none", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: active ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>{children}</button>
  );
}
export default TabButtonBase;
