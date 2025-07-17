"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validation schema for blog post data
const BlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  featuredImage: z
    .string()
    .url("Featured image must be a valid URL")
    .optional()
    .or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  metaDescription: z.string().optional().or(z.literal("")),
  metaKeywords: z.array(z.string()).default([]),
  author: z.string().min(1, "Author is required"),
});

export type BlogPostFormData = z.infer<typeof BlogPostSchema>;

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Get all blog posts
export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { success: false, error: "Failed to fetch blog posts" };
  }
}

// Get single blog post by ID
export async function getBlogPost(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return { success: false, error: "Blog post not found" };
    }

    return { success: true, data: post };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { success: false, error: "Failed to fetch blog post" };
  }
}

// Create new blog post
export async function createBlogPost(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      excerpt: formData.get("excerpt") as string,
      featuredImage: formData.get("featuredImage") as string,
      status: formData.get("status") as "DRAFT" | "PUBLISHED",
      categories: (formData.get("categories") as string)
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat.length > 0),
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      metaDescription: formData.get("metaDescription") as string,
      metaKeywords: (formData.get("metaKeywords") as string)
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0),
      author: formData.get("author") as string,
    };

    // Validate the data
    const validatedData = BlogPostSchema.parse(rawData);

    // Generate slug from title
    const baseSlug = generateSlug(validatedData.title);
    let slug = baseSlug;
    let counter = 1;

    // Ensure slug is unique
    while (true) {
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (!existingPost) break;

      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Clean up empty fields
    const postData = {
      ...validatedData,
      slug,
      featuredImage: validatedData.featuredImage || null,
      metaDescription: validatedData.metaDescription || null,
      publishedAt: validatedData.status === "PUBLISHED" ? new Date() : null,
    };

    const post = await prisma.blogPost.create({
      data: postData,
    });

    revalidatePath("/admin/blog");
    return { success: true, data: post };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    console.error("Error creating blog post:", error);
    return { success: false, error: "Failed to create blog post" };
  }
}

// Update existing blog post
export async function updateBlogPost(id: string, formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      excerpt: formData.get("excerpt") as string,
      featuredImage: formData.get("featuredImage") as string,
      status: formData.get("status") as "DRAFT" | "PUBLISHED",
      categories: (formData.get("categories") as string)
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat.length > 0),
      tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      metaDescription: formData.get("metaDescription") as string,
      metaKeywords: (formData.get("metaKeywords") as string)
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0),
      author: formData.get("author") as string,
    };

    // Validate the data
    const validatedData = BlogPostSchema.parse(rawData);

    // Get current post to check if title changed
    const currentPost = await prisma.blogPost.findUnique({
      where: { id },
      select: { title: true, slug: true, status: true, publishedAt: true },
    });

    if (!currentPost) {
      return { success: false, error: "Blog post not found" };
    }

    let slug = currentPost.slug;

    // If title changed, generate new slug
    if (currentPost.title !== validatedData.title) {
      const baseSlug = generateSlug(validatedData.title);
      slug = baseSlug;
      let counter = 1;

      // Ensure slug is unique (excluding current post)
      while (true) {
        const existingPost = await prisma.blogPost.findUnique({
          where: { slug },
        });

        if (!existingPost || existingPost.id === id) break;

        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Handle publish date
    let publishedAt = currentPost.publishedAt;
    if (
      validatedData.status === "PUBLISHED" &&
      currentPost.status === "DRAFT"
    ) {
      publishedAt = new Date();
    } else if (validatedData.status === "DRAFT") {
      publishedAt = null;
    }

    // Clean up empty fields
    const postData = {
      ...validatedData,
      slug,
      featuredImage: validatedData.featuredImage || null,
      metaDescription: validatedData.metaDescription || null,
      publishedAt,
    };

    const post = await prisma.blogPost.update({
      where: { id },
      data: postData,
    });

    revalidatePath("/admin/blog");
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

    console.error("Error updating blog post:", error);
    return { success: false, error: "Failed to update blog post" };
  }
}

// Delete blog post
export async function deleteBlogPost(id: string) {
  try {
    await prisma.blogPost.delete({
      where: { id },
    });

    revalidatePath("/admin/blog");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: "Failed to delete blog post" };
  }
}

// Toggle blog post status
export async function toggleBlogPostStatus(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!post) {
      return { success: false, error: "Blog post not found" };
    }

    const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    const publishedAt = newStatus === "PUBLISHED" ? new Date() : null;

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt,
      },
    });

    revalidatePath("/admin/blog");
    return { success: true, data: updatedPost };
  } catch (error) {
    console.error("Error toggling blog post status:", error);
    return { success: false, error: "Failed to update blog post" };
  }
}
