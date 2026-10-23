import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Video actions bar (internal). Bottom control bar: play, progress, time, volume. */
export function VideoActionsBar({ playing = false, progress = 30, duration = "3:24", onToggle, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "linear-gradient(transparent, rgba(10,13,18,0.6))", color: "#fff", ...style }} {...rest}>
      <button type="button" onClick={onToggle} style={{ border: "none", background: "transparent", color: "#fff", cursor: "pointer", display: "inline-flex" }}><Icon name={playing ? "Pause circle" : "Play"} size={20} /></button>
      <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)" }}><div style={{ width: `${progress}%`, height: "100%", borderRadius: 2, background: "#fff" }} /></div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12 }}>{duration}</span>
      <Icon name="Volume Max" size={20} />
    </div>
  );
}
export default VideoActionsBar;
