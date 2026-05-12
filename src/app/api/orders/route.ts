import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { fullName, email, phone, city, quantity, message } = data;

    // 1. Find or create client
    const client = await prisma.client.upsert({
      where: { email },
      update: {
        full_name: fullName,
        phone,
        city,
      },
      create: {
        full_name: fullName,
        email,
        phone,
        city,
      },
    });

    // 2. Get the product (first one available)
    const product = await prisma.product.findFirst();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // 3. Calculate total price
    const totalPrice = Number(product.price) * quantity;

    // 4. Create command
    const command = await prisma.command.create({
      data: {
        client_id: client.id,
        product_id: product.id,
        quantity,
        total_price: totalPrice,
        message,
        status: "PENDING",
      },
    });

    return NextResponse.json(command, { status: 201 });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
