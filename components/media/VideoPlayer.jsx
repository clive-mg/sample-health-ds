import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Video player. Poster + centered play button and a control bar. Presentational. */
export function VideoPlayer({ poster, title, duration = "3:24", style = {}, ...rest }) {
  const [playing, setPlaying] = React.useState(false);
  return (
    <div style={{ position: "relative", aspectRatio: "16 / 9", width: "100%", borderRadius: "var(--radius-2xl-px)", overflow: "hidden", background: poster ? `center/cover no-repeat url(${poster})` : "var(--colors-gray-light-mode-900)", ...style }} {...rest}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "color-mix(in srgb, #0A0D12 24%, transparent)" }}>
        <button type="button" onClick={() => setPlaying((p) => !p)} aria-label="Play"
          style={{ width: 72, height: 72, borderRadius: "50%", border: "none", cursor: "pointer", background: "color-mix(in srgb, #fff 90%, transparent)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-gray-light-mode-900)", boxShadow: "0px 8px 8px -4px rgba(10,13,18,0.24)" }}>
          <Icon name={playing ? "Pause circle" : "Play"} size={32} />
        </button>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", gap: 12, padding: 16, background: "linear-gradient(transparent, rgba(10,13,18,0.6))", color: "#fff" }}>
        <Icon name={playing ? "Pause circle" : "Play"} size={20} />
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.3)" }}><div style={{ width: "30%", height: "100%", borderRadius: 2, background: "#fff" }} /></div>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12 }}>{duration}</span>
        <Icon name="Volume Max" size={20} />
      </div>
      {title && <div style={{ position: "absolute", top: 16, left: 16, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "#fff" }}>{title}</div>}
    </div>
  );
}
export default VideoPlayer;
