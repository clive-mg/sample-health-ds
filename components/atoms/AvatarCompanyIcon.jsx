import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Avatar company icon (internal build-block). Squared brand tile with initial. */
const SZ = { sm: 32, md: 40, lg: 48 };
export function AvatarCompanyIcon({ size = "md", initial = "U", style = {}, ...rest }) {
  const d = SZ[size] || 40;
  return <span style={{ width: d, height: d, borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-brand-solid)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: d * 0.42, ...style }} {...rest}>{initial}</span>;
}
export default AvatarCompanyIcon;
