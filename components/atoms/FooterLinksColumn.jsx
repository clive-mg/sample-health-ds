import React from "react";

/** Untitled UI PRO — Footer links column (internal build-block). Titled column of footer links. */
import { FooterLink } from "./FooterLink.jsx";
export function FooterLinksColumn({ title, links = [], dark = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, ...style }} {...rest}>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: dark ? "var(--colors-brand-300)" : "var(--colors-text-text-quaternary-500)" }}>{title}</div>
      {links.map((l, i) => <FooterLink key={i} dark={dark} badge={l.badge}>{l.label || l}</FooterLink>)}
    </div>
  );
}
export default FooterLinksColumn;
