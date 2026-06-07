"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const demoSchema = z.object({
  company: z.string().min(1, "Company is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  challenges: z.string().optional(),
  productsInterested: z.array(z.string()).default([]),
  preferredTime: z.string().optional(),
});

type DemoFormValues = z.infer<typeof demoSchema>;

const steps = [
  { title: "Company Info", fields: ["company", "name", "email", "phone"] },
  { title: "Your Business", fields: ["industry", "companySize"] },
  { title: "Your Needs", fields: ["challenges", "productsInterested"] },
  { title: "Schedule", fields: ["preferredTime"] },
];

const productOptions = [
  "AI Customer Support Agent",
  "AI Sales Recovery Agent",
  "Shopify AI Assistant",
  "AI Analytics Dashboard",
  "Custom Enterprise Solution",
];

export function DemoForm() {
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { productsInterested: [] },
  });

  const productsInterested = watch("productsInterested") ?? [];
  const progress = ((step + 1) / steps.length) * 100;

  async function nextStep() {
    const fields = steps[step].fields as (keyof DemoFormValues)[];
    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function toggleProduct(product: string) {
    const current = productsInterested;
    const updated = current.includes(product)
      ? current.filter((p) => p !== product)
      : [...current, product];
    setValue("productsInterested", updated);
  }

  async function onSubmit(data: DemoFormValues) {
    try {
      const res = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        throw new Error("Failed");
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <CheckCircle2 className="h-20 w-20 text-primary" />
        </motion.div>
        <h2 className="mt-6 text-2xl font-bold">Demo Request Submitted!</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
          Thank you! Our team will reach out within 24 hours to schedule your personalized demo.
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium">
            Step {step + 1} of {steps.length}: {steps[step].title}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {step === 0 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input id="company" {...register("company")} />
                    {errors.company && (
                      <p className="text-sm text-destructive">{errors.company.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email *</Label>
                    <Input id="email" type="email" {...register("email")} />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("phone")} />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select onValueChange={(v) => setValue("industry", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Technology", "Retail", "Healthcare", "Finance", "Manufacturing"].map(
                        (i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Company Size</Label>
                  <Select onValueChange={(v) => setValue("companySize", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {["1-50", "51-200", "201-1000", "1000+"].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s} employees
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="challenges">What challenges are you facing?</Label>
                  <Textarea
                    id="challenges"
                    {...register("challenges")}
                    placeholder="Describe your current challenges and goals..."
                    rows={4}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Products you&apos;re interested in</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {productOptions.map((product) => (
                      <label
                        key={product}
                        className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={productsInterested.includes(product)}
                          onCheckedChange={() => toggleProduct(product)}
                        />
                        <span className="text-sm">{product}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-2">
                <Label>Preferred Demo Time</Label>
                <Select onValueChange={(v) => setValue("preferredTime", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Morning (9am-12pm)",
                      "Afternoon (12pm-5pm)",
                      "Evening (5pm-8pm)",
                      "Flexible",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-4">
                  Our team will confirm your demo time via email within 24 hours.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={step === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Book Demo"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
