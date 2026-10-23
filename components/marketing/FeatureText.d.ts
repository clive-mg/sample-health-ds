import * as React from "react";
export interface FeatureTextProps { icon?: React.ReactNode; title?: React.ReactNode; align?: "left" | "center"; children?: React.ReactNode; }
export function FeatureText(props: FeatureTextProps): JSX.Element;
export default FeatureText;
