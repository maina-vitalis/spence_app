import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/lib/actions/projects";
import Link from "next/link";

export async function FeaturedProjects() {
  const result = await getFeaturedProjects();
  const projects =
    result.success && result.data ? result.data : [];

  if (projects.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-primary font-medium">Featured work</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Selected projects
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Deep dives into problems solved, design decisions, and the tech
            behind each build.
          </p>
        </div>
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <Link href="/projects">View all</Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
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
          />
        ))}
      </div>

      <div className="sm:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link href="/projects">View all projects</Link>
        </Button>
      </div>
    </section>
  );
}
