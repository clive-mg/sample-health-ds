import React from "react";
import { FeaturedIcon } from "../feedback/FeaturedIcon.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";
import { OTPInput } from "../forms/OTPInput.jsx";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Email verification (internal). Centered verify-code panel with icon + OTP. */
export function EmailVerification({ email = "you@company.com", style = {}, ...rest }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 360, margin: "0 auto", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}><FeaturedIcon color="brand" size="lg"><Icon name="Mail01" /></FeaturedIcon></div>
      <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>Check your email</h1>
      <p style={{ margin: "8px 0 24px", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>We sent a verification code to {email}</p>
      <div style={{ display: "flex", justifyContent: "center" }}><OTPInput length={4} /></div>
      <Button size="lg" style={{ width: "100%", marginTop: 24 }}>Verify email</Button>
    </div>
  );
}
export default EmailVerification;
