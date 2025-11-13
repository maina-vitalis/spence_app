import { getBlogPosts } from "@/lib/actions/blog";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const result = await getBlogPosts();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-8">Blog</h1>
            <p className="text-destructive">Failed to load blog posts</p>
          </div>
        </div>
      </div>
    );
  }

  // Filter only published posts
  const publishedPosts = result.data.filter(
    (post) => post.status === "PUBLISHED"
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our development
            journey
          </p>
        </div>

        {publishedPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No blog posts published yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="bg-card rounded-xl shadow-sm hover:shadow-xl overflow-hidden border border-border transition-all duration-300 h-full flex flex-col">
                  {post.featuredImage && (
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary text-xs font-bold">
                            {post.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground font-medium">
                          {post.author}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {post.publishedAt &&
                          formatDistanceToNow(new Date(post.publishedAt), {
                            addSuffix: true,
                          })}
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
