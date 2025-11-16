import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json({ success: true });
    
    // Clear all NextAuth cookies
    const cookiesToClear = [
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
      "next-auth.csrf-token",
      "__Host-next-auth.csrf-token",
      "next-auth.callback-url",
      "__Secure-next-auth.callback-url",
    ];

    cookiesToClear.forEach((cookieName) => {
      response.cookies.set(cookieName, "", {
        expires: new Date(0),
        path: "/",
      });
    });

    return response;
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Sign out failed" }, { status: 500 });
  }
}

export async function GET() {
  return POST();
}
