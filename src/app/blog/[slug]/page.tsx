import { getPostBySlug } from "@/lib/actions/posts";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Metadata } from "next";
import { MermaidRenderer } from "@/components/MermaidRenderer";
import { siteConfig, absoluteUrl } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (!result.success || !result.data) {
    return { title: "Post Not Found" };
  }

  const post = result.data;
  const description = stripHtml(post.excerpt).slice(0, 160);
  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description,
    keywords: [...post.tags, ...siteConfig.keywords],
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: postUrl,
      siteName: siteConfig.name,
      publishedTime: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: [siteConfig.author],
      tags: post.tags,
      section: post.tags[0] ?? "Technology",
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [
            {
              url: absoluteUrl("/logo.png"),
              width: 1200,
              height: 630,
              alt: siteConfig.name,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: siteConfig.twitter,
      images: post.coverImage ? [post.coverImage] : [absoluteUrl("/logo.png")],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);

  if (!result.success || !result.data || result.data.status !== "PUBLISHED") {
    notFound();
  }

  const post = result.data;
  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const publishDate = post.publishedAt ?? post.createdAt;
  const plainExcerpt = stripHtml(post.excerpt);

  // Estimate word count from content for structured data
  const wordCount = post.content
    .replace(/<[^>]+>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // JSON-LD: BlogPosting
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: plainExcerpt,
    image: post.coverImage ?? absoluteUrl("/logo.png"),
    datePublished: publishDate.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
      image: absoluteUrl("/logo.png"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    keywords: post.tags.join(", "),
    wordCount,
    articleSection: post.tags[0] ?? "Technology",
    url: postUrl,
    inLanguage: "en-US",
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
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
              <Link
                href="/blog"
                className="hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span
                className="text-foreground font-medium line-clamp-1 max-w-[200px] sm:max-w-xs"
                aria-current="page"
              >
                {post.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Back link */}
        <div className="container mx-auto max-w-4xl px-6 pt-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="container mx-auto max-w-4xl px-6 py-10">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>

          <div
            className="tiptap-content prose prose-neutral dark:prose-invert max-w-none mt-4 text-xl text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />

          <div className="mt-6 flex items-center gap-5 text-sm text-muted-foreground border-b pb-6">
            <time
              dateTime={publishDate.toISOString()}
              className="flex items-center gap-1.5"
            >
              <Calendar className="h-4 w-4" />
              {format(publishDate, "MMMM d, yyyy")}
            </time>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="container mx-auto max-w-4xl px-6 pb-10">
            <figure className="overflow-hidden rounded-2xl aspect-video bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </figure>
          </div>
        )}

        {/* Post body */}
        <article className="container mx-auto max-w-3xl px-6 pb-20">
          <MermaidRenderer content={post.content} />
        </article>
      </main>
    </>
  );
}
