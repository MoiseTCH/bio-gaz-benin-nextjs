import { loadJson } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default function AgrishellPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const agri = loadJson<any>("agrishell/agrishell.json", locale);

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal"><h2>{agri.heading}</h2><p>{agri.intro}</p></div>
        <div className="as-grid reveal">
          <div className="as-products">
            {agri.products.map((p: any, i: number) => (
              <div className="as-card" key={i}>
                <div className="img-tile"><img src={p.image} alt="" /></div>
                <h4>{p.title}</h4><p>{p.description}</p>
              </div>
            ))}
          </div>
          {agri.products?.[0]?.image && (
            <div className="img-tile" style={{ aspectRatio: "4/5" }}>
              <img src={agri.products[0].image} alt="" />
            </div>
          )}
        </div>
        <div className="as-lab reveal">
          {agri.lab_gallery.map((g: any, i: number) => (
            <div className="img-tile has-cap" key={i}><img src={g.image} alt="" /><div className="cap">{g.caption}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}
