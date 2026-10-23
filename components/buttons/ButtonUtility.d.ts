import * as React from "react";
export interface ButtonUtilityProps { size?: "sm" | "md"; hierarchy?: "secondary" | "tertiary"; active?: boolean; children?: React.ReactNode; }
export function ButtonUtility(props: ButtonUtilityProps): JSX.Element;
export default ButtonUtility;
