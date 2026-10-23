import React from "react";

/** Untitled UI PRO — Social proof / logo cloud section. "Trusted by" wordmark row. */
export function SocialProofSection({ heading = "Trusted by fast-growing teams worldwide", logos = ["Acme", "Globex", "Initech", "Umbrella", "Hooli", "Stark"], style = {}, ...rest }) {
  return (
    <section style={{ padding: "48px 32px", textAlign: "center", fontFamily: "var(--font-body)", ...style }} {...rest}>
      {heading && <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "var(--colors-text-text-tertiary-600)" }}>{heading}</p>}
      <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap", marginTop: 32, opacity: 0.7 }}>
        {logos.map((l) => <span key={l} style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--colors-text-text-quaternary-500)" }}>{l}</span>)}
      </div>
    </section>
  );
}
export default SocialProofSection;
