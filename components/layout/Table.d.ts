import * as React from "react";
export interface Column { key?: string; header?: React.ReactNode; render?: (row: any) => React.ReactNode; width?: number | string; align?: "left" | "center" | "right"; sortable?: boolean; }
export interface TablePagination { page: number; pages: number; onPrev?: () => void; onNext?: () => void; }
/**
 * Table — card-wrapped data table.
 * @startingPoint section="Layout" subtitle="Header, rows & cell renderers" viewport="700x360"
 */
export interface TableProps {
  columns?: Column[];
  data?: any[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  /** Row density. sm = 12px block padding, md = 16px. */
  size?: "sm" | "md";
  /** Row treatment: 1px dividers, or alternating subtle fills. */
  fill?: "divider" | "alternating";
  /** Adds a leading checkbox column with a select-all header. */
  selectable?: boolean;
  selected?: Array<string | number>;
  defaultSelected?: Array<string | number>;
  onSelectionChange?: (keys: Array<string | number>) => void;
  rowKey?: (row: any) => string | number;
  /** Current sort. Columns opt in with `sortable: true`. */
  sort?: { key: string; dir: "asc" | "desc" };
  onSort?: (key: string, dir: "asc" | "desc") => void;
  rowDisabled?: (row: any) => boolean;
  pagination?: TablePagination;
  /** Any node docked inside the card under the last row, above a 1px divider — e.g. a borderless `<Pagination variant="toolbar">`. Ignored when `pagination` is set. */
  footer?: React.ReactNode;
  /** Swaps the body for the `empty` or `error` node. */
  state?: "ready" | "empty" | "error";
  empty?: React.ReactNode;
  error?: React.ReactNode;
  /** Docs only: stamps data-sh-part hooks for annotated token maps. */
  annotate?: boolean;
}
export function Table(props: TableProps): JSX.Element;
export default Table;
