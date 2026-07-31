"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [productCount, userCount, orderCount] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
  ]);

  // Fetch 5 most recent orders and include the user relation
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return {
    productCount,
    userCount,
    orderCount,
    recentOrders: recentOrders.map((order) => ({
      ...order,
      totalAmount: Number(order.totalAmount),
    })),
  };
}