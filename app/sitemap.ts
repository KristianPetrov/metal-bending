import type { MetadataRoute } from "next";
import { specialties } from "@/lib/site-content";
import { SITE_URL, staticPageSeo } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-02");

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/opengraph-image.jpg`,
        `${SITE_URL}/work/hero-1.jpg`,
        `${SITE_URL}/work/hero-2.jpg`,
        `${SITE_URL}/work/hero-3.jpg`,
      ],
    },
    ...specialties.map((specialty) => ({
      url: `${SITE_URL}/${specialty.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [`${SITE_URL}${specialty.image}`],
    })),
    ...Object.entries(staticPageSeo).map(([slug, seo]) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: slug === "contact" ? 0.9 : 0.7,
      images: [`${SITE_URL}${seo.image}`],
    })),
  ];
}
