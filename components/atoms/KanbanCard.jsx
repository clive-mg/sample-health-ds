import React from "react";

/** Untitled UI PRO — Kanban card (internal). Board card: title, meta, avatar row. */
import { Badge } from "../data-display/Badge.jsx";
import { AvatarGroup } from "../data-display/AvatarGroup.jsx";
export function KanbanCard({ title, tag, tagColor = "brand", avatars = [], style = {}, ...rest }) {
  return (
    <div style={{ padding: 16, borderRadius: "var(--radius-lg-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {tag && <Badge color={tagColor} size="sm">{tag}</Badge>}
      <div style={{ margin: "10px 0 12px", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
      {avatars.length > 0 && <AvatarGroup size="xs" avatars={avatars} max={4} />}
    </div>
  );
}
export default KanbanCard;
