import { getProjects } from "@/lib/actions/projects";
import { siteConfig } from "@/lib/site";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = siteConfig.url;

  try {
    const projectsResult = await getProjects();

    const projectPages =
      projectsResult.success && projectsResult.data
        ? projectsResult.data.map((project) => ({
            url: `${baseURL}/projects/${project.slug}`,
            lastModified: project.updatedAt.toISOString(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
          }))
        : [];

    return [
      {
        url: baseURL,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${baseURL}/projects`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${baseURL}/about-us`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseURL}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      ...projectPages,
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
