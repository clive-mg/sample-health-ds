import * as React from "react";
export interface TabButtonBaseProps { children?: React.ReactNode; active?: boolean; onClick?: () => void; }
export function TabButtonBase(props: TabButtonBaseProps): JSX.Element;
export default TabButtonBase;
