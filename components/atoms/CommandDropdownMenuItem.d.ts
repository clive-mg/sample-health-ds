import * as React from "react";
export interface CommandDropdownMenuItemProps { icon?: React.ReactNode; children?: React.ReactNode; shortcut?: React.ReactNode; active?: boolean; onClick?: () => void; }
export function CommandDropdownMenuItem(props: CommandDropdownMenuItemProps): JSX.Element;
export default CommandDropdownMenuItem;
