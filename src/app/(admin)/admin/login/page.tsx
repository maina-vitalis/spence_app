"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const errorMessages: Record<string, string> = {
  AccessDenied:
    "Access denied. Your account is not authorized for admin access.",
  OAuthSignin: "Could not start sign-in. Please try again.",
  OAuthCallback: "Sign-in failed during the OAuth callback. Please try again.",
  OAuthCreateAccount: "Could not create an account. Please try again.",
  Callback: "Sign-in callback failed. Please try again.",
  Default: "An unexpected sign-in error occurred. Please try again.",
};

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const errorCode = searchParams.get("error");
  const errorMessage = errorCode
    ? (errorMessages[errorCode] ?? errorMessages.Default)
    : null;

  useEffect(() => {
    getSession().then((session) => {
      if (session?.user?.role === "admin") {
        router.replace("/admin");
      }
    });
  }, [router]);

  const handleSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        callbackUrl: "/admin",
        redirect: true,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          <Button
            onClick={() => handleSignIn("google")}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            <FaGoogle className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>

          <Button
            onClick={() => handleSignIn("github")}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            <FaGithub className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            Only authorized admin accounts can access this area.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginForm />
    </Suspense>
  );
}
