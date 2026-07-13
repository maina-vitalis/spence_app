import { getProjectBySlug } from "@/lib/actions/projects";
import type { TechStackItem } from "@/lib/actions/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function parseTechStack(value: unknown): TechStackItem[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is TechStackItem =>
      typeof item === "object" &&
      item !== null &&
      "name" in item &&
      "reason" in item
  );
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

  return {
    title: `${project.title} | Spence Creations`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: project.image ? [project.image] : undefined,
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
  const techStack = parseTechStack(project.techStack);

  return (
    <article className="space-y-12 py-8">
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
          <p className="max-w-3xl text-lg text-muted-foreground">
            {project.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <Button asChild>
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View live project
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="max-w-3xl leading-relaxed text-muted-foreground whitespace-pre-line">
          {project.description}
        </p>
      </section>

      {project.problemStatement && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">The problem</h2>
          <p className="max-w-3xl leading-relaxed text-muted-foreground whitespace-pre-line">
            {project.problemStatement}
          </p>
        </section>
      )}

      {project.solution && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">The solution</h2>
          <p className="max-w-3xl leading-relaxed text-muted-foreground whitespace-pre-line">
            {project.solution}
          </p>
        </section>
      )}

      {project.designProcess && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Design process</h2>
          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: project.designProcess }}
          />
        </section>
      )}

      {techStack.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tech stack</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {techStack.map((item) => (
              <div key={item.name} className="rounded-lg border p-4 space-y-2">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.keyFeatures.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Key features</h2>
          <ul className="grid gap-2 md:grid-cols-2">
            {project.keyFeatures.map((feature) => (
              <li
                key={feature}
                className="rounded-md border px-4 py-3 text-sm text-muted-foreground"
              >
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Gallery</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((url) => (
              <div
                key={url}
                className="relative aspect-video overflow-hidden rounded-lg border"
              >
                <Image src={url} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {project.lessonsLearned && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Lessons learned</h2>
          <p className="max-w-3xl leading-relaxed text-muted-foreground whitespace-pre-line">
            {project.lessonsLearned}
          </p>
        </section>
      )}

      <Separator />

      <div className="flex flex-wrap gap-3">
        {project.liveUrl && (
          <Button asChild>
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
  );
}
