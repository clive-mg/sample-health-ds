import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Feed connector item (internal). Timeline row with left rail + card content. */
import { Avatar } from "../data-display/Avatar.jsx";
export function FeedItemActivity({ initials = "OR", name = "Olivia", action = "created a project", time = "2h ago", connector = true, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", gap: 16, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar size="sm" initials={initials} />
        {connector && <span style={{ flex: 1, width: 2, background: "var(--colors-border-border-secondary)", margin: "4px 0", minHeight: 24 }} />}
      </div>
      <div style={{ paddingBottom: connector ? 24 : 0 }}>
        <div style={{ fontSize: 14, color: "var(--colors-text-text-secondary-700)" }}><b style={{ fontWeight: 600 }}>{name}</b> {action}</div>
        <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{time}</div>
      </div>
    </div>
  );
}
export default FeedItemActivity;
