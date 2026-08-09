import { loadJson } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";
import Icon from "../../../components/Icon";
import ContactForm from "../../../components/ContactForm";

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const general = loadJson<any>("settings/general.json", locale);
  const social = loadJson<any>("settings/social.json", locale);

  const t =
    locale === "fr"
      ? {
          contact: "Contact", email: "Email", phone: "Téléphone", maps_btn: "Ouvrir dans Google Maps",
          hq: "Siège social", annex: "Annexes", follow: "Suivez-nous",
          form: { name: "Nom complet", org: "Organisation (optionnel)", email: "Email", phone: "Téléphone", message: "Votre message…", send: "Envoyer le message", sent: "Message noté ✓", note: "Formulaire de démonstration — à connecter à votre messagerie ou CRM." },
        }
      : {
          contact: "Contact", email: "Email", phone: "Phone", maps_btn: "Open in Google Maps",
          hq: "Head office", annex: "Branch offices", follow: "Follow us",
          form: { name: "Full name", org: "Organization (optional)", email: "Email", phone: "Phone", message: "Your message…", send: "Send message", sent: "Message noted ✓", note: "Demo form — to be connected to your inbox or CRM." },
        };

  return (
    <section className="section-pad" style={{ background: "var(--charcoal)", color: "var(--paper)" }}>
      <div className="wrap">
        <div className="section-head reveal"><h2 style={{ color: "var(--paper)" }}>{t.contact}</h2></div>
        <div className="contact-grid reveal">
          <div>
            {general.address_hq && (
              <div className="contact-card"><div className="lbl">{t.hq}</div><div className="val">{general.address_hq}</div></div>
            )}
            {(general.address_annex1 || general.address_annex2) && (
              <div className="contact-card"><div className="lbl">{t.annex}</div><div className="val">{general.address_annex1}{general.address_annex1 && general.address_annex2 ? " · " : ""}{general.address_annex2}</div></div>
            )}
            <div className="contact-card"><div className="lbl">{t.email}</div><div className="val">{general.email}</div></div>
            <div className="contact-card"><div className="lbl">{t.phone}</div><div className="val">{general.phone} / {general.phone2}</div></div>
            <div className="contact-card"><div className="lbl">RCCM</div><div className="val">{general.rccm}</div></div>
            <div className="contact-card">
              <div className="lbl">{t.follow}</div>
              <div className="social-row" style={{ marginTop: 12 }}>
                {social.facebook && <a href={social.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="facebook" /></a>}
                {social.instagram && <a href={social.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" /></a>}
                {social.tiktok && <a href={social.tiktok} target="_blank" rel="noopener" aria-label="TikTok"><Icon name="tiktok" /></a>}
                {social.whatsapp && <a href={social.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp"><Icon name="whatsapp" /></a>}
                {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><Icon name="linkedin" /></a>}
                {social.youtube && <a href={social.youtube} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="youtube" /></a>}
              </div>
            </div>
            {social.google_maps_url ? (
              <div className="map-card">
                <div className="pin"></div>
                <h4>{locale === "fr" ? "Siège social — Parakou, Bénin" : "Head office — Parakou, Benin"}</h4>
                <div className="addr">{general.address_hq}</div>
                <a href={social.google_maps_url} target="_blank" rel="noopener" className="btn flame">
                  <Icon name="pin" />{t.maps_btn}
                </a>
              </div>
            ) : null}
          </div>

          <ContactForm labels={t.form} />
        </div>
      </div>
    </section>
  );
}
