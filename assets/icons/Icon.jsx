/* Untitled UI PRO — Icon.
   The ~2,396-glyph data set is too large to inline into the compiled design-system
   bundle, so it self-registers on window (window.__UUI_ICONS) via
   assets/icons/icon-data.js, which must be loaded as a plain <script> BEFORE use
   (the @dsCard cards and UI kits do this). Icons paint with currentColor. */
export function Icon({ name, size, ...rest }) {
  const icons = (typeof window !== "undefined" && window.__UUI_ICONS) || {};
  const d = icons[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={d.viewBox}
      fill="none"
      dangerouslySetInnerHTML={{ __html: d.body }}
      {...rest}
    />
  );
}
export default Icon;
