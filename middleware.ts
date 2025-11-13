import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminPath = req.nextUrl.pathname.startsWith("/admin");
    const isLoginPath = req.nextUrl.pathname === "/admin/login";

    // If on login page and authenticated, redirect to admin dashboard
    if (isLoginPath && token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Check if user is trying to access admin routes (except login)
    if (isAdminPath && !isLoginPath) {
      // If not authenticated, redirect to login
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      // Check if user has admin role
      const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
      const userEmail = token.email as string | undefined;

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

        // For admin routes, require token
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
