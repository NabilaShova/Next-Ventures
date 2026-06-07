"use client";

import { Clock, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Link } from "@/i18n/routing";

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    tags: string[];
    author: string;
    readingTime: number;
    createdAt: string;
    featured?: boolean;
  };
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <MotionWrapper delay={index * 0.08}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:border-primary/30 hover:shadow-float">
        <div className="aspect-[16/9] bg-gradient-to-br from-brand-500/10 to-accent/10" />
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{post.category}</Badge>
            {post.featured && <Badge>Featured</Badge>}
          </div>
          <h3 className="mt-3 text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{post.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">{date}</div>
          <Button variant="ghost" className="mt-4 w-full justify-between" asChild>
            <Link href={`/blog/${post.slug}`}>
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </article>
    </MotionWrapper>
  );
}
