import * as React from "react";
/**
 * Header nav — marketing top navigation bar.
 */
export interface HeaderNavProps {
  brand?: string;
  links?: string[];
  onLogin?: () => void;
  onSignup?: () => void;
}
export function HeaderNav(props: HeaderNavProps): JSX.Element;
export default HeaderNav;
