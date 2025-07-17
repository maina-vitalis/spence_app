import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // If not authenticated, redirect to login
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      // Check if user has admin role
      const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
      const userEmail = req.nextauth.token.email;

      if (!userEmail || !adminEmails.includes(userEmail)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === "/admin/login") {
          return true;
        }

        // For admin routes, check if user is authenticated
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
