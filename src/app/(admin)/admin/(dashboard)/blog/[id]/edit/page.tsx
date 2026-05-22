import { BlogForm } from "@/components/admin/BlogForm";
import { getBlogPost } from "@/lib/actions/blog";
import { notFound } from "next/navigation";

interface EditBlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const { id } = await params;
  const result = await getBlogPost(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return <BlogForm post={result.data} mode="edit" />;
}
