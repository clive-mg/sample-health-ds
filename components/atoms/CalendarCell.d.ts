export interface CalendarCellProps { day?: number | string; selected?: boolean; today?: boolean; muted?: boolean; onClick?: () => void; }
export function CalendarCell(props: CalendarCellProps): JSX.Element;
export default CalendarCell;
