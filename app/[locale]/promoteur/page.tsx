import { loadJson, mdToHtml } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default async function PromoteurPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const promoter = loadJson<any>("team/promoteur.json", locale);
  const promoterBio = await mdToHtml(promoter.bio || "");
  const promoterPartnerships = await mdToHtml(promoter.partnerships || "");
  const promoterIntl = await mdToHtml(promoter.international_experience || "");
  const promoterEducation = await mdToHtml(promoter.education || "");
  const promoterVision = await mdToHtml(promoter.vision || "");

  const t =
    locale === "fr"
      ? { title: "Le Promoteur", roles: "Fonctions & expériences", partnerships: "Partenariats & engagements", intl: "Expérience internationale", education: "Formation & qualifications", vision: "Vision" }
      : { title: "Founder", roles: "Roles & experience", partnerships: "Partnerships & engagements", intl: "International experience", education: "Education & qualifications", vision: "Vision" };

  return (
    <section className="section-pad" style={{ background: "var(--paper-dim)" }}>
      <div className="wrap">
        <div className="section-head reveal" style={{ margin: "0 auto 48px", maxWidth: 760, textAlign: "center" }}>
          <h2>{t.title} — {promoter.name}</h2>
        </div>
        <div className="about-grid" style={{ alignItems: "start" }}>
          <div className="reveal" style={{ textAlign: "center" }}>
            {promoter.photo && (
              <div style={{ width: 220, height: 220, borderRadius: "50%", margin: "0 auto", overflow: "hidden", boxShadow: "0 24px 50px -20px rgba(30,25,19,.45)", border: "4px solid var(--paper)" }}>
                <img src={promoter.photo} alt={promoter.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
              </div>
            )}
            <div className="pill" style={{ marginTop: 14, display: "inline-block" }}>{promoter.title}</div>
          </div>

          <div className="about-copy reveal">
            <div dangerouslySetInnerHTML={{ __html: promoterBio }} />

            {promoter.roles?.length > 0 && (
              <>
                <h4 style={{ marginTop: 28 }}>{t.roles}</h4>
                <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 1.9, color: "var(--charcoal-soft)" }}>
                  {promoter.roles.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </>
            )}

            {promoterPartnerships && (
              <>
                <h4 style={{ marginTop: 28 }}>{t.partnerships}</h4>
                <div style={{ color: "var(--charcoal-soft)" }} dangerouslySetInnerHTML={{ __html: promoterPartnerships }} />
              </>
            )}

            {promoterIntl && (
              <>
                <h4 style={{ marginTop: 28 }}>{t.intl}</h4>
                <div style={{ color: "var(--charcoal-soft)" }} dangerouslySetInnerHTML={{ __html: promoterIntl }} />
              </>
            )}

            {promoterEducation && (
              <>
                <h4 style={{ marginTop: 28 }}>{t.education}</h4>
                <div style={{ color: "var(--charcoal-soft)" }} dangerouslySetInnerHTML={{ __html: promoterEducation }} />
              </>
            )}

            {promoterVision && (
              <div style={{ marginTop: 30, padding: "20px 24px", background: "var(--paper)", borderRadius: "var(--radius-m)", borderLeft: "4px solid var(--leaf)" }}>
                <h4 style={{ marginTop: 0 }}>{t.vision}</h4>
                <div style={{ color: "var(--charcoal-soft)", marginTop: 8 }} dangerouslySetInnerHTML={{ __html: promoterVision }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
