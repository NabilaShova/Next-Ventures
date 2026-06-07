import type {
  ContactFormData,
  DemoFormData,
} from "@/types";
import { withDb } from "@/lib/db-safe";
import { prisma } from "@/lib/prisma";

export interface CreateLeadInput {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

function fallbackId() {
  return `fallback-${crypto.randomUUID()}`;
}

export async function createLead(input: CreateLeadInput) {
  const { data, fromDb } = await withDb(
    async () => {
      const lead = await prisma.lead.create({
        data: {
          email: input.email,
          name: input.name,
          company: input.company,
          phone: input.phone,
          source: input.source,
          metadata: input.metadata ?? undefined,
        },
      });
      return { lead, persisted: true as const };
    },
    () => ({
      lead: {
        id: fallbackId(),
        ...input,
        status: "NEW" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      persisted: false as const,
    })
  );
  return { ...data, persisted: fromDb ? data.persisted : false };
}

export async function createDemoRequest(input: DemoFormData) {
  const { data, fromDb } = await withDb(
    async () => {
      const request = await prisma.demoRequest.create({
        data: {
          company: input.company,
          name: input.name,
          email: input.email,
          phone: input.phone,
          industry: input.industry,
          companySize: input.companySize,
          challenges: input.challenges,
          productsInterested: input.productsInterested,
          preferredTime: input.preferredTime,
        },
      });
      return { request, persisted: true as const };
    },
    () => ({
      request: {
        id: fallbackId(),
        ...input,
        status: "PENDING" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      persisted: false as const,
    })
  );
  return { ...data, persisted: fromDb ? data.persisted : false };
}

export async function createContactRequest(input: ContactFormData) {
  const { data, fromDb } = await withDb(
    async () => {
      const request = await prisma.contactRequest.create({
        data: {
          company: input.company,
          name: input.name,
          email: input.email,
          phone: input.phone,
          industry: input.industry,
          companySize: input.companySize,
          budget: input.budget,
          timeline: input.timeline,
          message: input.message,
        },
      });
      return { request, persisted: true as const };
    },
    () => ({
      request: {
        id: fallbackId(),
        ...input,
        status: "PENDING" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      persisted: false as const,
    })
  );
  return { ...data, persisted: fromDb ? data.persisted : false };
}

export async function createNewsletterSubscriber(input: {
  email: string;
  name?: string;
}) {
  const { data, fromDb } = await withDb(
    async () => {
      const subscriber = await prisma.newsletterSubscriber.upsert({
        where: { email: input.email },
        update: { name: input.name, active: true },
        create: { email: input.email, name: input.name },
      });
      return { subscriber, persisted: true as const };
    },
    () => ({
      subscriber: {
        id: fallbackId(),
        email: input.email,
        name: input.name ?? null,
        active: true,
        createdAt: new Date().toISOString(),
      },
      persisted: false as const,
    })
  );
  return { ...data, persisted: fromDb ? data.persisted : false };
}
