import * as React from "react";
export interface TimelineItemProps { date?: React.ReactNode; title?: React.ReactNode; description?: React.ReactNode; last?: boolean; }
export function TimelineItem(props: TimelineItemProps): JSX.Element;
export default TimelineItem;
