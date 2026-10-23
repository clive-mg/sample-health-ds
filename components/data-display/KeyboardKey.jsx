import React from "react";

/** Untitled UI PRO — Keyboard key (kbd). Small chip for shortcut hints. */
export function KeyboardKey({ children, style = {}, ...rest }) {
  return (
    <kbd style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 20, height: 20, padding: "0 5px", borderRadius: "var(--radius-xs-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>{children}</kbd>
  );
}
export default KeyboardKey;
