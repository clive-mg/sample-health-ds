import React from "react";

/** Untitled UI PRO — Mega input field base (internal). Large bordered field cell for hero inputs. */
export function MegaInputFieldBase({ placeholder = "Enter your email", icon, state = "default", style = {}, ...rest }) {
  const focus = state === "focus";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, height: 60, padding: "0 18px", borderRadius: "var(--radius-lg-px)", border: `1px solid ${focus ? "var(--colors-border-border-brand)" : "var(--colors-border-border-primary)"}`, background: "var(--colors-background-bg-primary)", boxShadow: focus ? "0 0 0 4px var(--colors-brand-100)" : "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      {icon}
      <input placeholder={placeholder} style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-primary-900)" }} />
    </div>
  );
}
export default MegaInputFieldBase;
