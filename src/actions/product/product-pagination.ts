"use server";

import prisma from "@/lib/prisma";
import type { Gender } from "@prisma/client";

interface PaginationOptions {
	page?: number;
	take?: number;
	gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
	page = 1,
	take = 12,
	gender,
}: PaginationOptions) => {
	if (Number.isNaN(Number(page))) page = 1;
	if (page < 1) page = 1;

	try {
		// 1. Obtener los productos
		const products = await prisma.product.findMany({
			take: take,
			skip: (page - 1) * take,
			include: {
				ProductImage: {
					take: 2,
					select: {
						url: true,
					},
				},
			},
			where: {
				gender: gender,
			},
		});

		// 2. Obtener total de paginas
		// todo:
		const totalCount = await prisma.product.count({
			where: {
				gender: gender,
			},
		});
		const totalPage = Math.ceil(totalCount / take);

		return {
			currentPage: page,
			totalPage: totalPage,
			products: products.map((product) => ({
				...product,
				images: product.ProductImage.map((image) => image.url),
			})),
		};
	} catch (error) {
		throw new Error("No se pudo cargar los productos");
	}
};
