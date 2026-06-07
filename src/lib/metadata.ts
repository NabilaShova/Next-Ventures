import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = "",
  image,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const desc = description ?? siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
