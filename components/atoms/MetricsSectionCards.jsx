import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Metrics section (cards) (internal). Grid of bordered metric tiles. */
import { MetricItem } from "./MetricItem.jsx";
export function MetricsSectionCards({ metrics = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "64px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${Math.min(metrics.length || 1, 4)}, 1fr)`, gap: 24 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: 24, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)" }}>
            <MetricItem label={m.label} value={m.value} delta={m.delta} trend={m.trend} />
          </div>
        ))}
      </div>
    </section>
  );
}
export default MetricsSectionCards;
