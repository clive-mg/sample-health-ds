import * as React from "react";
export interface NavItemBaseProps { children?: React.ReactNode; current?: boolean; onClick?: () => void; }
export function NavItemBase(props: NavItemBaseProps): JSX.Element;
export default NavItemBase;
