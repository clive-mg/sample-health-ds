import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Carousel image (internal). Rounded image slide with optional caption. */
export function CarouselImage({ src, caption, size = "lg", style = {}, ...rest }) {
  return (
    <div style={{ position: "relative", aspectRatio: size === "sm" ? "4 / 3" : "16 / 9", borderRadius: "var(--radius-2xl-px)", overflow: "hidden", background: src ? `center/cover no-repeat url(${src})` : "var(--colors-gray-light-mode-200)", ...style }} {...rest}>
      {caption && <span style={{ position: "absolute", left: 16, bottom: 16, padding: "4px 10px", borderRadius: 6, background: "rgba(10,13,18,0.6)", color: "#fff", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700 }}>{caption}</span>}
    </div>
  );
}
export default CarouselImage;
