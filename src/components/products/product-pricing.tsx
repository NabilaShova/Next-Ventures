"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { pricingPlans } from "@/config/pricing";
import { Link } from "@/i18n/routing";
import { formatCurrency } from "@/lib/utils";

interface ProductPricingProps {
  productName: string;
  productSlug: string;
}

export function ProductPricing({ productName, productSlug }: ProductPricingProps) {
  const [yearly, setYearly] = useState(false);

  return (
    <section>
      <MotionWrapper className="mb-8 text-center">
        <h2 className="heading-md">Pricing for {productName}</h2>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Label htmlFor="billing-toggle" className={!yearly ? "font-semibold" : ""}>
            Monthly
          </Label>
          <Switch id="billing-toggle" checked={yearly} onCheckedChange={setYearly} />
          <Label htmlFor="billing-toggle" className={yearly ? "font-semibold" : ""}>
            Yearly <Badge variant="secondary" className="ml-1">Save 20%</Badge>
          </Label>
        </div>
      </MotionWrapper>

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan, i) => (
          <MotionWrapper key={plan.id} delay={i * 0.1}>
            <Card className={`relative h-full ${plan.isPopular ? "border-primary shadow-glow-sm" : ""}`}>
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  {plan.isEnterprise ? (
                    <span className="text-3xl font-bold">Custom</span>
                  ) : (
                    <span className="text-3xl font-bold">
                      {formatCurrency(
                        yearly ? (plan.yearlyPrice ?? 0) : (plan.monthlyPrice ?? 0)
                      )}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.name} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${f.included ? "text-primary" : "text-muted-foreground/30"}`}
                      />
                      <span className={f.included ? "" : "text-muted-foreground/50"}>{f.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.isPopular ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.isEnterprise ? "/contact" : `/book-demo?product=${productSlug}`}>
                    {plan.isEnterprise ? "Contact Sales" : "Start Free Trial"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
}
