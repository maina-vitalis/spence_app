import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { isAdminEmail } from "@/lib/admin-emails";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      return isAdminEmail(user.email);
    },
    async jwt({ token, user }) {
      const email = user?.email ?? (token.email as string | undefined);

      if (email) {
        token.email = email;
        token.role = isAdminEmail(email) ? "admin" : "user";
      }

      if (user?.id) {
        token.sub = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string) ?? "user";
        session.user.email = (token.email as string) ?? session.user.email;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === "production",
  debug: process.env.NODE_ENV === "development",
};
