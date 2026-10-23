import * as React from "react";
export interface NavAccountCardMenuItemProps { icon?: React.ReactNode; children?: React.ReactNode; current?: boolean; onClick?: () => void; }
export function NavAccountCardMenuItem(props: NavAccountCardMenuItemProps): JSX.Element;
export default NavAccountCardMenuItem;
