import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Command menu. Search input + grouped, keyboard-style result list. */
export function CommandMenu({ open = true, onClose, placeholder = "Search commands…", items = [], style = {}, ...rest }) {
  const [q, setQ] = React.useState("");
  if (!open) return null;
  const filtered = items.filter((it) => !q || (it.label || "").toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 120, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh", background: "color-mix(in srgb, var(--colors-background-bg-overlay) 70%, transparent)", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 560, maxWidth: "92vw", background: "var(--colors-background-bg-primary)", borderRadius: "var(--radius-md-px)", boxShadow: "0px 20px 24px -4px var(--colors-effects-shadows-shadow-xl-01), 0px 8px 8px -4px var(--colors-effects-shadows-shadow-xl-02)", overflow: "hidden", ...style }} {...rest}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", borderBottom: "1px solid var(--colors-border-border-secondary)" }}>
          <Icon name="SearchLg" size={20} style={{ color: "var(--colors-foreground-fg-quaternary-400)" }} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: 16, color: "var(--colors-text-text-primary-900)" }} />
          <span style={{ fontSize: 12, padding: "2px 6px", borderRadius: 4, border: "1px solid var(--colors-border-border-secondary)", color: "var(--colors-text-text-quaternary-500)" }}>esc</span>
        </div>
        <div style={{ maxHeight: 360, overflowY: "auto", padding: 8 }}>
          {filtered.length === 0 && <div style={{ padding: 24, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>No results for "{q}"</div>}
          {filtered.map((it, i) => (
            <button key={i} type="button" onClick={() => { it.onClick && it.onClick(); onClose && onClose(); }}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", border: "none", background: "transparent", borderRadius: 8, cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--colors-background-bg-primary-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
              {it.icon && <span style={{ color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}>{it.icon}</span>}
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.shortcut && <span style={{ fontSize: 12, color: "var(--colors-text-text-quaternary-500)" }}>{it.shortcut}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CommandMenu;
