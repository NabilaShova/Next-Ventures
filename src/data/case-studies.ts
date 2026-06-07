import type { CaseStudyResults } from "@/types";

export interface StaticCaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  implementation: string;
  results: CaseStudyResults;
  revenueIncrease: number | null;
  costReduction: number | null;
  timeSaved: number | null;
  imageUrl: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export const staticCaseStudies: StaticCaseStudy[] = [
  {
    id: "static-techflow-support-cost-reduction",
    title: "How TechFlow Reduced Support Costs by 70%",
    slug: "techflow-support-cost-reduction",
    client: "TechFlow Inc.",
    industry: "Technology",
    problem:
      "TechFlow's customer support team was overwhelmed with 5,000+ daily tickets, leading to 48-hour response times.",
    solution:
      "Deployed AI Customer Support Agent with knowledge base integration, smart escalation, and multi-channel support.",
    implementation:
      "2-week deployment with phased rollout. Integrated with existing Zendesk instance.",
    results: {
      metrics: [
        { label: "Response Time", value: "< 30s", change: "-95%" },
        { label: "Cost Reduction", value: "70%", change: "-70%" },
        { label: "CSAT Score", value: "4.8/5", change: "+40%" },
      ],
      highlights: [
        "80% of tickets resolved autonomously",
        "Support team refocused on complex issues",
        "$1.2M annual savings",
      ],
    },
    revenueIncrease: 15,
    costReduction: 70,
    timeSaved: 15000,
    imageUrl: null,
    featured: true,
    published: true,
    createdAt: "2026-01-10T00:00:00.000Z",
    updatedAt: "2026-01-10T00:00:00.000Z",
  },
  {
    id: "static-retailmax-sales-recovery",
    title: "RetailMax Recovers $2.3M with AI Sales Agent",
    slug: "retailmax-sales-recovery",
    client: "RetailMax",
    industry: "E-commerce",
    problem:
      "RetailMax was losing $3M annually to cart abandonment with a 72% abandonment rate.",
    solution:
      "Implemented AI Sales Recovery Agent with personalized outreach and multi-channel recovery sequences.",
    implementation:
      "Integrated with Shopify and Klaviyo. AI trained on 18 months of purchase data.",
    results: {
      metrics: [
        { label: "Cart Recovery", value: "35%", change: "+35%" },
        { label: "Revenue Recovered", value: "$2.3M", change: "+$2.3M" },
        { label: "ROI", value: "8x", change: "8x" },
      ],
      highlights: [
        "35% cart recovery rate",
        "$2.3M recovered in Q1",
        "Personalized recovery at scale",
      ],
    },
    revenueIncrease: 35,
    costReduction: 0,
    timeSaved: 5000,
    imageUrl: null,
    featured: true,
    published: true,
    createdAt: "2026-02-05T00:00:00.000Z",
    updatedAt: "2026-02-05T00:00:00.000Z",
  },
];

export function getStaticCaseStudyBySlug(
  slug: string
): StaticCaseStudy | undefined {
  return staticCaseStudies.find((cs) => cs.slug === slug && cs.published);
}
