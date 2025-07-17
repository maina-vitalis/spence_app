"use client";

import { ImageUpload } from "@/components/admin/ImageUpload";
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

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrors({});

    // Add status to form data
    formData.set("status", status);

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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "create" ? "Create New Post" : "Edit Post"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "create"
              ? "Write and publish your blog post"
              : "Update your blog post content"}
          </p>
        </div>
      </div>

      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
                <CardDescription>Write your blog post content</CardDescription>
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
                    placeholder="Enter post title"
                    defaultValue={post?.title || ""}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title[0]}
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
                    placeholder="Brief description of your post"
                    rows={3}
                    defaultValue={post?.excerpt || ""}
                    className={errors.excerpt ? "border-destructive" : ""}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-destructive">
                      {errors.excerpt[0]}
                    </p>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">
                    Content <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Write your blog post content here..."
                    rows={15}
                    defaultValue={post?.content || ""}
                    className={errors.content ? "border-destructive" : ""}
                  />
                  {errors.content && (
                    <p className="text-sm text-destructive">
                      {errors.content[0]}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    You can use Markdown formatting in your content
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
                <CardDescription>
                  Control when and how your post is published
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

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={
                      status === "DRAFT" ? handleSaveAsDraft : handlePublish
                    }
                    className="flex-1"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {status === "DRAFT" ? (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Publish
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>
                  Add a featured image for your post
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
                <CardTitle>Categories & Tags</CardTitle>
                <CardDescription>Organize your content</CardDescription>
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
                  <p className="text-sm text-muted-foreground">
                    Separate categories with commas
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
                    <p className="text-sm text-destructive">{errors.tags[0]}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Separate tags with commas
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
                    placeholder="Brief description for search engines"
                    rows={3}
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
                    className={errors.metaKeywords ? "border-destructive" : ""}
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
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
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
              {status === "DRAFT" ? "Publish Now" : "Update Post"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
