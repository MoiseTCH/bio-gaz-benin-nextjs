import { loadJson } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const services = loadJson<any>("services/services.json", locale);

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>{services.heading}</h2>
          <p>{services.intro}</p>
        </div>
        <div className="svc-grid reveal">
          {services.items.map((s: any, i: number) => (
            <div className="svc-card" key={i}>
              <div className="svc-num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
