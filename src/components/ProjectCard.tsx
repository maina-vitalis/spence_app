import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ProjectCardVariant = "hero" | "wide" | "default";

interface ProjectCardProps {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  tags?: string[];
  status?: string;
  index?: number;
  variant?: ProjectCardVariant;
  className?: string;
}

function formatStatus(status: string) {
  return status.replace(/_/g, " ").toLowerCase();
}

export function ProjectCard({
  title,
  excerpt,
  image,
  slug,
  liveUrl,
  githubUrl,
  featured = false,
  tags = [],
  status,
  index,
  variant = "default",
  className,
}: ProjectCardProps) {
  const href = `/projects/${slug}`;
  const isHero = variant === "hero";
  const isWide = variant === "wide";

  if (isHero) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative block overflow-hidden rounded-2xl border border-border bg-card",
          className
        )}
      >
        <div className="relative aspect-[16/7] sm:aspect-[21/9] w-full">
          <Image
            src={image || "/placeholder.svg?height=400&width=1200"}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {featured && (
                <Badge className="bg-primary text-primary-foreground border-0">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Featured
                </Badge>
              )}
              {status && (
                <Badge variant="outline" className="capitalize bg-background/60 backdrop-blur-sm">
                  {formatStatus(status)}
                </Badge>
              )}
              {tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-background/60 backdrop-blur-sm text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                {index !== undefined && (
                  <span className="text-sm font-mono text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                )}
                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  {title}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base line-clamp-2 max-w-2xl">
                  {excerpt}
                </p>
              </div>
              <span className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (isWide) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40 md:flex-row",
          className
        )}
      >
        <div className="relative aspect-[16/10] w-full md:aspect-auto md:w-[58%] md:min-h-[280px]">
          <Image
            src={image || "/placeholder.svg?height=280&width=500"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {featured && (
                  <Badge className="text-xs">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                )}
                {status && (
                  <Badge variant="outline" className="text-xs capitalize">
                    {formatStatus(status)}
                  </Badge>
                )}
              </div>
              {index !== undefined && (
                <span className="text-xs font-mono text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
            </div>

            <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium text-primary">View case study</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40",
        className
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=300&width=400"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          {index !== undefined && (
            <span className="rounded-md bg-background/80 px-2 py-1 text-xs font-mono text-muted-foreground backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          {featured && (
            <Badge className="ml-auto text-xs">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Featured
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>
            {status && (
              <Badge variant="outline" className="text-[10px] capitalize shrink-0">
                {formatStatus(status)}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
            View case study
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}
