import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAdminEmails } from "@/lib/admin-emails";
import { getAdminSession } from "@/lib/auth-server";

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  const adminEmails = getAdminEmails();

  const authConfigured = {
    nextAuthSecret: Boolean(
      process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET
    ),
    nextAuthUrl: Boolean(process.env.NEXTAUTH_URL),
    adminEmails: adminEmails.length > 0,
    googleOAuth: Boolean(
      process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ),
    githubOAuth: Boolean(
      process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ),
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
            Environment variables required for admin login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "NEXTAUTH_SECRET", ok: authConfigured.nextAuthSecret },
            { label: "NEXTAUTH_URL", ok: authConfigured.nextAuthUrl },
            { label: "ADMIN_EMAILS", ok: authConfigured.adminEmails },
            { label: "Google OAuth", ok: authConfigured.googleOAuth },
            { label: "GitHub OAuth", ok: authConfigured.githubOAuth },
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
            Add your email to <code>ADMIN_EMAILS</code> in <code>.env</code> and
            configure at least one OAuth provider. See <code>.env.example</code>{" "}
            for the full list.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
