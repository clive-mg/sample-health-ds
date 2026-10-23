import * as React from "react";
export interface NavMenuItemCardProps { title?: React.ReactNode; description?: React.ReactNode; badge?: React.ReactNode; onClick?: () => void; }
export function NavMenuItemCard(props: NavMenuItemCardProps): JSX.Element;
export default NavMenuItemCard;
