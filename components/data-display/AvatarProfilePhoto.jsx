import React from "react";
import { Avatar } from "./Avatar.jsx";

/** Untitled UI PRO — Avatar profile photo. Large avatar with contrast ring and optional status. */
export function AvatarProfilePhoto({ size = "lg", src, initials, status, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", padding: 0, borderRadius: "50%", boxShadow: "0 0 0 4px var(--colors-background-bg-primary), 0 0 0 5px var(--component-colors-components-avatars-avatar-contrast-border)", ...style }} {...rest}>
      <Avatar size={size} src={src} initials={initials} status={status} />
    </span>
  );
}
export default AvatarProfilePhoto;
