"use client";

import { Button } from "@/components/ui/button";
import { CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  tags?: string[];
}

export function ProjectCard({
  title,
  description,
  image,
  liveUrl,
  githubUrl,
  featured = false,
  tags = [],
}: ProjectCardProps) {
  return (
    <div className="group relative">
      {/* Glow effect for featured projects */}
      {featured && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse" />
      )}

      <div
        className={cn(
          "relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-out",
          "bg-gradient-to-br from-background/95 via-background/90 to-background/80",
          "backdrop-blur-xl border border-border/50",
          "shadow-lg hover:shadow-2xl hover:shadow-primary/10",
          "hover:scale-[1.02] hover:-translate-y-1",
          "hover:border-primary/30",
          featured && "ring-1 ring-primary/20"
        )}
      >
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </div>
        )}

        {/* Image container with enhanced overlay */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg?height=224&width=400"}
            alt={title}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            fill
            priority
          />

          {/* Multi-layered gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Shimmer effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        </div>

        {/* Content container */}
        <div className="relative flex flex-col flex-1 p-6 space-y-4">
          {/* Title with gradient text */}
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
              {title}
            </CardTitle>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20 transition-colors duration-300 hover:bg-primary/20"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-md">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
            {description}
          </CardDescription>

          {/* Spacer to push footer to bottom */}
          <div className="flex-1" />

          {/* Enhanced footer with better button styling */}
          <CardFooter className="p-0 pt-4">
            <div className="flex w-full gap-3">
              {liveUrl && (
                <Button
                  asChild
                  className={cn(
                    "flex-1 group/btn relative overflow-hidden",
                    "bg-gradient-to-r from-primary to-primary/90",
                    "hover:from-primary/90 hover:to-primary",
                    "shadow-md hover:shadow-lg hover:shadow-primary/25",
                    "transition-all duration-300",
                    "border border-primary/20 hover:border-primary/40"
                  )}
                >
                  <Link
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                    Live Demo
                  </Link>
                </Button>
              )}

              {githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  className={cn(
                    "flex-1 group/btn relative overflow-hidden",
                    "border-border/50 hover:border-primary/50",
                    "bg-background/50 hover:bg-background/80",
                    "backdrop-blur-sm",
                    "transition-all duration-300",
                    "hover:shadow-md"
                  )}
                >
                  <Link
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    <Github className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                    View Code
                  </Link>
                </Button>
              )}
            </div>
          </CardFooter>
        </div>
      </div>
    </div>
  );
}
