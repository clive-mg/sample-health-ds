import * as React from "react";
/**
 * HelpCircle glyph beside a field label; reveals a tooltip on hover and on
 * keyboard focus. Used by Input, Select, MultiSelect, TextArea and
 * DateInputField through their `helpText` prop.
 */
export interface FieldHelpIconProps {
  /** Tooltip title — the help copy itself. */
  text?: React.ReactNode;
  /** Optional second line under the title. */
  supportingText?: React.ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  /** Glyph size in px. 16 at both field sizes. */
  size?: number;
  ariaLabel?: string;
  /** Renders the tooltip open on mount — used by the docs diagrams. */
  defaultOpen?: boolean;
}
export function FieldHelpIcon(props: FieldHelpIconProps): JSX.Element;
export default FieldHelpIcon;
