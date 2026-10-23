import * as React from "react";
export interface ContainerProps { children?: React.ReactNode; size?: "desktop" | "narrow"; }
export function Container(props: ContainerProps): JSX.Element;
export default Container;
