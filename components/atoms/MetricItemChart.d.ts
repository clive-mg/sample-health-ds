import * as React from "react";
export interface MetricItemChartProps { label?: React.ReactNode; value?: React.ReactNode; delta?: React.ReactNode; trend?: "up" | "down"; data?: number[]; }
export function MetricItemChart(props: MetricItemChartProps): JSX.Element;
export default MetricItemChart;
