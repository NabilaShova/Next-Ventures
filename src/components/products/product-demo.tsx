"use client";

import { Quote } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MotionWrapper } from "@/components/ui/motion-wrapper";

interface Testimonial {
  id?: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
}

interface ProductDemoProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Next Ventures AI transformed our customer support. We went from 48-hour response times to under 30 seconds, while cutting costs by 70%.",
    author: "Jennifer Walsh",
    role: "VP of Operations",
    company: "TechFlow Inc.",
  },
  {
    quote:
      "The ROI was immediate. Within the first quarter, we recovered $2.3M in abandoned cart revenue. The AI agent pays for itself many times over.",
    author: "David Park",
    role: "CEO",
    company: "RetailMax",
  },
];

export function ProductDemo({ testimonials }: ProductDemoProps) {
  const items = testimonials?.length ? testimonials : defaultTestimonials;

  return (
    <section>
      <MotionWrapper className="mb-8 text-center">
        <h2 className="heading-md">What Our Clients Say</h2>
      </MotionWrapper>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((t, i) => (
          <MotionWrapper key={i} delay={i * 0.1}>
            <Card className="h-full">
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/30" />
                <p className="text-muted-foreground italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {t.author.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{t.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {[t.role, t.company].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
