import * as React from "react";
/**
 * Empty state — featured icon, title, supporting text and the action that
 * resolves the emptiness, centred in whatever space has nothing in it.
 */
export interface EmptyStateProps {
  /** sm for a panel or card, md for a section, lg for a whole page. */
  size?: "sm" | "md" | "lg";
  /** `card` draws its own border and radius; `bare` leaves framing to the parent. */
  variant?: "bare" | "card";
  /** Glyph for the featured icon chip. Omit for a text-only state. */
  icon?: React.ReactNode;
  /** Chip colour. Gray for ordinary emptiness; error, warning, brand and success carry meaning. */
  color?: "gray" | "brand" | "error" | "warning" | "success";
  title?: React.ReactNode;
  /** Supporting line under the title. */
  children?: React.ReactNode;
  /** Buttons. A secondary + primary pair, or a primary alone. */
  actions?: React.ReactNode;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
export default EmptyState;
