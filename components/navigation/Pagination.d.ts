import * as React from "react";
/**
 * Pagination — four ways to move through a paged list. Give it `total` pages,
 * or `totalItems` and `perPage` and it works the page count out.
 */
export interface PaginationProps {
  /**
   * numbers — Previous / page chips / Next.
   * toolbar — record count, first-prev-jump-next-last, records per page.
   * compact — record count and one pair of arrows.
   * simple — Previous / Page X of N / Next.
   */
  variant?: "numbers" | "toolbar" | "compact" | "simple";
  /** Total pages. Overrides the count derived from totalItems / perPage. */
  total?: number;
  /** Total rows. Required for the "Showing 1-10 of 75" line. */
  totalItems?: number;
  /** Rows per page. Required for the count line and the records-per-page select. */
  perPage?: number;
  /** Choices in the records-per-page select. */
  perPageOptions?: number[];
  onPerPageChange?: (perPage: number) => void;
  page?: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
}
export function Pagination(props: PaginationProps): JSX.Element;
export default Pagination;
