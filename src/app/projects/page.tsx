import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/actions/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/generated/prisma/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Projects | Spence Creations",
  description:
    "Case studies of web apps and digital products I've designed and built.",
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

  return (
    <div className="space-y-14 py-8 sm:py-12">
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
  );
}

export default ProjectsPage;
