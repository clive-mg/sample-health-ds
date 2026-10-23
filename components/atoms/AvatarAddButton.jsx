import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Avatar add button (internal build-block). Dashed circular "add member" control. */
const SZ = { sm: 32, md: 40, lg: 48 };
export function AvatarAddButton({ size = "md", onClick, style = {}, ...rest }) {
  const d = SZ[size] || 40;
  return (
    <button type="button" onClick={onClick} aria-label="Add" style={{ width: d, height: d, borderRadius: "50%", border: "1px dashed var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", ...style }} {...rest}>
      <Icon name="Plus" size={d * 0.5} />
    </button>
  );
}
export default AvatarAddButton;
