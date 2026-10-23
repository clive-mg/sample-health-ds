import * as React from "react";
export interface QuotePanelProps { quote?: React.ReactNode; name?: React.ReactNode; title?: React.ReactNode; initials?: string; dark?: boolean; }
export function QuotePanel(props: QuotePanelProps): JSX.Element;
export default QuotePanel;
