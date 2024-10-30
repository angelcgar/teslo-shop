import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";

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

	if (products.length === 0) {
		redirect("/");
	}

	return (
		<div className="">
			<Title title="Tienda" subTitle="Todos lo productos" className="mb-2" />

			{/* todo: arreglar este error de tipado */}
			<ProductGrid products={products} />
		</div>
	);
}
