import { z } from "zod";

const productTypes = [
  "AI_AGENT",
  "SAAS",
  "WEB_APP",
  "MOBILE_APP",
  "AUTOMATION",
  "CUSTOM_ENTERPRISE",
] as const;

export const productsQuerySchema = z.object({
  category: z.string().optional(),
  type: z.enum(productTypes).optional(),
  search: z.string().optional(),
  featured: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
});

export const createLeadSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const createDemoRequestSchema = z.object({
  company: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  challenges: z.string().optional(),
  productsInterested: z.array(z.string()).default([]),
  preferredTime: z.string().optional(),
});

export const createContactRequestSchema = z.object({
  company: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10),
});

export const createNewsletterSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
});

export const trackEventSchema = z.object({
  event: z.string().min(1),
  page: z.string().optional(),
  sessionId: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const checkoutSchema = z.object({
  priceId: z.string().min(1),
  customerEmail: z.string().email().optional(),
  customerId: z.string().optional(),
  trialDays: z.number().int().positive().optional(),
  productSlug: z.string().optional(),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export const chatSchema = z.object({
  message: z.string().min(1).max(2000),
  productSlug: z.string().optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .optional(),
});
