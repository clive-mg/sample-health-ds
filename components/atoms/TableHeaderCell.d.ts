import * as React from "react";
export interface TableHeaderCellProps { children?: React.ReactNode; sort?: "asc" | "desc"; onClick?: () => void; align?: "left" | "center" | "right"; }
export function TableHeaderCell(props: TableHeaderCellProps): JSX.Element;
export default TableHeaderCell;
