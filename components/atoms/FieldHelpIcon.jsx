import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Tooltip } from "../data-display/Tooltip.jsx";

/**
 * Untitled UI PRO — Field help icon (internal). A HelpCircle glyph that sits
 * beside a field label and reveals a tooltip on hover and on keyboard focus.
 * 16px at both field sizes, drawn in the quaternary icon colour. The hit area is
 * the glyph itself, so it adds no height to the label row.
 */
export function FieldHelpIcon({
  text,
  supportingText,
  placement = "top",
  size = 16,
  ariaLabel = "More information",
  defaultOpen = false,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  return (
    <Tooltip title={text} supportingText={supportingText} placement={placement} open={focused || defaultOpen}>
      <button
        data-sh-part="help"
        type="button"
        aria-label={ariaLabel}
        onClick={(e) => e.preventDefault()}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--spacing-none-px)",
          border: "none",
          background: "transparent",
          borderRadius: "var(--radius-full-px)",
          cursor: "pointer",
          flexShrink: 0,
          outline: "none",
          color: hovered || focused ? "var(--colors-foreground-fg-quaternary-hover)" : "var(--colors-foreground-fg-quaternary-400)",
          boxShadow: focused ? "0 0 0 2px var(--colors-effects-focus-rings-focus-ring)" : "none",
          transition: "color 120ms ease, box-shadow 120ms ease",
          ...style,
        }}
        {...rest}
      >
        <Icon name="HelpCircle" size={size} />
      </button>
    </Tooltip>
  );
}
export default FieldHelpIcon;
