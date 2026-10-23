import * as React from "react";
export interface ToggleTextProps { label?: React.ReactNode; hint?: React.ReactNode; checked?: boolean; onChange?: (v: boolean) => void; }
export function ToggleText(props: ToggleTextProps): JSX.Element;
export default ToggleText;
