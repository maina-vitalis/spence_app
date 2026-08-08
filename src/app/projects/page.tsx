import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/actions/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/generated/prisma/client";
import { siteConfig, absoluteUrl } from "@/lib/site";

export const revalidate = 60;

export const metadata = {
  title: "Projects — Case Studies & Portfolio",
  description:
    "Case studies of web apps and digital products designed and built by Vitalis Maina. Explore the technical decisions, design process, and live demos.",
  keywords: [
    "web development portfolio",
    "case studies",
    "project showcase",
    ...siteConfig.keywords,
  ],
  openGraph: {
    title: "Projects — Case Studies & Portfolio",
    description:
      "Case studies of web apps and digital products designed and built by Vitalis Maina.",
    url: absoluteUrl("/projects"),
    type: "website" as const,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Projects — Case Studies & Portfolio",
    description:
      "Case studies of web apps and digital products designed and built by Vitalis Maina.",
    creator: siteConfig.twitter,
  },
  alternates: {
    canonical: absoluteUrl("/projects"),
  },
};

function getSpotlightProject(projects: Project[]) {
  return projects.find((project) => project.featured) ?? projects[0];
}

function getBentoVariant(index: number): "wide" | "default" {
  return index % 4 === 1 ? "wide" : "default";
}

function getBentoSpan(index: number) {
  return index % 4 === 1 ? "md:col-span-2" : "";
}

async function ProjectsPage() {
  const result = await getProjects();

  if (!result.success || !result.data) {
    return (
      <div className="py-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="text-destructive">Failed to load projects</p>
        </div>
      </div>
    );
  }

  const projects = result.data;
  const spotlight = getSpotlightProject(projects);
  const remaining = spotlight
    ? projects.filter((project) => project.id !== spotlight.id)
    : projects;

  // JSON-LD: CollectionPage
  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects — Case Studies & Portfolio",
    description:
      "Case studies of web apps and digital products designed and built by Vitalis Maina.",
    url: absoluteUrl("/projects"),
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/projects/${project.slug}`),
        name: project.title,
      })),
    },
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <div className="space-y-14 py-8 sm:py-12">
        {/* Breadcrumb navigation */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <a href="/" className="hover:text-foreground transition-colors">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-foreground font-medium" aria-current="page">
                Projects
              </span>
            </li>
          </ol>
        </nav>

        <header className="space-y-6 border-b border-border pb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4 max-w-2xl">
              <p className="text-sm font-medium text-primary tracking-wide uppercase">
                Portfolio
              </p>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
                Work & case studies
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                A curated collection of products I&apos;ve built — each documented
                with its own story, visuals, and technical decisions.
              </p>
            </div>

            <div className="flex gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold">{projects.length}</p>
                <p className="text-muted-foreground">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {projects.filter((p) => p.featured).length}
                </p>
                <p className="text-muted-foreground">Featured</p>
              </div>
            </div>
          </div>
        </header>

        {projects.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">No projects published yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {spotlight && (
              <ProjectCard
                title={spotlight.title}
                excerpt={spotlight.excerpt}
                image={spotlight.image}
                slug={spotlight.slug}
                liveUrl={spotlight.liveUrl ?? undefined}
                githubUrl={spotlight.githubUrl ?? undefined}
                featured={spotlight.featured}
                tags={spotlight.tags}
                status={spotlight.status}
                index={projects.findIndex((p) => p.id === spotlight.id)}
                variant="hero"
              />
            )}

            {remaining.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {remaining.map((project, index) => {
                  const globalIndex = projects.findIndex((p) => p.id === project.id);
                  const variant = getBentoVariant(index);

                  return (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      excerpt={project.excerpt}
                      image={project.image}
                      slug={project.slug}
                      liveUrl={project.liveUrl ?? undefined}
                      githubUrl={project.githubUrl ?? undefined}
                      featured={project.featured}
                      tags={project.tags}
                      status={project.status}
                      index={globalIndex}
                      variant={variant}
                      className={cn(getBentoSpan(index))}
                    />
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectsPage;
