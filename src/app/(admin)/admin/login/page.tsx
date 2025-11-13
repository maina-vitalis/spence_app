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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    getSession().then((session) => {
      if (session?.user?.role === "admin") {
        router.push("/admin");
        router.refresh();
      }
    });
  }, [router]);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(provider, {
        callbackUrl: "/admin",
        redirect: true,
      });

      if (result?.error) {
        console.error("Sign in error:", result.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
