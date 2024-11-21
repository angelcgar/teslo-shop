import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import type { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
	params: {
		gender: string;
	};
	searchParams: {
		page?: string;
	};
}

export default async function ({ params, searchParams }: Props) {
	const { gender } = params;
	const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;

	const { products, currentPage, totalPage } =
		await getPaginatedProductsWithImages({ page, gender: gender as Gender });
	console.log({ currentPage, totalPage });

	const cleanProducts = products.map((p) => ({
		id: p.id,
		description: p.description,
		images: p.images,
		inStock: p.inStock,
		price: p.price,
		sizes: p.size,
		slug: p.slug,
		tags: p.tags,
		title: p.title,
		gender: p.gender,
	}));

	if (products.length === 0) {
		redirect(`/gender/${gender}`);
	}

	const label: Record<string, string> = {
		men: "para Hombres",
		women: "para Mujeres",
		kid: "para Niños",
		unisex: "para todos",
	};
	const subLabel: Record<string, string> = {
		men: "el caballero",
		women: "la dama",
		kid: "el niño",
		unisex: "todos",
	};

	// if (id === "kids") notFound();

	return (
		<div>
			<Title
				title={`Articulos de ${label[gender]}`}
				subTitle={`Productos para ${subLabel[gender]} `}
				className="mb-2"
			/>

			<ProductGrid products={cleanProducts} />
			<Pagination totalPage={totalPage} />
		</div>
	);
}
