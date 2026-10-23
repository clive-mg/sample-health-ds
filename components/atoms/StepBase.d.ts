import * as React from "react";
export interface StepBaseProps { status?: "complete" | "current" | "incomplete"; title?: React.ReactNode; description?: React.ReactNode; connector?: boolean; }
export function StepBase(props: StepBaseProps): JSX.Element;
export default StepBase;
