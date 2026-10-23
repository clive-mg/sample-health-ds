import React from "react";

/** Untitled UI PRO — Avatar image (internal). Round image with contrast inner border. */
const SZ = { xs: 24, sm: 32, md: 40, lg: 48, xl: 56, "2xl": 64 };
export function AvatarImage({ size = "md", src, alt = "", style = {}, ...rest }) {
  const d = SZ[size] || 40;
  return <span style={{ display: "inline-block", width: d, height: d, borderRadius: "50%", overflow: "hidden", boxShadow: "inset 0 0 0 1px var(--component-colors-components-avatars-avatar-contrast-border)", ...style }} {...rest}><img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /></span>;
}
export default AvatarImage;
