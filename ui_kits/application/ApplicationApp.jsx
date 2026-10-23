/* Sample Health — Application UI kit. Composes the design-system primitives
   into a real product shell: sidebar nav, dashboard with metrics + chart + table,
   and a settings screen. Interactive click-through via the sidebar. */
const UUI = window.UntitledUIPRODesignSystem_380e88;
const { Icon, Button, Badge, Avatar, Input, Table, Tabs, ProgressBar, FeaturedIcon, Toggle, Dropdown, Divider } = UUI;
const { useState } = React;

function NavItem({ icon, label, active, badge, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "8px 12px", border: "none", cursor: "pointer",
        borderRadius: 6, textAlign: "left", fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, lineHeight: "24px",
        background: active ? "var(--colors-background-bg-active)" : hover ? "var(--colors-background-bg-primary-hover)" : "transparent",
        color: active ? "var(--colors-text-text-secondary-700)" : "var(--colors-text-text-secondary-700)" }}>
      <span style={{ color: active ? "var(--colors-foreground-fg-brand-primary-600)" : "var(--colors-foreground-fg-quaternary-500)", display: "inline-flex" }}><Icon name={icon} size={24} /></span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && <Badge size="sm" color="gray">{badge}</Badge>}
    </button>
  );
}

function Sidebar({ screen, setScreen }) {
  return (
    <aside style={{ width: 280, flexShrink: 0, height: "100%", boxSizing: "border-box", background: "var(--colors-background-bg-primary)", borderRight: "1px solid var(--colors-border-border-secondary)", display: "flex", flexDirection: "column", padding: "24px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px 24px" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--colors-background-bg-brand-solid)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 18 }}>U</div>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>Sample Health</span>
      </div>
      <div style={{ padding: "0 4px 16px" }}>
        <Input size="sm" placeholder="Search" iconLeading={<Icon name="SearchLg" size={20} />} />
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <NavItem icon="BarChart07" label="Dashboard" active={screen === "dashboard"} onClick={() => setScreen("dashboard")} />
        <NavItem icon="Rows03" label="Projects" badge="8" />
        <NavItem icon="CheckDone01" label="Tasks" />
        <NavItem icon="Users01" label="Users" />
        <NavItem icon="PieChart03" label="Reporting" />
        <NavItem icon="Settings01" label="Settings" active={screen === "settings"} onClick={() => setScreen("settings")} />
      </nav>
      <div style={{ marginTop: 12 }}>
        <Divider />
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 8px 0" }}>
          <Avatar size="md" initials="OR" status="online" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>Olivia Rhye</div>
            <div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)", overflow: "hidden", textOverflow: "ellipsis" }}>olivia@samplehealth.com</div>
          </div>
          <Dropdown align="right" trigger={<button style={{ border: "none", background: "transparent", cursor: "pointer", color: "var(--colors-foreground-fg-quaternary-400)", display: "inline-flex" }}><Icon name="LogOut04" size={20} /></button>}
            items={[{ label: "View profile", icon: <Icon name="User01" size={16} /> }, { label: "Settings", icon: <Icon name="Settings01" size={16} /> }, { divider: true }, { label: "Sign out", icon: <Icon name="LogOut04" size={16} />, destructive: true }]} />
        </div>
      </div>
    </aside>
  );
}

function Metric({ label, value, delta, trend }) {
  const up = trend === "up";
  return (
    <div style={{ flex: 1, minWidth: 200, padding: 20, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: 12, boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)" }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: "var(--colors-text-text-tertiary-600)" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 12, gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>{value}</span>
        <Badge color={up ? "success" : "error"} size="sm"><span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}><Icon name={up ? "TrendUp01" : "TrendDown01"} size={12} />{delta}</span></Badge>
      </div>
    </div>
  );
}

function AreaChart() {
  const pts = [22, 30, 26, 40, 38, 52, 48, 62, 58, 72, 80, 76];
  const w = 640, h = 180, max = 90;
  const step = w / (pts.length - 1);
  const line = pts.map((p, i) => `${i * step},${h - (p / max) * h}`).join(" ");
  const area = `0,${h} ${line} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: 180, display: "block" }}>
      <defs><linearGradient id="uui-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--colors-brand-500)" stopOpacity="0.24" /><stop offset="100%" stopColor="var(--colors-brand-500)" stopOpacity="0" /></linearGradient></defs>
      <polygon points={area} fill="url(#uui-g)" />
      <polyline points={line} fill="none" stroke="var(--colors-brand-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dashboard() {
  const [tab, setTab] = useState("Overview");
  const rows = [
    { name: "Acme Corp", owner: "Olivia Rhye", status: "Paid", amount: "$12,000", progress: 100 },
    { name: "Globex", owner: "Phoenix Baker", status: "Pending", amount: "$8,400", progress: 60 },
    { name: "Initech", owner: "Lana Steiner", status: "Pending", amount: "$5,200", progress: 35 },
    { name: "Umbrella", owner: "Demi Wilkinson", status: "Overdue", amount: "$2,100", progress: 10 },
  ];
  const statusColor = { Paid: "success", Pending: "warning", Overdue: "error" };
  const columns = [
    { header: "Account", render: (r) => <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Avatar size="sm" initials={r.name.slice(0, 2).toUpperCase()} /><div><div style={{ fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{r.name}</div><div style={{ color: "var(--colors-text-text-tertiary-600)" }}>{r.owner}</div></div></div> },
    { header: "Status", render: (r) => <Badge color={statusColor[r.status]} dot>{r.status}</Badge> },
    { header: "Progress", width: 200, render: (r) => <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ flex: 1 }}><ProgressBar value={r.progress} /></div><span style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{r.progress}%</span></div> },
    { header: "Amount", align: "right", render: (r) => <span style={{ fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>{r.amount}</span> },
  ];
  return (
    <div style={{ padding: 32, overflowY: "auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>Welcome back, Olivia</h1>
          <p style={{ margin: "4px 0 0", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>Here's what's happening with your projects today.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Button hierarchy="secondary" iconLeading={<Icon name="Download01" size={20} />}>Export</Button>
          <Button iconLeading={<Icon name="Plus" size={20} />}>New project</Button>
        </div>
      </div>
      <div style={{ margin: "24px 0 20px" }}><Tabs items={[{ label: "Overview" }, { label: "Analytics" }, { label: "Reports" }, { label: "Notifications", count: "2" }]} value={tab} onChange={setTab} /></div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <Metric label="Total revenue" value="$45.2k" delta="12%" trend="up" />
        <Metric label="Active projects" value="18" delta="8%" trend="up" />
        <Metric label="Avg. completion" value="72%" delta="3%" trend="down" />
        <Metric label="Team members" value="24" delta="5%" trend="up" />
      </div>
      <div style={{ marginTop: 20, padding: 24, background: "var(--colors-background-bg-primary)", border: "1px solid var(--colors-border-border-secondary)", borderRadius: 12, boxShadow: "0px 1px 2px 0px var(--colors-effects-shadows-shadow-xs)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div><div style={{ fontSize: 18, fontWeight: 600, color: "var(--colors-text-text-primary-900)" }}>Revenue over time</div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>Last 12 months</div></div>
          <Badge color="success" dot>+18% vs last year</Badge>
        </div>
        <AreaChart />
      </div>
      <div style={{ marginTop: 20 }}>
        <Table title="Recent accounts" description="Track invoices and account status." columns={columns} data={rows}
          actions={<Button hierarchy="secondary" size="sm" iconLeading={<Icon name="FilterLines" size={20} />}>Filters</Button>} />
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div style={{ padding: 32, overflowY: "auto", maxWidth: 720 }}>
      <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--colors-text-text-primary-900)" }}>Settings</h1>
      <p style={{ margin: "4px 0 24px", fontSize: 16, color: "var(--colors-text-text-tertiary-600)" }}>Manage your account and notification preferences.</p>
      <div style={{ display: "grid", gap: 20 }}>
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ width: 280 }}><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>Personal info</div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>Update your photo and details.</div></div>
          <div style={{ flex: 1, display: "grid", gap: 16 }}>
            <Input label="Full name" defaultValue="Olivia Rhye" />
            <Input label="Email" defaultValue="olivia@samplehealth.com" iconLeading={<Icon name="Mail01" size={20} />} />
          </div>
        </div>
        <Divider />
        <div style={{ display: "flex", gap: 32 }}>
          <div style={{ width: 280 }}><div style={{ fontSize: 14, fontWeight: 700, color: "var(--colors-text-text-secondary-700)" }}>Notifications</div><div style={{ fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>Choose what you hear about.</div></div>
          <div style={{ flex: 1, display: "grid", gap: 16 }}>
            <Toggle defaultChecked label="Email notifications" hint="Get notified when something happens." />
            <Toggle defaultChecked label="Weekly digest" />
            <Toggle label="Product announcements" />
          </div>
        </div>
        <Divider />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button hierarchy="secondary">Cancel</Button>
          <Button>Save changes</Button>
        </div>
      </div>
    </div>
  );
}

function ApplicationApp() {
  const [screen, setScreen] = useState("dashboard");
  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--colors-background-bg-secondary-subtle)", fontFamily: "var(--font-body)" }}>
      <Sidebar screen={screen} setScreen={setScreen} />
      <main style={{ flex: 1, minWidth: 0, height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {screen === "dashboard" ? <Dashboard /> : <Settings />}
      </main>
    </div>
  );
}

const _uuiAppRoot = document.getElementById("uui-application-root");
if (_uuiAppRoot) ReactDOM.createRoot(_uuiAppRoot).render(<ApplicationApp />);
