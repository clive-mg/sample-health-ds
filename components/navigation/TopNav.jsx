import React from "react";
import { Icon } from "../../assets/icons/Icon.jsx";
import { Avatar } from "../data-display/Avatar.jsx";
import { Button } from "../buttons/Button.jsx";
import { NavUtilityBar, NAV_THEMES } from "./NavUtilityBar.jsx";

/**
 * Sample Health — Top navigation (horizontal header).
 *
 * One bar, three themes, four optional layers: a utility strip above, the
 * primary row, a sub-nav row below, and the account/auth cluster on the right.
 * Items with `children` open a dropdown on click; the panel always uses the
 * default light surface so long menus stay readable on a dark or brand bar.
 *
 * Spacing scale only (md 8, lg 12, xl 16, 4xl 32). Heights derive from block
 * padding + line height: utility 36px, primary row 64px, sub-nav 52px.
 */
export function TopNav({
  theme = "light",
  items = [],
  current,
  defaultOpen,
  onSelect,
  logoSrc,
  logoHeight = 36,
  utility,
  subnav,
  subnavCurrent,
  search = false,
  cta,
  actions = false,
  account,
  signedOut = false,
  compact = false,
  inset = 32,
  contain,
  leading,
  part = "bar",
  style = {},
  ...rest
}) {
  const t = NAV_THEMES[theme] || NAV_THEMES.light;
  /* `defaultOpen` names the destination whose panel starts open — docs specimens use it
     to show a menu without asking the reader to click. Click-away still closes it. */
  const [open, setOpen] = React.useState(() => {
    const i = items.findIndex((x) => x.label === defaultOpen && x.children);
    return i >= 0 ? "i" + i : null;
  });
  const [hover, setHover] = React.useState(null);
  const [ring, setRing] = React.useState(null);
  const [drawer, setDrawer] = React.useState(false);
  const rootRef = React.useRef(null);
  const navRef = React.useRef(null);
  const rowRef = React.useRef(null);
  const widthsRef = React.useRef(null);
  const [vis, setVis] = React.useState(items.length);
  /* Below 720px the bar sheds weight from the action cluster instead of starving the
     destination list: search drops to its icon and the call to action drops its label.
     The cluster is flex-shrink 0, so without this the nav is the only thing that can
     give, and it gives all the way to zero. Breakpoint reads the row's own width, which
     does not depend on `tight`, and the two directions are 24px apart. */
  const [tight, setTight] = React.useState(false);
  React.useLayoutEffect(() => {
    const el = rowRef.current;
    if (!el || compact) return;
    let raf = 0;
    const check = () => { raf = 0; const w = el.clientWidth; setTight((p) => (p ? w < 744 : w < 720)); };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => { if (raf) cancelAnimationFrame(raf); ro.disconnect(); };
  }, [compact]);
  /* Page inset halves when the bar is tight — both values are on the spacing scale. */
  const pad = contain ? 16 : tight ? 16 : inset;
  /* `contain`: each row keeps its full-bleed surface and hairline on an outer band;
     its content centres inside the page container. */
  const boxed = contain ? { maxWidth: contain, marginLeft: "auto", marginRight: "auto", width: "100%", boxSizing: "border-box" } : null;
  const band = (shadow, inner) => contain ? <div style={{ boxShadow: shadow }}>{inner}</div> : inner;

  /* Overflow: the destination row never paints a half-item. Natural item widths are
     cached from the first full render — never re-read from the live children, which
     shrink as items collapse — then items that do not fit fold into a trailing "More"
     menu, so the row degrades at item boundaries.

     The measurement must converge. Three things keep it from oscillating: `avail` is
     the row's own flex-sized box, whose width does not change when items collapse
     (logo and action cluster are flex-shrink 0, so the leftover space is constant);
     re-expanding demands 8px more room than collapsing gave up, so the two directions
     never share one threshold; and the effect does not depend on `vis`, so a collapse
     cannot tear the observer down and re-run the first measurement. */
  const visRef = React.useRef(items.length);
  const key = items.map((x) => x.label).join("\u0000");
  React.useLayoutEffect(() => {
    widthsRef.current = null; visRef.current = items.length; setVis(items.length);
  }, [key]);
  React.useLayoutEffect(() => {
    const el = navRef.current;
    if (!el || compact) return;
    const MORE = 88, HYST = 8;
    let raf = 0;
    const measure = () => {
      raf = 0;
      if (!widthsRef.current) {
        const kids = Array.prototype.slice.call(el.children);
        if (kids.length < items.length) return;
        widthsRef.current = kids.slice(0, items.length).map((k) => k.getBoundingClientRect().width);
      }
      const w = widthsRef.current;
      const avail = el.clientWidth;
      let sum = 0, n = 0;
      for (let i = 0; i < items.length; i++) {
        const need = sum + w[i] + (i ? 4 : 0);
        const tail = i === items.length - 1 ? 0 : MORE + 4;
        const room = avail - (i >= visRef.current ? HYST : 0);
        if (need + tail > room) break;
        sum = need; n = i + 1;
      }
      if (n === visRef.current) return;
      visRef.current = n; setVis(n);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    let live = true;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
      if (!live) return;
      widthsRef.current = null; visRef.current = items.length; setVis(items.length); schedule();
    });
    return () => { live = false; if (raf) cancelAnimationFrame(raf); ro.disconnect(); };
  }, [key, compact]);

  React.useEffect(() => {
    const away = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) { setOpen(null); setDrawer(false); } };
    const esc = (e) => { if (e.key === "Escape") { setOpen(null); setDrawer(false); } };
    /* blur: a click outside this document (e.g. the page around an embedding iframe) never reaches it. */
    const blur = () => { setOpen(null); setDrawer(false); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    window.addEventListener("blur", blur);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); window.removeEventListener("blur", blur); };
  }, []);

  const label = { fontFamily: "var(--font-body)", fontSize: 14, lineHeight: "20px" };
  const firstOff = items.findIndex((it) => it.label !== current);

  /* ---- dropdown panel: always the default surface ---- */
  const panel = (children, width) => (
    <div role="menu" data-sh-part="menu" style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 20, minWidth: width || 240,
      background: "var(--colors-background-bg-primary)", borderRadius: "var(--radius-xl-px)",
      boxShadow: "inset 0 0 0 1px var(--colors-border-border-secondary), 0 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)",
      padding: 8, display: "flex", flexDirection: "column", gap: 2
    }}>{children}</div>
  );
  const MenuRow = ({ it }) => {
    const [hot, setHot] = React.useState(false);
    return (
      <button type="button" role="menuitem" onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
        onClick={() => { setOpen(null); onSelect && onSelect(it.label); }}
        style={{
          display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "8px 12px", border: "none",
          borderRadius: "var(--radius-sm-px)", cursor: "pointer", textAlign: "left", ...label,
          fontWeight: 400, background: hot ? "var(--colors-background-bg-primary-hover)" : "transparent",
          color: "var(--colors-text-text-secondary-700)"
        }}>
        {it.icon ? <span style={{ display: "inline-flex", color: "var(--colors-foreground-fg-quaternary-500)" }}><Icon name={it.icon} size={16} /></span> : null}
        <span style={{ flex: 1 }}>{it.label}</span>
        {it.hint ? <span style={{ fontSize: 12, lineHeight: "18px", fontWeight: 500, color: "var(--colors-text-text-tertiary-600)" }}>{it.hint}</span> : null}
      </button>
    );
  };

  /* ---- primary row items ---- */
  const NavItem = (it, i) => {
    const on = it.forceOn || it.label === current;
    const hot = it.state === "hover" || (hover === i && !on);
    const lit = it.state === "focus" || ring === i;
    const isOpen = open === "i" + i;
    const p = it.part || (on ? "item-on" : i === firstOff ? "item" : undefined);
    return (
      <div key={i} style={{ position: "relative" }}>
        <button type="button" data-sh-part={p} aria-current={on ? "page" : undefined}
          aria-expanded={it.children ? isOpen : undefined} aria-haspopup={it.children ? "menu" : undefined}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
          onFocus={(e) => { if (e.target.matches(":focus-visible")) setRing(i); }} onBlur={() => setRing(null)}
          onClick={() => { if (it.children) setOpen(isOpen ? null : "i" + i); else { setOpen(null); onSelect && onSelect(it.label); } }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 4, padding: "8px 12px", border: "none",
            borderRadius: "var(--radius-md-px)", cursor: "pointer", ...label, outline: "none",
            fontWeight: on ? 600 : 400, whiteSpace: "nowrap",
            background: on ? t.fillOn : hot || isOpen ? t.fillHover : "transparent",
            color: on ? t.labelOn : t.label,
            boxShadow: lit ? `0 0 0 4px ${t.ring}` : "none",
            transition: "background 120ms ease, color 120ms ease, box-shadow 120ms ease"
          }}>
          <span>{it.label}</span>
          {it.children ? <Icon name="ChevronDown" size={16} aria-hidden="true"
            style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 140ms ease" }} /> : null}
        </button>
        {it.children && isOpen ? panel(it.children.map((c, j) => <MenuRow key={j} it={c} />)) : null}
      </div>
    );
  };

  /* ---- right cluster ---- */
  const IconBtn = ({ name, aria, dot, p }) => {
    const [hot, setHot] = React.useState(false);
    return (
      <button type="button" aria-label={aria} data-sh-part={p} onMouseEnter={() => setHot(true)} onMouseLeave={() => setHot(false)}
        style={{
          position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 36, height: 36, border: "none", borderRadius: "var(--radius-md-px)", cursor: "pointer",
          background: hot ? t.fillHover : "transparent", color: hot ? t.iconOn : t.icon, transition: "background 120ms ease, color 120ms ease"
        }}>
        <Icon name={name} size={20} />
        {dot ? <span aria-hidden="true" style={{
          position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "var(--radius-full-px)",
          background: "var(--colors-bg-error-solid, var(--colors-error-500))",
          boxShadow: `0 0 0 2px ${t.surface}`
        }} /> : null}
      </button>
    );
  };

  const searchField = tight || compact ? (
    <button type="button" data-sh-part="search" aria-label="Search" style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36,
      border: "none", borderRadius: "var(--radius-md-px)", cursor: "pointer",
      background: "transparent", color: t.icon
    }}>
      <Icon name="SearchLg" size={20} aria-hidden="true" />
    </button>
  ) : (
    <div data-sh-part="search" style={{
      display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", minWidth: 216,
      borderRadius: "var(--radius-md-px)", background: t.field, boxShadow: `inset 0 0 0 1px ${t.fieldLine}`,
      ...label, color: t.muted
    }}>
      <Icon name="SearchLg" size={16} aria-hidden="true" />
      <span style={{ flex: 1 }}>Search</span>
      <span style={{ fontSize: 12, lineHeight: "18px", fontWeight: 500 }}>&#8984;K</span>
    </div>
  );

  const accountCluster = signedOut ? (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }} data-sh-part="auth">
      {t.inverse
        ? <>
            <button type="button" style={{ border: "none", background: "transparent", cursor: "pointer", ...label, fontWeight: 600, color: t.labelOn }}>Log in</button>
            <button type="button" style={{
              border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: "var(--radius-md-px)",
              background: "var(--colors-base-white)", color: "var(--colors-text-text-secondary-700)", ...label, fontWeight: 600
            }}>Register</button>
          </>
        : <>
            <Button size="md" hierarchy="link-gray">Log in</Button>
            <Button size="md" hierarchy="primary">Register</Button>
          </>}
    </div>
  ) : account ? (
    <div style={{ position: "relative" }}>
      <button type="button" data-sh-part="account" aria-label="Account menu" aria-expanded={open === "acct"}
        onClick={() => setOpen(open === "acct" ? null : "acct")}
        style={account.showLabel ? {
          display: "inline-flex", alignItems: "center", gap: 4, padding: "8px 12px", border: "none",
          borderRadius: "var(--radius-md-px)", cursor: "pointer", ...label, fontWeight: 400, color: t.labelOn,
          background: open === "acct" ? t.fillOn : "transparent", transition: "background 120ms ease"
        } : {
          display: "inline-flex", alignItems: "center", gap: 8, padding: 2, border: "none",
          borderRadius: "var(--radius-full-px)", background: "transparent", cursor: "pointer", color: t.label
        }}>
        {account.showLabel ? <>
          <span>{account.short || "Account"}</span>
          <Icon name="ChevronDown" size={16} aria-hidden="true" style={{ transform: open === "acct" ? "rotate(180deg)" : "none", transition: "transform 140ms ease" }} />
        </> : <Avatar size="sm" src={account.src} initials={account.initials} />}
      </button>
      {open === "acct" ? (
        <div role="menu" style={{
          position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 20, minWidth: 248,
          background: "var(--colors-background-bg-primary)", borderRadius: "var(--radius-xl-px)",
          boxShadow: "inset 0 0 0 1px var(--colors-border-border-secondary), 0 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01), 0 4px 6px -2px var(--colors-effects-shadows-shadow-lg-02)",
          padding: 8, display: "flex", flexDirection: "column", gap: 2
        }}>
          {(account.menu || []).map((m, i) => <MenuRow key={i} it={m} />)}
        </div>
      ) : null}
    </div>
  ) : null;

  /* ---- compact (small screens) ---- */
  if (compact) {
    return (
      <div ref={rootRef} data-sh-part={part} style={{ position: "relative", background: t.surface, ...style }} {...rest}>
        {band(`inset 0 -1px 0 0 ${t.hairline}`, <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          padding: "12px 16px", minHeight: 40, boxShadow: contain ? "none" : `inset 0 -1px 0 0 ${t.hairline}`, ...boxed
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            {leading ? <span data-sh-part="leading" style={{ display: "inline-flex", flexShrink: 0 }}>{leading}</span> : null}
            {items.length || (account && !signedOut) ? (
              <button type="button" aria-label={drawer ? "Close menu" : "Open menu"} aria-expanded={drawer}
                onClick={() => setDrawer(!drawer)}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40,
                  flexShrink: 0, border: "none", borderRadius: "var(--radius-md-px)", background: "transparent",
                  cursor: "pointer", color: t.label
                }}>
                <Icon name={drawer ? "XClose" : "Menu01"} size={24} />
              </button>
            ) : null}
            <img src={logoSrc || t.logo} alt="Sample Health" style={{ height: 28, width: "auto", display: "block" }} />
          </div>
          {/* Mobile keeps the right cluster, in its smallest form: search as an icon,
              help, notifications, then the user. Settings is the one that drops. */}
          <div data-sh-part="actions" style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            {search ? searchField : null}
            {actions ? <>
              <IconBtn name="HelpCircle" aria="Help" />
              <IconBtn name="Bell01" aria="Notifications" dot />
            </> : null}
            {signedOut ? accountCluster : null}
          </div>
        </div>)}
        {drawer ? (
          <div data-sh-part="drawer" style={{
            position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20, background: t.surface,
            boxShadow: `inset 0 -1px 0 0 ${t.hairline}, 0 12px 16px -4px var(--colors-effects-shadows-shadow-lg-01)`,
            padding: 16, display: "flex", flexDirection: "column", gap: 4
          }}>
            {search ? <div style={{ marginBottom: 8 }}>{searchField}</div> : null}
            {items.map((it, i) => (
              <button key={i} type="button" aria-current={it.label === current ? "page" : undefined}
                onClick={() => { onSelect && onSelect(it.label); setDrawer(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px", border: "none",
                  borderRadius: "var(--radius-md-px)", cursor: "pointer", textAlign: "left", ...label,
                  fontWeight: it.label === current ? 600 : 400,
                  background: it.label === current ? t.fillOn : "transparent",
                  color: it.label === current ? t.labelOn : t.label
                }}>
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.children ? <Icon name="ChevronDown" size={16} aria-hidden="true" /> : null}
              </button>
            ))}
            {/* Compact form: the account menu lives in the drawer, not the bar. */}
            {account && !signedOut ? (
              <div data-sh-part="drawer-account" style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 12, paddingTop: 16, boxShadow: `inset 0 1px 0 0 ${t.hairline}` }}>
                {(account.menu || []).map((m, i) => (
                  <button key={i} type="button" onClick={() => { onSelect && onSelect(m.label); setDrawer(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px", border: "none",
                      borderRadius: "var(--radius-md-px)", cursor: "pointer", textAlign: "left", ...label,
                      fontWeight: 400, background: "transparent", color: t.label
                    }}>
                    {m.icon ? <Icon name={m.icon} size={16} aria-hidden="true" /> : null}
                    <span style={{ flex: 1 }}>{m.label}</span>
                  </button>
                ))}
              </div>
            ) : null}
            {utility ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12, paddingTop: 16, boxShadow: `inset 0 1px 0 0 ${t.hairline}` }}>
                {[].concat(utility.left || [], utility.right || []).map((u, i) => (
                  <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, ...label, fontWeight: 400, color: t.muted }}>
                    {u.icon ? <Icon name={u.icon} size={16} aria-hidden="true" /> : null}{u.label}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }

  /* ---- full bar ---- */
  return (
    <div ref={rootRef} style={{ background: t.surface, ...style }} {...rest}>
      {utility ? (contain
        ? <div style={{ background: t.utility, boxShadow: `inset 0 -1px 0 0 ${t.hairline}` }}>
            <NavUtilityBar theme={theme} left={utility.left} right={utility.right} inset={pad} style={{ background: "transparent", boxShadow: "none", ...boxed }} />
          </div>
        : <NavUtilityBar theme={theme} left={utility.left} right={utility.right} inset={pad} />) : null}
      {band(subnav ? "none" : `inset 0 -1px 0 0 ${t.hairline}`, <div ref={rowRef} data-sh-part={part} style={{
        display: "flex", alignItems: "center", gap: tight ? 16 : 32, padding: `12px ${pad}px`, minHeight: 40,
        boxShadow: subnav || contain ? "none" : `inset 0 -1px 0 0 ${t.hairline}`, ...boxed
      }}>
        {leading ? <span data-sh-part="leading" style={{ display: "inline-flex", flexShrink: 0, marginRight: tight ? -8 : -16 }}>{leading}</span> : null}
        <img data-sh-part="logo" src={logoSrc || t.logo} alt="Sample Health"
          style={{ height: logoHeight, width: "auto", display: "block", flexShrink: 0 }} />
        <nav ref={navRef} aria-label="Primary" data-sh-part="list" style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0, overflow: "visible" }}>
          {items.slice(0, vis).map(NavItem)}
          {vis < items.length ? NavItem({
            label: "More",
            forceOn: items.slice(vis).some((x) => x.label === current),
            children: items.slice(vis).map((x) => ({ label: x.label }))
          }, 900) : null}
        </nav>
        <div data-sh-part="actions" style={{ display: "flex", alignItems: "center", gap: tight ? 8 : 12, flexShrink: 0 }}>
          {search ? searchField : null}
          {cta ? (t.inverse ? (
            <button type="button" data-sh-part="cta" aria-label={tight ? cta.label : undefined} style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: tight ? "8px 12px" : "8px 16px", border: "none",
              borderRadius: "var(--radius-md-px)", cursor: "pointer", background: "var(--colors-base-white)",
              color: "var(--colors-text-text-secondary-700)", ...label, fontWeight: 600, whiteSpace: "nowrap"
            }}>
              {cta.icon ? <Icon name={cta.icon} size={16} aria-hidden="true" /> : null}{tight && cta.icon ? null : cta.label}
            </button>
          ) : (
            <span data-sh-part="cta">{tight && cta.icon
              ? <Button size="md" hierarchy="secondary" aria-label={cta.label} iconLeading={<Icon name={cta.icon} size={16} />} />
              : <Button size="md" hierarchy="secondary" iconLeading={cta.icon ? <Icon name={cta.icon} size={16} /> : undefined}>{cta.label}</Button>}</span>
          )) : null}
          {actions ? <>
            <IconBtn name="HelpCircle" aria="Help" p="action" />
            <IconBtn name="Settings01" aria="Settings" />
            <IconBtn name="Bell01" aria="Notifications" dot />
          </> : null}
          {accountCluster}
        </div>
      </div>)}
      {subnav ? band(`inset 0 -1px 0 0 ${t.hairline}`,
        <div data-sh-part="subnav" style={{
          display: "flex", alignItems: "center", gap: 16, padding: `0 ${contain ? pad : inset}px`,
          boxShadow: contain ? "none" : `inset 0 -1px 0 0 ${t.hairline}`, ...boxed
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, minWidth: 0, overflow: "hidden" }}>
            {subnav.map((s, i) => {
              const on = s === subnavCurrent;
              return (
                <button key={i} type="button" aria-current={on ? "page" : undefined} data-sh-part={on ? "sub-on" : i === 1 ? "sub" : undefined}
                  style={{
                    padding: "8px 12px", margin: "8px 0", border: "none", borderRadius: "var(--radius-md-px)",
                    cursor: "pointer", ...label, fontWeight: on ? 600 : 400, whiteSpace: "nowrap",
                    background: on ? t.fillOn : "transparent", color: on ? t.labelOn : t.label
                  }}>{s}</button>
              );
            })}
          </div>
          {search ? <div style={{ flexShrink: 0, padding: "8px 0" }}>{searchField}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
export default TopNav;
