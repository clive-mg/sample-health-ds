import React from "react";
import { SocialButton } from "../marketing/SocialButton.jsx";

/** Untitled UI PRO — Social button group (internal). Stack of social sign-in buttons. */
export function SocialButtonGroup({ providers = ["google", "apple", "github"], style = {}, ...rest }) {
  return <div style={{ display: "grid", gap: 12, ...style }} {...rest}>{providers.map((p) => <SocialButton key={p} provider={p} />)}</div>;
}
export default SocialButtonGroup;
