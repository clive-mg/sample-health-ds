/* Sample Health docs — Base components, batch D:
   toggles, tooltips, utility-buttons, verification-code-inputs. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Toggle, Tooltip, ButtonUtility, OTPInput, Button } = UI;

  /* ---------------- Toggles ---------------- */
  SH.registerPage("toggles", {
    h1: "Toggle components",
    lead: "Toggles switch a single setting on or off with immediate effect. They support two sizes, optional label and hint text, and disabled states.",
    sections: [
      { id: "states", title: "States", prose: ["Off, on and disabled."],
        render: () => <Preview><div className="sh-row" style={{ gap: 32 }}>
          <Toggle label="Off" />
          <Toggle label="On" defaultChecked />
          <Toggle label="Disabled" disabled />
          <Toggle label="On, disabled" defaultChecked disabled />
        </div></Preview> },
      { id: "sizes", title: "Sizes", prose: ["Two sizes: small (36×20) and medium (44×24)."],
        render: () => <Preview><div className="sh-row" style={{ gap: 32 }}>
          <Toggle size="sm" label="Small" defaultChecked />
          <Toggle size="md" label="Medium" defaultChecked />
        </div></Preview> },
      { id: "with-hint", title: "With hint text", prose: ["A hint clarifies what enabling the setting does."],
        render: () => <Preview className="align-start"><div className="sh-col" style={{ gap: 18 }}>
          <Toggle label="Email notifications" hint="Get notified when someone messages your care team." defaultChecked />
          <Toggle label="Two-factor authentication" hint="Add an extra layer of security to your account." />
        </div></Preview> }
    ]
  });

  /* ---------------- Tooltips ---------------- */
  SH.registerPage("tooltips", {
    h1: "Tooltip components",
    lead: "Tooltips reveal a short, contextual hint on hover. They support an optional supporting line and four placements. Hover any trigger below to preview.",
    sections: [
      { id: "default", title: "Default tooltip", prose: ["Hover any element to reveal a short hint above it."],
        render: () => <Preview className="pad-lg"><div className="sh-row" style={{ gap: 20 }}>
          <Tooltip title="Copy to clipboard"><Button hierarchy="secondary" iconOnly iconLeading={<Icon name="Copy01" size={20} />} aria-label="Copy" /></Tooltip>
          <Tooltip title="Settings"><Button hierarchy="secondary">Hover me</Button></Tooltip>
        </div></Preview> },
      { id: "supporting", title: "With supporting text", prose: ["A second line can add more explanation beneath the hint."],
        render: () => <Preview className="pad-lg"><Tooltip title="Keyboard shortcuts" supportingText="Press ? anywhere to view the full list of shortcuts.">
          <Button hierarchy="secondary" iconLeading={<Icon name="HelpCircle" size={20} />}>Help</Button>
        </Tooltip></Preview> },
      { id: "placements", title: "Placements", prose: ["The hint can appear on the top, right, bottom or left of the element."],
        render: () => <Preview className="pad-lg"><div className="sh-row" style={{ gap: 20 }}>
          {["top", "right", "bottom", "left"].map((p) =>
            <Tooltip key={p} title={p[0].toUpperCase() + p.slice(1)} placement={p}><Button hierarchy="secondary">{p}</Button></Tooltip>)}
        </div></Preview> }
    ]
  });

  /* ---------------- Utility buttons ---------------- */
  SH.registerPage("utility-buttons", {
    h1: "Utility button components",
    lead: "Utility buttons are compact, square icon controls for toolbars, table rows and cards where space is tight.",
    sections: [
      { id: "hierarchies", title: "Secondary & tertiary", prose: ["The secondary style carries a border; the tertiary style is borderless for dense toolbars."],
        render: () => <Preview><div className="sh-row" style={{ gap: 12 }}>
          <ButtonUtility hierarchy="secondary"><Icon name="Copy01" size={16} /></ButtonUtility>
          <ButtonUtility hierarchy="secondary"><Icon name="Edit01" size={16} /></ButtonUtility>
          <ButtonUtility hierarchy="secondary"><Icon name="Trash01" size={16} /></ButtonUtility>
          <ButtonUtility hierarchy="tertiary"><Icon name="DotsVertical" size={16} /></ButtonUtility>
        </div></Preview> },
      { id: "sizes", title: "Sizes", prose: ["Two sizes: small (28px) and medium (32px)."],
        render: () => <Preview><div className="sh-row" style={{ gap: 12 }}>
          <ButtonUtility size="sm"><Icon name="Star01" size={16} /></ButtonUtility>
          <ButtonUtility size="md"><Icon name="Star01" size={18} /></ButtonUtility>
        </div></Preview> },
      { id: "active", title: "Active state", prose: ["An active state shows a pressed or selected utility button."],
        render: () => <Preview><div className="sh-row" style={{ gap: 12 }}>
          <ButtonUtility><Icon name="Bold01" size={16} /></ButtonUtility>
          <ButtonUtility active><Icon name="Italic01" size={16} /></ButtonUtility>
          <ButtonUtility><Icon name="Underline01" size={16} /></ButtonUtility>
        </div></Preview> },
      { id: "toolbar", title: "In a toolbar", prose: ["Group utility buttons to build a compact toolbar."],
        render: () => <Preview><div style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: "var(--radius-md-px)", border: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)" }}>
          {["Bold01", "Italic01", "Underline01", "Link01", "List"].map((n, i) => <ButtonUtility key={n} hierarchy="tertiary" active={i === 0}><Icon name={n} size={16} /></ButtonUtility>)}
        </div></Preview> }
    ]
  });

  /* ---------------- Verification code inputs ---------------- */
  function OTPDemo({ length }) {
    const [v, setV] = React.useState("");
    return <div className="sh-col" style={{ gap: 12, alignItems: "center" }}>
      <OTPInput length={length} onChange={setV} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>Entered: {v || "—"}</span>
    </div>;
  }
  SH.registerPage("verification-code-inputs", {
    h1: "Verification code input components",
    lead: "Verification code inputs collect a one-time passcode across a row of single-character boxes, advancing focus automatically as digits are typed.",
    sections: [
      { id: "four", title: "Four digits", prose: ["Choose how many boxes to show. Typing advances focus to the next box automatically."],
        render: () => <Preview className="pad-lg"><OTPDemo length={4} /></Preview> },
      { id: "six", title: "Six digits", prose: ["A six-box layout is common for authenticator codes."],
        render: () => <Preview className="pad-lg"><OTPInput length={6} /></Preview> }
    ]
  });

})();
