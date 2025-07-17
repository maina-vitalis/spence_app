import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjects } from "@/lib/actions/projects";
import { prisma } from "@/lib/prisma";
import { BarChart3, FileText, FolderOpen, Users } from "lucide-react";

export default async function AdminDashboard() {
  // Get project stats
  const projectsResult = await getProjects();
  const projects =
    projectsResult.success && projectsResult.data ? projectsResult.data : [];
  const featuredProjects = projects.filter((p) => p.featured);

  // Get blog stats
  const publishedPosts = await prisma.blogPost.count({
    where: { status: "PUBLISHED" },
  });
  const draftPosts = await prisma.blogPost.count({
    where: { status: "DRAFT" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Manage your portfolio and content
          from here.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">Portfolio projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts}</div>
            <p className="text-xs text-muted-foreground">Published articles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Featured Projects
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProjects.length}</div>
            <p className="text-xs text-muted-foreground">Highlighted work</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Posts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftPosts}</div>
            <p className="text-xs text-muted-foreground">Unpublished drafts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest content updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    Database seeded with {projects.length} projects
                  </p>
                  <p className="text-xs text-muted-foreground">Recently</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Admin dashboard created</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <a
                href="/admin/projects/new"
                className="block w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="font-medium">Add New Project</div>
                <div className="text-sm text-muted-foreground">
                  Create a new portfolio item
                </div>
              </a>
              <a
                href="/admin/blog/new"
                className="block w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="font-medium">Write Blog Post</div>
                <div className="text-sm text-muted-foreground">
                  Start a new article
                </div>
              </a>
              <a
                href="/admin/projects"
                className="block w-full text-left p-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="font-medium">Manage Projects</div>
                <div className="text-sm text-muted-foreground">
                  Edit your portfolio
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
