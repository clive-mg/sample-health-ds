import * as React from "react";
export interface InlineCTAProps { title?: React.ReactNode; description?: React.ReactNode; cta?: React.ReactNode; onClick?: () => void; }
export function InlineCTA(props: InlineCTAProps): JSX.Element;
export default InlineCTA;
