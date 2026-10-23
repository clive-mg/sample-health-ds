import * as React from "react";
export interface DropdownListItemProps { icon?: React.ReactNode; children?: React.ReactNode; selected?: boolean; shortcut?: React.ReactNode; onClick?: () => void; }
export function DropdownListItem(props: DropdownListItemProps): JSX.Element;
export default DropdownListItem;
