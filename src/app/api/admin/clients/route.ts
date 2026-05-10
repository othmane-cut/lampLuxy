import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { 
  computeProfitabilityTier, 
  computeEngagementScore, 
  computeEngagementSegment, 
  computePurchaseFrequency 
} from "@/lib/crm/metrics";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        commands: true,
        feedbacks: true,
      },
    });

    const enrichedClients = clients.map((client) => {
      const totalSpent = client.commands.reduce((sum, cmd) => sum + Number(cmd.total_price), 0);
      const orderCount = client.commands.length;
      const feedbackCount = client.feedbacks.length;
      
      const lastOrder = client.commands.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0];
      const daysSinceLastOrder = lastOrder 
        ? Math.floor((Date.now() - lastOrder.created_at.getTime()) / (1000 * 60 * 60 * 24))
        : null;

      // Mock Average Order Value for demo (or calculate from total revenue / total orders in DB)
      const avgOrderValue = 1299; 

      const tier = computeProfitabilityTier(totalSpent, avgOrderValue);
      const score = computeEngagementScore(orderCount, feedbackCount, daysSinceLastOrder);
      const segment = computeEngagementSegment(score);
      const frequency = computePurchaseFrequency(orderCount, client.created_at);

      return {
        id: client.id,
        fullName: client.full_name,
        email: client.email,
        phone: client.phone,
        city: client.city,
        totalSpent,
        orderCount,
        tier,
        score,
        segment,
        frequency,
        registeredAt: client.created_at,
      };
    });

    return NextResponse.json(enrichedClients);
  } catch (error) {
    console.error("Fetch clients error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
