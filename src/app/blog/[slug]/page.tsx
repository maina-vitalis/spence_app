import { getPostBySlug } from "@/lib/actions/posts";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
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

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
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

  return (
    <main className="min-h-screen bg-background">
      {/* Back link */}
      <div className="container mx-auto max-w-3xl px-6 pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="container mx-auto max-w-3xl px-6 py-10">
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

        <p className="mt-4 text-xl text-muted-foreground leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-6 flex items-center gap-5 text-sm text-muted-foreground border-b pb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {post.publishedAt
              ? format(new Date(post.publishedAt), "MMMM d, yyyy")
              : format(new Date(post.createdAt), "MMMM d, yyyy")}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readingTime} min read
          </span>
        </div>
      </header>

      {/* Cover image */}
      {post.coverImage && (
        <div className="container mx-auto max-w-4xl px-6 pb-10">
          <div className="overflow-hidden rounded-2xl aspect-video bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Post body */}
      <article className="container mx-auto max-w-3xl px-6 pb-20">
        <div
          className="prose prose-neutral dark:prose-invert max-w-none
            prose-p:my-2 prose-p:leading-relaxed
            prose-headings:mt-6 prose-headings:mb-2 prose-headings:font-bold prose-headings:tracking-tight
            prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5
            prose-pre:my-3 prose-pre:bg-[#1e293b] prose-pre:text-[#e2e8f0]
            prose-table:my-4 prose-hr:my-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md
            prose-code:text-[#e11d48] prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground
            prose-table:overflow-auto
            [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:bg-muted [&_th]:text-left
            [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2
            [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
