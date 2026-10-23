import * as React from "react";
export interface NavItemDropdownBaseProps { label?: React.ReactNode; icon?: React.ReactNode; open?: boolean; current?: boolean; children?: React.ReactNode; onToggle?: () => void; }
export function NavItemDropdownBase(props: NavItemDropdownBaseProps): JSX.Element;
export default NavItemDropdownBase;
