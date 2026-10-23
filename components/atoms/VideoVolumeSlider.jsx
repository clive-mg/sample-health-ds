import React from "react";

/** Untitled UI PRO — Video volume slider (internal). Horizontal volume track + handle. */
export function VideoVolumeSlider({ value = 60, style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", width: 80, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)", ...style }} {...rest}>
      <div style={{ width: `${value}%`, height: "100%", borderRadius: 2, background: "#fff" }} />
      <span style={{ position: "absolute", top: "50%", left: `${value}%`, transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff" }} />
    </div>
  );
}
export default VideoVolumeSlider;
