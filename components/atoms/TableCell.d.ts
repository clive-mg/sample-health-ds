import * as React from "react";
export interface TableCellProps { children?: React.ReactNode; supportingText?: React.ReactNode; align?: "left" | "center" | "right"; }
export function TableCell(props: TableCellProps): JSX.Element;
export default TableCell;
