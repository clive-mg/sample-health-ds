import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Credit card mockup (internal). Stylized payment card face. */
export function CreditCardMockup({ last4 = "1234", name = "OLIVIA RHYE", brand = "VISA", style = {}, ...rest }) {
  return (
    <div style={{ width: 320, aspectRatio: "1.6 / 1", borderRadius: 16, padding: 24, background: "linear-gradient(135deg, var(--colors-brand-600), var(--colors-brand-800))", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", fontFamily: "var(--font-body)", boxShadow: "0px 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><Icon name="Wifi" size={24} style={{ transform: "rotate(90deg)", opacity: 0.9 }} /><span style={{ fontWeight: 600, fontStyle: "italic", fontSize: 18 }}>{brand}</span></div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, letterSpacing: "0.1em" }}>•••• •••• •••• {last4}</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.9 }}><span>{name}</span><span>12/28</span></div>
    </div>
  );
}
export default CreditCardMockup;
