

"use server";

import { requireAdmin } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const PostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().default(""),
  coverImage: z.string().url("Cover image must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export type PostFormData = z.infer<typeof PostSchema>;

function parseFormData(formData: FormData) {
  const tagsRaw = (formData.get("tags") as string | null) ?? "";
  return {
    title: formData.get("title") as string,
    slug: formData.get("slug") as string,
    excerpt: formData.get("excerpt") as string,
    content: (formData.get("content") as string) ?? "",
    coverImage: (formData.get("coverImage") as string) || undefined,
    status:
      (formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED") ?? "DRAFT",
    tags: tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0),
    featured: formData.get("featured") === "on",
  };
}

/** Estimate reading time: ~200 words per minute */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function ensureUniqueSlug(slug: string, excludeId?: string) {
  let uniqueSlug = slug;
  let counter = 1;

  while (true) {
    const existing = await prisma.post.findUnique({
      where: { slug: uniqueSlug },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) break;

    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin");
  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidateTag("posts", "max");
}

// ─── Reads ────────────────────────────────────────────────────────────────────

export async function getPosts(includeUnpublished = false) {
  try {
    const posts = await prisma.post.findMany({
      where: includeUnpublished ? undefined : { status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, error: "Failed to fetch posts" };
  }
}

export async function getAllPostsForAdmin() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { success: false, error: "Failed to fetch posts" };
  }
}

export async function getPost(id: string) {
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return { success: false, error: "Post not found" };
    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching post:", error);
    return { success: false, error: "Failed to fetch post" };
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return { success: false, error: "Post not found" };
    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return { success: false, error: "Failed to fetch post" };
  }
}

export async function getFeaturedPosts() {
  try {
    const posts = await prisma.post.findMany({
      where: { featured: true, status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: 3,
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return { success: false, error: "Failed to fetch featured posts" };
  }
}

// ─── Writes ───────────────────────────────────────────────────────────────────

export async function createPost(formData: FormData) {
  try {
    await requireAdmin();

    const rawData = parseFormData(formData);
    const validatedData = PostSchema.parse({
      ...rawData,
      slug: await ensureUniqueSlug(rawData.slug || generateSlug(rawData.title)),
    });

    const publishedAt =
      validatedData.status === "PUBLISHED" ? new Date() : null;

    const post = await prisma.post.create({
      data: {
        ...validatedData,
        coverImage: validatedData.coverImage || null,
        readingTime: estimateReadingTime(validatedData.content),
        publishedAt,
      },
    });

    revalidateBlogPaths(post.slug);
    return { success: true, data: post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    console.error("Error creating post:", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function updatePost(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const rawData = parseFormData(formData);
    const validatedData = PostSchema.parse({
      ...rawData,
      slug: await ensureUniqueSlug(
        rawData.slug || generateSlug(rawData.title),
        id
      ),
    });

    const currentPost = await prisma.post.findUnique({
      where: { id },
      select: { slug: true, status: true, publishedAt: true },
    });

    // Set publishedAt only when first going from non-published → published
    let publishedAt: Date | null | undefined = undefined;
    if (
      validatedData.status === "PUBLISHED" &&
      currentPost?.status !== "PUBLISHED"
    ) {
      publishedAt = new Date();
    } else if (validatedData.status !== "PUBLISHED") {
      publishedAt = null;
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...validatedData,
        coverImage: validatedData.coverImage || null,
        readingTime: estimateReadingTime(validatedData.content),
        ...(publishedAt !== undefined ? { publishedAt } : {}),
      },
    });

    revalidateBlogPaths(post.slug);
    if (currentPost?.slug && currentPost.slug !== post.slug) {
      revalidatePath(`/blog/${currentPost.slug}`);
    }
    revalidatePath(`/admin/blog/${id}/edit`);

    return { success: true, data: post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      };
    }
    console.error("Error updating post:", error);
    return { success: false, error: "Failed to update post" };
  }
}

export async function deletePost(id: string) {
  try {
    await requireAdmin();

    const post = await prisma.post.findUnique({
      where: { id },
      select: { slug: true },
    });

    await prisma.post.delete({ where: { id } });

    revalidateBlogPaths(post?.slug);
    return { success: true };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, error: "Failed to delete post" };
  }
}

export async function togglePostFeatured(id: string) {
  try {
    await requireAdmin();

    const post = await prisma.post.findUnique({
      where: { id },
      select: { featured: true, slug: true },
    });

    if (!post) return { success: false, error: "Post not found" };

    const updated = await prisma.post.update({
      where: { id },
      data: { featured: !post.featured },
    });

    revalidateBlogPaths(post.slug);
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error toggling post featured status:", error);
    return { success: false, error: "Failed to update post" };
  }
}
