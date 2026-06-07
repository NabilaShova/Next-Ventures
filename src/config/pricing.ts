import type { PricingFeature } from "@/types";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  isPopular?: boolean;
  isEnterprise?: boolean;
  features: PricingFeature[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For teams exploring AI automation",
    monthlyPrice: 499,
    yearlyPrice: 399,
    features: [
      { name: "Up to 3 AI agents", included: true },
      { name: "10,000 interactions/mo", included: true },
      { name: "Email support", included: true },
      { name: "Basic analytics", included: true },
      { name: "Custom integrations", included: false },
      { name: "Dedicated success manager", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "For scaling enterprise operations",
    monthlyPrice: 1499,
    yearlyPrice: 1199,
    isPopular: true,
    features: [
      { name: "Up to 10 AI agents", included: true },
      { name: "100,000 interactions/mo", included: true },
      { name: "Priority support", included: true },
      { name: "Advanced analytics & ROI tracking", included: true },
      { name: "Custom integrations", included: true },
      { name: "Dedicated success manager", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    monthlyPrice: null,
    yearlyPrice: null,
    isEnterprise: true,
    features: [
      { name: "Unlimited AI agents", included: true },
      { name: "Unlimited interactions", included: true },
      { name: "24/7 dedicated support", included: true },
      { name: "Custom AI model training", included: true },
      { name: "On-premise deployment", included: true },
      { name: "Dedicated success manager", included: true },
    ],
  },
];

export const pricingFaqs = [
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle, with prorated adjustments applied automatically.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "All plans include a 14-day free trial with full access to features. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, ACH transfers, and wire transfers for enterprise accounts. Annual invoicing is available for Enterprise plans.",
  },
  {
    question: "Do you offer custom pricing?",
    answer:
      "Yes. Our Enterprise plan is fully customizable based on your organization's needs, scale, and integration requirements. Contact our sales team for a tailored quote.",
  },
];

export const comparisonFeatures = [
  { name: "AI Agents", starter: "3", growth: "10", enterprise: "Unlimited" },
  { name: "Monthly Interactions", starter: "10K", growth: "100K", enterprise: "Unlimited" },
  { name: "Custom Integrations", starter: false, growth: true, enterprise: true },
  { name: "Analytics Dashboard", starter: "Basic", growth: "Advanced", enterprise: "Custom" },
  { name: "API Access", starter: false, growth: true, enterprise: true },
  { name: "SSO / SAML", starter: false, growth: false, enterprise: true },
  { name: "SLA Guarantee", starter: false, growth: "99.5%", enterprise: "99.9%" },
  { name: "Dedicated Manager", starter: false, growth: false, enterprise: true },
];
