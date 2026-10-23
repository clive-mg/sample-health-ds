import * as React from "react";
export interface DocumentationTableCellProps { type?: "text" | "code"; mono?: boolean; children?: React.ReactNode; }
export function DocumentationTableCell(props: DocumentationTableCellProps): JSX.Element;
export default DocumentationTableCell;
