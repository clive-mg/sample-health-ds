import * as React from "react";
export interface BreadcrumbButtonProps { children?: React.ReactNode; current?: boolean; icon?: React.ReactNode; onClick?: () => void; }
export function BreadcrumbButton(props: BreadcrumbButtonProps): JSX.Element;
export default BreadcrumbButton;
