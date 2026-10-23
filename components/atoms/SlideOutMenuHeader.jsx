import React from "react";
import { CloseButton } from "../buttons/CloseButton.jsx";

/** Untitled UI PRO — Slideout menu header (internal). Title + close row, optional tabs, for drawers. */
export function SlideOutMenuHeader({ title, description, onClose, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, padding: 24, borderBottom: "1px solid var(--colors-border-border-secondary)", ...style }} {...rest}>
      <div><div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>{description && <div style={{ marginTop: 4, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}</div>
      {onClose && <CloseButton onClick={onClose} />}
    </div>
  );
}
export default SlideOutMenuHeader;
