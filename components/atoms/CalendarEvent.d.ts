import * as React from "react";
export interface CalendarEventProps { title?: React.ReactNode; time?: React.ReactNode; color?: string; }
export function CalendarEvent(props: CalendarEventProps): JSX.Element;
export default CalendarEvent;
