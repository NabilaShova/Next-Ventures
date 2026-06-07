"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Calendar,
  Loader2,
  MessageSquare,
  Send,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAnalytics } from "@/hooks/use-analytics";
import { scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestedProducts?: string[];
}

interface AiAssistantProps {
  productSlug?: string;
}

function formatContent(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i}>
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j}>{part.slice(2, -2)}</strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    );
  });
}

export function AiAssistant({ productSlug }: AiAssistantProps) {
  const t = useTranslations("common");
  const { locale } = useParams<{ locale: string }>();
  const { trackEvent } = useAnalytics();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your Next Ventures AI assistant. I can recommend products, explain features, help you book a demo, or answer questions about our enterprise AI solutions. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadName, setLeadName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    trackEvent("chat_message_sent", { productSlug });

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          productSlug,
          history,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Chat request failed");
      }

      const reply = data.data.reply;
      const content =
        typeof reply === "string" ? reply : reply.content;
      const suggestedProducts =
        typeof reply === "object" ? reply.suggestedProducts : undefined;

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content,
          suggestedProducts,
        },
      ]);

      const lower = text.toLowerCase();
      if (
        lower.includes("demo") ||
        lower.includes("contact") ||
        lower.includes("call")
      ) {
        setShowLeadForm(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please try again or contact our team directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail) return;

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: leadEmail,
          name: leadName,
          source: "chat_assistant",
          metadata: { productSlug },
        }),
      });
      trackEvent("chat_lead_capture", { email: leadEmail });
      setShowLeadForm(false);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Thanks! Our team will reach out within 24 hours. You can also schedule a demo directly using the button below.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Couldn't save your details. Please use the demo booking link below.",
        },
      ]);
    }
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    trackEvent(next ? "chat_open" : "chat_close");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed bottom-36 right-4 z-50 flex h-[min(520px,70vh)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border bg-background shadow-float"
          >
            <div className="flex items-center justify-between border-b bg-primary px-4 py-3 text-primary-foreground">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={toggle}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-2",
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {msg.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      {formatContent(msg.content)}
                      {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {msg.suggestedProducts.map((slug) => (
                            <Link
                              key={slug}
                              href={`/${locale}/solutions/${slug}`}
                              className="rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium text-primary hover:underline"
                              onClick={() =>
                                trackEvent("chat_product_click", { slug })
                              }
                            >
                              {slug.replace(/-/g, " ")}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {showLeadForm && (
              <form
                onSubmit={handleLeadSubmit}
                className="border-t bg-muted/50 p-3 space-y-2"
              >
                <p className="text-xs text-muted-foreground">
                  Share your details for a personalized follow-up:
                </p>
                <Input
                  placeholder="Your name"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Work email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  required
                />
                <Button type="submit" size="sm" className="w-full">
                  Submit
                </Button>
              </form>
            )}

            <div className="border-t p-3">
              <div className="mb-2 flex gap-1">
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link
                    href={`/${locale}/contact?intent=demo`}
                    onClick={() => trackEvent("chat_demo_click")}
                  >
                    <Calendar className="h-3 w-3" />
                    {t("scheduleDemo")}
                  </Link>
                </Button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <Input
                  placeholder="Ask about products, pricing, demos..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggle}
        size="icon"
        className="fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-glow transition-transform hover:scale-105"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </>
  );
}
