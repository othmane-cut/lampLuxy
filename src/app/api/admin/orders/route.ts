import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.command.findMany({
      include: {
        client: true,
        product: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const order = await prisma.command.update({
      where: { id: params.id },
      data: { status },
    });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
