import { ProductGrid, Title } from "@/components";
import type { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products;

interface Props {
	params: {
		id: Category;
	};
}

export default function ({ params }: Props) {
	const { id } = params;

	const products = seedProducts.filter((p) => p.gender === id);

	const label: Record<Category, string> = {
		men: "para Hombres",
		women: "para Mujeres",
		kid: "para Niños",
		unisex: "para todos",
	};
	const subLabel: Record<Category, string> = {
		men: "el caballero",
		women: "la dama",
		kid: "el niño",
		unisex: "todos",
	};

	// if (id === "kids") notFound();

	return (
		<div>
			<Title
				title={`Articulos de ${label[id]}`}
				subTitle={`Productos para ${subLabel[id]} `}
				className="mb-2"
			/>

			<ProductGrid products={products} />
		</div>
	);
}
