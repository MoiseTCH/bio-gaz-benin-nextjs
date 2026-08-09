import { loadJson, highlight } from "../../lib/content";
import { dictionary, type Locale } from "../../lib/i18n";

export default function Home({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const ui = dictionary[locale];
  const hero = loadJson<any>("home/hero.json", locale);
  const stats = loadJson<any>("home/stats.json", locale);

  const explore =
    locale === "fr"
      ? [
          { href: `/${locale}/biodigesteurs`, label: "Biodigesteurs" },
          { href: `/${locale}/agrishell`, label: "Agri-Shell" },
          { href: `/${locale}/projets`, label: "Nos réalisations" },
          { href: `/${locale}/contact`, label: "Nous contacter" },
        ]
      : [
          { href: `/${locale}/biodigesteurs`, label: "Biodigesters" },
          { href: `/${locale}/agrishell`, label: "Agri-Shell" },
          { href: `/${locale}/projets`, label: "Our projects" },
          { href: `/${locale}/contact`, label: "Get in touch" },
        ];

  return (
    <>
      <section id="hero" tabIndex={-1}>
        <div className="wrap hero-grid">
          <div className="hero-copy reveal">
            <div className="eyebrow">{hero.eyebrow}</div>
            <h1 dangerouslySetInnerHTML={{ __html: highlight(hero.title) }} />
            <p>{hero.intro}</p>
            <div className="hero-cta">
              <a href={`/${locale}/biodigesteurs`} className="btn solid">{hero.cta1}</a>
              <a href={`/${locale}/projets`} className="btn ghost">{hero.cta2}</a>
            </div>
            <div className="hero-tags">
              <span className="pill">Parakou · Natitingou · Malanville-Guéné</span>
            </div>
          </div>
          <div className="hero-photo-wrap reveal">
            <div className="hero-photo-main">
              <img src={hero.photo_main} alt="" />
              <div className="hero-photo-badge">{hero.badge}</div>
            </div>
            <div className="hero-photo-inset"><img src={hero.photo_inset} alt="" /></div>
          </div>
        </div>
      </section>

      <div className="stat-strip">
        <div className="wrap">
          {stats.items.map((s: any, i: number) => (
            <div className="stat-item reveal" key={i}>
              <div className="val" data-count={s.value}>0</div>
              <div className="lbl">{s.label}</div>
              {s.note && <div className="note">{s.note}</div>}
            </div>
          ))}
        </div>
      </div>

      <section className="section-pad">
        <div className="wrap">
          <div className="section-head reveal">
            <h2>{locale === "fr" ? "Explorer le site" : "Explore the site"}</h2>
          </div>
          <div className="svc-grid reveal">
            {explore.map((e) => (
              <a key={e.href} href={e.href} className="svc-card" style={{ display: "block" }}>
                <h3>{e.label}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
