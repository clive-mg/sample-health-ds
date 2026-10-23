import React from "react";

/** Untitled UI PRO — Emoji (internal). Emoji glyph rendered at a controlled size. */
export function Emoji({ symbol = "🙂", size = 20, style = {}, ...rest }) {
  return <span role="img" style={{ fontSize: size, lineHeight: 1, ...style }} {...rest}>{symbol}</span>;
}
export default Emoji;
