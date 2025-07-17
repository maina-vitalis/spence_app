import { getBlogPosts } from "@/lib/actions/blog";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to blog link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Meta information */}
            <div className="flex items-center justify-between text-gray-600 mb-8 pb-8 border-b">
              <div className="flex items-center space-x-4">
                <span className="font-medium">By {post.author}</span>
                <span>•</span>
                <span>
                  {post.publishedAt &&
                    formatDistanceToNow(new Date(post.publishedAt), {
                      addSuffix: true,
                    })}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="text-gray-800 leading-relaxed"
              />
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Navigation to other posts */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            More Articles
          </h3>
          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </div>
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
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const result = await getBlogPosts();

  if (!result.success || !result.data) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const post = result.data.find(
    (p) => p.slug === slug && p.status === "PUBLISHED"
  );

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords?.join(", "),
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}
