"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import type { ProductFAQ } from "@/types";

interface ProductFaqProps {
  faqs: ProductFAQ[];
  productName?: string;
}

const defaultFaqs: ProductFAQ[] = [
  {
    question: "How long does deployment take?",
    answer:
      "Most solutions deploy within 2-4 weeks. Our team handles integration, configuration, and training as part of onboarding.",
  },
  {
    question: "Can I customize the AI agent's behavior?",
    answer:
      "Yes. You can customize tone, escalation rules, knowledge sources, and response templates through our intuitive admin dashboard.",
  },
  {
    question: "What integrations are supported?",
    answer:
      "We support 50+ integrations including Salesforce, HubSpot, Shopify, Zendesk, Slack, and custom APIs via webhooks.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We're SOC 2 Type II certified with end-to-end encryption, data residency options, and GDPR compliance.",
  },
];

export function ProductFaq({ faqs, productName }: ProductFaqProps) {
  const items = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section>
      <MotionWrapper className="mb-8 text-center">
        <h2 className="heading-md">Frequently Asked Questions</h2>
        {productName && (
          <p className="mt-2 text-muted-foreground">Common questions about {productName}</p>
        )}
      </MotionWrapper>
      <MotionWrapper>
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {items.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </MotionWrapper>
    </section>
  );
}
