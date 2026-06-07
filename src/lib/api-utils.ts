import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(
  message: string,
  status = 400,
  details?: unknown
) {
  return NextResponse.json(
    { success: false, error: message, ...(details ? { details } : {}) },
    { status }
  );
}

export function zodErrorResponse(error: ZodError) {
  return apiError("Validation failed", 400, error.flatten());
}

export function handleApiError(error: unknown) {
  console.error("[API Error]", error);
  if (error instanceof Error && error.message.includes("not found")) {
    return apiError(error.message, 404);
  }
  return apiError("Internal server error", 500);
}
