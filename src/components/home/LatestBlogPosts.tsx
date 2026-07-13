import { getBlogPosts } from "@/lib/actions/blog";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export async function LatestBlogPosts() {
  const result = await getBlogPosts();
  const posts =
    result.success && result.data
      ? result.data
          .filter((post) => post.status === "PUBLISHED")
          .slice(0, 3)
      : [];

  if (posts.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-primary font-medium">Writing</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Latest from the blog
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Notes on web development, tools, and things I&apos;m learning.
          </p>
        </div>
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <Link href="/blog">Read all</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <article className="h-full overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg">
              {post.featuredImage && (
                <div className="relative h-44 w-full">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="space-y-3 p-5">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                {post.publishedAt && (
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.publishedAt), {
                      addSuffix: true,
                    })}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/blog">Read all posts</Link>
        </Button>
      </div>
    </section>
  );
}
