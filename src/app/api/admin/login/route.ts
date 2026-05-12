import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { login } from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // In a real scenario, we check the database
    // For this academic project, we'll try to find the admin in the database
    // and fallback to a default if seeding hasn't happened yet (for demo ease)
    
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.password_hash);
      if (isPasswordValid) {
        await login(email);
        return NextResponse.json({ success: true });
      }
    } else {
        // Fallback for first-time use/demo if database is not seeded
        // Admin: admin@luxhome.com / admin123!
        if (email === "admin@luxhome.com" && password === "admin123!") {
             await login(email);
             return NextResponse.json({ success: true });
        }
    }

    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
