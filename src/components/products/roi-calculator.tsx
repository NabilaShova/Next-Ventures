"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { formatCurrency } from "@/lib/utils";

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState([50]);
  const [avgSalary, setAvgSalary] = useState([65000]);
  const [hoursSaved, setHoursSaved] = useState([40]);

  const annualLaborCost = teamSize[0] * avgSalary[0];
  const savingsPercent = hoursSaved[0] / 100;
  const annualSavings = Math.round(annualLaborCost * savingsPercent * 0.6);
  const monthlySavings = Math.round(annualSavings / 12);
  const paybackMonths = Math.max(1, Math.round(1499 / monthlySavings));

  return (
    <MotionWrapper>
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
          <CardTitle>ROI Calculator</CardTitle>
          <p className="text-sm text-muted-foreground">
            Estimate your potential savings with AI automation.
          </p>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Team Size</Label>
              <span className="text-sm font-medium">{teamSize[0]} people</span>
            </div>
            <Slider value={teamSize} onValueChange={setTeamSize} min={5} max={500} step={5} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Average Annual Salary</Label>
              <span className="text-sm font-medium">{formatCurrency(avgSalary[0])}</span>
            </div>
            <Slider value={avgSalary} onValueChange={setAvgSalary} min={30000} max={150000} step={5000} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Estimated Time Saved</Label>
              <span className="text-sm font-medium">{hoursSaved[0]}%</span>
            </div>
            <Slider value={hoursSaved} onValueChange={setHoursSaved} min={10} max={80} step={5} />
          </div>

          <div className="grid gap-4 rounded-xl border bg-muted/50 p-6 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Annual Savings</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(annualSavings)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Monthly Savings</p>
              <p className="text-2xl font-bold">{formatCurrency(monthlySavings)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Payback Period</p>
              <p className="text-2xl font-bold">{paybackMonths} mo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </MotionWrapper>
  );
}
