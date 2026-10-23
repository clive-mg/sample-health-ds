import React from "react";
import { CloseButton } from "../buttons/CloseButton.jsx";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";

/** Untitled UI PRO — Modal header (internal build-block). Icon/title/close row for modals. */
export function ModalHeader({ icon, title, description, onClose, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", ...style }} {...rest}>
      {icon && <FeaturedIcon color="brand">{icon}</FeaturedIcon>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 600, lineHeight: "28px", color: "var(--colors-text-text-primary-900)" }}>{title}</div>}
        {description && <div style={{ marginTop: 2, fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}
      </div>
      {onClose && <CloseButton onClick={onClose} />}
    </div>
  );
}
export default ModalHeader;
