import * as React from "react";
export interface TabItem {
  label: React.ReactNode;
  value?: string;
  /** Decorative leading glyph — 18px at sm, 20px at md. Hidden from assistive tech. */
  icon?: React.ReactNode;
  /** Count after the label. */
  count?: React.ReactNode;
  /** Spoken label for the count, e.g. "24 open claims". */
  countLabel?: string;
  /** aria-disabled: the tab stays announced but cannot be selected. */
  disabled?: boolean;
  /** id of the panel this tab controls. */
  controls?: string;
  /** Overrides the `data-sh-part` name — used by the docs diagrams. */
  part?: string;
}
/**
 * Tabs — section switcher.
 * @startingPoint section="Navigation" subtitle="Line, button, segmented & chip tabs" viewport="520x120"
 */
export interface TabsProps {
  items?: TabItem[];
  value?: string;
  defaultValue?: string;
  /** line (default), button, segmented, or chip. */
  type?: "line" | "button" | "segmented" | "chip";
  /** Vertical applies to line and button; segmented and chip are horizontal. */
  orientation?: "horizontal" | "vertical";
  /** sm 14/20 labels, md 16/24 — regular at rest, semibold when selected. */
  size?: "sm" | "md";
  /** Base id — each tab gets `<id>-tab-<value>` so a panel can point at it. */
  id?: string;
  onChange?: (value: string) => void;
}
export function Tabs(props: TabsProps): JSX.Element;
export default Tabs;
