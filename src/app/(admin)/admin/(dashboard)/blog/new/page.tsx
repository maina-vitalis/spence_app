import { BlogForm } from "@/components/admin/BlogForm";
import { requireAdmin } from "@/lib/auth-server";

export default async function NewBlogPostPage() {
  await requireAdmin();

  return (
    <div className="py-2">
      <BlogForm mode="create" />
    </div>
  );
}
