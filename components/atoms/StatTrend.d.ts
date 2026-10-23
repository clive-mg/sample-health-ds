import * as React from "react";
export interface StatTrendProps { value?: React.ReactNode; delta?: React.ReactNode; trend?: "up" | "down"; period?: React.ReactNode; }
export function StatTrend(props: StatTrendProps): JSX.Element;
export default StatTrend;
