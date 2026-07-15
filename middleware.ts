import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;
    const isLoginPath = pathname === "/admin/login";

    if (isLoginPath && token?.role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/admin/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (pathname === "/admin/login") {
          return true;
        }

        if (pathname === "/admin" || pathname.startsWith("/admin/")) {
          return !!token && token.role === "admin";
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
