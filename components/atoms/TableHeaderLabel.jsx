import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Table header label (internal build-block). Column header w/ sort arrow. */
export function TableHeaderLabel({ children, sort, onClick, style = {}, ...rest }) {
  return (
    <span onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 4, cursor: onClick ? "pointer" : "default", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, lineHeight: "20px", color: "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>
      {children}
      {sort && <Icon name={sort === "asc" ? "ArrowUp" : "ArrowDown"} size={12} />}
    </span>
  );
}
export default TableHeaderLabel;
