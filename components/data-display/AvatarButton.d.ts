import * as React from "react";
/**
 * AvatarButton — a clickable avatar: menu trigger, profile link.
 */
export interface AvatarButtonProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  src?: string;
  initials?: string;
  status?: "online" | "offline";
  /** Show a trailing caret, for menu triggers. */
  chevron?: boolean;
  /** Accessible name — the avatar itself carries none. */
  label?: string;
  onClick?: () => void;
}
export function AvatarButton(props: AvatarButtonProps): JSX.Element;
export default AvatarButton;
