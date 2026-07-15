import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/actions/projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export async function FeaturedProjects() {
  const result = await getFeaturedProjects();
  const projects = result.success && result.data ? result.data : [];

  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-primary tracking-wide uppercase">
            Featured work
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
            Selected projects
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Highlights from recent builds — open any case study for the full
            write-up.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-full shrink-0">
          <Link href="/projects">
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="space-y-5">
        {lead && (
          <ProjectCard
            title={lead.title}
            excerpt={lead.excerpt}
            image={lead.image}
            slug={lead.slug}
            liveUrl={lead.liveUrl ?? undefined}
            githubUrl={lead.githubUrl ?? undefined}
            featured={lead.featured}
            tags={lead.tags}
            status={lead.status}
            index={0}
            variant="hero"
          />
        )}

        {rest.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((project, index) => (
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
                index={index + 1}
                variant="wide"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
