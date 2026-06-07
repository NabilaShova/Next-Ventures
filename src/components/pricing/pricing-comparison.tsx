"use client";

import { Check, X } from "lucide-react";

import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { comparisonFeatures } from "@/config/pricing";

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-primary" />
    ) : (
      <X className="mx-auto h-5 w-5 text-muted-foreground/30" />
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
}

export function PricingComparison() {
  return (
    <MotionWrapper>
      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left text-sm font-semibold">Feature</th>
              <th className="p-4 text-center text-sm font-semibold">Starter</th>
              <th className="p-4 text-center text-sm font-semibold text-primary">Growth</th>
              <th className="p-4 text-center text-sm font-semibold">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((row) => (
              <tr key={row.name} className="border-b last:border-0">
                <td className="p-4 text-sm">{row.name}</td>
                <td className="p-4 text-center">
                  <CellValue value={row.starter} />
                </td>
                <td className="p-4 text-center bg-primary/5">
                  <CellValue value={row.growth} />
                </td>
                <td className="p-4 text-center">
                  <CellValue value={row.enterprise} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MotionWrapper>
  );
}
