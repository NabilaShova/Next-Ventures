import { setRequestLocale } from "next-intl/server";

import { createMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return createMetadata({
    title: "Privacy Policy",
    description: "How Next Ventures AI collects, uses, and protects your data.",
    path: `/${locale}/privacy`,
    noIndex: true,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="section-padding">
      <div className="container-wide mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="lead text-muted-foreground">
          Last updated: June 7, 2026
        </p>
        <p>
          Next Ventures AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting
          your privacy. This policy describes how we collect, use, and safeguard
          information when you use our website and services.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We collect information you provide directly, including name, email,
          company details, and messages submitted through contact forms, demo
          requests, and newsletter signups.
        </p>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To respond to inquiries and schedule demos</li>
          <li>To provide and improve our AI solutions</li>
          <li>To send relevant product updates (with your consent)</li>
          <li>To analyze website usage and optimize performance</li>
        </ul>
        <h2>Data Security</h2>
        <p>
          We implement industry-standard security measures including encryption,
          access controls, and regular security audits. We are SOC 2 Type II
          certified.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact us at{" "}
          <a href="mailto:privacy@nextventures.ai">privacy@nextventures.ai</a>.
        </p>
      </div>
    </div>
  );
}
