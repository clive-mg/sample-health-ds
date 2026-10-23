import React from "react";

/** Untitled UI PRO — OTP / verification code input. N single-character boxes. */
export function OTPInput({ length = 4, value, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(Array(length).fill(""));
  const vals = value != null ? String(value).padEnd(length, " ").slice(0, length).split("") : internal;
  const refs = React.useRef([]);
  const set = (i, ch) => {
    const next = [...vals]; next[i] = ch.slice(-1); const s = next.join("").trim();
    if (value == null) setInternal(next); onChange && onChange(s);
    if (ch && refs.current[i + 1]) refs.current[i + 1].focus();
  };
  return (
    <div style={{ display: "flex", gap: 8, ...style }} {...rest}>
      {Array.from({ length }).map((_, i) => (
        <input key={i} ref={(el) => (refs.current[i] = el)} inputMode="numeric" maxLength={1} value={(vals[i] || "").trim()} onChange={(e) => set(i, e.target.value)}
          style={{ width: 56, height: 56, textAlign: "center", fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)", border: "1px solid var(--colors-border-border-primary)", borderRadius: "var(--radius-md-px)", outline: "none", boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--colors-border-border-brand)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--colors-border-border-primary)")} />
      ))}
    </div>
  );
}
export default OTPInput;
