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
    async session({ session }) {
      // Add admin role to session
      if (session.user?.email) {
        const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
        session.user.role = adminEmails.includes(session.user.email)
          ? "admin"
          : "user";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = "admin";
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
