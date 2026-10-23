export interface MobileTabItem { icon?: string; label?: string; }
export interface MobileTabBarProps { items?: MobileTabItem[]; active?: number; onSelect?: (i: number) => void; }
export function MobileTabBar(props: MobileTabBarProps): JSX.Element;
export default MobileTabBar;
