import React from "react";

/**
 * Untitled UI PRO — Avatar. Sizes xs 24, sm 32, md 40, lg 48, xl 56, 2xl 64.
 * Shows a photo, a person's initials, or a neutral placeholder glyph, with an
 * optional presence dot. The disc is color.surface.canvas behind a
 * color.border.subtle hairline, so an avatar reads as a shape even when it is
 * empty. Initials follow the type scale — 12/18 medium at xs, semibold from sm
 * up — and the presence dot sits on a 2px color.surface.default ring so it
 * stays legible against a photo.
 */
const AV = { xs: 24, sm: 32, md: 40, lg: 48, xl: 56, "2xl": 64 };
const AV_TYPE = {
  xs: { size: 12, line: "18px", weight: 500 },
  sm: { size: 14, line: "20px", weight: 600 },
  md: { size: 16, line: "24px", weight: 600 },
  lg: { size: 18, line: "22px", weight: 600 },
  xl: { size: 20, line: "24px", weight: 600 },
  "2xl": { size: 24, line: "28px", weight: 600 },
};
/* Dot diameter is a control dimension stepped on the spacing scale, not a
   fraction of the disc — a computed fraction lands off-scale at most sizes. */
const AV_DOT = { xs: 6, sm: 8, md: 12, lg: 12, xl: 16, "2xl": 16 };

export function Avatar({ size = "md", src, alt = "", initials, status, style = {}, ...rest }) {
  const d = AV[size] || 40;
  const t = AV_TYPE[size] || AV_TYPE.md;
  const dot = AV_DOT[size] || 12;
  return (
    <span data-sh-part="avatar" style={{ position: "relative", display: "inline-flex", width: d, height: d, ...style }} {...rest}>
      <span
        data-sh-part="disc"
        style={{
          width: d, height: d, borderRadius: "50%", overflow: "hidden",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          background: "var(--colors-background-bg-secondary)",
          color: "var(--colors-text-text-tertiary-600)",
          fontFamily: "var(--font-body)", fontSize: t.size, lineHeight: t.line, fontWeight: t.weight,
          boxShadow: "inset 0 0 0 1px var(--colors-border-border-secondary)",
        }}
      >
        {src
          ? <img data-sh-part="content" src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : initials
            ? <span data-sh-part="content">{initials}</span>
            : <svg data-sh-part="content" width={d * 0.55} height={d * 0.55} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4 0-8 2-8 6v1h16v-1c0-4-4-6-8-6z" /></svg>}
      </span>
      {status && (
        <span
          data-sh-part="status"
          style={{
            position: "absolute", right: 0, bottom: 0, width: dot, height: dot, borderRadius: "50%",
            border: "2px solid var(--colors-background-bg-primary)",
            background: status === "online" ? "var(--colors-success-500)" : "var(--colors-gray-light-mode-300)",
          }}
        />
      )}
    </span>
  );
}
export default Avatar;
