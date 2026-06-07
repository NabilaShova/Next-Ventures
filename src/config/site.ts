export const siteConfig = {
  name: "Next Ventures AI",
  description:
    "Enterprise AI Solutions — AI Agents, Business Automations, SaaS Platforms, and Custom Software that increase revenue, reduce costs, and automate operations.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://nextventures.ai",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/nextventuresai",
    linkedin: "https://linkedin.com/company/nextventuresai",
    github: "https://github.com/nextventuresai",
  },
  contact: {
    email: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? "hello@nextventures.ai",
    phone: "+1 (555) 123-4567",
    address: "100 Enterprise Blvd, Suite 500, San Francisco, CA 94105",
  },
  stats: {
    enterpriseClients: 250,
    projectsDelivered: 500,
    automationsBuilt: 1200,
    hoursSaved: 500000,
  },
  trustedBy: [
    "Fortune 500 Retail",
    "Global E-commerce",
    "Enterprise SaaS",
    "Healthcare Systems",
    "Financial Services",
    "Manufacturing Corp",
  ],
} as const;
