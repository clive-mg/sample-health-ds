import React from "react";
import { StepIcon } from "../navigation/StepIcon.jsx";

/** Untitled UI PRO — Step icon base (internal). Alias marker used inside steppers. */
export function StepIconBase({ status = "current", size = "md", style = {}, ...rest }) {
  return <StepIcon status={status} size={size} style={style} {...rest} />;
}
export default StepIconBase;
