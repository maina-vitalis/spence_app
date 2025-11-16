import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Add admin email check here
      const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];

      if (user.email && adminEmails.includes(user.email)) {
        return true;
      }

      return false; // Deny access if not admin
    },
    async session({ session, token }) {
      // Add admin role to session from token
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Set role when user first signs in
      if (user) {
        const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
        token.role = user.email && adminEmails.includes(user.email) ? "admin" : "user";
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === "production",
  events: {
    async signOut() {
      // Clear any server-side session data if needed
      console.log("User signed out");
    },
  },
};
