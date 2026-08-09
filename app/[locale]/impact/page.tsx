import { loadJson } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default function ImpactPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const impact = loadJson<any>("impact/impact.json", locale);

  return (
    <section className="section-pad" style={{ background: "var(--charcoal)", color: "var(--paper)" }}>
      <div className="wrap">
        <div className="section-head reveal">
          <div className="eyebrow" style={{ color: "var(--flame-soft)" }}>Impact</div>
          <h2 style={{ color: "var(--paper)" }}>{impact.heading}</h2>
          <p style={{ color: "rgba(246,241,231,.75)" }}>{impact.intro}</p>
        </div>
        <div className="proj-grid reveal" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
          {impact.items.map((it: any, i: number) => (
            <div className="contact-card" style={{ textAlign: "center" }} key={i}>
              <div className="val mono" data-count={it.value} style={{ fontSize: 34, color: "var(--flame-soft)", fontFamily: "'Space Grotesk'", fontWeight: 700 }}>0</div>
              <div className="lbl" style={{ marginTop: 8 }}>{it.label}</div>
            </div>
          ))}
        </div>
        {impact.disclaimer && <p style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "rgba(246,241,231,.45)" }}>{impact.disclaimer}</p>}
      </div>
    </section>
  );
}
