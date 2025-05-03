import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "https://www.spencecreations.co.ke/";

  try {
    return [
      {
        url: `${baseURL}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: `${baseURL}/about-us`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseURL}/contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${baseURL}/projects`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
