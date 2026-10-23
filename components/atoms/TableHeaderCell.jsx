import React from "react";

/** Untitled UI PRO — Table header cell (internal). Header row cell with optional sort. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function TableHeaderCell({ children, sort, onClick, align = "left", style = {}, ...rest }) {
  return (
    <th onClick={onClick} style={{ textAlign: align, padding: "12px 24px", cursor: onClick ? "pointer" : "default", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, lineHeight: "20px", color: "var(--colors-text-text-quaternary-500)", background: "var(--colors-background-bg-secondary-subtle)", whiteSpace: "nowrap", ...style }} {...rest}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{children}{sort && <Icon name={sort === "asc" ? "ArrowUp" : "ArrowDown"} size={12} />}</span>
    </th>
  );
}
export default TableHeaderCell;
