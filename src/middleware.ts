import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    
    // Initialize Supabase client and refresh session
    let response = await updateSession(request);

    // Protect admin routes
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      const session = request.cookies.get("session")?.value;

      if (!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      try {
        await decrypt(session);
        return response; // Return the response from Supabase middleware
      } catch {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }

    return response;
  } catch (error) {
    console.error("Middleware crash:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
