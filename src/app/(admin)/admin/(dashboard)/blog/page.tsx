import { getAllPostsForAdmin, deletePost } from "@/lib/actions/posts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Clock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { AdminBlogActions } from "./AdminBlogActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminBlogPage() {
  const result = await getAllPostsForAdmin();
  const posts = result.success && result.data ? result.data : [];

  const statusColor: Record<string, string> = {
    PUBLISHED:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    DRAFT:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    ARCHIVED: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Manage your blog posts — draft, publish, and archive.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Pencil className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No posts yet</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm">
              Start writing your first blog post. Share insights, tutorials, or
              project stories.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/admin/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                Write your first post
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-md transition-shadow"
            >
              <CardContent className="flex items-start gap-4 py-4">
                {/* Cover thumbnail */}
                {post.coverImage ? (
                  <div className="hidden sm:block flex-shrink-0 w-20 h-14 rounded-md overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="hidden sm:flex flex-shrink-0 w-20 h-14 rounded-md bg-muted items-center justify-center">
                    <Pencil className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                )}

                {/* Post info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold truncate">{post.title}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColor[post.status] ?? ""
                      }`}
                    >
                      {post.status === "PUBLISHED" ? (
                        <Eye className="mr-1 h-3 w-3" />
                      ) : (
                        <EyeOff className="mr-1 h-3 w-3" />
                      )}
                      {post.status.charAt(0) +
                        post.status.slice(1).toLowerCase()}
                    </span>
                    {post.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readingTime} min read
                    </span>
                    <span>
                      {formatDistanceToNow(new Date(post.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                    {post.tags.length > 0 && (
                      <span className="hidden md:block truncate max-w-[200px]">
                        {post.tags.join(", ")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AdminBlogActions postId={post.id} postTitle={post.title} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary */}
      {posts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {(["PUBLISHED", "DRAFT", "ARCHIVED"] as const).map((s) => {
            const count = posts.filter((p) => p.status === s).length;
            return (
              <Card key={s}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium capitalize">
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                  <p className="text-xs text-muted-foreground">
                    {s === "PUBLISHED"
                      ? "Live on the blog"
                      : s === "DRAFT"
                        ? "Work in progress"
                        : "Hidden from readers"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
