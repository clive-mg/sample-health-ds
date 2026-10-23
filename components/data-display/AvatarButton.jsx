import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Avatar } from "./Avatar.jsx";

/**
 * Untitled UI PRO — Avatar button. An avatar that is a real control: the menu
 * trigger in a header, a link into a profile. Hover paints a
 * color.surface.hover halo around the disc and keyboard focus swaps it for the
 * focus ring on a color.surface.default gap, so the ring never sits on the
 * photo. With `chevron` the disc and the caret sit spacing.xs apart in a
 * radius.full pill.
 */
export function AvatarButton({
  size = "md", src, initials, status, chevron = false,
  label = "Open menu", onClick, style = {}, ...rest
}) {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const halo = focused
    ? "0 0 0 2px var(--colors-background-bg-primary), 0 0 0 4px var(--colors-effects-focus-rings-focus-ring)"
    : hovered
      ? "0 0 0 4px var(--colors-background-bg-primary-hover)"
      : "none";
  return (
    <button
      data-sh-part="avbtn"
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={() => setFocused(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: chevron ? "var(--spacing-xs-px)" : 0,
        padding: 0, border: "none", background: "transparent", cursor: "pointer",
        borderRadius: 9999, boxShadow: halo, outline: "none",
        color: "var(--colors-text-text-tertiary-600)",
        ...style,
      }}
      {...rest}
    >
      <Avatar size={size} src={src} initials={initials} status={status} />
      {chevron && <span data-sh-part="chevron" style={{ display: "inline-flex" }}><Icon name="ChevronDown" size={16} /></span>}
    </button>
  );
}
export default AvatarButton;
