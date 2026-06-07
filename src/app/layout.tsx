import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Next Ventures AI",
  description: "Enterprise AI Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
