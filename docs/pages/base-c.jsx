/* Sample Health docs — Base components, batch C:
   ratings, select, sliders, tags, textareas. */
(function () {
  const SH = window.SH;
  const React = SH.React;
  const UI = SH.ui;
  const Preview = SH.Preview;
  const { Icon } = SH;
  const { Rating, Select, Slider, TextArea } = UI;

  /* ---------------- Ratings ---------------- */
  function RatingInput() {
    const [v, setV] = React.useState(4);
    return <div className="sh-col" style={{ gap: 10, alignItems: "center" }}>
      <Rating value={v} onChange={setV} size={28} />
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--colors-text-text-tertiary-600)" }}>{v} of 5 stars</span>
    </div>;
  }
  SH.registerPage("ratings", {
    h1: "Rating badge and stars",
    lead: "Star ratings display and capture a 0–5 score. They can be read-only for reviews and summaries, or interactive for collecting feedback.",
    sections: [
      { id: "read-only", title: "Read-only ratings", prose: ["A fixed score shown for display only, with no interaction."],
        render: () => <Preview><div className="sh-col" style={{ gap: 16, alignItems: "center" }}>
          {[5, 4, 3].map((n) => <Rating key={n} value={n} />)}
        </div></Preview> },
      { id: "sizes", title: "Sizes", prose: ["Stars come in a range of sizes to fit reviews, summaries or headlines."],
        render: () => <Preview><div className="sh-col" style={{ gap: 16, alignItems: "center" }}>
          <Rating value={4} size={16} />
          <Rating value={4} size={24} />
          <Rating value={4} size={32} />
        </div></Preview> },
      { id: "interactive", title: "Interactive rating", prose: ["An interactive rating lets people set a score by hovering and clicking a star."],
        render: () => <Preview><RatingInput /></Preview> }
    ]
  });

  /* ---------------- Select ---------------- */
  const COUNTRIES = ["United States", "United Kingdom", "Australia", "Canada", "Germany", "Singapore"];
  const ROLES = [{ value: "admin", label: "Administrator" }, { value: "editor", label: "Editor" }, { value: "viewer", label: "Viewer" }];
  SH.registerPage("select", {
    h1: "Select components",
    lead: "Selects let people choose one option from a list. They support labels, hint text, placeholders, two sizes and a scrollable menu with a selected check.",
    sections: [
      { id: "default", title: "Default select", prose: ["A labelled dropdown for choosing one option from a list."],
        render: () => <Preview className="align-stretch" style={{ minHeight: 260 }}><div style={{ maxWidth: 320, margin: "0 auto" }}>
          <Select label="Country" placeholder="Select a country" options={COUNTRIES} hint="This helps us set your timezone." />
        </div></Preview> },
      { id: "value-label", title: "Value & label options", prose: ["Objects let the visible label differ from the stored value."],
        render: () => <Preview className="align-stretch" style={{ minHeight: 240 }}><div style={{ maxWidth: 320, margin: "0 auto" }}>
          <Select label="Role" defaultValue="editor" options={ROLES} />
        </div></Preview> },
      { id: "sizes", title: "Sizes & disabled", prose: ["Two sizes, plus a disabled state."],
        render: () => <Preview className="align-stretch" style={{ minHeight: 200 }}><div style={{ maxWidth: 320, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          <Select size="sm" label="Small" options={COUNTRIES} defaultValue="Canada" />
          <Select label="Disabled" placeholder="Unavailable" options={COUNTRIES} disabled />
        </div></Preview> }
    ],
    faqs: [
      { q: "Can the label differ from the value?", a: "Yes — pass options as <code>{ value, label }</code> objects. Plain strings use the same text for both." }
    ]
  });

  /* ---------------- Sliders ---------------- */
  function SliderDemo() {
    const [v, setV] = React.useState(60);
    return <div style={{ width: 360, maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--colors-text-text-secondary-700)" }}>
        <span>Budget</span><span>${v}k</span>
      </div>
      <Slider value={v} onChange={setV} />
    </div>;
  }
  SH.registerPage("sliders", {
    h1: "Slider components",
    lead: "Sliders let people pick a value from a continuous range by dragging a handle along a track.",
    sections: [
      { id: "default", title: "Default slider", prose: ["Drag the handle or click anywhere on the track to set a value."],
        render: () => <Preview className="align-stretch"><div style={{ width: 360, maxWidth: "100%", margin: "0 auto" }}><Slider defaultValue={40} /></div></Preview> },
      { id: "positions", title: "Positions", prose: ["The filled track and handle reflect the current value."],
        render: () => <Preview className="align-stretch"><div style={{ width: 360, maxWidth: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>
          <Slider defaultValue={20} /><Slider defaultValue={50} /><Slider defaultValue={85} />
        </div></Preview> },
      { id: "labeled", title: "Labeled slider", prose: ["Pair a slider with a live value readout above the track."],
        render: () => <Preview className="align-stretch"><div style={{ margin: "0 auto", width: "fit-content" }}><SliderDemo /></div></Preview> },
      { id: "disabled", title: "Disabled", prose: ["A disabled slider is dimmed and non-interactive."],
        render: () => <Preview className="align-stretch"><div style={{ width: 360, maxWidth: "100%", margin: "0 auto" }}><Slider defaultValue={40} disabled /></div></Preview> }
    ]
  });

  /* ---------------- Textareas ---------------- */
  SH.registerPage("textareas", {
    h1: "Textarea components",
    lead: "Textareas capture longer, multi-line input such as messages, notes and descriptions, with labels, hint text and validation states.",
    sections: [
      { id: "default", title: "Default textarea", prose: ["A label sits above the field, which can start at whatever height you need."],
        render: () => <Preview className="align-stretch"><div style={{ maxWidth: 420, margin: "0 auto" }}>
          <TextArea label="Message" placeholder="Leave a note for the care team…" hint="Up to 500 characters." />
        </div></Preview> },
      { id: "states", title: "States", prose: ["Textareas surface error and disabled states like inputs."],
        render: () => <Preview className="align-stretch"><div style={{ maxWidth: 420, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          <TextArea label="Error" defaultValue="Too short" error hint="Please add more detail." rows={3} />
          <TextArea label="Disabled" placeholder="Unavailable" disabled rows={3} />
        </div></Preview> }
    ]
  });
})();
