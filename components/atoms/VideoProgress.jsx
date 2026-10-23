import React from "react";

/** Untitled UI PRO — Video progress (internal). Scrubber track with buffered + played segments. */
export function VideoProgress({ played = 30, buffered = 55, style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)", ...style }} {...rest}>
      <div style={{ position: "absolute", inset: 0, width: `${buffered}%`, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
      <div style={{ position: "absolute", inset: 0, width: `${played}%`, borderRadius: 2, background: "#fff" }} />
      <span style={{ position: "absolute", top: "50%", left: `${played}%`, transform: "translate(-50%,-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff" }} />
    </div>
  );
}
export default VideoProgress;
