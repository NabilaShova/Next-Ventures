import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { staticBlogPosts } from "@/data/blog";
import { staticCaseStudies } from "@/data/case-studies";
import { staticProducts } from "@/data/products";
import { locales } from "@/i18n/request";

const staticPaths = [
  "",
  "/solutions",
  "/case-studies",
  "/pricing",
  "/resources",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/security",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const product of staticProducts.filter((p) => p.published)) {
      entries.push({
        url: `${baseUrl}/${locale}/solutions/${product.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }

    for (const post of staticBlogPosts.filter((p) => p.published)) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const study of staticCaseStudies.filter((cs) => cs.published)) {
      entries.push({
        url: `${baseUrl}/${locale}/case-studies/${study.slug}`,
        lastModified: new Date(study.updatedAt),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
