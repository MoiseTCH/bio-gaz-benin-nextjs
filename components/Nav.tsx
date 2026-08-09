"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "../lib/i18n";

type NavLink = { href: string; label: string };

export default function Nav({
  locale,
  logo,
  brandName,
  brandSub,
  links,
  ctaLabel,
}: {
  locale: Locale;
  logo: string;
  brandName: string;
  brandSub: string;
  links: NavLink[];
  ctaLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page (avant, un simple
  // scroll suffisait ; maintenant que chaque lien change de page, on doit
  // le faire explicitement).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <nav id="nav" className={scrolled ? "scrolled" : ""}>
      <div className="wrap nav-row">
        <a href={`/${locale}`} className="logo">
          <span className="logo-mark">
            <img src={logo} alt="Bio-Gaz-Benin-Afrique" />
          </span>
          <span>
            {brandName}
            <small>{brandSub}</small>
          </span>
        </a>

        <div className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {links.map((l) => (
            <a key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined} style={pathname === l.href ? { color: "var(--flame)" } : undefined}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <div className="lang-toggle">
            <a href="/fr" className={locale === "fr" ? "active" : ""}>FR</a>
            <a href="/en" className={locale === "en" ? "active" : ""}>EN</a>
          </div>
          <a href={`/${locale}/contact`} className="btn solid" style={{ padding: "11px 20px", fontSize: 13 }}>
            {ctaLabel}
          </a>
          <button className="burger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
