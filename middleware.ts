import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["fr", "en"];
const DEFAULT_LOCALE = "fr";

// Redirige toute URL sans préfixe de langue (/services) vers sa version
// préfixée (/fr/services ou /en/services selon la langue du navigateur).
// Fonctionne pour la racine ("/") comme pour toutes les nouvelles pages
// créées lors du passage en multi-pages.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return;

  // Ignore les fichiers statiques et les routes techniques.
  if (
    pathname.startsWith("/uploads") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return;
  }

  const acceptLang = request.headers.get("accept-language") || "";
  const preferred = LOCALES.find((l) => acceptLang.toLowerCase().includes(l)) || DEFAULT_LOCALE;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|admin|uploads|api).*)"],
};
