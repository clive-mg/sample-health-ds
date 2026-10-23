import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Wizard step dot (internal). Numbered step circle for onboarding wizards. */
export function WizardStepDot({ number = 1, status = "current", style = {}, ...rest }) {
  const complete = status === "complete", current = status === "current";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700,
      background: complete || current ? "var(--colors-background-bg-brand-solid)" : "var(--colors-background-bg-secondary)",
      color: complete || current ? "#fff" : "var(--colors-text-text-quaternary-500)", ...style }} {...rest}>
      {complete ? <Icon name="Check" size={16} /> : number}
    </span>
  );
}
export default WizardStepDot;
