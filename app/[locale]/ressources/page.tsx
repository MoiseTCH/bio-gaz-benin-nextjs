import { loadCollection } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default async function ResourcesPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const resources = await loadCollection("resources", locale);

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal"><h2>{locale === "fr" ? "Ressources & documents" : "Resources & documents"}</h2></div>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
          {resources.map((r: any) => (
            <div key={r.slug} style={{ borderRadius: 16, overflow: "hidden", background: "var(--white)", boxShadow: "0 8px 24px -14px rgba(30,25,19,.3)" }}>
              {r.cover && <div className="img-tile" style={{ aspectRatio: "16/9" }}><img src={r.cover} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
              <div style={{ padding: 20 }}>
                {r.category && <p className="mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: ".05em", opacity: 0.7 }}>{r.category}</p>}
                <h3 style={{ marginTop: 6, fontSize: 18 }}>{r.title}</h3>
                <p style={{ marginTop: 8, fontSize: 14 }}>{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
