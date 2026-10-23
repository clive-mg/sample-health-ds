import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Stats section (dark) (internal). Big-number stats on a brand band. */
export function StatsSectionDark({ stats = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "72px 32px", background: "var(--colors-background-bg-brand-section)", color: "#fff", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${Math.min(stats.length || 1, 4)}, 1fr)`, gap: 32, textAlign: "center" }}>
        {stats.map((s, i) => (
          <div key={i}><div style={{ fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.value}</div><div style={{ marginTop: 8, fontSize: 16, color: "var(--colors-brand-200)" }}>{s.label}</div></div>
        ))}
      </div>
    </section>
  );
}
export default StatsSectionDark;
