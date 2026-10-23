import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Carousel arrow (internal). Circular prev/next control. */
export function CarouselArrow({ dir = "left", size = "md", onClick, style = {}, ...rest }) {
  const d = size === "lg" ? 56 : 40;
  return (
    <button type="button" aria-label={dir} onClick={onClick} style={{ width: d, height: d, borderRadius: "50%", border: "1px solid var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-foreground-fg-quaternary-500)", ...style }} {...rest}>
      <Icon name={dir === "right" ? "ChevronRight" : "ChevronLeft"} size={24} />
    </button>
  );
}
export default CarouselArrow;
