import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin-emails";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return null;
  }

  return session;
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}
