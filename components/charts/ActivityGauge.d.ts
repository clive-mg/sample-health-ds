import * as React from "react";
/**
 * Activity gauge — semicircle progress gauge.
 */
export interface ActivityGaugeProps { value?: number; max?: number; size?: number; label?: React.ReactNode; color?: string; }
export function ActivityGauge(props: ActivityGaugeProps): JSX.Element;
export default ActivityGauge;
