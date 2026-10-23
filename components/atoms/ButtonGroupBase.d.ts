import * as React from "react";
export interface ButtonGroupBaseProps { children?: React.ReactNode; active?: boolean; position?: "first" | "middle" | "last"; icon?: React.ReactNode; onClick?: () => void; }
export function ButtonGroupBase(props: ButtonGroupBaseProps): JSX.Element;
export default ButtonGroupBase;
