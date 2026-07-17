"use server";

import { requireAdmin } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().default(""),
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
  status: z.enum(["COMPLETED", "IN_PROGRESS", "ARCHIVED"]).default("COMPLETED"),
  sortOrder: z.coerce.number().int().default(0),
  tags: z.array(z.string()).default([]),
});

export type ProjectFormData = z.infer<typeof ProjectSchema>;

function parseFormData(formData: FormData) {
  return {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    content: (formData.get("content") as string) ?? "",
    image: formData.get("image") as string,
    liveUrl: formData.get("liveUrl") as string,
    githubUrl: formData.get("githubUrl") as string,
    featured: formData.get("featured") === "on",
    status:
      (formData.get("status") as "COMPLETED" | "IN_PROGRESS" | "ARCHIVED") ??
      "COMPLETED",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    tags: ((formData.get("tags") as string | null) ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0),
  };
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  let uniqueSlug = slug;
  let counter = 1;

  while (true) {
    const existing = await prisma.project.findUnique({
      where: { slug: uniqueSlug },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) break;

    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin");
  if (slug) {
    revalidatePath(`/projects/${slug}`);
  }
  revalidateTag("projects", "max");
}

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}

export async function getFeaturedProjects() {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 3,
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return { success: false, error: "Failed to fetch featured projects" };
  }
}

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

export async function getProjectBySlug(slug: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return { success: false, error: "Project not found" };
    }

    return { success: true, data: project };
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return { success: false, error: "Failed to fetch project" };
  }
}

export async function createProject(formData: FormData) {
  try {
    await requireAdmin();

    const rawData = parseFormData(formData);
    const validatedData = ProjectSchema.parse({
      ...rawData,
      slug: await ensureUniqueSlug(
        rawData.slug || generateSlug(rawData.title)
      ),
    });

    const projectData = {
      ...validatedData,
      liveUrl: validatedData.liveUrl || null,
      githubUrl: validatedData.githubUrl || null,
    };

    const project = await prisma.project.create({
      data: projectData,
    });

    revalidateProjectPaths(project.slug);

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

export async function updateProject(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const rawData = parseFormData(formData);
    const validatedData = ProjectSchema.parse({
      ...rawData,
      slug: await ensureUniqueSlug(
        rawData.slug || generateSlug(rawData.title),
        id
      ),
    });

    const currentProject = await prisma.project.findUnique({
      where: { id },
      select: { slug: true },
    });

    const projectData = {
      ...validatedData,
      liveUrl: validatedData.liveUrl || null,
      githubUrl: validatedData.githubUrl || null,
    };

    const project = await prisma.project.update({
      where: { id },
      data: projectData,
    });

    revalidateProjectPaths(project.slug);
    if (currentProject && currentProject.slug !== project.slug) {
      revalidatePath(`/projects/${currentProject.slug}`);
    }
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

export async function deleteProject(id: string) {
  try {
    await requireAdmin();

    const project = await prisma.project.findUnique({
      where: { id },
      select: { slug: true },
    });

    await prisma.project.delete({
      where: { id },
    });

    revalidateProjectPaths(project?.slug);

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}

export async function toggleProjectFeatured(id: string) {
  try {
    await requireAdmin();

    const project = await prisma.project.findUnique({
      where: { id },
      select: { featured: true, slug: true },
    });

    if (!project) {
      return { success: false, error: "Project not found" };
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { featured: !project.featured },
    });

    revalidateProjectPaths(project.slug);

    return { success: true, data: updatedProject };
  } catch (error) {
    console.error("Error toggling project featured status:", error);
    return { success: false, error: "Failed to update project" };
  }
}
