import * as React from "react";
export interface KanbanColumnProps { title?: React.ReactNode; count?: number; children?: React.ReactNode; }
export function KanbanColumn(props: KanbanColumnProps): JSX.Element;
export default KanbanColumn;
