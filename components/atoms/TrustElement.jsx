import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Trust element (internal). Icon + label reassurance row (e.g. free trial). */
export function TrustElement({ icon = "CheckCircle", children, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)", ...style }} {...rest}>
      <Icon name={icon} size={20} style={{ color: "var(--colors-foreground-fg-success-primary)" }} />{children}
    </span>
  );
}
export default TrustElement;
