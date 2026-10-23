import React from "react";

/** Untitled UI PRO — Pagination dot (internal build-block). Carousel/step dot, current expands. */
export function PaginationDot({ current = false, onClick, style = {}, ...rest }) {
  return <button type="button" onClick={onClick} aria-label="Go to slide" style={{ width: current ? 24 : 8, height: 8, borderRadius: 9999, border: "none", cursor: "pointer", background: current ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-quaternary)", transition: "width 150ms ease", ...style }} {...rest} />;
}
export default PaginationDot;
