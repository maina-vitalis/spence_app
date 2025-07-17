"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProject, toggleProjectFeatured } from "@/lib/actions/projects";
import { Project } from "@prisma/client";
import {
  Edit,
  ExternalLink,
  Eye,
  Github,
  MoreVertical,
  Star,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface AdminProjectCardProps {
  project: Project;
}

export function AdminProjectCard({ project }: AdminProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingFeatured, setIsTogglingFeatured] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteProject(project.id);
      if (result.success) {
        toast.success("Project deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete project");
      }
    } catch {
      toast.error("An error occurred while deleting the project");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleFeatured = async () => {
    setIsTogglingFeatured(true);
    try {
      const result = await toggleProjectFeatured(project.id);
      if (result.success) {
        toast.success(
          project.featured
            ? "Project removed from featured"
            : "Project added to featured"
        );
      } else {
        toast.error(result.error || "Failed to update project");
      }
    } catch {
      toast.error("An error occurred while updating the project");
    } finally {
      setIsTogglingFeatured(false);
    }
  };

  return (
    <Card className="group relative overflow-hidden">
      {project.featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            <Star className="h-3 w-3 mr-1 fill-current" />
            Featured
          </Badge>
        </div>
      )}

      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg line-clamp-1">
              {project.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 mt-1">
              {project.description}
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/projects/${project.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleToggleFeatured}
                disabled={isTogglingFeatured}
              >
                <Star className="h-4 w-4 mr-2" />
                {project.featured ? "Remove from Featured" : "Add to Featured"}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {project.liveUrl && (
                <DropdownMenuItem asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Live
                  </a>
                </DropdownMenuItem>
              )}

              {project.githubUrl && (
                <DropdownMenuItem asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Project</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete &ldquo;{project.title}
                      &rdquo;? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button asChild size="sm" className="flex-1">
            <Link href={`/admin/projects/${project.id}/edit`}>
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Link>
          </Button>

          {project.liveUrl && (
            <Button asChild variant="outline" size="sm">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>

        {/* Metadata */}
        <div className="text-xs text-muted-foreground mt-3 pt-3 border-t">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
