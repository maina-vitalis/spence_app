"use client";

import { TinyMCEEditor } from "@/components/admin/TinyMCEEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createPost, updatePost } from "@/lib/actions/posts";
import { generateSlug } from "@/lib/slug";
import { Post } from "@/generated/prisma/client";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface BlogFormProps {
  post?: Post;
  mode: "create" | "edit";
}

export function BlogForm({ post, mode }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImage, setCoverImage] = useState(post?.coverImage ?? "");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED" | "ARCHIVED">(
    post?.status ?? "DRAFT"
  );
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [featured, setFeatured] = useState(post?.featured ?? false);

  const previewSlug = useMemo(() => {
    if (slug.trim()) return slug;
    if (title.trim()) return generateSlug(title);
    return "";
  }, [slug, title]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrors({});

    formData.set("title", title);
    formData.set("slug", slug);
    formData.set("excerpt", excerpt);
    formData.set("content", content);
    formData.set("coverImage", coverImage);
    formData.set("status", status);
    formData.set("tags", tags);
    if (featured) {
      formData.set("featured", "on");
    } else {
      formData.delete("featured");
    }

    try {
      let result;

      if (mode === "create") {
        result = await createPost(formData);
      } else if (post) {
        result = await updatePost(post.id, formData);
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

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/blog">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {mode === "create" ? "New Blog Post" : "Edit Blog Post"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Write richly — format text, embed media, add code blocks, and more
            </p>
          </div>
        </div>

        {previewSlug && mode === "edit" && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/blog/${previewSlug}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview Post
            </Link>
          </Button>
        )}
      </div>

      <form action={handleSubmit}>
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid h-auto w-full grid-cols-3 gap-1">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Cover Image</TabsTrigger>
          </TabsList>

          {/* ── Basics ── */}
          <TabsContent value="basics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post basics</CardTitle>
                <CardDescription>
                  Title, slug, and summary shown in blog listings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="My Awesome Post"
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">{errors.title[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">
                      Slug <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setSlug(e.target.value);
                      }}
                      placeholder="my-awesome-post"
                      className={errors.slug ? "border-destructive" : ""}
                    />
                    {errors.slug && (
                      <p className="text-sm text-destructive">{errors.slug[0]}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">
                    Excerpt <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="excerpt"
                    rows={3}
                    placeholder="A compelling one-liner summary for blog cards and SEO"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className={errors.excerpt ? "border-destructive" : ""}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-destructive">{errors.excerpt[0]}</p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={status}
                      onValueChange={(
                        value: "DRAFT" | "PUBLISHED" | "ARCHIVED"
                      ) => setStatus(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Design, TypeScript, Next.js"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="featured"
                      checked={featured}
                      onCheckedChange={(checked) =>
                        setFeatured(checked === true)
                      }
                    />
                    <Label htmlFor="featured">Feature this post on the homepage</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Content ── */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Post content</CardTitle>
                <CardDescription>
                  Write your post — headings, images, code blocks, tables, embeds, and more.
                  Images are automatically uploaded to Cloudinary.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TinyMCEEditor
                  content={content}
                  onChange={setContent}
                  height={700}
                  placeholder="Start writing your blog post here..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Cover Image ── */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cover image</CardTitle>
                <CardDescription>
                  Shown at the top of the post and on blog listing cards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  label="Cover Image"
                  name="coverImage"
                  defaultValue={post?.coverImage || ""}
                  onUpload={setCoverImage}
                  aspectRatio="video"
                  maxSize={5}
                  minWidth={400}
                  minHeight={200}
                />
                {errors.coverImage && (
                  <p className="text-sm text-destructive mt-2">
                    {errors.coverImage[0]}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="sticky bottom-0 z-10 mt-6 flex items-center justify-between border-t bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <Button variant="outline" asChild>
            <Link href="/admin/blog">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === "create" ? "Publish Post" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
