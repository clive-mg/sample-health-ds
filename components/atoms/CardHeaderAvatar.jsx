import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Card header with avatar (internal). Avatar + name/meta + actions row. */
export function CardHeaderAvatar({ name, meta, initials, src, actions, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <Avatar size="md" initials={initials} src={src} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div>
        {meta && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{meta}</div>}
      </div>
      {actions || <button type="button" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="DotsVertical" size={20} /></button>}
    </div>
  );
}
export default CardHeaderAvatar;
