import type { ProductType, BillingInterval, LeadStatus, RequestStatus } from "@prisma/client";

export type { ProductType, BillingInterval, LeadStatus, RequestStatus };

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProductBenefit {
  title: string;
  description: string;
  metric?: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ROIMetrics {
  avgRevenueIncrease: number;
  avgCostReduction: number;
  avgTimeSaved: number;
  paybackPeriod: string;
}

export interface WorkflowStep {
  title: string;
  description: string;
  icon?: string;
}

export interface CaseStudyResults {
  metrics: { label: string; value: string; change?: string }[];
  highlights: string[];
}

export interface PricingFeature {
  name: string;
  included: boolean;
  tooltip?: string;
}

export interface NavItem {
  title: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface DemoFormData {
  company: string;
  name: string;
  email: string;
  phone?: string;
  industry?: string;
  companySize?: string;
  challenges?: string;
  productsInterested: string[];
  preferredTime?: string;
}

export interface ContactFormData {
  company: string;
  name: string;
  email: string;
  phone?: string;
  industry?: string;
  companySize?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
