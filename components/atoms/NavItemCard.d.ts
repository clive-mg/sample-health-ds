import * as React from "react";
export interface NavItemCardProps { icon?: string; title?: React.ReactNode; badge?: React.ReactNode; description?: React.ReactNode; onClick?: () => void; }
export function NavItemCard(props: NavItemCardProps): JSX.Element;
export default NavItemCard;
