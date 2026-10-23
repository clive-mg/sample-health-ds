import React from "react";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Inline CTA (internal). Compact promo row: text + action button. */
export function InlineCTA({ title, description, cta = "Get started", onClick, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: 24, borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-secondary)", flexWrap: "wrap", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div><div style={{ fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>{description && <div style={{ marginTop: 2, fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}</div>
      <Button onClick={onClick} iconTrailing={<Icon name="ArrowRight" size={20} />}>{cta}</Button>
    </div>
  );
}
export default InlineCTA;
