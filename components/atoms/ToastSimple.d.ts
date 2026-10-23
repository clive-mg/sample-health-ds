import * as React from "react";
export interface ToastSimpleProps { message?: React.ReactNode; color?: "gray" | "success" | "error" | "warning"; }
export function ToastSimple(props: ToastSimpleProps): JSX.Element;
export default ToastSimple;
