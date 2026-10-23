import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Breadcrumb button (internal build-block). Single crumb link/current. */
export function BreadcrumbButton({ children, current = false, icon, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-sm-px)", border: "none", background: "transparent", cursor: "pointer", padding: "var(--spacing-xxs-px) var(--spacing-md-px)", borderRadius: "var(--radius-sm-px)", fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px", fontWeight: current ? 600 : 400, color: current ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-tertiary-600)", ...style }} {...rest}>
      {icon}{children}
    </button>
  );
}
export default BreadcrumbButton;
