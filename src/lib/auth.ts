import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { apiError } from "@/lib/api-utils";

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) {
    return { userId: null, error: apiError("Unauthorized", 401) };
  }
  return { userId, error: null };
}

export function unauthorizedResponse() {
  return apiError("Unauthorized", 401);
}
