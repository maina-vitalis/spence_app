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

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
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
        <section
          className="tiptap-content prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
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
  );
}
