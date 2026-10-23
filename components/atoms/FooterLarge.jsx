import React from "react";
import { Footer } from "../marketing/Footer.jsx";

/** Untitled UI PRO — Section footer (large) (internal). Full marketing footer with columns + newsletter. */
import { Input } from "../forms/Input.jsx";
import { Button } from "../buttons/Button.jsx";
export function FooterLarge({ brand = "Untitled UI", columns = [], style = {}, ...rest }) {
  return (
    <div style={{ ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 32, flexWrap: "wrap", padding: "48px 32px 0", fontFamily: "var(--font-body)" }}>
        <div style={{ maxWidth: 320 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{brand}</div>
          <p style={{ margin: "12px 0 16px", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>Join our newsletter to stay up to date.</p>
          <div style={{ display: "flex", gap: 8 }}><div style={{ flex: 1 }}><Input placeholder="Email" /></div><Button>Subscribe</Button></div>
        </div>
      </div>
      <Footer brand={brand} columns={columns} />
    </div>
  );
}
export default FooterLarge;
