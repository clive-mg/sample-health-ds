import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Text editor icon (internal build-block). Toolbar toggle button for editors. */
export function TextEditorIcon({ icon = "Bold01", active = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, border: "none", borderRadius: 6, cursor: "pointer", background: active ? "var(--colors-background-bg-active)" : "transparent", color: active ? "var(--colors-foreground-fg-brand-primary-600)" : "var(--component-colors-components-text-editor-text-editor-icon-fg)", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.background = active ? "var(--colors-background-bg-active)" : "var(--colors-background-bg-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = active ? "var(--colors-background-bg-active)" : "transparent")} {...rest}>
      <Icon name={icon} size={20} />
    </button>
  );
}
export default TextEditorIcon;
