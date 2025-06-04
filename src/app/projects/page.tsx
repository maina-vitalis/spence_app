import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/config/projects";

export const metadata = {
  title: "Our Projects | Spence Creations",
  description: "Explore a portfolio of our recent web development, e-commerce, and design projects. See the quality of work Spence Creations delivers.",
};

function page() {
  return (
    <div className="space-y-10">
      <section className="mx-auto mt-6 space-y-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-2 items-center mb-1">
            <div className="w-1 h-1 rounded-full bg-blue-500" />
            <p className="text-sm">Get in Touch</p>
            <div className="w-1 h-1 rounded-full bg-primary" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-semibold mb-4 font-space-grotesk tracking-tight leading-[1.15]">
            Recent Projects
          </h2>
          <p className="text-sm font-light">
            Explore our latest projects and see how we bring ideas to life.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-blue-600/50"></div>
          </div>
        </div>
      </section>

      <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(350px,1fr))]">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}

export default page;
