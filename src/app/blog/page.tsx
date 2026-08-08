import { getPosts } from "@/lib/actions/posts";
import { formatDistanceToNow, format } from "date-fns";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tech Blog — Insights, Tutorials & Deep Dives",
  description:
    "Explore tutorials, deep-dives, and lessons learned from building real-world products. Covering AI, cloud computing, cybersecurity, DevOps, and modern web development.",
  keywords: [
    "tech blog",
    "web development tutorials",
    "AI insights",
    "cloud computing",
    "software engineering blog",
    "developer articles",
    ...siteConfig.keywords,
  ],
  openGraph: {
    title: "Tech Blog — Insights, Tutorials & Deep Dives",
    description:
      "Explore tutorials, deep-dives, and lessons learned from building real-world products. Written for developers and designers.",
    url: absoluteUrl("/blog"),
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/logo.png"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Blog — Insights, Tutorials & Deep Dives",
    description:
      "Tutorials, deep-dives, and lessons learned from building real-world products.",
    creator: siteConfig.twitter,
  },
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
};

export const revalidate = 60;

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export default async function BlogPage() {
  const result = await getPosts();
  const posts = result.success && result.data ? result.data : [];

  // JSON-LD: Blog CollectionPage
  const jsonLdBlog = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tech Blog — Insights, Tutorials & Deep Dives",
    description:
      "Explore tutorials, deep-dives, and lessons learned from building real-world products.",
    url: absoluteUrl("/blog"),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
    },
  };

  // JSON-LD: BreadcrumbList
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/blog"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <main className="min-h-screen bg-background">
        {/* Breadcrumb navigation */}
        <nav
          aria-label="Breadcrumb"
          className="container mx-auto max-w-4xl px-6 pt-6"
        >
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-foreground font-medium" aria-current="page">
                Blog
              </span>
            </li>
          </ol>
        </nav>

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
              {posts.map((post, index) => {
                const publishDate = post.publishedAt
                  ? new Date(post.publishedAt)
                  : new Date(post.createdAt);

                return (
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
                        <time
                          dateTime={publishDate.toISOString()}
                          className="flex items-center gap-1.5"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          {format(publishDate, "MMM d, yyyy")}
                        </time>
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
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
