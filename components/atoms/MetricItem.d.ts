import * as React from "react";
export interface MetricItemProps { label?: React.ReactNode; value?: React.ReactNode; delta?: React.ReactNode; trend?: "up" | "down"; }
export function MetricItem(props: MetricItemProps): JSX.Element;
export default MetricItem;
