import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Breadcrumb home (internal). Home icon crumb starting a breadcrumb trail. */
export function BreadcrumbHome({ onClick, style = {}, ...rest }) {
  return <button type="button" onClick={onClick} aria-label="Home" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-text-text-tertiary-600)", display: "inline-flex", padding: "var(--spacing-xxs-px)", ...style }} {...rest}><Icon name="Home01" size={20} /></button>;
}
export default BreadcrumbHome;
