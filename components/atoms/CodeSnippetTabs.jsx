import React from "react";

/** Untitled UI PRO — Code snippet tabs (internal). Tab row for switching code samples. */
export function CodeSnippetTabs({ tabs = [], value, onChange, style = {}, ...rest }) {
  const [internal, setInternal] = React.useState(0);
  const active = value != null ? value : internal;
  return (
    <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--colors-gray-light-mode-950)", ...style }} {...rest}>
      {tabs.map((t, i) => (
        <button key={i} type="button" onClick={() => { if (value == null) setInternal(i); onChange && onChange(i); }}
          style={{ padding: "6px 12px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, background: active === i ? "rgba(255,255,255,0.1)" : "transparent", color: active === i ? "#fff" : "rgba(255,255,255,0.6)" }}>{t}</button>
      ))}
    </div>
  );
}
export default CodeSnippetTabs;
