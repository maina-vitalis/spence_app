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

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
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
  const cleanExcerpt = stripHtml(excerpt);

  if (isHero) {
    return (
      <Link
        href={href}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all md:block",
          className
        )}
      >
        {/* Mobile View: Dedicated Image Container */}
        <div className="relative aspect-[16/9] w-full min-h-[200px] sm:min-h-[260px] md:min-h-[380px]">
          <Image
            src={image || "/placeholder.svg?height=400&width=1200"}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="100vw"
          />
          {/* Overlay gradient for desktop readability */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Content Section (Below image on mobile, overlaid on desktop) */}
        <div className="flex flex-col justify-end p-4 sm:p-6 md:absolute md:inset-0 md:p-8">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            {featured && (
              <Badge className="bg-primary text-primary-foreground border-0 text-[11px] sm:text-xs">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Featured
              </Badge>
            )}
            {status && (
              <Badge variant="outline" className="capitalize text-[11px] sm:text-xs bg-background/80 backdrop-blur-sm">
                {formatStatus(status)}
              </Badge>
            )}
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/80 text-[10px] sm:text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              {index !== undefined && (
                <span className="text-[11px] sm:text-xs font-mono text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <h2 className="text-lg sm:text-2xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 max-w-2xl leading-relaxed">
                {cleanExcerpt}
              </p>
            </div>
            <span className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
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
          "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 md:flex-row shadow-sm hover:shadow-md",
          className
        )}
      >
        <div className="relative aspect-[16/9] w-full md:aspect-auto md:w-[48%] md:min-h-[240px]">
          <Image
            src={image || "/placeholder.svg?height=280&width=500"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 48vw"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-6">
          <div className="space-y-2.5">
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

            <h3 className="text-lg sm:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 sm:line-clamp-3">
              {cleanExcerpt}
            </p>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[11px] sm:text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs sm:text-sm font-medium text-primary">View case study</span>
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
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 shadow-sm hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg?height=300&width=400"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

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

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-1 text-base sm:text-lg">
              {title}
            </h3>
            {status && (
              <Badge variant="outline" className="text-[10px] capitalize shrink-0">
                {formatStatus(status)}
              </Badge>
            )}
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{cleanExcerpt}</p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[11px] sm:text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
            View case study
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
      </div>
    </Link>
  );
}
