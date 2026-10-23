import React from "react";

/** Untitled UI PRO — Fictional company logo (internal). Type wordmark placeholder for demo brands. */
export function CompanyWordmark({ name = "Acme Co.", dark = false, style = {}, ...rest }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", ...style }} {...rest}>
      <span style={{ width: 28, height: 28, borderRadius: 7, background: dark ? "#fff" : "var(--colors-background-bg-brand-solid)", color: dark ? "var(--colors-brand-600)" : "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 16 }}>{name[0]}</span>
      <span style={{ fontSize: 18, fontWeight: 600, color: dark ? "#fff" : "var(--colors-text-text-primary-900)" }}>{name}</span>
    </span>
  );
}
export default CompanyWordmark;
