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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject, updateProject } from "@/lib/actions/projects";
import { Project } from "@prisma/client";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ProjectFormProps {
  project?: Project;
  mode: "create" | "edit";
}

export function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrors({});

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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "create" ? "Add New Project" : "Edit Project"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "create"
              ? "Create a new portfolio project"
              : "Update your project information"}
          </p>
        </div>
      </div>

      <form
        action={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>
                Basic details shown on your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Project Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter project title"
                  defaultValue={project?.title || ""}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title[0]}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your project, its purpose, and key features"
                  rows={6}
                  defaultValue={project?.description || ""}
                  className={errors.description ? "border-destructive" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description[0]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Links</CardTitle>
              <CardDescription>
                Optional links to the live site or source code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <Input
                    id="liveUrl"
                    name="liveUrl"
                    type="url"
                    placeholder="https://project-demo.com"
                    defaultValue={project?.liveUrl || ""}
                    className={errors.liveUrl ? "border-destructive" : ""}
                  />
                  {errors.liveUrl && (
                    <p className="text-sm text-destructive">
                      {errors.liveUrl[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    type="url"
                    placeholder="https://github.com/user/repo"
                    defaultValue={project?.githubUrl || ""}
                    className={errors.githubUrl ? "border-destructive" : ""}
                  />
                  {errors.githubUrl && (
                    <p className="text-sm text-destructive">
                      {errors.githubUrl[0]}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Image</CardTitle>
              <CardDescription>
                Upload a cover image for the project card
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
              <CardTitle>Settings</CardTitle>
              <CardDescription>Tags and visibility options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="React, Next.js, TypeScript"
                  defaultValue={project?.tags.join(", ") || ""}
                  className={errors.tags ? "border-destructive" : ""}
                />
                {errors.tags && (
                  <p className="text-sm text-destructive">{errors.tags[0]}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas
                </p>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    name="featured"
                    defaultChecked={project?.featured || false}
                  />
                  <Label htmlFor="featured" className="font-medium">
                    Featured project
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Featured projects are highlighted on your portfolio page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between border-t pt-4 lg:col-span-3">
          <Button variant="outline" asChild>
            <Link href="/admin/projects">Cancel</Link>
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === "create" ? "Create Project" : "Update Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
