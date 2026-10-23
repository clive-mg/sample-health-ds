import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Key (internal). API key / license row with monospace value and copy. */
export function Key({ value = "sk_live_51H••••••••••••", label = "Secret key", onCopy, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", border: "1px solid var(--colors-border-border-primary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-secondary-subtle)", fontFamily: "var(--font-mono)", ...style }} {...rest}>
      <Icon name="Key01" size={18} style={{ color: "var(--colors-foreground-fg-quaternary-400)" }} />
      <span style={{ flex: 1, fontSize: 14, color: "var(--colors-text-text-secondary-700)", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
      <button type="button" onClick={onCopy} aria-label="Copy" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="Copy01" size={16} /></button>
    </div>
  );
}
export default Key;
