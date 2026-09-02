import type { Metadata } from "next";
import { company, specialties, specialtyBySlug, type SpecialtySlug } from "@/lib/site-content";

export const SITE_URL = "https://www.metalbending.com";

export const DEFAULT_DESCRIPTION =
  "Precision stretch forming and custom metal bending for architectural, commercial, aerospace, and specialty projects. Serving customers worldwide from Anaheim, California since 2006.";

type PageSeo = {
  title: string;
  description: string;
  eyebrow: string;
  image: string;
};

export const staticPageSeo = {
  gallery: {
    title: "Stretch-Formed Metal Project Gallery",
    description:
      "Explore curved metal framing, glazing, ceiling, copper gutter, and aerospace work formed by Metal Bending Corporation.",
    eyebrow: "Project gallery",
    image: "/work/hero-4.jpg",
  },
  "manufacturing-equipment": {
    title: "Stretch Forming Equipment & Quality Control",
    description:
      "See our Hufford and Cyril Bath stretch presses, support equipment, in-house tooling, and quality-assurance capabilities in Anaheim.",
    eyebrow: "Manufacturing equipment",
    image: "/work/shop-1.jpg",
  },
  contact: {
    title: "Request a Custom Metal Bending Quote",
    description:
      `Request a stretch forming quote from Metal Bending Corporation or call ${company.phone}. We serve projects worldwide from Anaheim, California.`,
    eyebrow: "Start a project",
    image: "/work/hero-2.jpg",
  },
} satisfies Record<string, PageSeo>;

export function specialtySeo(slug: SpecialtySlug): PageSeo {
  const specialty = specialtyBySlug(slug)!;
  return {
    title: `${specialty.navLabel} Stretch Forming`,
    description: specialty.summary,
    eyebrow: `Specialty ${specialty.number}`,
    image: specialty.image,
  };
}

export function seoForSlug(slug: string): PageSeo | null {
  if (specialties.some((item) => item.slug === slug)) {
    return specialtySeo(slug as SpecialtySlug);
  }

  return staticPageSeo[slug as keyof typeof staticPageSeo] ?? null;
}

export function pageMetadata(slug: string, seo: PageSeo): Metadata {
  const path = `/${slug}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: path,
      siteName: company.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export function breadcrumbJsonLd(slug: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${slug}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}/${slug}`,
      },
    ],
  };
}
