export interface PieDatum { label?: string; value: number; color?: string; }
/**
 * Pie / donut chart with legend.
 * @startingPoint section="Charts" subtitle="Donut chart + legend" viewport="420x220"
 */
export interface PieChartProps { data?: PieDatum[]; size?: number; donut?: boolean; }
export function PieChart(props: PieChartProps): JSX.Element;
export default PieChart;
