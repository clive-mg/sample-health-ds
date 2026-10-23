import React from "react";
import { Avatar } from "./Avatar.jsx";

/**
 * Untitled UI PRO — Avatar group. Overlapping avatars with a +N overflow chip.
 * The overlap steps on the spacing scale rather than as a fraction of the disc,
 * and every avatar carries a 2px color.surface.default ring so the stack reads
 * as separate people. The counter is 12/18 bold at xs and sm, 14/20 semibold at
 * md and lg.
 */
const AV = { xs: 24, sm: 32, md: 40, lg: 48 };
const OVERLAP = { xs: 8, sm: 8, md: 12, lg: 16 };
const COUNT_TYPE = {
  xs: { size: 12, line: "18px", weight: 700 },
  sm: { size: 12, line: "18px", weight: 700 },
  md: { size: 14, line: "20px", weight: 600 },
  lg: { size: 14, line: "20px", weight: 600 },
};

export function AvatarGroup({ size = "md", avatars = [], max = 5, style = {}, ...rest }) {
  const d = AV[size] || 40;
  const lap = OVERLAP[size] || 12;
  const t = COUNT_TYPE[size] || COUNT_TYPE.md;
  const shown = avatars.slice(0, max);
  const extra = avatars.length - shown.length;
  const ring = { borderRadius: "50%", boxShadow: "0 0 0 2px var(--colors-background-bg-primary)" };
  return (
    <div data-sh-part="group" style={{ display: "inline-flex", alignItems: "center", ...style }} {...rest}>
      {shown.map((a, i) => (
        <span key={i} data-sh-part={i === 0 ? "av-first" : "av"} style={{ ...ring, marginLeft: i === 0 ? 0 : -lap, position: "relative", zIndex: i }}>
          <Avatar size={size} src={a.src} initials={a.initials} />
        </span>
      ))}
      {extra > 0 && (
        <span
          data-sh-part="overflow"
          style={{
            ...ring, marginLeft: -lap, width: d, height: d,
            background: "var(--colors-background-bg-secondary)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-body)", fontSize: t.size, lineHeight: t.line, fontWeight: t.weight,
            color: "var(--colors-text-text-tertiary-600)",
          }}
        >+{extra}</span>
      )}
    </div>
  );
}
export default AvatarGroup;
