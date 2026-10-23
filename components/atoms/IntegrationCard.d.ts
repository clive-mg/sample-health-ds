export interface IntegrationCardProps { name?: string; description?: string; icon?: string; enabled?: boolean; onToggle?: (v: boolean) => void; }
export function IntegrationCard(props: IntegrationCardProps): JSX.Element;
export default IntegrationCard;
