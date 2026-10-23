import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Pagination button group (internal). Prev/next arrow buttons. */
export function PaginationButtonGroup({ dir = "prev", label, disabled = false, onClick, style = {}, ...rest }) {
  const next = dir === "next";
  return (
    <button type="button" disabled={disabled} onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", border: "1px solid var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, ...style }} {...rest}>
      {!next && <Icon name="ArrowLeft" size={20} />}{label || (next ? "Next" : "Previous")}{next && <Icon name="ArrowRight" size={20} />}
    </button>
  );
}
export default PaginationButtonGroup;
