import React from "react";
import { StepIcon } from "../navigation/StepIcon.jsx";

/** Untitled UI PRO — Step base (internal). One step: icon marker + title + description. */
export function StepBase({ status = "current", title, description, connector = false, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 12, ...style }} {...rest}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <StepIcon status={status} />
        {connector && <span style={{ flex: 1, width: 2, minHeight: 32, background: status === "complete" ? "var(--colors-background-bg-brand-solid)" : "var(--colors-border-border-secondary)", margin: "4px 0" }} />}
      </div>
      <div style={{ paddingBottom: connector ? 24 : 0 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: status === "incomplete" ? "var(--colors-text-text-quaternary-500)" : "var(--colors-text-text-secondary-700)" }}>{title}</div>
        {description && <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{description}</div>}
      </div>
    </div>
  );
}
export default StepBase;
