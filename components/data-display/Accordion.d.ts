import * as React from "react";
export interface AccordionItem {
  title?: React.ReactNode;
  /** Optional second line under the title, visible whether the panel is open or shut. */
  supportingText?: React.ReactNode;
  /** Panel contents — text or any node. */
  content?: React.ReactNode;
  disabled?: boolean;
}
/**
 * Accordion — collapsible disclosure / FAQ list.
 * @startingPoint section="Data display" subtitle="Expandable FAQ items" viewport="620x320"
 */
export interface AccordionProps {
  items?: AccordionItem[];
  /** Container treatment. Default "dividers". */
  variant?: "dividers" | "card" | "cards" | "filled";
  /** Toggle glyph. Default "chevron" (right edge); "chevronLeft" puts it before the title; "chevronInline" sits it directly after the title. */
  indicator?: "chevron" | "plusMinus" | "chevronLeft" | "chevronInline";
  /** Vertical alignment of the indicator against the title. Default "start" — level with the first line, for titles that wrap. Use "center" when titles carry a leading icon or other content taller than one line. */
  align?: "start" | "center";
  /** Allow several panels open at once. Default false — opening one shuts the last. */
  multiple?: boolean;
  /** Index, or list of indices when multiple. Default 0 — the first item opens. */
  defaultOpen?: number | number[] | null;
  onOpenChange?: (open: number | number[] | null) => void;
}
export function Accordion(props: AccordionProps): JSX.Element;
export default Accordion;
