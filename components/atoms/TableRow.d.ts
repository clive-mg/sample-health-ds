import * as React from "react";
export interface TableRowProps { title?: React.ReactNode; supportingText?: React.ReactNode; initials?: string; cells?: React.ReactNode[]; checked?: boolean; onCheck?: () => void; }
export function TableRow(props: TableRowProps): JSX.Element;
export default TableRow;
