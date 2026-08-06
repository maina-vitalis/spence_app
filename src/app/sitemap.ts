import { getProjects } from "@/lib/actions/projects";
import { getPosts } from "@/lib/actions/posts";
import { siteConfig } from "@/lib/site";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = siteConfig.url;

  try {
    const [projectsResult, postsResult] = await Promise.all([
      getProjects(),
      getPosts(), // only PUBLISHED posts
    ]);

    const projectPages =
      projectsResult.success && projectsResult.data
        ? projectsResult.data.map((project) => ({
            url: `${baseURL}/projects/${project.slug}`,
            lastModified: project.updatedAt.toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
          }))
        : [];

    const blogPages =
      postsResult.success && postsResult.data
        ? postsResult.data.map((post) => ({
            url: `${baseURL}/blog/${post.slug}`,
            lastModified: post.updatedAt.toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          }))
        : [];

    return [
      {
        url: baseURL,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 1,
      },
      {
        url: `${baseURL}/projects`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseURL}/blog`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseURL}/about-us`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      {
        url: `${baseURL}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
      ...projectPages,
      ...blogPages,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
