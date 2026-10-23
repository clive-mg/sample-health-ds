import React from "react";
import { SectionHeader } from "../layout/SectionHeader.jsx";
import { Avatar } from "../data-display/Avatar.jsx";

/** Untitled UI PRO — Team section. Header + grid of team member cards. */
export function TeamSection({ eyebrow = "Our team", title = "Meet the people behind the product", members = [], style = {}, ...rest }) {
  return (
    <section style={{ padding: "80px 32px", fontFamily: "var(--font-body)", ...style }} {...rest}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader eyebrow={eyebrow} title={title} align="center" />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(members.length || 1, 4)}, 1fr)`, gap: 32, marginTop: 56, textAlign: "center" }}>
          {members.map((m, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "center" }}><Avatar size="2xl" initials={m.initials} src={m.src} /></div>
              <div style={{ marginTop: 16, fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{m.name}</div>
              <div style={{ fontSize: 16, color: "var(--colors-text-text-brand-secondary-700)" }}>{m.role}</div>
              {m.bio && <div style={{ marginTop: 8, fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>{m.bio}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TeamSection;
