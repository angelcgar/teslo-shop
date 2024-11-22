"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string): Promise<number> => {
  // sleep(2);

  try {
    const stock = prisma.product.findFirst({
      where: {
        slug,
      },
      select: { inStock: true },
    });

    return stock.then((p) => p?.inStock ?? 0);
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por slug");
  }
};
