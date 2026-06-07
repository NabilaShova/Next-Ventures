import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return "";
  return builder.image(source).url();
}

export async function fetchSanityQuery<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return null;
  }
}
