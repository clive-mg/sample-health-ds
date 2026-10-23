export interface GaugeLegendItem { color?: string; label?: string; value?: string | number; }
export interface ActivityGaugeLegendProps { items?: GaugeLegendItem[]; }
export function ActivityGaugeLegend(props: ActivityGaugeLegendProps): JSX.Element;
export default ActivityGaugeLegend;
