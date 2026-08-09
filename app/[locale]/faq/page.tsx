import { loadJson } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";
import FaqAccordion from "../../../components/FaqAccordion";

export default function FaqPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const faq = loadJson<any>("faq/faq.json", locale);

  return (
    <section className="section-pad">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <div className="section-head reveal"><h2>{locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"}</h2></div>
        <div className="reveal">
          <FaqAccordion items={faq.items} />
        </div>
      </div>
    </section>
  );
}
