import React from "react";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Marketing header navigation bar. Wordmark, links, auth actions. */
export function HeaderNav({ brand = "Untitled UI", links = ["Products", "Solutions", "Resources", "Pricing"], onLogin, onSignup, style = {}, ...rest }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--colors-background-bg-brand-solid)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 18 }}>{brand[0]}</div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{brand}</span>
        </div>
        <nav style={{ display: "flex", gap: 4 }}>
          {links.map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ padding: "8px 12px", borderRadius: 6, textDecoration: "none", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>{l}</a>)}
        </nav>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Button hierarchy="link-gray" onClick={onLogin}>Log in</Button>
        <Button onClick={onSignup}>Sign up</Button>
      </div>
    </header>
  );
}
export default HeaderNav;
