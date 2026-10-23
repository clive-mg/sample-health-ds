import React from "react";

/** Untitled UI PRO — Feed item connector (internal). Vertical line linking activity feed items. */
export function FeedItemConnector({ style = {}, ...rest }) {
  return <span style={{ display: "block", width: 2, flex: 1, minHeight: 24, background: "var(--colors-border-border-secondary)", margin: "4px auto", ...style }} {...rest} />;
}
export default FeedItemConnector;
