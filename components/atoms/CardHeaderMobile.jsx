import React from "react";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Card header (avatar + actions) (internal, breakpoint mobile). Stacked variant. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function CardHeaderMobile({ name, meta, initials, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Avatar size="lg" initials={initials} />
        <button type="button" style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="DotsVertical" size={20} /></button>
      </div>
      <div><div style={{ fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{name}</div>{meta && <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{meta}</div>}</div>
    </div>
  );
}
export default CardHeaderMobile;
