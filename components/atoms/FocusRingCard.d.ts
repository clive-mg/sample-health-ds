import * as React from "react";
export interface FocusRingCardProps { children?: React.ReactNode; selected?: boolean; onClick?: () => void; }
export function FocusRingCard(props: FocusRingCardProps): JSX.Element;
export default FocusRingCard;
