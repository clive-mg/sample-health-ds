import * as React from "react";
export interface KanbanCardProps { title?: React.ReactNode; tag?: React.ReactNode; tagColor?: string; avatars?: { initials?: string; src?: string }[]; }
export function KanbanCard(props: KanbanCardProps): JSX.Element;
export default KanbanCard;
