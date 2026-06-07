import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

export interface SEOParams {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  locale?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  path = "",
  locale = "en",
  noIndex = false,
  keywords = [],
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: SEOParams = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const url = absoluteUrl(`/${locale}${path}`);

  return {
    title: pageTitle,
    description,
    keywords: [
      "AI agents",
      "enterprise automation",
      "SaaS",
      "custom software",
      ...keywords,
    ],
    authors: authors?.map((name) => ({ name })),
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(`/en${path}`),
        bn: absoluteUrl(`/bn${path}`),
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      type: type === "article" ? "article" : "website",
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: pageTitle }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [absoluteUrl(image)],
      creator: "@nextventuresai",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
    },
    sameAs: [
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
      siteConfig.links.github,
    ],
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: absoluteUrl(`/en/solutions/${product.slug}`),
    image: product.image ? absoluteUrl(product.image) : absoluteUrl(siteConfig.ogImage),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
      description: "14-day free trial available",
    },
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  slug: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: absoluteUrl(`/en/blog/${article.slug}`),
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt ?? article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
    image: article.image ? absoluteUrl(article.image) : absoluteUrl(siteConfig.ogImage),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data),
  };
}
