import * as React from "react";
export interface ChangeProps { value?: React.ReactNode; trend?: "up" | "down"; }
export function Change(props: ChangeProps): JSX.Element;
export default Change;
