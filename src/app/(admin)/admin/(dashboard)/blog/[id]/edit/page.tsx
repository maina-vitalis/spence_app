import { BlogForm } from "@/components/admin/BlogForm";
import { getPost } from "@/lib/actions/posts";
import { requireAdmin } from "@/lib/auth-server";
import { notFound } from "next/navigation";

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  await requireAdmin();
  const { id } = await params;

  const result = await getPost(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="py-2">
      <BlogForm post={result.data} mode="edit" />
    </div>
  );
}
