import { loadJson } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default function SustainabilityPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const sustain = loadJson<any>("sustainability/sustainability.json", locale);

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal"><h2>{sustain.heading}</h2><p>{sustain.intro}</p></div>
        <div className="sdg-grid reveal">
          {sustain.goals.map((g: any, i: number) => (
            <div className="sdg-card" key={i}>
              <div className="sdg-n">{g.num}</div><h4>{g.title}</h4><p>{g.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
