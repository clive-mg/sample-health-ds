import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Banner. Full-width announcement strip; brand (dark) or gray theme. */
export function Banner({ theme = "brand", children, actions, onClose, style = {}, ...rest }) {
  const dark = theme === "brand";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", boxSizing: "border-box", width: "100%",
      background: dark ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-secondary)",
      color: dark ? "var(--colors-text-text-primary-on-brand)" : "var(--colors-text-text-secondary-700)",
      ...style,
    }} {...rest}>
      <div style={{ flex: 1, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px" }}>{children}</div>
      {actions && <div style={{ display: "flex", gap: 12, alignItems: "center" }}>{actions}</div>}
      {onClose && (
        <button type="button" aria-label="Dismiss" onClick={onClose} style={{ border: "none", background: "transparent", padding: 2, cursor: "pointer", color: "inherit", opacity: 0.8 }}>
          <Icon name="XClose" size={20} />
        </button>
      )}
    </div>
  );
}
export default Banner;
