import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Feature icon top (internal). Centered featured icon + heading + text block. */
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
export function FeatureIconTop({ icon = "Zap", title, children, style = {}, ...rest }) {
  return (
    <div style={{ textAlign: "center", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "center" }}><FeaturedIcon color="brand" size="lg"><Icon name={icon} /></FeaturedIcon></div>
      {title && <div style={{ marginTop: 20, fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>}
      {children && <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{children}</p>}
    </div>
  );
}
export default FeatureIconTop;
