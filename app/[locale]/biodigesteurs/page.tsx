import { loadJson } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";
import Calculator from "../../../components/Calculator";

export default function TechPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const tech = loadJson<any>("tech/tech.json", locale);
  const calc = loadJson<any>("tech/calculator.json", locale);

  const calcLabels =
    locale === "fr"
      ? {
          title: "Calculateur de dimensionnement — estimation",
          cattle: "Bovins",
          pigs: "Porcins",
          people: "Membres du foyer (toilettes raccordées)",
          outVol: "Volume recommandé",
          outGas: "Biogaz / jour",
          outHours: "Cuisson / jour",
          outSize: "Modèle standard",
          note: "Estimation basée sur des ratios standards du secteur (rendement ≈ 0,04 m³ de biogaz/kg de matière fraîche, rétention 45 jours). Une étude technique sur site affine ce dimensionnement.",
        }
      : {
          title: "Sizing calculator — estimate",
          cattle: "Cattle",
          pigs: "Pigs",
          people: "Household members (connected toilet)",
          outVol: "Recommended volume",
          outGas: "Biogas / day",
          outHours: "Cooking / day",
          outSize: "Standard model",
          note: "Estimate based on standard industry ratios (yield ≈ 0.04 m³ biogas/kg fresh matter, 45-day retention). An on-site technical study refines final sizing.",
        };

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal"><h2>{tech.heading}</h2><p>{tech.intro}</p></div>
        <div className="process-wrap reveal">
          {tech.steps.map((st: any, i: number) => (
            <div className="p-step" key={i}>
              <div className="p-ico">{st.icon}</div>
              <h4>{st.title}</h4><p>{st.description}</p>
            </div>
          ))}
        </div>
        <div className="tech-gallery reveal">
          {tech.gallery.map((g: any, i: number) => (
            <div className={`img-tile has-cap${i === 0 || i === 3 ? " tall" : ""}`} key={i}>
              <img src={g.image} alt="" /><div className="cap">{g.caption}</div>
            </div>
          ))}
        </div>
        <div className="specs-box reveal">
          <div>
            <h3>{locale === "fr" ? "Fiche technique" : "Technical specs"}</h3>
            {tech.specs.map((sp: any, i: number) => (
              <div className="spec-row" key={i}><span>{sp.label}</span><span>{sp.value}</span></div>
            ))}
          </div>
          <Calculator params={calc} labels={calcLabels} />
        </div>
      </div>
    </section>
  );
}
