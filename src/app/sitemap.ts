import { MetadataRoute } from "next";
import { PLATFORMS, SCENARIOS, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/generate`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/scenarios`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const seoPages: MetadataRoute.Sitemap = [];
  for (const p of PLATFORMS) {
    for (const s of SCENARIOS) {
      seoPages.push({
        url: `${SITE_URL}/${p.id}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return [...staticPages, ...seoPages];
}
