import React from "react";

/** Untitled UI PRO — Button group base (internal). Single connected segment button. */
export function ButtonGroupBase({ children, active = false, position = "middle", icon, onClick, style = {}, ...rest }) {
  const first = position === "first", last = position === "last";
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 14px", cursor: "pointer", border: "1px solid var(--colors-border-border-primary)", borderLeftWidth: first ? 1 : 0, background: active ? "var(--colors-background-bg-active)" : "var(--colors-background-bg-primary)", color: "var(--colors-text-text-secondary-700)", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, borderTopLeftRadius: first ? "var(--radius-md-px)" : 0, borderBottomLeftRadius: first ? "var(--radius-md-px)" : 0, borderTopRightRadius: last ? "var(--radius-md-px)" : 0, borderBottomRightRadius: last ? "var(--radius-md-px)" : 0, ...style }} {...rest}>{icon}{children}</button>
  );
}
export default ButtonGroupBase;
