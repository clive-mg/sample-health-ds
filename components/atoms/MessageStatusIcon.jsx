import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Message status icon (internal). Sent / delivered / read ticks. */
export function MessageStatusIcon({ status = "sent", style = {}, ...rest }) {
  const read = status === "read";
  const color = read ? "var(--colors-foreground-fg-brand-primary-600)" : "var(--colors-foreground-fg-quaternary-400)";
  return (
    <span style={{ display: "inline-flex", color, ...style }} {...rest}>
      {status === "sent" ? <Icon name="Check" size={16} /> : <span style={{ display: "inline-flex", marginRight: -6 }}><Icon name="Check" size={16} /><span style={{ marginLeft: -9 }}><Icon name="Check" size={16} /></span></span>}
    </span>
  );
}
export default MessageStatusIcon;
