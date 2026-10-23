import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Search result item (internal). Command/search result with icon + title + category. */
export function SearchResultItem({ icon = "File02", title, category, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", textAlign: "left", padding: "10px 12px", border: "none", borderRadius: 8, cursor: "pointer", background: "transparent", fontFamily: "var(--font-body)", ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")} {...rest}>
      <Icon name={icon} size={20} style={{ color: "var(--colors-foreground-fg-quaternary-400)" }} />
      <span style={{ flex: 1, fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>{title}</span>
      {category && <span style={{ fontSize: 12, color: "var(--colors-text-text-quaternary-500)" }}>{category}</span>}
    </button>
  );
}
export default SearchResultItem;
