import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
	searchParams: {
		page?: string;
	};
}

export default async function Home({ searchParams }: Props) {
	const page = searchParams.page ? Number.parseInt(searchParams.page) : 1;

	const { products, currentPage, totalPage } =
		await getPaginatedProductsWithImages({ page });
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
		redirect("/");
	}

	return (
		<>
			<Title title="Tienda" subTitle="Todos lo productos" className="mb-2" />

			{/* todo: arreglar este error de tipado */}
			<ProductGrid products={cleanProducts} />

			<Pagination totalPage={totalPage} />
		</>
	);
}
