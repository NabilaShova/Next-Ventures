export interface StaticBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  tags: string[];
  author: string;
  authorAvatar: string | null;
  readingTime: number;
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const staticBlogPosts: StaticBlogPost[] = [
  {
    id: "static-enterprise-ai-agent-deployment-guide",
    title: "The Enterprise Guide to AI Agent Deployment",
    slug: "enterprise-ai-agent-deployment-guide",
    excerpt:
      "A comprehensive guide to deploying AI agents in enterprise environments.",
    content: "Full article content here...",
    coverImage: null,
    category: "AI",
    tags: ["AI", "Enterprise", "Deployment"],
    author: "Next Ventures Team",
    authorAvatar: null,
    readingTime: 12,
    published: true,
    featured: true,
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-01-15T00:00:00.000Z",
  },
  {
    id: "static-ai-automation-cost-reduction",
    title: "5 Ways AI Automation Cuts Business Costs",
    slug: "ai-automation-cost-reduction",
    excerpt:
      "Discover how leading companies use AI automation to dramatically reduce operational costs.",
    content: "Full article content here...",
    coverImage: null,
    category: "Automation",
    tags: ["Automation", "Business", "ROI"],
    author: "Sarah Chen",
    authorAvatar: null,
    readingTime: 8,
    published: true,
    featured: true,
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-02-01T00:00:00.000Z",
  },
  {
    id: "static-shopify-ai-merchants-guide",
    title: "Shopify AI: The Complete Merchant's Guide",
    slug: "shopify-ai-merchants-guide",
    excerpt:
      "Everything Shopify merchants need to know about leveraging AI for growth.",
    content: "Full article content here...",
    coverImage: null,
    category: "Ecommerce",
    tags: ["Shopify", "Ecommerce", "AI"],
    author: "Marcus Williams",
    authorAvatar: null,
    readingTime: 10,
    published: true,
    featured: false,
    createdAt: "2026-02-20T00:00:00.000Z",
    updatedAt: "2026-02-20T00:00:00.000Z",
  },
];

export function getStaticBlogPostBySlug(
  slug: string
): StaticBlogPost | undefined {
  return staticBlogPosts.find((p) => p.slug === slug && p.published);
}

export function getStaticBlogPostsByCategory(
  category: string
): StaticBlogPost[] {
  return staticBlogPosts.filter(
    (p) => p.published && p.category.toLowerCase() === category.toLowerCase()
  );
}
