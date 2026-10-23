/**
 * Line chart — smooth SVG line/area chart.
 */
export interface LineChartProps { data?: number[]; height?: number; area?: boolean; color?: string; }
export function LineChart(props: LineChartProps): JSX.Element;
export default LineChart;
