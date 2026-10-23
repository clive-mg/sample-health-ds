import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Rating stars input (internal). Interactive 5-star rating control. */
export function RatingInput({ value = 0, onChange, size = 24, style = {}, ...rest }) {
  const [hover, setHover] = React.useState(0);
  return (
    <span style={{ display: "inline-flex", gap: 4, ...style }} {...rest}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => onChange && onChange(n)}
          style={{ cursor: "pointer", display: "inline-flex", color: (hover || value) >= n ? "var(--colors-warning-400)" : "var(--colors-border-border-primary)" }}>
          <Icon name="Star01" size={size} />
        </span>
      ))}
    </span>
  );
}
export default RatingInput;
