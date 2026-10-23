import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Star rating. Read-only or interactive 0–5 stars. */
export function Rating({ value = 0, max = 5, size = 20, onChange, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(0);
  return (
    <span style={{ display: "inline-flex", gap: 2, ...style }} {...rest}>
      {Array.from({ length: max }).map((_, i) => {
        const active = (hover || value) > i;
        return (
          <span key={i} onMouseEnter={() => onChange && setHover(i + 1)} onMouseLeave={() => onChange && setHover(0)} onClick={() => onChange && onChange(i + 1)}
            style={{ display: "inline-flex", cursor: onChange ? "pointer" : "default", color: active ? "var(--colors-warning-400)" : "var(--colors-border-border-primary)" }}>
            <Icon name="Star01" size={size} />
          </span>
        );
      })}
    </span>
  );
}
export default Rating;
