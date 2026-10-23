import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Badge } from "../data-display/Badge.jsx";
import { Button } from "../buttons/Button.jsx";

/** Untitled UI PRO — Careers section. Header + list of open roles. */
export function CareersSection({ eyebrow = "Careers", title = "Open positions", roles = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionHeader eyebrow={eyebrow} title={title} align="center" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 48 }}>
          {roles.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: 24, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{r.title}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  {(r.tags || [r.team, r.location, r.type].filter(Boolean)).map((t, j) => <Badge key={j} color="gray" size="sm">{t}</Badge>)}
                </div>
              </div>
              <Button hierarchy="secondary">Apply</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default CareersSection;
