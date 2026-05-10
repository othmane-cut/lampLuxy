import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, message } = data;

    // 1. Find or create client (with minimal info if new)
    const client = await prisma.client.upsert({
      where: { email },
      update: {},
      create: {
        email,
        full_name: email.split("@")[0], // Placeholder name
        phone: "N/A",
        city: "N/A",
      },
    });

    // 2. Create feedback
    const feedback = await prisma.feedback.create({
      data: {
        client_id: client.id,
        message,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}
