import * as React from "react";

/** One level in the trail. The last item is rendered as the current page. */
export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** Optional glyph before the label. */
  icon?: React.ReactNode;
}

/**
 * Breadcrumbs — plain-text trail. Every level but the last is a link; the last
 * is the current page and is not clickable.
 */
export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  /** Separator glyph between crumbs. */
  divider?: "chevron" | "slash";
  /** Levels shown before the middle collapses behind a … menu. 0 never collapses. */
  maxItems?: number;
}
export function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
export default Breadcrumbs;
