import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Badge } from "../data-display/Badge.jsx";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Listing search result (internal). Result row: thumb, title, meta, price, action. */
export function ListingSearchResult({ title = "Modern loft apartment", meta = "Melbourne, VIC", price = "$420 / night", rating = "4.9", image, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: 16, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ flex: "0 0 160px", aspectRatio: "4 / 3", borderRadius: "var(--radius-lg-px)", background: image ? `center/cover no-repeat url(${image})` : "var(--colors-gray-light-mode-200)" }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
          <Badge color="gray" size="sm">★ {rating}</Badge>
        </div>
        <div style={{ marginTop: 4, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{meta}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{price}</span>
          <Button hierarchy="secondary" size="sm">View</Button>
        </div>
      </div>
    </div>
  );
}
export default ListingSearchResult;
