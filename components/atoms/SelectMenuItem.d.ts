import * as React from "react";
export interface SelectMenuItemProps { children?: React.ReactNode; supportingText?: React.ReactNode; selected?: boolean; onClick?: () => void; }
export function SelectMenuItem(props: SelectMenuItemProps): JSX.Element;
export default SelectMenuItem;
