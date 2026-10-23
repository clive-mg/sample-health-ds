import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Message action panel (internal). Floating hover toolbar for a message. */
export function MessageActionPanel({ onReply, onReact, onMore, style = {}, ...rest }) {
  const btn = { width: 32, height: 32, border: "none", background: "transparent", borderRadius: 6, cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center" };
  return (
    <div style={{ display: "inline-flex", gap: 2, padding: 4, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 4px 8px -2px var(--colors-effects-shadows-shadow-md-01)", ...style }} {...rest}>
      <button type="button" onClick={onReact} style={btn} aria-label="React">🙂</button>
      <button type="button" onClick={onReply} style={btn} aria-label="Reply"><Icon name="MessageChatCircle" size={18} /></button>
      <button type="button" onClick={onMore} style={btn} aria-label="More"><Icon name="DotsHorizontal" size={18} /></button>
    </div>
  );
}
export default MessageActionPanel;
