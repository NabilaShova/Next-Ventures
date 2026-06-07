"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/providers/theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ClerkProvider>
  );
}
