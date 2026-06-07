"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const clerkEnabled =
  clerkKey && clerkKey.startsWith("pk_") && !clerkKey.includes("xxx");

export function Providers({ children }: { children: ReactNode }) {
  if (clerkEnabled) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { ClerkProvider } = require("@clerk/nextjs") as typeof import("@clerk/nextjs");
    return (
      <ClerkProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ClerkProvider>
    );
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}
