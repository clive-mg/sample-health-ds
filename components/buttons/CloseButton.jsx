import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/**
 * Untitled UI PRO — Close button (the "X" dismiss control used on modals,
 * banners, alerts and slideouts). Ghost by default; darkBackground inverts it.
 */
const CLOSE_SIZES = { sm: 32, md: 36, lg: 40 };
const ICON_SIZES = { sm: 16, md: 20, lg: 24 };

export function CloseButton({
  size = "md",
  darkBackground = false,
  style = {},
  ...rest
}) {
  const box = CLOSE_SIZES[size] || 36;
  const fg = darkBackground
    ? "var(--colors-foreground-fg-white)"
    : "var(--colors-foreground-fg-quaternary-400)";
  return (
    <button
      type="button"
      aria-label="Close"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: box,
        height: box,
        padding: 0,
        border: "none",
        borderRadius: "var(--radius-sm-px)",
        background: "transparent",
        color: fg,
        cursor: "pointer",
        transition: "background 120ms ease, color 120ms ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = darkBackground
          ? "var(--component-colors-utility-gray-utility-gray-700)"
          : "var(--colors-background-bg-primary-hover)";
        e.currentTarget.style.color = darkBackground
          ? "var(--colors-foreground-fg-white)"
          : "var(--colors-foreground-fg-quaternary-hover)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = fg;
      }}
      {...rest}
    >
      <Icon name="XClose" size={ICON_SIZES[size] || 20} />
    </button>
  );
}

export default CloseButton;
