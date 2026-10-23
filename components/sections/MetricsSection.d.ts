import * as React from "react";
export interface Metric { value?: React.ReactNode; label?: React.ReactNode; description?: React.ReactNode; }
export interface MetricsSectionProps { eyebrow?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode; metrics?: Metric[]; dark?: boolean; }
export function MetricsSection(props: MetricsSectionProps): JSX.Element;
export default MetricsSection;
