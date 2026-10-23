import * as React from "react";
export interface NavMenuItemProps { icon?: string; title?: React.ReactNode; description?: React.ReactNode; onClick?: () => void; }
export function NavMenuItem(props: NavMenuItemProps): JSX.Element;
export default NavMenuItem;
