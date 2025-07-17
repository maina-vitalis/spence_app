import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProject } from "@/lib/actions/projects";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const result = await getProject(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return <ProjectForm project={result.data} mode="edit" />;
}
