import { loadJson, mdToHtml } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const about = loadJson<any>("about/about.json", locale);
  const aboutBody = await mdToHtml(about.body);

  return (
    <section className="section-pad">
      <div className="wrap about-grid">
        <div className="about-photo img-tile reveal"><img src={about.photo} alt="" /></div>
        <div className="about-copy reveal">
          <h2>{about.heading}</h2>
          <div dangerouslySetInnerHTML={{ __html: aboutBody }} />
          <div className="values-row">
            {about.values.map((v: string, i: number) => <span className="pill" key={i}>{v}</span>)}
          </div>
          <div className="timeline">
            {about.timeline.map((tl: any, i: number) => (
              <div className="tl-row" key={i}>
                <div className="yr mono">{tl.num}</div>
                <div className="tx"><b>{tl.title}</b><p>{tl.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
