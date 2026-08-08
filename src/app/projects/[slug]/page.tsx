import { getProjectBySlug } from "@/lib/actions/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { MermaidRenderer } from "@/components/MermaidRenderer";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const revalidate = 60;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result.success || !result.data) {
    return { title: "Project Not Found" };
  }

  const project = result.data;
  const description = stripHtml(project.excerpt).slice(0, 160);
  const projectUrl = absoluteUrl(`/projects/${project.slug}`);

  return {
    title: `${project.title} — Case Study`,
    description,
    keywords: [...project.tags, "case study", "web development", ...siteConfig.keywords],
    authors: [{ name: siteConfig.author, url: siteConfig.url }],
    openGraph: {
      type: "article",
      title: `${project.title} — Case Study`,
      description,
      url: projectUrl,
      siteName: siteConfig.name,
      modifiedTime: project.updatedAt.toISOString(),
      authors: [siteConfig.author],
      tags: project.tags,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study`,
      description,
      creator: siteConfig.twitter,
      images: [project.image],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const project = result.data;
  const projectUrl = absoluteUrl(`/projects/${project.slug}`);
  const plainExcerpt = stripHtml(project.excerpt);

  // JSON-LD: CreativeWork (Case Study)
  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: plainExcerpt,
    image: project.image,
    url: projectUrl,
    dateModified: project.updatedAt.toISOString(),
    dateCreated: project.createdAt.toISOString(),
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    keywords: project.tags.join(", "),
    inLanguage: "en-US",
  };

  // JSON-LD: BreadcrumbList
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: absoluteUrl("/projects"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <article className="space-y-12 py-8">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/projects"
                className="hover:text-foreground transition-colors"
              >
                Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span
                className="text-foreground font-medium line-clamp-1 max-w-[200px] sm:max-w-xs"
                aria-current="page"
              >
                {project.title}
              </span>
            </li>
          </ol>
        </nav>

        <header className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            <Badge variant="outline">{project.status.replace("_", " ")}</Badge>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {project.title}
            </h1>
            <div
              className="tiptap-content prose prose-neutral dark:prose-invert max-w-none text-lg text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: project.excerpt }}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button asChild>
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View live project
                </Link>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline">
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="mr-2 h-4 w-4" />
                  View source code
                </Link>
              </Button>
            )}
            <Button asChild variant="ghost">
              <Link href="/projects">← All projects</Link>
            </Button>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {project.content && (
          <section>
            <MermaidRenderer content={project.content} />
          </section>
        )}

        <Separator />

        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <Button asChild>
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View live project
              </Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/contact">Discuss a similar project</Link>
          </Button>
        </div>
      </article>
    </>
  );
}
