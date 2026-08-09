import { loadCollection } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";
import BeforeAfterSlider from "../../../components/BeforeAfterSlider";

export default async function ProjectsPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const projects = await loadCollection("projects", locale);

  const baBefore = "/uploads/pit-measuring.jpg";
  const baAfter = "/uploads/dome-finished.jpg";
  const baLabels =
    locale === "fr"
      ? { before: "AVANT", after: "APRÈS", drag: "Faites glisser pour comparer le chantier avant et après la construction du biodigesteur.", heading: "Nos réalisations" }
      : { before: "BEFORE", after: "AFTER", drag: "Drag to compare the site before and after the biodigester was built.", heading: "Our projects" };

  const projGallery = [
    { image: "/uploads/basin-build.jpg", cap_fr: "Bassin d'alimentation", cap_en: "Feed inlet basin" },
    { image: "/uploads/founder-digester.jpg", cap_fr: "Visite de site — Natitingou", cap_en: "Site visit — Natitingou" },
    { image: "/uploads/stove-paint.jpg", cap_fr: "Réchaud à biogaz artisanal", cap_en: "Handcrafted biogas stove" },
    { image: "/uploads/team-farm.jpg", cap_fr: "Exploitation partenaire — Malanville-Guéné", cap_en: "Partner farm — Malanville-Guéné" },
    { image: "/uploads/watering-granules.jpg", cap_fr: "Application des granulés", cap_en: "Granule application" },
    { image: "/uploads/field-wall-1.jpg", cap_fr: "Parcelle en zone agricole", cap_en: "Plot in a farming area" },
  ];

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal">
          <h2>{baLabels.heading}</h2>
          <p>{baLabels.drag}</p>
        </div>

        <BeforeAfterSlider
          before={baBefore}
          after={baAfter}
          labelBefore={baLabels.before}
          labelAfter={baLabels.after}
          altBefore="Chantier — terrassement"
          altAfter="Chantier — dôme achevé"
        />

        <div className="proj-grid reveal">
          {projGallery.map((g, i) => (
            <div className="img-tile has-cap" key={i}>
              <img src={g.image} alt="" />
              <div className="cap">{locale === "fr" ? g.cap_fr : g.cap_en}</div>
            </div>
          ))}
        </div>

        <div className="proj-grid reveal" style={{ marginTop: 16 }}>
          {projects.map((p: any) => (
            <div key={p.slug}>
              <div className="img-tile has-cap">
                {p.photos_after?.[0] && <img src={p.photos_after[0].image} alt="" />}
                <div className="cap">{p.title}{p.location ? ` — ${p.location}` : ""}{p.capacity ? ` · ${p.capacity}` : ""}</div>
              </div>
              {p.description && (
                <p style={{ marginTop: 12, fontSize: 13.5, color: "var(--charcoal-soft)", lineHeight: 1.6 }}>{p.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
