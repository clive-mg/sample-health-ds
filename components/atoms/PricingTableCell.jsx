import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Pricing table cell (internal build-block). Feature cell with check/dash or text. */
export function PricingTableCell({ value = true, align = "center", style = {}, ...rest }) {
  const content = value === true ? <Icon name="CheckCircle" size={24} style={{ color: "var(--colors-foreground-fg-brand-primary-600)" }} />
    : value === false ? <Icon name="XCircle" size={24} style={{ color: "var(--colors-foreground-fg-disabled)" }} />
    : <span style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-secondary-700)" }}>{value}</span>;
  return <div style={{ display: "flex", justifyContent: align === "center" ? "center" : "flex-start", padding: "16px 24px", ...style }} {...rest}>{content}</div>;
}
export default PricingTableCell;
