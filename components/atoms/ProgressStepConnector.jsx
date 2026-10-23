import React from "react";

/** Untitled UI PRO — Progress step connector (internal). Line segment between stepper markers. */
export function ProgressStepConnector({ complete = false, vertical = false, style = {}, ...rest }) {
  const bg = complete ? "var(--colors-background-bg-brand-solid)" : "var(--colors-border-border-secondary)";
  return <span style={{ display: "block", background: bg, ...(vertical ? { width: 2, minHeight: 32 } : { height: 2, flex: 1 }), ...style }} {...rest} />;
}
export default ProgressStepConnector;
