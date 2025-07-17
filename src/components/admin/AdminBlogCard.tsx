"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBlogPost, toggleBlogPostStatus } from "@/lib/actions/blog";
import { BlogPost } from "@prisma/client";
import {
  Calendar,
  Edit,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  MoreVertical,
  Trash2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface AdminBlogCardProps {
  post: BlogPost;
}

export function AdminBlogCard({ post }: AdminBlogCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteBlogPost(post.id);
      if (result.success) {
        toast.success("Blog post deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete blog post");
      }
    } catch {
      toast.error("An error occurred while deleting the blog post");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async () => {
    setIsTogglingStatus(true);
    try {
      const result = await toggleBlogPostStatus(post.id);
      if (result.success) {
        toast.success(
          post.status === "PUBLISHED"
            ? "Blog post moved to draft"
            : "Blog post published"
        );
      } else {
        toast.error(result.error || "Failed to update blog post");
      }
    } catch {
      toast.error("An error occurred while updating the blog post");
    } finally {
      setIsTogglingStatus(false);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Not set";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group relative overflow-hidden">
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <Badge
          variant={post.status === "PUBLISHED" ? "default" : "secondary"}
          className={
            post.status === "PUBLISHED"
              ? "bg-green-100 text-green-800 border-green-200"
              : ""
          }
        >
          {post.status === "PUBLISHED" ? (
            <>
              <Globe className="h-3 w-3 mr-1" />
              Published
            </>
          ) : (
            <>
              <FileText className="h-3 w-3 mr-1" />
              Draft
            </>
          )}
        </Badge>
      </div>

      {post.featuredImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {post.excerpt}
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/blog/${post.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleToggleStatus}
                disabled={isTogglingStatus}
              >
                {post.status === "PUBLISHED" ? (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Move to Draft
                  </>
                ) : (
                  <>
                    <Globe className="h-4 w-4 mr-2" />
                    Publish
                  </>
                )}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview
                </a>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &ldquo;{post.title}
                      &rdquo;? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Categories and Tags */}
        <div className="space-y-2 mb-4">
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.categories.slice(0, 2).map((category, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                >
                  {category}
                </Badge>
              ))}
              {post.categories.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{post.categories.length - 2} more
                </Badge>
              )}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/admin/blog/${post.id}/edit`}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm">
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Eye className="h-3 w-3" />
            </a>
          </Button>
        </div>

        {/* Metadata */}
        <div className="text-xs text-muted-foreground space-y-1 pt-3 border-t">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {post.status === "PUBLISHED" && post.publishedAt
                ? `Published ${formatDate(post.publishedAt)}`
                : `Created ${formatDate(post.createdAt)}`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
