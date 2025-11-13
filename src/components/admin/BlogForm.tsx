"use client";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog";
import { BlogPost } from "@prisma/client";
import { ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface BlogFormProps {
  post?: BlogPost;
  mode: "create" | "edit";
}

export function BlogForm({ post, mode }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(
    post?.status || "DRAFT"
  );
  const [content, setContent] = useState(post?.content || "");

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrors({});

    // Add status and content to form data
    formData.set("status", status);
    formData.set("content", content);

    try {
      let result;

      if (mode === "create") {
        result = await createBlogPost(formData);
      } else if (post) {
        result = await updateBlogPost(post.id, formData);
      }

      if (result?.success) {
        toast.success(
          mode === "create"
            ? "Blog post created successfully!"
            : "Blog post updated successfully!"
        );
        router.push("/admin/blog");
      } else {
        if (result?.fieldErrors) {
          setErrors(result.fieldErrors as Record<string, string[]>);
          toast.error("Please fix the validation errors");
        } else {
          toast.error(result?.error || "Something went wrong");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = () => {
    setStatus("DRAFT");
    // Form will be submitted with DRAFT status
  };

  const handlePublish = () => {
    setStatus("PUBLISHED");
    // Form will be submitted with PUBLISHED status
  };

  return (
    <div className="space-y-4 flex flex-col">
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "create" ? "Create New Post" : "Edit Post"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Write and publish your blog post"
              : "Update your blog post content"}
          </p>
        </div>
      </div>

      <form action={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content - Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential details for your blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter an engaging title"
                  defaultValue={post?.title || ""}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title[0]}</p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author">
                  Author <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Author name"
                  defaultValue={post?.author || "Vitalis Maina"}
                  className={errors.author ? "border-destructive" : ""}
                />
                {errors.author && (
                  <p className="text-sm text-destructive">
                    {errors.author[0]}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">
                  Excerpt <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Brief summary of your post (shown in listings)"
                  rows={3}
                  defaultValue={post?.excerpt || ""}
                  className={errors.excerpt ? "border-destructive" : ""}
                />
                {errors.excerpt && (
                  <p className="text-sm text-destructive">{errors.excerpt[0]}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Write your blog post content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="content">
                  Content <span className="text-destructive">*</span>
                </Label>
                <TiptapEditor
                  content={content}
                  onChange={setContent}
                />
                {errors.content && (
                  <p className="text-sm text-destructive mt-2">{errors.content[0]}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  Rich text editor with formatting options
                </p>
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>
                Optimize your post for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  placeholder="Brief description for search engines (155 characters)"
                  rows={2}
                  defaultValue={post?.metaDescription || ""}
                  className={
                    errors.metaDescription ? "border-destructive" : ""
                  }
                />
                {errors.metaDescription && (
                  <p className="text-sm text-destructive">
                    {errors.metaDescription[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  name="metaKeywords"
                  placeholder="keyword1, keyword2, keyword3"
                  defaultValue={post?.metaKeywords.join(", ") || ""}
                  className={
                    errors.metaKeywords ? "border-destructive" : ""
                  }
                />
                {errors.metaKeywords && (
                  <p className="text-sm text-destructive">
                    {errors.metaKeywords[0]}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Separate keywords with commas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Right Column (1/3 width) */}
        <div className="space-y-4">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
              <CardDescription>
                Control post visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={status}
                  onValueChange={(value: "DRAFT" | "PUBLISHED") =>
                    setStatus(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>
                Add a cover image
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                label="Featured Image"
                name="featuredImage"
                defaultValue={post?.featuredImage || ""}
                aspectRatio="video"
                maxSize={5}
                minWidth={400}
                minHeight={200}
              />
              {errors.featuredImage && (
                <p className="text-sm text-destructive mt-2">
                  {errors.featuredImage[0]}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Categories and Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>Categories & Tags</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categories">Categories</Label>
                <Input
                  id="categories"
                  name="categories"
                  placeholder="Web Development, Design"
                  defaultValue={post?.categories.join(", ") || ""}
                  className={errors.categories ? "border-destructive" : ""}
                />
                {errors.categories && (
                  <p className="text-sm text-destructive">
                    {errors.categories[0]}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Separate with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="react, nextjs, tutorial"
                  defaultValue={post?.tags.join(", ") || ""}
                  className={errors.tags ? "border-destructive" : ""}
                />
                {errors.tags && (
                  <p className="text-sm text-destructive">
                    {errors.tags[0]}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Separate with commas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="lg:col-span-3 flex items-center justify-between pt-4 border-t">
          <Button variant="outline" asChild>
            <Link href="/admin/blog">Cancel</Link>
          </Button>

          <div className="flex gap-2">
            {status === "PUBLISHED" && (
              <Button
                type="submit"
                variant="outline"
                disabled={isSubmitting}
                onClick={handleSaveAsDraft}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save as Draft
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={status === "DRAFT" ? handlePublish : handleSaveAsDraft}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {status === "DRAFT" ? (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Publish Now
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Post
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
