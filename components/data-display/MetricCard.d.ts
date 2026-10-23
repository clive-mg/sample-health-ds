import * as React from "react";
/**
 * Metric card — KPI value with trend badge.
 */
export interface MetricCardProps { label?: React.ReactNode; value?: React.ReactNode; delta?: React.ReactNode; trend?: "up" | "down"; }
export function MetricCard(props: MetricCardProps): JSX.Element;
export default MetricCard;
