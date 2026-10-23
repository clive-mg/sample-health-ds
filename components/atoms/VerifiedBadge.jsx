import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Verified badge (internal). Inline name + verified tick. */
export function VerifiedBadge({ name, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-primary-900)", ...style }} {...rest}>
      {name}<Icon name="CheckVerified01" size={16} style={{ color: "var(--colors-foreground-fg-brand-primary-600)" }} />
    </span>
  );
}
export default VerifiedBadge;
