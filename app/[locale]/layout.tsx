import type { Metadata } from "next";
import { loadJson } from "../../lib/content";
import { dictionary, type Locale } from "../../lib/i18n";
import "../../styles/tokens.css";
import "../../styles/site.css";
import "../globals.css";

import Nav from "../../components/Nav";
import Icon from "../../components/Icon";
import WhatsAppFab from "../../components/WhatsAppFab";
import ScrollEffects from "../../components/ScrollEffects";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (params.locale === "en" ? "en" : "fr") as Locale;
  return {
    title: "Bio-Gaz-Benin-Afrique SARL",
    description:
      locale === "fr"
        ? "Biodigesteurs, biogaz et biofertilisant Agri-Shell — Parakou, Natitingou, Malanville-Guéné, Bénin."
        : "Biodigesters, biogas, and the Agri-Shell biofertilizer — Parakou, Natitingou, Malanville-Guéné, Benin.",
    alternates: {
      canonical: `https://bio-gaz-benin-afrique.netlify.app/${locale}`,
      languages: {
        fr: "https://bio-gaz-benin-afrique.netlify.app/fr",
        en: "https://bio-gaz-benin-afrique.netlify.app/en",
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const ui = dictionary[locale];
  const general = loadJson<any>("settings/general.json", locale);
  const social = loadJson<any>("settings/social.json", locale);

  const t =
    locale === "fr"
      ? {
          nav_promoter: "Le Promoteur",
          brand_sub: "SARL · Bénin, Afrique de l'Ouest",
          footNav: "Navigation",
          footCompany: "Entreprise",
          tagline: "Transformer les déchets en richesse pour un développement durable.",
          section_blog: "Actualités",
          section_partners: "Partenaires",
          section_careers: "Carrières",
        }
      : {
          nav_promoter: "Founder",
          brand_sub: "SARL · Benin, West Africa",
          footNav: "Navigation",
          footCompany: "Company",
          tagline: "Turning waste into wealth for sustainable development.",
          section_blog: "News",
          section_partners: "Partners",
          section_careers: "Careers",
        };

  const navLinks = [
    { href: `/${locale}/a-propos`, label: ui.nav_about },
    { href: `/${locale}/promoteur`, label: t.nav_promoter },
    { href: `/${locale}/services`, label: ui.nav_services },
    { href: `/${locale}/biodigesteurs`, label: ui.nav_tech },
    { href: `/${locale}/projets`, label: ui.nav_projects },
    { href: `/${locale}/agrishell`, label: "Agri-Shell" },
    { href: `/${locale}/durabilite`, label: ui.nav_sustain },
    { href: `/${locale}/contact`, label: ui.nav_contact },
  ];

  return (
    <html lang={locale}>
      <body>
        <a href="#main" className="skip-link">
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>

        <Nav
          locale={locale}
          logo="/uploads/logo-biogaz.jpg"
          brandName="Bio-Gaz-Benin-Afrique"
          brandSub={t.brand_sub}
          links={navLinks}
          ctaLabel={ui.cta_contact}
        />

        <main id="main">{children}</main>

        <footer>
          <div className="wrap">
            <div className="foot-grid">
              <div className="foot-col" style={{ maxWidth: 280 }}>
                <div className="logo" style={{ marginBottom: 14 }}>
                  <span className="logo-mark">
                    <img src="/uploads/logo-biogaz.jpg" alt="Bio-Gaz-Benin-Afrique" />
                  </span>
                  <span style={{ color: "var(--paper)" }}>Bio-Gaz-Benin-Afrique</span>
                </div>
                <p style={{ fontSize: 13, opacity: 0.7 }}>{t.tagline}</p>
                <div className="social-row">
                  {social.facebook && <a href={social.facebook} target="_blank" rel="noopener" aria-label="Facebook"><Icon name="facebook" /></a>}
                  {social.instagram && <a href={social.instagram} target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" /></a>}
                  {social.tiktok && <a href={social.tiktok} target="_blank" rel="noopener" aria-label="TikTok"><Icon name="tiktok" /></a>}
                  {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><Icon name="linkedin" /></a>}
                  {social.youtube && <a href={social.youtube} target="_blank" rel="noopener" aria-label="YouTube"><Icon name="youtube" /></a>}
                  {social.whatsapp && <a href={social.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp"><Icon name="whatsapp" /></a>}
                </div>
              </div>
              <div className="foot-col">
                <h5>{t.footNav}</h5>
                <a href={`/${locale}/a-propos`}>{ui.nav_about}</a>
                <a href={`/${locale}/promoteur`}>{t.nav_promoter}</a>
                <a href={`/${locale}/services`}>{ui.nav_services}</a>
                <a href={`/${locale}/biodigesteurs`}>{ui.nav_tech}</a>
                <a href={`/${locale}/agrishell`}>Agri-Shell</a>
                <a href={`/${locale}/projets`}>{ui.nav_projects}</a>
              </div>
              <div className="foot-col">
                <h5>{t.footCompany}</h5>
                <a href={`/${locale}/impact`}>Impact</a>
                <a href={`/${locale}/temoignages`}>{locale === "fr" ? "Voix du terrain" : "Voices"}</a>
                <a href={`/${locale}/actualites`}>{t.section_blog}</a>
                <a href={`/${locale}/durabilite`}>{ui.nav_sustain}</a>
                <a href={`/${locale}/partenaires`}>{t.section_partners}</a>
                <a href={`/${locale}/ressources`}>{locale === "fr" ? "Ressources" : "Resources"}</a>
                <a href={`/${locale}/carrieres`}>{t.section_careers}</a>
                <a href={`/${locale}/faq`}>FAQ</a>
              </div>
              <div className="foot-col">
                <h5>Contact</h5>
                <a href={`mailto:${general.email}`}>{general.email}</a>
                <a href={`tel:${(general.phone || "").replace(/\s/g, "")}`}>{general.phone}</a>
                <a href={`/${locale}/contact`}>Parakou · Natitingou · Malanville-Guéné</a>
              </div>
            </div>
            <div className="foot-bottom">
              <span>© 2026 Bio-Gaz-Benin-Afrique SARL — {general.rccm}</span>
            </div>
          </div>
        </footer>

        {social.whatsapp && <WhatsAppFab href={social.whatsapp} />}
        <ScrollEffects />
      </body>
    </html>
  );
}
