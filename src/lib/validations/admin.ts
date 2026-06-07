import { z } from "zod";

const productTypes = [
  "AI_AGENT",
  "SAAS",
  "WEB_APP",
  "MOBILE_APP",
  "AUTOMATION",
  "CUSTOM_ENTERPRISE",
] as const;

const leadStatuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
] as const;

const requestStatuses = [
  "PENDING",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

export const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  tagline: z.string().optional(),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  type: z.enum(productTypes),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  categoryId: z.string().min(1),
  order: z.number().int().default(0),
  features: z.array(z.unknown()).default([]),
  benefits: z.array(z.unknown()).default([]),
  integrations: z.array(z.unknown()).default([]),
  faqs: z.array(z.unknown()).default([]),
});

export const updateProductSchema = createProductSchema.partial();

export const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().int().default(0),
});

export const updateCategorySchema = createCategorySchema.partial();

export const updateLeadStatusSchema = z.object({
  status: z.enum(leadStatuses),
});

export const updateRequestStatusSchema = z.object({
  status: z.enum(requestStatuses),
});
