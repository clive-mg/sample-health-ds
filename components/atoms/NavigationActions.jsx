import React from "react";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Navigation actions (internal). Auth button cluster for headers (logged in/out). */
export function NavigationActions({ loggedIn = false, onLogin, onSignup, style = {}, ...rest }) {
  if (loggedIn) return <div style={{ display: "flex", gap: 12, alignItems: "center", ...style }} {...rest}><Button hierarchy="secondary" size="sm">Dashboard</Button></div>;
  return (
    <div style={{ display: "flex", gap: 12, ...style }} {...rest}>
      <Button hierarchy="link-gray" onClick={onLogin}>Log in</Button>
      <Button onClick={onSignup}>Sign up</Button>
    </div>
  );
}
export default NavigationActions;
