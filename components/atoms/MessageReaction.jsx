import React from "react";

/** Untitled UI PRO — Message reaction (internal). Emoji reaction pill with count. */
export function MessageReaction({ emoji = "👍", count = 1, active = false, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 9999, cursor: "pointer", border: `1px solid ${active ? "var(--colors-border-border-brand)" : "var(--colors-border-border-secondary)"}`, background: active ? "var(--colors-background-bg-brand-primary)" : "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "var(--colors-text-text-secondary-700)", ...style }} {...rest}>
      <span>{emoji}</span><span>{count}</span>
    </button>
  );
}
export default MessageReaction;
