import React from "react";

/** Untitled UI PRO — Timeline connector (internal). Vertical rail segment for timelines. */
export function TimelineConnector({ active = false, style = {}, ...rest }) {
  return <span style={{ display: "block", width: 2, flex: 1, minHeight: 24, background: active ? "var(--colors-background-bg-brand-solid)" : "var(--colors-border-border-secondary)", margin: "4px auto", ...style }} {...rest} />;
}
export default TimelineConnector;
