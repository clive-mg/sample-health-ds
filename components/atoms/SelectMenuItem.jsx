import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Select menu item (internal build-block). Option row with check + supporting text. */
export function SelectMenuItem({ children, supportingText, selected = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 10px", border: "none", borderRadius: 6, cursor: "pointer", textAlign: "left", background: selected ? "var(--colors-background-bg-active)" : "transparent", fontFamily: "var(--font-body)", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = selected ? "var(--colors-background-bg-active)" : "transparent")} {...rest}>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontSize: 16, fontWeight: selected ? 500 : 400, color: "var(--colors-text-text-primary-900)" }}>{children}</span>
        {supportingText && <span style={{ display: "block", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{supportingText}</span>}
      </span>
      {selected && <Icon name="Check" size={20} style={{ color: "var(--colors-foreground-fg-brand-primary-600)" }} />}
    </button>
  );
}
export default SelectMenuItem;
