import { loadCollection } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default async function PartnersPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const partners = await loadCollection("partners", locale);

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal"><h2>{locale === "fr" ? "Partenaires & institutions" : "Partners & institutions"}</h2></div>
        <div className="partner-strip reveal" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
          {partners.map((p: any) => (
            <div key={p.slug} style={{ textAlign: "center" }}>
              {(p.photo || p.logo) && (
                <div className="img-tile" style={{ aspectRatio: "1", background: "var(--paper)" }}>
                  <img src={p.photo || p.logo} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: 10 }} />
                </div>
              )}
              <p className="mono" style={{ marginTop: 10, fontSize: 12 }}>{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
