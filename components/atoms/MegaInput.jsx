import React from "react";

/** Untitled UI PRO — Mega input (internal). Oversized search/CTA field for hero sections. */
import { Button } from "../buttons/Button.jsx";
export function MegaInput({ placeholder = "Enter your email", cta = "Get started", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: 6, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-primary)", background: "var(--colors-background-bg-primary)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)", ...style }} {...rest}>
      <input placeholder={placeholder} style={{ flex: 1, border: "none", outline: "none", background: "transparent", padding: "0 12px", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-primary-900)" }} />
      <Button size="lg">{cta}</Button>
    </div>
  );
}
export default MegaInput;
