"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return products.map((p) => ({
      ...p,
      price: Number(p.price),
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function createProduct(formData: { name: string; price: number; stock: number; description: string }) {
  try {
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const product = await prisma.product.create({
      data: {
        name: formData.name,
        slug: slug,
        price: formData.price,
        stock: formData.stock,
        description: formData.description,
        isActive: true,
      },
    });

    revalidatePath("/admin/products");
    return { 
      success: true, 
      product: { ...product, price: Number(product.price) } 
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}