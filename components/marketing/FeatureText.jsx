import React from "react";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";

/** Untitled UI PRO — Feature text block. Featured icon + heading + supporting copy. */
export function FeatureText({ icon, title, children, align = "left", style = {}, ...rest }) {
  const center = align === "center";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: center ? "center" : "flex-start", textAlign: center ? "center" : "left", gap: 16, ...style }} {...rest}>
      {icon && <FeaturedIcon color="brand" size="lg">{icon}</FeaturedIcon>}
      <div>
        {title && <div style={{ fontFamily: "var(--font-body)", fontSize: 18, fontWeight: 600, lineHeight: "30px", color: "var(--colors-text-text-primary-900)" }}>{title}</div>}
        {children && <div style={{ marginTop: 8, fontFamily: "var(--font-body)", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{children}</div>}
      </div>
    </div>
  );
}
export default FeatureText;
