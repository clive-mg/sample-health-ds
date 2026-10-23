import * as React from "react";
/**
 * Avatar — user image, initials or placeholder with optional status dot.
 */
export interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  src?: string;
  alt?: string;
  initials?: string;
  status?: "online" | "offline";
}
export function Avatar(props: AvatarProps): JSX.Element;
export default Avatar;
