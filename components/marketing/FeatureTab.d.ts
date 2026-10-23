import * as React from "react";
export interface FeatureTabProps { title?: React.ReactNode; description?: React.ReactNode; icon?: React.ReactNode; active?: boolean; onClick?: () => void; }
export function FeatureTab(props: FeatureTabProps): JSX.Element;
export default FeatureTab;
