export interface RadarDatum { label?: string; value: number; }
/**
 * Radar chart — multi-axis polygon chart.
 * @startingPoint section="Charts" subtitle="Radar / spider chart" viewport="260x260"
 */
export interface RadarChartProps { data?: RadarDatum[]; max?: number; size?: number; color?: string; }
export function RadarChart(props: RadarChartProps): JSX.Element;
export default RadarChart;
