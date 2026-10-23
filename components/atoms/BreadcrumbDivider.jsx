import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Breadcrumb divider (internal). Separator glyph between breadcrumbs. */
export function BreadcrumbDivider({ type = "chevron", style = {}, ...rest }) {
  if (type === "slash") return <span style={{ color: "var(--colors-text-text-tertiary-600)", fontSize: 14, lineHeight: "20px", fontWeight: 400, ...style }} {...rest}>/</span>;
  return <Icon name="ChevronRight" size={16} style={{ color: "var(--colors-text-text-tertiary-600)", ...style }} {...rest} />;
}
export default BreadcrumbDivider;
