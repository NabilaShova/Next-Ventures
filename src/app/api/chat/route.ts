import { NextRequest } from "next/server";
import { staticProducts } from "@/data/products";
import {
  apiSuccess,
  handleApiError,
  zodErrorResponse,
} from "@/lib/api-utils";
import { chatSchema } from "@/lib/validations/api";
import { getProductBySlug } from "@/services/product.service";

const PRICING_KEYWORDS = ["price", "pricing", "cost", "plan", "trial"];
const DEMO_KEYWORDS = ["demo", "trial", "try", "test", "schedule"];
const FEATURE_KEYWORDS = ["feature", "capability", "what does", "how does", "integrat"];
const COMPARE_KEYWORDS = ["compare", "difference", "vs", "versus", "which"];

function findRelevantProducts(message: string, productSlug?: string) {
  const lower = message.toLowerCase();

  if (productSlug) {
    const product = staticProducts.find((p) => p.slug === productSlug);
    if (product) return [product];
  }

  const matched = staticProducts.filter(
    (p) =>
      lower.includes(p.slug.replace(/-/g, " ")) ||
      lower.includes(p.name.toLowerCase()) ||
      p.name
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 3 && lower.includes(word))
  );

  return matched.length > 0 ? matched.slice(0, 3) : staticProducts.filter((p) => p.featured).slice(0, 3);
}

function generateResponse(
  message: string,
  productSlug?: string
): { content: string; suggestedProducts: string[] } {
  const lower = message.toLowerCase();
  const products = findRelevantProducts(message, productSlug);
  const slugs = products.map((p) => p.slug);

  if (DEMO_KEYWORDS.some((k) => lower.includes(k))) {
    const names = products.map((p) => p.name).join(", ");
    return {
      content: `Great choice! You can request a personalized demo for ${names}. Our team typically schedules demos within 24 hours and includes a live walkthrough plus ROI assessment. Would you like me to help you understand which product fits your use case best?`,
      suggestedProducts: slugs,
    };
  }

  if (PRICING_KEYWORDS.some((k) => lower.includes(k))) {
    const details = products
      .map(
        (p) =>
          `**${p.name}**: Plans start with a 14-day free trial. Visit our pricing page or contact sales for enterprise quotes.`
      )
      .join("\n\n");
    return {
      content: `Here's pricing information for the products you're asking about:\n\n${details}\n\nAll plans include onboarding support and can scale as your team grows.`,
      suggestedProducts: slugs,
    };
  }

  if (FEATURE_KEYWORDS.some((k) => lower.includes(k))) {
    const details = products
      .map((p) => {
        const featureList =
          p.features.length > 0
            ? p.features.map((f) => `- ${f.title}: ${f.description}`).join("\n")
            : `- ${p.description}`;
        return `**${p.name}** (${p.tagline})\n${featureList}`;
      })
      .join("\n\n");
    return {
      content: `Here are the key capabilities:\n\n${details}`,
      suggestedProducts: slugs,
    };
  }

  if (COMPARE_KEYWORDS.some((k) => lower.includes(k))) {
    const comparison = products
      .map(
        (p) =>
          `**${p.name}** (${p.type.replace(/_/g, " ")}): ${p.tagline ?? p.description}`
      )
      .join("\n");
    return {
      content: `Here's a quick comparison of relevant products:\n\n${comparison}\n\nEach product is designed for different business needs. Tell me more about your industry and goals, and I can recommend the best fit.`,
      suggestedProducts: slugs,
    };
  }

  if (products.length === 1) {
    const p = products[0];
    return {
      content: `**${p.name}** is ${p.tagline?.toLowerCase() ?? "one of our enterprise AI solutions"}. ${p.description}\n\nI can tell you about pricing, features, integrations, or help you schedule a demo. What would you like to know?`,
      suggestedProducts: slugs,
    };
  }

  const list = products
    .map((p) => `- **${p.name}**: ${p.tagline ?? p.description.slice(0, 100)}`)
    .join("\n");

  return {
    content: `Thanks for your question! Based on what you've asked, here are our most relevant solutions:\n\n${list}\n\nFeel free to ask about specific features, pricing, or request a demo for any product.`,
    suggestedProducts: slugs,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return zodErrorResponse(parsed.error);
    }

    const { message, productSlug } = parsed.data;

    if (productSlug) {
      const productResult = await getProductBySlug(productSlug);
      if (!productResult) {
        return apiSuccess({
          reply: generateResponse(message),
          timestamp: new Date().toISOString(),
        });
      }
    }

    const { content, suggestedProducts } = generateResponse(
      message,
      productSlug
    );

    return apiSuccess({
      reply: {
        role: "assistant" as const,
        content,
        suggestedProducts,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
