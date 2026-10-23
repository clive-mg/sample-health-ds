import React from "react";
import { HeaderNav } from "../marketing/HeaderNav.jsx";

/** Untitled UI PRO — Header section (internal). Marketing header nav on a full-width band. */
export function HeaderSection({ brand = "Untitled UI", links, onLogin, onSignup, style = {}, ...rest }) {
  return <div style={{ borderBottom: "1px solid var(--colors-border-border-secondary)", ...style }} {...rest}><HeaderNav brand={brand} links={links} onLogin={onLogin} onSignup={onSignup} /></div>;
}
export default HeaderSection;
