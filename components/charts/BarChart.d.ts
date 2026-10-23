export interface BarDatum { label?: string; value: number; }
/**
 * Bar chart — simple SVG column chart.
 * @startingPoint section="Charts" subtitle="Column chart" viewport="480x260"
 */
export interface BarChartProps { data?: BarDatum[]; height?: number; color?: string; }
export function BarChart(props: BarChartProps): JSX.Element;
export default BarChart;
