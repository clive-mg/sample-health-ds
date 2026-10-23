import React from "react";

/** Untitled UI PRO — Avatar online indicator (internal build-block). Status dot for avatars. */
const SZ = { sm: 8, md: 10, lg: 12, xl: 14 };
export function AvatarOnlineIndicator({ size = "md", online = true, style = {}, ...rest }) {
  const d = SZ[size] || 10;
  return <span style={{ display: "inline-block", width: d, height: d, borderRadius: "50%", border: "1.5px solid var(--colors-background-bg-primary)", background: online ? "var(--colors-success-500)" : "var(--colors-gray-light-mode-300)", ...style }} {...rest} />;
}
export default AvatarOnlineIndicator;
