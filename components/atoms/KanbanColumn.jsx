import React from "react";

/** Untitled UI PRO — Kanban column (internal). Board column: title, count, card stack. */
export function KanbanColumn({ title, count, children, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px" }}><span style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>{title}</span>{count != null && <span style={{ padding: "0 8px", borderRadius: 9999, background: "var(--colors-background-bg-secondary)", fontSize: 12, color: "var(--colors-text-text-secondary-700)" }}>{count}</span>}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}
export default KanbanColumn;
