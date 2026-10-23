import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Message action button (internal). Hover action (reply, react, more) on messages. */
export function MessageActionButton({ icon = "MessageChatCircle", onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ width: 32, height: 32, border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", borderRadius: 6, cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}><Icon name={icon} size={16} /></button>
  );
}
export default MessageActionButton;
