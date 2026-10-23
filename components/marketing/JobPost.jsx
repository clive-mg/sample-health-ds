import React from "react";
import { Badge } from "../data-display/Badge.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Job post. Role listing row with title, meta tags and apply CTA. */
export function JobPost({ title = "Product Designer", team = "Design", location = "Remote", type = "Full-time", description, style = {}, ...rest }) {
  return (
    <div style={{ padding: 24, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
          {description && <p style={{ margin: "4px 0 0", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{description}</p>}
          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            {[team, location, type].filter(Boolean).map((t, i) => <Badge key={i} color="gray" size="sm">{t}</Badge>)}
          </div>
        </div>
        <Button hierarchy="secondary" iconTrailing={<Icon name="ArrowRight" size={20} />}>Apply</Button>
      </div>
    </div>
  );
}
export default JobPost;
