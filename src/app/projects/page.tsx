import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/actions/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Projects | Spence Creations",
  description:
    "Case studies of web apps and digital products I've designed and built.",
};

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

  return (
    <div className="space-y-10 py-8">
      <header className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold">Projects</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Case studies covering the problem, design process, tech stack, and
          outcomes for each project.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects published yet.</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default ProjectsPage;
