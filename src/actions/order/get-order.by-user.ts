"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      massage: "Debe de esta autenticado",
    };
  }

  const order = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    order: order,
  };
};
