import * as React from "react";
export interface LegendItem { label?: React.ReactNode; value?: React.ReactNode; color?: string; }
export interface ChartLegendProps { items?: LegendItem[]; orientation?: "horizontal" | "vertical"; }
export function ChartLegend(props: ChartLegendProps): JSX.Element;
export default ChartLegend;
