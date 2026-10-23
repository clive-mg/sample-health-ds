import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Video large action button (internal). Prominent play button on posters. */
export function VideoLargeActionButton({ onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} aria-label="Play" style={{ width: 80, height: 80, borderRadius: "50%", border: "none", cursor: "pointer", background: "var(--colors-background-bg-primary)", color: "var(--colors-foreground-fg-brand-primary-600)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 8px 8px -4px rgba(10,13,18,0.24)", ...style }} {...rest}>
      <Icon name="Play" size={36} />
    </button>
  );
}
export default VideoLargeActionButton;
