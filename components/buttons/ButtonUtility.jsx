import React from "react";

/** Untitled UI PRO — Utility button. Small square/oblong gray icon button for toolbars & tables. */
const SZ = { sm: 28, md: 32 };
export function ButtonUtility({ size = "sm", hierarchy = "secondary", children, active = false, style = {}, ...rest }) {
  const d = SZ[size] || 28;
  const ghost = hierarchy === "tertiary";
  return (
    <button type="button" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: d, height: d, padding: 0, cursor: "pointer",
      borderRadius: "var(--radius-sm-px)",
      border: ghost ? "none" : "1px solid var(--component-colors-components-buttons-secondary-button-secondary-border)",
      background: active ? "var(--colors-background-bg-active)" : ghost ? "transparent" : "var(--colors-background-bg-primary)",
      color: "var(--colors-foreground-fg-quaternary-500)",
      boxShadow: ghost ? "none" : "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = active ? "var(--colors-background-bg-active)" : ghost ? "transparent" : "var(--colors-background-bg-primary)")}
      {...rest}>
      {children}
    </button>
  );
}
export default ButtonUtility;
