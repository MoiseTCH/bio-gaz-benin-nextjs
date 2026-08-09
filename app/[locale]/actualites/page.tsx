import { loadCollection } from "../../../lib/content";
import type { Locale } from "../../../lib/i18n";

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const locale: Locale = params.locale === "en" ? "en" : "fr";
  const blog = await loadCollection("blog", locale);
  const readMore = locale === "fr" ? "Lire l'article" : "Read article";

  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="section-head reveal"><h2>{locale === "fr" ? "Actualités" : "News"}</h2></div>
        <div className="blog-grid reveal">
          {blog.map((b: any) => (
            <div className="blog-card" key={b.slug}>
              {b.cover && <div className="img-tile"><img src={b.cover} alt="" /></div>}
              <div className="cat">{b.category}</div>
              <h3>{b.title}</h3>
              <p>{b.summary}</p>
              <span className="rd">{readMore} →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
