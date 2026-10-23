import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Message composer (internal). Chat input row: field + attach + send. */
export function MessageComposer({ placeholder = "Type a message…", onSend, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, border: "1px solid var(--colors-border-border-primary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <button type="button" aria-label="Attach" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="Paperclip" size={20} /></button>
      <input placeholder={placeholder} style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 14, color: "var(--colors-text-text-primary-900)" }} />
      <button type="button" aria-label="Send" onClick={onSend} style={{ width: 36, height: 36, borderRadius: 8, border: "none", cursor: "pointer", background: "var(--colors-background-bg-brand-solid)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="Send01" size={18} /></button>
    </div>
  );
}
export default MessageComposer;
