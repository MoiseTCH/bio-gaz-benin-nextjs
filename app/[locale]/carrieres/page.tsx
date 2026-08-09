import { loadCollection } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default async function CareersPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const allJobs = await loadCollection("jobs", locale);
  const jobs = allJobs.filter((j: any) => j.active !== false);
  const apply = locale === "fr" ? "Postuler" : "Apply";

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal"><h2>{locale === "fr" ? "Carrières" : "Careers"}</h2></div>
        {jobs.length > 0 ? (
          <div className="reveal">
            {jobs.map((j: any) => (
              <div className="job-row" key={j.slug}>
                <div className="job-info">
                  <h4>{j.title}</h4>
                  <div className="meta">{j.location}{j.contract_type ? ` · ${j.contract_type}` : ""}</div>
                  {j.description && <p style={{ marginTop: 6, fontSize: 13.5, color: "var(--charcoal-soft)", maxWidth: 520 }}>{j.description}</p>}
                </div>
                <a href={`/${locale}/contact`} className="btn ghost">{apply}</a>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--charcoal-soft)" }}>
            {locale === "fr" ? "Aucun poste ouvert pour le moment." : "No open positions at the moment."}
          </p>
        )}
      </div>
    </section>
  );
}
