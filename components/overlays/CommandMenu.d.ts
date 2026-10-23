import * as React from "react";
export interface CommandItem { label?: React.ReactNode; icon?: React.ReactNode; shortcut?: React.ReactNode; onClick?: () => void; }
/**
 * Command menu — searchable ⌘K action palette.
 * @startingPoint section="Overlays" subtitle="⌘K command palette" viewport="600x420"
 */
export interface CommandMenuProps {
  open?: boolean;
  onClose?: () => void;
  placeholder?: string;
  items?: CommandItem[];
}
export function CommandMenu(props: CommandMenuProps): JSX.Element | null;
export default CommandMenu;
