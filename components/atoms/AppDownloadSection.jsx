import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — App download section (internal). Copy + app store badges. */
import { AppStoreBadge } from "../mockups/AppStoreBadge.jsx";
export function AppDownloadSection({ title = "Get the app", description = "Available on iOS and Android.", style = {}, ...rest }) {
  return (
    <section style={{ padding: "64px 32px", textAlign: "center", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{title}</h2>
      <p style={{ margin: "12px 0 24px", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}><AppStoreBadge store="apple" /><AppStoreBadge store="google" /></div>
    </section>
  );
}
export default AppDownloadSection;
