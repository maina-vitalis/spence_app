import { getPosts } from "@/lib/actions/posts";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Spence Creations",
  description:
    "Insights, tutorials, and stories from the world of design and development.",
};

export const dynamic = "force-dynamic";

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export default async function BlogPage() {
  const result = await getPosts();
  const posts = result.success && result.data ? result.data : [];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/30 py-12 md:py-24">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Tag className="h-3.5 w-3.5" />
            The Blog
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Insights & Stories
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tutorials, deep-dives, and lessons learned from building real-world
            products. Written for developers and designers.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="container mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted-foreground text-lg">
              No posts published yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className={`group relative flex flex-col gap-4 sm:gap-6 ${
                  index === 0 && post.coverImage
                    ? "md:flex-row md:gap-8"
                    : "sm:flex-row sm:gap-6"
                } rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200`}
              >
                {/* Cover image */}
                {post.coverImage && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className={`flex-shrink-0 overflow-hidden rounded-xl ${
                      index === 0
                        ? "md:w-72 md:h-48 aspect-video sm:aspect-auto h-44 sm:h-48"
                        : "sm:w-40 sm:h-28 aspect-video sm:aspect-auto h-40"
                    } bg-muted block`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}

                {/* Content */}
                <div className="flex-1 space-y-2.5">
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[11px] sm:text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Link href={`/blog/${post.slug}`}>
                    <h2
                      className={`font-bold tracking-tight group-hover:text-primary transition-colors ${
                        index === 0 ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl"
                      }`}
                    >
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {stripHtml(post.excerpt)}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {post.publishedAt
                        ? format(new Date(post.publishedAt), "MMM d, yyyy")
                        : format(new Date(post.createdAt), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTime} min read
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
