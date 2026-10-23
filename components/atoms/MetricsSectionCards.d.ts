export interface MetricsSectionCardsProps { metrics?: { label?: string; value?: string; delta?: string; trend?: "up" | "down" }[]; }
export function MetricsSectionCards(props: MetricsSectionCardsProps): JSX.Element;
export default MetricsSectionCards;
