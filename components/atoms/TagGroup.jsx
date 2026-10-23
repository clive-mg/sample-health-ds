import React from "react";
import { Badge } from "../data-display/Badge.jsx";
import { BadgeCloseX } from "./BadgeCloseX.jsx";

/** Untitled UI PRO — Tag group (internal). Wrapping row of dismissible badges. */
export function TagGroup({ tags = [], onRemove, style = {}, ...rest }) {
  return <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-md-px)", ...style }} {...rest}>{tags.map((t, i) =>
    <Badge key={i} color="white" iconTrailing={onRemove ? <BadgeCloseX onClick={() => onRemove(i)} /> : null}>{t}</Badge>)}</div>;
}
export default TagGroup;
