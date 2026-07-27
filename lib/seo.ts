import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

const BASE = SITE.url;

interface PageSeo {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
  noIndex?: boolean;
}

/** Build consistent, dynamic metadata for any page. */
export function buildMetadata({
  title,
  description = SITE.description,
  path = "/",
  images,
  noIndex,
}: PageSeo = {}): Metadata {
  const url = `${BASE}${path}`;
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} — Properties · Cars · Experiences`;
  const ogImages = images?.length ? images : [`${BASE}/opengraph-image`];

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      locale: SITE.locale,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImages,
    },
  };
}

/** JSON-LD Organization schema for the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    legalName: SITE.legalName,
    url: BASE,
    logo: `${BASE}/brand/logo-full.png`,
    email: SITE.email,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Douala",
      addressCountry: "CM",
    },
    sameAs: ["https://instagram.com", "https://twitter.com", "https://linkedin.com"],
  };
}

/** JSON-LD WebSite schema with SearchAction (sitelinks search box). */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: BASE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  };
}
