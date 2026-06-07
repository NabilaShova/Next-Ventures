import type { ProductType } from "@/types";

export interface StaticProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string;
  type: ProductType;
  featured: boolean;
  published: boolean;
  category: { slug: string; name: string };
  features: { title: string; description: string }[];
  benefits: { title: string; description: string; metric?: string }[];
  integrations: string[];
  faqs: { question: string; answer: string }[];
}

export const staticProducts: StaticProduct[] = [
  {
    id: "static-ai-customer-support-agent",
    slug: "ai-customer-support-agent",
    name: "AI Customer Support Agent",
    tagline: "24/7 intelligent customer support that never sleeps",
    description:
      "Deploy an AI-powered customer support agent that handles inquiries, resolves issues, and escalates complex cases.",
    type: "AI_AGENT",
    featured: true,
    published: true,
    category: { slug: "ai-agents", name: "AI Agents" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-ai-sales-recovery-agent",
    slug: "ai-sales-recovery-agent",
    name: "AI Sales Recovery Agent",
    tagline: "Recover abandoned carts and lost leads automatically",
    description:
      "An AI agent that identifies at-risk deals, re-engages abandoned carts, and recovers lost revenue.",
    type: "AI_AGENT",
    featured: true,
    published: true,
    category: { slug: "ai-agents", name: "AI Agents" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-ai-email-campaign-agent",
    slug: "ai-email-campaign-agent",
    name: "AI Email Campaign Agent",
    tagline: "AI-powered email marketing that writes, sends, and optimizes itself",
    description:
      "Automate your entire email marketing workflow with an AI agent that creates campaigns and optimizes send times.",
    type: "AI_AGENT",
    featured: true,
    published: true,
    category: { slug: "ai-agents", name: "AI Agents" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-ai-inventory-forecasting-agent",
    slug: "ai-inventory-forecasting-agent",
    name: "AI Inventory Forecasting Agent",
    tagline: "Predict demand, optimize stock, eliminate waste",
    description:
      "Machine learning-powered inventory forecasting that predicts demand patterns and optimizes stock levels.",
    type: "AI_AGENT",
    featured: false,
    published: true,
    category: { slug: "ai-agents", name: "AI Agents" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-shopify-ai-assistant",
    slug: "shopify-ai-assistant",
    name: "Shopify AI Assistant",
    tagline: "Your AI co-pilot for Shopify store management",
    description:
      "An all-in-one AI assistant for Shopify merchants — manage products, optimize listings, and boost sales.",
    type: "SAAS",
    featured: true,
    published: true,
    category: { slug: "saas", name: "SaaS" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-ai-analytics-dashboard",
    slug: "ai-analytics-dashboard",
    name: "AI Analytics Dashboard",
    tagline: "Business intelligence powered by AI insights",
    description:
      "A comprehensive analytics platform with AI-powered insights, predictive analytics, and automated reporting.",
    type: "SAAS",
    featured: true,
    published: true,
    category: { slug: "saas", name: "SaaS" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-ai-crm-assistant",
    slug: "ai-crm-assistant",
    name: "AI CRM Assistant",
    tagline: "Supercharge your CRM with AI automation",
    description:
      "An intelligent CRM assistant that automates data entry, scores leads, and suggests next actions.",
    type: "AI_AGENT",
    featured: false,
    published: true,
    category: { slug: "ai-agents", name: "AI Agents" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-ai-voice-receptionist",
    slug: "ai-voice-receptionist",
    name: "AI Voice Receptionist",
    tagline: "Professional AI phone agent for your business",
    description:
      "A natural-sounding AI voice agent that answers calls, schedules appointments, and provides 24/7 coverage.",
    type: "AI_AGENT",
    featured: true,
    published: true,
    category: { slug: "ai-agents", name: "AI Agents" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-ai-whatsapp-business-agent",
    slug: "ai-whatsapp-business-agent",
    name: "AI WhatsApp Business Agent",
    tagline: "Automate WhatsApp conversations at scale",
    description:
      "An AI agent for WhatsApp Business API that handles customer conversations and processes orders.",
    type: "AI_AGENT",
    featured: false,
    published: true,
    category: { slug: "ai-agents", name: "AI Agents" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
  {
    id: "static-ai-appointment-scheduler",
    slug: "ai-appointment-scheduler",
    name: "AI Appointment Scheduler",
    tagline: "Intelligent scheduling that eliminates no-shows",
    description:
      "An AI-powered scheduling agent that books appointments, sends reminders, and reduces no-shows.",
    type: "AI_AGENT",
    featured: false,
    published: true,
    category: { slug: "ai-agents", name: "AI Agents" },
    features: [],
    benefits: [],
    integrations: [],
    faqs: [],
  },
];

export function getStaticProductBySlug(slug: string): StaticProduct | undefined {
  return staticProducts.find((p) => p.slug === slug);
}

export function filterStaticProducts(filters: {
  category?: string;
  type?: ProductType;
  search?: string;
  featured?: boolean;
}): StaticProduct[] {
  let results = staticProducts.filter((p) => p.published);

  if (filters.category) {
    results = results.filter((p) => p.category.slug === filters.category);
  }
  if (filters.type) {
    results = results.filter((p) => p.type === filters.type);
  }
  if (filters.featured !== undefined) {
    results = results.filter((p) => p.featured === filters.featured);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tagline?.toLowerCase().includes(q) ?? false)
    );
  }

  return results;
}
