import { setRequestLocale } from "next-intl/server";

import { createMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Terms of Service",
    description: "Terms and conditions for using Next Ventures AI services.",
    path: `/${locale}/terms`,
    noIndex: true,
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="section-padding">
      <div className="container-wide mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="lead text-muted-foreground">
          Last updated: June 7, 2026
        </p>
        <p>
          By accessing or using Next Ventures AI services, you agree to these
          Terms of Service. Please read them carefully.
        </p>
        <h2>Services</h2>
        <p>
          We provide AI agents, automation platforms, SaaS products, and custom
          software development services to enterprise clients.
        </p>
        <h2>Subscriptions</h2>
        <p>
          Paid subscriptions are billed monthly or annually. Free trials convert
          to paid plans unless canceled before the trial period ends. Enterprise
          agreements are governed by separate contracts.
        </p>
        <h2>Acceptable Use</h2>
        <p>
          You agree not to misuse our services, attempt unauthorized access, or
          use our AI agents for unlawful purposes.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          Our liability is limited to the amount paid for services in the twelve
          months preceding any claim, except where prohibited by law.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms:{" "}
          <a href="mailto:legal@nextventures.ai">legal@nextventures.ai</a>.
        </p>
      </div>
    </div>
  );
}
