import React from "react";

/** Untitled UI PRO — Video action button (internal). Translucent round control for video overlays. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function VideoActionButton({ icon = "Play", size = "md", onClick, style = {}, ...rest }) {
  const d = size === "lg" ? 64 : size === "sm" ? 32 : 44;
  return (
    <button type="button" onClick={onClick} style={{ width: d, height: d, borderRadius: "50%", border: "none", cursor: "pointer", background: "color-mix(in srgb, #fff 90%, transparent)", color: "var(--colors-gray-light-mode-900)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 4px 8px -2px rgba(10,13,18,0.24)", ...style }} {...rest}>
      <Icon name={icon} size={d * 0.44} />
    </button>
  );
}
export default VideoActionButton;
