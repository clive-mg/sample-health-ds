import React from "react";

/** Untitled UI PRO — Carousel. Image/slide carousel with arrows and dot indicators. */
import { Icon } from "../../assets/icons/Icon.jsx";
export function Carousel({ slides = [], style = {}, ...rest }) {
  const [i, setI] = React.useState(0);
  const n = slides.length || 1;
  const go = (d) => setI((p) => (p + d + n) % n);
  return (
    <div style={{ position: "relative", borderRadius: "var(--radius-2xl-px)", overflow: "hidden", background: "var(--colors-background-bg-secondary)", ...style }} {...rest}>
      <div style={{ display: "flex", transform: `translateX(-${i * 100}%)`, transition: "transform 300ms ease" }}>
        {slides.map((s, idx) => (
          <div key={idx} style={{ flex: "0 0 100%", aspectRatio: "16 / 9", background: s.src ? `center/cover no-repeat url(${s.src})` : "var(--colors-gray-light-mode-200)", display: "flex", alignItems: "flex-end", padding: 20 }}>
            {s.caption && <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "#fff", background: "rgba(10,13,18,0.6)", padding: "4px 10px", borderRadius: 6 }}>{s.caption}</span>}
          </div>
        ))}
      </div>
      <button type="button" aria-label="Previous" onClick={() => go(-1)} style={arrow("left")}><Icon name="ChevronLeft" size={20} /></button>
      <button type="button" aria-label="Next" onClick={() => go(1)} style={arrow("right")}><Icon name="ChevronRight" size={20} /></button>
      <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
        {slides.map((_, idx) => <span key={idx} onClick={() => setI(idx)} style={{ width: 8, height: 8, borderRadius: "50%", cursor: "pointer", background: idx === i ? "#fff" : "rgba(255,255,255,0.5)" }} />)}
      </div>
    </div>
  );
}
const arrow = (side) => ({ position: "absolute", top: "50%", [side]: 12, transform: "translateY(-50%)", width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", background: "rgba(255,255,255,0.9)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--colors-gray-light-mode-900)", boxShadow: "0px 4px 8px -2px rgba(10,13,18,0.24)" });
export default Carousel;
