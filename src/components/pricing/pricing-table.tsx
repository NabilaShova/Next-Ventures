"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { pricingPlans } from "@/config/pricing";
import { Link } from "@/i18n/routing";
import { formatCurrency } from "@/lib/utils";

export function PricingTable() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      <div className="mb-12 flex items-center justify-center gap-3">
        <Label htmlFor="pricing-billing" className={!yearly ? "font-semibold" : ""}>
          Monthly
        </Label>
        <Switch id="pricing-billing" checked={yearly} onCheckedChange={setYearly} />
        <Label htmlFor="pricing-billing" className={yearly ? "font-semibold" : ""}>
          Yearly
        </Label>
        <Badge variant="secondary">Save 20%</Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {pricingPlans.map((plan, i) => (
          <MotionWrapper key={plan.id} delay={i * 0.1}>
            <Card
              className={`relative flex h-full flex-col ${plan.isPopular ? "border-primary shadow-glow" : ""}`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  {plan.isEnterprise ? (
                    <div className="text-4xl font-bold">Custom</div>
                  ) : (
                    <div className="text-4xl font-bold">
                      {formatCurrency(
                        yearly ? (plan.yearlyPrice ?? 0) : (plan.monthlyPrice ?? 0)
                      )}
                      <span className="text-base font-normal text-muted-foreground">/mo</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 text-sm">
                      <Check
                        className={`h-4 w-4 ${f.included ? "text-primary" : "text-muted-foreground/30"}`}
                      />
                      <span className={f.included ? "" : "text-muted-foreground/50"}>{f.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.isPopular ? "default" : "outline"} asChild>
                  <Link href={plan.isEnterprise ? "/contact" : "/book-demo"}>
                    {plan.isEnterprise ? "Contact Sales" : "Start Free Trial"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
