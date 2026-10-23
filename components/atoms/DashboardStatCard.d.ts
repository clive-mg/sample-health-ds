import * as React from "react";
export interface DashboardStatCardProps { icon?: string; label?: React.ReactNode; value?: React.ReactNode; delta?: React.ReactNode; trend?: "up" | "down"; }
export function DashboardStatCard(props: DashboardStatCardProps): JSX.Element;
export default DashboardStatCard;
