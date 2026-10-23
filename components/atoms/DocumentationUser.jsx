import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Documentation user (internal). Author byline row for docs pages. */
import { Avatar } from "../data-display/Avatar.jsx";
export function DocumentationUser({ name = "Olivia Rhye", role = "Maintainer", initials = "OR", style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="sm" initials={initials} />
      <div><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>{name}</div><div style={{ fontSize: 12, color: "var(--colors-text-text-tertiary-600)" }}>{role}</div></div>
    </div>
  );
}
export default DocumentationUser;
