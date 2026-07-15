import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  const userCount = await prisma.user.count();

  const authConfigured = {
    nextAuthSecret: Boolean(
      process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET
    ),
    nextAuthUrl: Boolean(process.env.NEXTAUTH_URL),
    adminSeeded: userCount > 0,
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Account and authentication configuration
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your signed-in admin account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <span className="text-muted-foreground">Name:</span>{" "}
            {session?.user?.name ?? "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span>{" "}
            {session?.user?.email ?? "—"}
          </p>
          <p>
            <span className="text-muted-foreground">Role:</span>{" "}
            {session?.user?.role ?? "—"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auth configuration</CardTitle>
          <CardDescription>
            Email and password login via NextAuth credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "NEXTAUTH_SECRET", ok: authConfigured.nextAuthSecret },
            { label: "NEXTAUTH_URL", ok: authConfigured.nextAuthUrl },
            { label: "Admin user in database", ok: authConfigured.adminSeeded },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
            >
              <span>{item.label}</span>
              <span
                className={
                  item.ok
                    ? "text-green-600 dark:text-green-400"
                    : "text-destructive"
                }
              >
                {item.ok ? "Configured" : "Missing"}
              </span>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-2">
            Create or update the admin user by setting{" "}
            <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> in{" "}
            <code>.env</code>, then run <code>npm run db:seed</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
