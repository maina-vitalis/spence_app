import { getBlogPosts } from "@/lib/actions/blog";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Force dynamic rendering to prevent caching issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const result = await getBlogPosts();

  if (!result.success || !result.data) {
    notFound();
  }

  // Find the post by slug and ensure it's published
  const post = result.data.find(
    (p) => p.slug === slug && p.status === "PUBLISHED"
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.featuredImage || undefined,
            author: {
              "@type": "Person",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              name: "Spence Creations",
              logo: {
                "@type": "ImageObject",
                url: "https://spencecreations.co.ke/logo.png",
              },
            },
            datePublished: post.publishedAt?.toISOString(),
            dateModified: post.updatedAt.toISOString(),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://spencecreations.co.ke/blog/${post.slug}`,
            },
            keywords: post.tags.join(", "),
            articleSection: post.categories.join(", "),
          }),
        }}
      />

      {/* Navigation */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          {/* Categories */}
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-foreground">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <span>•</span>
            <time>
              {post.publishedAt &&
                formatDistanceToNow(new Date(post.publishedAt), {
                  addSuffix: true,
                })}
            </time>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden bg-muted">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
          prose-p:text-foreground/90 prose-p:leading-relaxed
          prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-muted prose-pre:border prose-pre:border-border
          prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1
          prose-img:rounded-lg prose-img:border prose-img:border-border
          prose-hr:border-border
          prose-ul:list-disc prose-ol:list-decimal">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 text-sm text-muted-foreground bg-muted rounded-md hover:bg-muted/80 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Want to read more articles?</p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

// Generate static params for all published blog posts
export async function generateStaticParams() {
  const result = await getBlogPosts();

  if (!result.success || !result.data) {
    return [];
  }

  const publishedPosts = result.data.filter(
    (post) => post.status === "PUBLISHED"
  );

  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogPosts();

  if (!result.success || !result.data) {
    return {
      title: "Blog Post Not Found | Spence Creations",
      description: "The requested blog post could not be found.",
    };
  }

  const post = result.data.find(
    (p) => p.slug === slug && p.status === "PUBLISHED"
  );

  if (!post) {
    return {
      title: "Blog Post Not Found | Spence Creations",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Spence Creations Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords?.length > 0 ? post.metaKeywords : post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      url: `https://spencecreations.co.ke/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      creator: "@spencecreations",
    },
    alternates: {
      canonical: `https://spencecreations.co.ke/blog/${slug}`,
    },
  };
}
