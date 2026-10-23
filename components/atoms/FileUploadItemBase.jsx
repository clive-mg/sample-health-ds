import React from "react";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — File upload item base (internal). File row frame: icon, name, size (no progress). */
export function FileUploadItemBase({ name = "document.pdf", size = "200 KB", icon = "File02", onRemove, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <FeaturedIcon color="brand" shape="square" size="md"><Icon name={icon} /></FeaturedIcon>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>{name}</div>
        <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{size}</div>
      </div>
      {onRemove && <button type="button" onClick={onRemove} aria-label="Remove" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="Trash01" size={16} /></button>}
    </div>
  );
}
export default FileUploadItemBase;
