import * as React from "react";
export interface CalendarHeaderProps { label?: React.ReactNode; onPrev?: () => void; onNext?: () => void; }
export function CalendarHeader(props: CalendarHeaderProps): JSX.Element;
export default CalendarHeader;
