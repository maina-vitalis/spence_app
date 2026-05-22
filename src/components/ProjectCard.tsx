import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.svg?height=192&width=400"}
          alt={title}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {featured && (
          <Badge className="absolute top-3 right-3">
            <Star className="h-3 w-3 mr-1 fill-current" />
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardContent>

      {(liveUrl || githubUrl) && (
        <CardFooter className="gap-2">
          {liveUrl && (
            <Button asChild className="flex-1">
              <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {githubUrl && (
            <Button asChild variant="outline" className="flex-1">
              <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
