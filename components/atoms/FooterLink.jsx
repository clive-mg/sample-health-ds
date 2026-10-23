import React from "react";

/** Untitled UI PRO — Footer link (internal build-block). Footer nav link with optional badge. */
import { Badge } from "../data-display/Badge.jsx";
export function FooterLink({ children, href = "#", badge, dark = false, style = {}, ...rest }) {
  return (
    <a href={href} onClick={(e) => href === "#" && e.preventDefault()} style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-tertiary-600)", ...style }} {...rest}>
      {children}{badge && <Badge size="sm" color="brand">{badge}</Badge>}
    </a>
  );
}
export default FooterLink;
