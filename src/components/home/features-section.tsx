"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  Headphones,
  LineChart,
  Mail,
  MessageSquare,
  Package,
  Phone,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

import { GlassCard } from "@/components/shared/glass-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
}

const features: Feature[] = [
  {
    title: "Customer Support",
    description:
      "Resolve tickets instantly with AI that understands context, escalates smartly, and learns from every interaction.",
    icon: Headphones,
    href: "/solutions/ai-customer-support-agent",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Sales Recovery",
    description:
      "Re-engage abandoned carts and lost leads automatically with personalized outreach that converts.",
    icon: ShoppingCart,
    href: "/solutions/ai-sales-recovery-agent",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Email Campaign",
    description:
      "AI writes, segments, and optimizes email campaigns — from subject lines to send-time personalization.",
    icon: Mail,
    href: "/solutions/ai-email-campaign-agent",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Inventory Forecasting",
    description:
      "Predict demand patterns and optimize stock levels with ML-powered forecasting that reduces waste.",
    icon: Package,
    href: "/solutions/ai-inventory-forecasting-agent",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Voice Agent",
    description:
      "Natural-sounding AI phone agents that answer calls, schedule appointments, and provide 24/7 coverage.",
    icon: Phone,
    href: "/solutions/ai-voice-receptionist",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    title: "WhatsApp Business",
    description:
      "Automate WhatsApp conversations at scale — handle inquiries, process orders, and nurture leads.",
    icon: MessageSquare,
    href: "/solutions/ai-whatsapp-business-agent",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Appointment Scheduler",
    description:
      "Intelligent scheduling that books appointments, sends reminders, and dramatically reduces no-shows.",
    icon: Calendar,
    href: "/solutions/ai-appointment-scheduler",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Business intelligence powered by AI insights, predictive analytics, and automated reporting.",
    icon: LineChart,
    href: "/solutions/ai-analytics-dashboard",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "CRM Assistant",
    description:
      "Supercharge your CRM with AI that automates data entry, scores leads, and suggests next actions.",
    icon: Users,
    href: "/solutions/ai-crm-assistant",
    gradient: "from-fuchsia-500 to-violet-500",
  },
];

export function FeaturesSection() {
  const tCommon = useTranslations("common");

  return (
    <section className="relative section-padding" aria-labelledby="features-heading">
      <SectionHeader
        badge="AI Agents"
        title="Nine agents. Infinite leverage."
        description="Deploy production-ready AI agents across every customer touchpoint — each built for enterprise scale, security, and measurable ROI."
      />

      <div className="container-wide">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (index % 3) * 0.08, duration: 0.5 }}
            >
              <Link href={feature.href} className="group block h-full">
                <GlassCard
                  hover
                  className="flex h-full flex-col p-6 transition-all duration-300 group-hover:border-primary/30"
                >
                  <div
                    className={cn(
                      "mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-glow-sm",
                      feature.gradient
                    )}
                  >
                    <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>

                  <h3
                    id={index === 0 ? "features-heading" : undefined}
                    className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors"
                  >
                    {feature.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="glass">
            <Link href="/solutions">
              {tCommon("viewSolutions")}
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
