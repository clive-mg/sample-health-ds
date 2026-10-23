import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Video overlay action (internal). Center play/pause overlay for video. */
export function VideoOverlayAction({ paused = true, onClick, style = {}, ...rest }) {
  return (
    <button type="button" onClick={onClick} aria-label={paused ? "Play" : "Pause"} style={{ position: "absolute", inset: 0, margin: "auto", width: 72, height: 72, borderRadius: "50%", border: "none", cursor: "pointer", background: "color-mix(in srgb, #0A0D12 40%, transparent)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", ...style }} {...rest}>
      <Icon name={paused ? "Play" : "Pause circle"} size={32} />
    </button>
  );
}
export default VideoOverlayAction;
