import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { encrypt } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    let authenticated = false;
    
    // Explicit DB check
    try {
      await prisma.$connect();
    } catch (dbError: any) {
      console.error("Database connection failed:", dbError);
      return NextResponse.json({ 
        error: "Database Connection Error", 
        details: "Could not connect to the database. Please check if your Docker container is running." 
      }, { status: 503 });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (admin) {
      authenticated = await bcrypt.compare(password, admin.password_hash);
    } else {
      // Fallback for first-time use/demo
      if (email === "admin@luxhome.com" && password === "admin123!") {
        authenticated = true;
      }
    }

    if (authenticated) {
      const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
      const session = await encrypt({ email, expires });

      const response = NextResponse.json({ success: true });
      response.cookies.set("session", session, { 
        expires, 
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });
      
      return response;
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Login error details:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
