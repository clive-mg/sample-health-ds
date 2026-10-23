import * as React from "react";
export interface NavMenuButtonProps { children?: React.ReactNode; open?: boolean; onClick?: () => void; }
export function NavMenuButton(props: NavMenuButtonProps): JSX.Element;
export default NavMenuButton;
