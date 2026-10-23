/* Sample Health — Marketing & Auth UI kit. A landing page (header, hero,
   social proof, feature grid, CTA, footer) and a split-screen login, composed
   from the design-system primitives. Toggle via the top-right switch. */
const UUI = window.UntitledUIPRODesignSystem_380e88;
const { Icon, Button, Badge, BadgeGroup, Input, Checkbox, FeaturedIcon, Avatar } = UUI;
const { useState } = React;

function Wordmark({ light }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: light ? "#fff" : "var(--colors-background-bg-brand-solid)", display: "flex", alignItems: "center", justifyContent: "center", color: light ? "var(--colors-brand-600)" : "#fff", fontWeight: 600, fontSize: 18 }}>U</div>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: light ? "#fff" : "var(--colors-text-text-primary-900)" }}>Sample Health</span>
    </div>
  );
}

function Header({ onLogin }) {
  const links = ["Products", "Solutions", "Resources", "Pricing"];
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: "1px solid var(--colors-border-border-secondary)", background: "var(--colors-background-bg-primary)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
        <Wordmark />
        <nav style={{ display: "flex", gap: 8 }}>
          {links.map((l) => <a key={l} href="#" onClick={(e) => e.preventDefault()} style={{ padding: "8px 12px", borderRadius: 6, textDecoration: "none", fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-secondary-700)" }}>{l}</a>)}
        </nav>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Button hierarchy="link-gray" onClick={onLogin}>Log in</Button>
        <Button onClick={onLogin}>Sign up</Button>
      </div>
    </header>
  );
}

function Landing({ onLogin }) {
  const features = [
    { icon: "Zap", title: "Fast by default", text: "Ship polished product screens in minutes with 2,400+ icons and 810 tokens." },
    { icon: "Palette", title: "Fully themeable", text: "Light and dark modes, a violet brand ramp and 18 utility hues out of the box." },
    { icon: "Grid01", title: "Composable", text: "Every screen is built from the same small, predictable set of primitives." },
    { icon: "ShieldTick", title: "Accessible", text: "Sensible focus rings, hit targets and contrast baked into every component." },
  ];
  return (
    <div style={{ background: "var(--colors-background-bg-primary)" }}>
      <Header onLogin={onLogin} />
      <section style={{ textAlign: "center", padding: "80px 32px 64px", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <BadgeGroup badge="New" color="brand">Sample Health 2.0 is here →</BadgeGroup>
        </div>
        <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 60, lineHeight: "72px", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>Beautiful UI, shipped faster</h1>
        <p style={{ margin: "24px auto 0", maxWidth: 640, fontSize: 18, lineHeight: "30px", color: "var(--colors-text-text-tertiary-600)" }}>The enterprise-grade design system for product teams. Tokens, components and full screens — everything you need to move from idea to interface.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 40 }}>
          <Button hierarchy="secondary" size="xl" iconLeading={<Icon name="PlayCircle" size={20} />}>Watch demo</Button>
          <Button size="xl" onClick={onLogin}>Get started</Button>
        </div>
      </section>
      <section style={{ padding: "0 32px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-quaternary-500)", letterSpacing: "0.04em" }}>TRUSTED BY FAST-GROWING TEAMS</p>
        <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", marginTop: 20, opacity: 0.7 }}>
          {["Acme", "Globex", "Initech", "Umbrella", "Hooli"].map((c) => <span key={c} style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-quaternary-500)" }}>{c}</span>)}
        </div>
      </section>
      <section style={{ padding: "64px 32px", background: "var(--colors-background-bg-secondary-subtle)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
          {features.map((f) => (
            <div key={f.title} style={{ display: "flex", gap: 16 }}>
              <FeaturedIcon color="brand" size="lg"><Icon name={f.icon} /></FeaturedIcon>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{f.title}</div>
                <div style={{ marginTop: 4, fontSize: 16, lineHeight: "24px", color: "var(--colors-text-text-tertiary-600)" }}>{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: "72px 32px", textAlign: "center", background: "var(--colors-background-bg-brand-section)", color: "#fff" }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em" }}>Start building today</h2>
        <p style={{ margin: "16px auto 0", maxWidth: 520, fontSize: 18, color: "var(--colors-brand-200)" }}>Join thousands of teams shipping better products with Sample Health.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
          <Button hierarchy="secondary" size="lg">Chat to sales</Button>
          <Button size="lg" onClick={onLogin}>Get started</Button>
        </div>
      </section>
      <footer style={{ padding: "40px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <Wordmark />
        <span style={{ fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>© 2026 Sample Health. All rights reserved.</span>
      </footer>
    </div>
  );
}

function Login({ onBack }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 48, background: "var(--colors-background-bg-primary)" }}>
        <div style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}>
          <Wordmark />
          <h1 style={{ margin: "32px 0 8px", fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>Log in to your account</h1>
          <p style={{ margin: "0 0 32px", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>Welcome back! Please enter your details.</p>
          <div style={{ display: "grid", gap: 20 }}>
            <Input label="Email" placeholder="Enter your email" />
            <Input label="Password" placeholder="••••••••" type="password" />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Checkbox size="sm" label="Remember for 30 days" />
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-brand-secondary-700)", textDecoration: "none" }}>Forgot password</a>
            </div>
            <Button size="lg" style={{ width: "100%" }}>Sign in</Button>
            <Button hierarchy="secondary" size="lg" style={{ width: "100%" }} iconLeading={<Icon name="Chrome" size={20} />}>Sign in with Google</Button>
          </div>
          <p style={{ textAlign: "center", marginTop: 32, fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>
            Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ fontWeight: 600, color: "var(--colors-text-text-brand-secondary-700)", textDecoration: "none" }}>Sign up</a>
          </p>
        </div>
      </div>
      <div style={{ flex: 1, background: "var(--colors-background-bg-brand-section)", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: 64 }}>
        <div style={{ display: "flex", gap: 2, marginBottom: 24 }}>{[1,2,3,4,5].map(i => <Icon key={i} name="Star01" size={22} />)}</div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 30, lineHeight: "38px", fontWeight: 600, margin: 0 }}>"Sample Health cut our design-to-ship time in half. It's the most complete system we've used."</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32 }}>
          <Avatar size="lg" initials="PB" />
          <div><div style={{ fontSize: 18, fontWeight: 600 }}>Phoenix Baker</div><div style={{ fontSize: 16, color: "var(--colors-brand-200)" }}>Head of Design, Globex</div></div>
        </div>
      </div>
    </div>
  );
}

function MarketingApp() {
  const [view, setView] = useState("landing");
  return (
    <div style={{ fontFamily: "var(--font-body)", position: "relative" }}>
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 200, display: "flex", gap: 8, background: "var(--colors-background-bg-primary)", padding: 6, borderRadius: 10, boxShadow: "0px 4px 8px -2px var(--colors-effects-shadows-shadow-md-01)", border: "1px solid var(--colors-border-border-secondary)" }}>
        <Button size="sm" hierarchy={view === "landing" ? "primary" : "tertiary"} onClick={() => setView("landing")}>Landing</Button>
        <Button size="sm" hierarchy={view === "login" ? "primary" : "tertiary"} onClick={() => setView("login")}>Login</Button>
      </div>
      {view === "landing" ? <Landing onLogin={() => setView("login")} /> : <Login onBack={() => setView("landing")} />}
    </div>
  );
}

const _uuiMktRoot = document.getElementById("uui-marketing-root");
if (_uuiMktRoot) ReactDOM.createRoot(_uuiMktRoot).render(<MarketingApp />);
