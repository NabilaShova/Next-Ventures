import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Clock, ArrowLeft } from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/ui/motion-wrapper";
import { Link } from "@/i18n/routing";
import { createMetadata } from "@/lib/metadata";
import { getBlogPostBySlug, getBlogPosts } from "@/services/blog.service";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const result = await getBlogPostBySlug(slug);
  if (!result) return createMetadata({ title: "Article Not Found", noIndex: true });

  const { post } = result;
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/${locale}/blog/${slug}`,
    image: post.coverImage ?? undefined,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = await getBlogPostBySlug(slug);
  if (!result) notFound();

  const { post } = result;
  const { posts: allPosts } = await getBlogPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 3);

  const date = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <article>
        <section className="section-padding border-b">
          <div className="container-wide">
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            <MotionWrapper>
              <div className="mx-auto max-w-3xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>{post.category}</Badge>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="heading-lg">{post.title}</h1>
                <p className="mt-4 text-xl text-muted-foreground">{post.excerpt}</p>

                <div className="mt-8 flex items-center gap-4 border-t pt-6">
                  <Avatar>
                    <AvatarFallback>
                      {post.author.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-wide">
            <MotionWrapper>
              <div
                className="prose prose-lg dark:prose-invert mx-auto max-w-3xl"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
              />
            </MotionWrapper>
          </div>
        </section>
      </article>

      {relatedPosts.length > 0 && (
        <section className="section-padding border-t bg-muted/30">
          <div className="container-wide">
            <h2 className="heading-md mb-8">Related Articles</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
