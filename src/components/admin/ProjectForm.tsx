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
import { createProject, updateProject } from "@/lib/actions/projects";
import { generateSlug } from "@/lib/slug";
import { Project } from "@/generated/prisma/client";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface ProjectFormProps {
  project?: Project;
  mode: "create" | "edit";
}

export function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project?.slug));
  const [status, setStatus] = useState<"COMPLETED" | "IN_PROGRESS" | "ARCHIVED">(
    project?.status ?? "COMPLETED"
  );
  const [content, setContent] = useState(project?.content ?? "");

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

    formData.set("status", status);
    formData.set("content", content);

    try {
      let result;

      if (mode === "create") {
        result = await createProject(formData);
      } else if (project) {
        result = await updateProject(project.id, formData);
      }

      if (result?.success) {
        toast.success(
          mode === "create"
            ? "Project created successfully!"
            : "Project updated successfully!"
        );
        router.push("/admin/projects");
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
            <Link href="/admin/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {mode === "create" ? "Document New Project" : "Edit Project"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Write freely — format text, add images, and embed videos
            </p>
          </div>
        </div>

        {previewSlug && mode === "edit" && (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/projects/${previewSlug}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
        )}
      </div>

      <form action={handleSubmit}>
        <Tabs defaultValue="basics" className="space-y-6">
          <TabsList className="grid h-auto w-full grid-cols-3 gap-1">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="media">Media & Links</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project basics</CardTitle>
                <CardDescription>
                  Title, slug, and summary shown on project cards
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
                      name="title"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="E-commerce dashboard"
                      className={errors.title ? "border-destructive" : ""}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive">
                        {errors.title[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">
                      Slug <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="slug"
                      name="slug"
                      value={slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setSlug(e.target.value);
                      }}
                      placeholder="ecommerce-dashboard"
                      className={errors.slug ? "border-destructive" : ""}
                    />
                    {errors.slug && (
                      <p className="text-sm text-destructive">
                        {errors.slug[0]}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">
                    Excerpt <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    rows={3}
                    placeholder="One-line summary for project cards"
                    defaultValue={project?.excerpt || ""}
                    className={errors.excerpt ? "border-destructive" : ""}
                  />
                  {errors.excerpt && (
                    <p className="text-sm text-destructive">
                      {errors.excerpt[0]}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={status}
                      onValueChange={(
                        value: "COMPLETED" | "IN_PROGRESS" | "ARCHIVED"
                      ) => setStatus(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sortOrder">Sort order</Label>
                    <Input
                      id="sortOrder"
                      name="sortOrder"
                      type="number"
                      defaultValue={project?.sortOrder ?? 0}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="React, Next.js, TypeScript"
                      defaultValue={project?.tags.join(", ") || ""}
                    />
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="featured"
                      name="featured"
                      defaultChecked={project?.featured || false}
                    />
                    <Label htmlFor="featured">Featured on homepage</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation">
            <Card>
              <CardHeader>
                <CardTitle>Project documentation</CardTitle>
                <CardDescription>
                  Document each project your way — headings, images, videos,
                  lists, and more. Every project can have its own layout.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TiptapEditor content={content} onChange={setContent} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cover image</CardTitle>
                <CardDescription>
                  Shown on project cards and at the top of the case study
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  label="Image"
                  name="image"
                  defaultValue={project?.image || ""}
                  required
                  aspectRatio="video"
                  maxSize={5}
                  minWidth={400}
                  minHeight={300}
                />
                {errors.image && (
                  <p className="text-sm text-destructive mt-2">
                    {errors.image[0]}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live URL</Label>
                    <Input
                      id="liveUrl"
                      name="liveUrl"
                      type="url"
                      placeholder="https://project-demo.com"
                      defaultValue={project?.liveUrl || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      type="url"
                      placeholder="https://github.com/user/repo"
                      defaultValue={project?.githubUrl || ""}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="sticky bottom-0 z-10 mt-6 flex items-center justify-between border-t bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <Button variant="outline" asChild>
            <Link href="/admin/projects">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === "create" ? "Create Project" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
