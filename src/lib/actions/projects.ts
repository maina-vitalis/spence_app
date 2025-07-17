"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validation schema for project data
const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  liveUrl: z
    .string()
    .url("Live URL must be valid")
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url("GitHub URL must be valid")
    .optional()
    .or(z.literal("")),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;

// Get all projects
export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}

// Get single project by ID
export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return { success: false, error: "Project not found" };
    }

    return { success: true, data: project };
  } catch (error) {
    console.error("Error fetching project:", error);
    return { success: false, error: "Failed to fetch project" };
  }
}

// Create new project
export async function createProject(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      featured: formData.get("featured") === "on",
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    // Validate the data
    const validatedData = ProjectSchema.parse(rawData);

    // Clean up empty URLs
    const projectData = {
      ...validatedData,
      liveUrl: validatedData.liveUrl || null,
      githubUrl: validatedData.githubUrl || null,
    };

    const project = await prisma.project.create({
      data: projectData,
    });

    revalidatePath("/admin/projects");
    return { success: true, data: project };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

// Update existing project
export async function updateProject(id: string, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      featured: formData.get("featured") === "on",
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };

    // Validate the data
    const validatedData = ProjectSchema.parse(rawData);

    // Clean up empty URLs
    const projectData = {
      ...validatedData,
      liveUrl: validatedData.liveUrl || null,
      githubUrl: validatedData.githubUrl || null,
    };

    const project = await prisma.project.update({
      where: { id },
      data: projectData,
    });

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}/edit`);
    return { success: true, data: project };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

// Delete project
export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

// Toggle featured status
export async function toggleProjectFeatured(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: { featured: true },
    });

    if (!project) {
      return { success: false, error: "Project not found" };
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { featured: !project.featured },
    });

    revalidatePath("/admin/projects");
    return { success: true, data: updatedProject };
  } catch (error) {
    console.error("Error toggling project featured status:", error);
    return { success: false, error: "Failed to update project" };
  }
}
