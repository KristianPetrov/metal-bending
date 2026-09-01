import type { MetadataRoute } from "next";
import { specialties } from "@/lib/site-content";

const pages = ["", "/gallery", "/manufacturing-equipment", "/contact", ...specialties.map((item) => `/${item.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((path, index) => ({
    url: `https://www.metalbending.com${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.7,
  }));
}
