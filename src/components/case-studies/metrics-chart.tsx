"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { MotionWrapper } from "@/components/ui/motion-wrapper";

interface MetricItem {
  label: string;
  value: string;
  change?: string;
}

function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const numericMatch = value.match(/[\d.]+/);
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
  const suffix = value.match(/[^\d.]*$/)?.[0] ?? "";

  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) => {
    const formatted = Number.isInteger(numeric) ? Math.round(v) : v.toFixed(1);
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(motionValue, numeric, { duration: 1.5, ease: "easeOut" });
    return controls.stop;
  }, [numeric, motionValue]);

  return (
    <div className="rounded-xl border bg-card p-6 text-center">
      <motion.div className="text-3xl font-bold text-primary">{display}</motion.div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

interface MetricsChartProps {
  metrics: MetricItem[];
}

export function MetricsChart({ metrics }: MetricsChartProps) {
  const chartData = metrics.map((m, i) => ({
    name: m.label,
    value: parseFloat(m.value.replace(/[^0-9.]/g, "")) || (i + 1) * 10,
    fill: i % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--accent))",
  }));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((m) => (
          <AnimatedMetric key={m.label} value={m.value} label={m.label} />
        ))}
      </div>

      <MotionWrapper>
        <div className="h-64 rounded-xl border bg-card p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </MotionWrapper>
    </div>
  );
}
