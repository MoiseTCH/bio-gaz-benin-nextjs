import { loadCollection } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default async function VoicesPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const testimonials = await loadCollection("testimonials", locale);

  // Repli honnête et générique — utilisé tant qu'aucun vrai témoignage n'a
  // été saisi dans /admin. Jamais de faux nom ni de fausse citation.
  const fallbackVoices =
    locale === "fr"
      ? [
          { image: "/uploads/elder-bottles-field.jpg", who: "Producteur, coopérative locale", role: "Utilisateur Agri-Shell Liquide", text: "A intégré le biofertilisant sur sa parcelle maraîchère, en complément de son itinéraire habituel." },
          { image: "/uploads/cert-two-men.jpg", who: "Diplômé, session de formation", role: "Certification Agri-Shell, 2026", text: "Formé aux bonnes pratiques d'application du biofertilisant lors de notre session de certification sur le terrain." },
          { image: "/uploads/group-well.jpg", who: "Collecte communautaire", role: "Fourniture de matière organique", text: "Les résidus verts collectés localement alimentent le circuit de compostage et de biodigestion." },
        ]
      : [
          { image: "/uploads/elder-bottles-field.jpg", who: "Farmer, local cooperative", role: "Agri-Shell Liquid user", text: "Integrated the biofertilizer into his market-garden plot, alongside his usual routine." },
          { image: "/uploads/cert-two-men.jpg", who: "Graduate, training session", role: "Agri-Shell Certification, 2026", text: "Trained in proper biofertilizer application during our field certification session." },
          { image: "/uploads/group-well.jpg", who: "Community collection", role: "Organic matter supply", text: "Locally collected green residue feeds the composting and biodigestion loop." },
        ];
  const quotePlaceholder =
    locale === "fr"
      ? { text: "[Emplacement réservé — ajoutez ici une citation réelle d'un producteur, d'une institution partenaire ou d'une autorité locale.]", src: "À compléter — nom, rôle, localité" }
      : { text: "[Placeholder — add a real quote here from a farmer, partner institution, or local authority.]", src: "To complete — name, role, location" };

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal"><h2>{locale === "fr" ? "Voix du terrain" : "Voices from the field"}</h2></div>
        <div className="voice-grid reveal">
          {testimonials.length > 0 ? (
            testimonials.map((tm: any) => (
              <div className="voice-card" key={tm.slug}>
                {tm.photo && <div className="img-tile"><img src={tm.photo} alt="" /></div>}
                <div className="voice-body"><div className="who">{tm.name}</div><div className="role">{tm.role}</div><p>{tm.text}</p></div>
              </div>
            ))
          ) : (
            fallbackVoices.map((v, i) => (
              <div className="voice-card" key={i}>
                <div className="img-tile"><img src={v.image} alt="" /></div>
                <div className="voice-body"><div className="who">{v.who}</div><div className="role">{v.role}</div><p>{v.text}</p></div>
              </div>
            ))
          )}
          <div className="quote-card">
            <div className="qmark">&quot;</div>
            <div>
              <p>{quotePlaceholder.text}</p>
              <div className="src">{quotePlaceholder.src}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
