import { NextResponse } from "next/server";

import { apiError } from "@/lib/api-utils";
import { isClerkConfigured } from "@/lib/clerk-config";

export async function requireAuth() {
  if (!isClerkConfigured()) {
    return { userId: "dev-user", error: null };
  }

  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) {
    return { userId: null, error: apiError("Unauthorized", 401) };
  }
  return { userId, error: null };
}

export function unauthorizedResponse() {
  return apiError("Unauthorized", 401);
}
