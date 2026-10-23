import * as React from "react";
export interface DatePickerListItemProps { children?: React.ReactNode; selected?: boolean; onClick?: () => void; }
export function DatePickerListItem(props: DatePickerListItemProps): JSX.Element;
export default DatePickerListItem;
