import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/actions/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Our Projects | Spence Creations",
  description:
    "Explore a portfolio of our recent web development, e-commerce, and design projects. See the quality of work Spence Creations delivers.",
};

async function page() {
  const result = await getProjects();

  if (!result.success || !result.data) {
    return (
      <div className="py-12">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-semibold">Recent Projects</h1>
          <p className="text-destructive">Failed to load projects</p>
        </div>
      </div>
    );
  }

  const projects = result.data;

  return (
    <div className="space-y-10 py-8">
      <header className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold">Recent Projects</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our latest projects and see how we bring ideas to life.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects available yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
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

export default page;
