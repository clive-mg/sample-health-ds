import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";

/** Untitled UI PRO — Metrics section. Row of large stat figures with labels. */
export function MetricsSection({ eyebrow, title, description, metrics = [], dark = false, style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", background: dark ? "var(--colors-background-bg-brand-section)" : "transparent", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {(title || eyebrow) && <SectionHeader eyebrow={eyebrow} title={title} description={description} align="center" />}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(metrics.length, 4)}, 1fr)`, gap: 32, marginTop: title ? 56 : 0, textAlign: "center" }}>
          {metrics.map((m, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 60, fontWeight: 600, letterSpacing: "-0.02em", color: dark ? "#fff" : "var(--colors-text-text-brand-primary-900)" }}>{m.value}</div>
              <div style={{ marginTop: 8, fontSize: 18, fontWeight: 600, color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-primary-900)" }}>{m.label}</div>
              {m.description && <div style={{ marginTop: 4, fontSize: 16, color: dark ? "var(--colors-brand-200)" : "var(--colors-text-text-tertiary-600)" }}>{m.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default MetricsSection;
