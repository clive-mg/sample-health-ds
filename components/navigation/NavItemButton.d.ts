import * as React from "react";
export interface NavItemButtonProps {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
}
export function NavItemButton(props: NavItemButtonProps): JSX.Element;
export default NavItemButton;
