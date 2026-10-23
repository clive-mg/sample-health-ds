import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Reaction bar (internal). Row of emoji reactions with counts + add button. */
import { MessageReaction } from "./MessageReaction.jsx";
export function ReactionBar({ reactions = [{ emoji: "👍", count: 3 }], onAdd, style = {}, ...rest }) {
  return (
    <div style={{ display: "inline-flex", gap: 6, alignItems: "center", ...style }} {...rest}>
      {reactions.map((r, i) => <MessageReaction key={i} emoji={r.emoji} count={r.count} active={r.active} />)}
      <button type="button" onClick={onAdd} aria-label="Add reaction" style={{ width: 28, height: 28, borderRadius: 9999, border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Icon name="Plus" size={14} /></button>
    </div>
  );
}
export default ReactionBar;
