import React from "react";
import { Badge } from "../data-display/Badge.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../../assets/icons/Icon.jsx";

/** Untitled UI PRO — Job card (internal). Open-role tile: title, department, location, apply. */
export function JobCard({ title = "Product Designer", department = "Design", location = "Remote", type = "Full-time", style = {}, ...rest }) {
  return (
    <div style={{ padding: 24, border: "1px solid var(--colors-border-border-secondary)", borderRadius: "var(--radius-md-px)", background: "var(--colors-background-bg-primary)", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{title}</div>
      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>{[department, location, type].filter(Boolean).map((t, i) => <Badge key={i} color="gray" size="sm">{t}</Badge>)}</div>
      <div style={{ marginTop: 20 }}><Button hierarchy="link-color" iconTrailing={<Icon name="ArrowRight" size={20} />}>View role</Button></div>
    </div>
  );
}
export default JobCard;
