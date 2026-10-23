import React from "react";

/** Untitled UI PRO — Control handle (internal). Draggable knob for sliders / resizers. */
export function ControlHandle({ size = 24, style = {}, ...rest }) {
  return <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: "var(--component-colors-components-sliders-slider-handle-bg)", border: "1.5px solid var(--component-colors-components-sliders-slider-handle-border)", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-sm-01)", cursor: "grab", ...style }} {...rest} />;
}
export default ControlHandle;
