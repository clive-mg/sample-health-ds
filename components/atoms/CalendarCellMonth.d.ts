import * as React from "react";
export interface CalendarCellMonthProps { day?: number | string; muted?: boolean; today?: boolean; children?: React.ReactNode; onClick?: () => void; }
export function CalendarCellMonth(props: CalendarCellMonthProps): JSX.Element;
export default CalendarCellMonth;
