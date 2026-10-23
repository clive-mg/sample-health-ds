import * as React from "react";
export interface TabButtonProps { children?: React.ReactNode; active?: boolean; type?: "underline" | "button"; badge?: React.ReactNode; onClick?: () => void; }
export function TabButton(props: TabButtonProps): JSX.Element;
export default TabButton;
