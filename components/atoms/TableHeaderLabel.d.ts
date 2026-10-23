import * as React from "react";
export interface TableHeaderLabelProps { children?: React.ReactNode; sort?: "asc" | "desc"; onClick?: () => void; }
export function TableHeaderLabel(props: TableHeaderLabelProps): JSX.Element;
export default TableHeaderLabel;
