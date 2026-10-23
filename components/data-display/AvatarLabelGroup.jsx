import React from "react";
import { Avatar } from "./Avatar.jsx";

/**
 * Untitled UI PRO — Avatar label group. Avatar + name + supporting text, set
 * spacing.lg apart. Both lines step with the size and stay on the type scale:
 * the name is semibold, the supporting line regular one step down or level with
 * it, never larger.
 */
const TYPE = {
  sm: { t: [14, "20px"], s: [14, "20px"] },
  md: { t: [14, "20px"], s: [14, "20px"] },
  lg: { t: [16, "20px"], s: [14, "20px"] },
  xl: { t: [18, "22px"], s: [16, "24px"] },
};

export function AvatarLabelGroup({ size = "md", src, initials, status, title, subtitle, style = {}, ...rest }) {
  const z = TYPE[size] || TYPE.md;
  return (
    <div data-sh-part="alg" style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-lg-px)", ...style }} {...rest}>
      <Avatar size={size === "xl" ? "lg" : size} src={src} initials={initials} status={status} />
      <div data-sh-part="alg-text" style={{ minWidth: 0 }}>
        <div data-sh-part="alg-title" style={{ fontFamily: "var(--font-body)", fontSize: z.t[0], lineHeight: z.t[1], fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
        {subtitle && <div data-sh-part="alg-sub" style={{ fontFamily: "var(--font-body)", fontSize: z.s[0], lineHeight: z.s[1], fontWeight: 400, color: "var(--colors-text-text-tertiary-600)" }}>{subtitle}</div>}
      </div>
    </div>
  );
}
export default AvatarLabelGroup;
