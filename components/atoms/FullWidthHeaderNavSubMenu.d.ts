export interface SubMenuItem { icon?: string; title?: string; description?: string; }
export interface FullWidthHeaderNavSubMenuProps { items?: SubMenuItem[]; columns?: number; }
export function FullWidthHeaderNavSubMenu(props: FullWidthHeaderNavSubMenuProps): JSX.Element;
export default FullWidthHeaderNavSubMenu;
