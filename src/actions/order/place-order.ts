"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductsOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductsOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verificar sessión de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // Obtener información de los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce(
    (count, product) => count + product.quantity,
    0
  );

  // Totales de tax, subtotal, total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((prduct) => prduct.id === item.productId);

      if (!product) throw new Error(`${item.productId} No existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Crear la transacción de base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el Stock de los productos
      const updatedProductsPromises = products.map(async (product) => {
        // Acomular Validaciones
        const productsQuantoty = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => acc + item.quantity, 0);

        if (productsQuantoty === 0) {
          throw new Error(`${product.id} no tien catidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productsQuantoty, // -> no hacer
            inStock: {
              decrement: productsQuantoty,
            },
          },
        });
      });

      const updateProducts = await Promise.all(updatedProductsPromises);
      // Verificar valores negativos en la existencia == no hay stock
      updateProducts.forEach((product, i) => {
        if (product.inStock <= 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      // 2. Crear la orden - encabezado -Detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subtotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((product) => ({
                quantity: product.quantity,
                size: product.size,
                productId: product.productId,
                price:
                  products.find((p) => p.id === product.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // todo: Validar si el price es cero, entonces lanzar un Error

      // 3. Crear la direccion de la orden
      // Address
      const orderAddress = await tx.orderAddress.create({
        data: {
          address: address.address,
          city: address.city,
          firstName: address.firstName,
          lastName: address.lastName,
          address2: address.address2,
          postalCode: address.postalCode,
          phone: address.phone,
          countryId: address.country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: updateProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
