'use client';

import type { CartProduct, Product, Size } from '@/interfaces';
import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components';
import { useCartStore } from '@/store';

interface Props {
	product: Product;
}

export const AddToCart = ({ product }: Props) => {
	const addProductToCart = useCartStore((state) => state.addProductToCart);

	const [size, setSize] = useState<Size | undefined>();
	const [quantity, setQuantity] = useState<number>(1);
	const [posted, setPosted] = useState(false);

	const addToCart = () => {
		setPosted(true);

		if (!size) return;
		// console.log({ size, quantity });
		const cartProduct: CartProduct = {
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: 0,
			quantity: quantity,
			size: size,
			image: product.images[0],
		};

		addProductToCart(cartProduct);
		setPosted(false);
		setQuantity(1);
		setSize(undefined);
	};

	return (
		<>
			{posted && !size && (
				<span className="mt-2 text-red-500 animate-bounce">
					Debe de seleccionar una Talla
				</span>
			)}

			{/* Selector de Tallas */}
			<SizeSelector
				selecterSize={product.size[1]}
				availableSizes={product.size}
				onSizeChanged={setSize}
			/>

			{/* Selector de Cantidades */}

			<QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

			<button className="btn-primary my-5" onClick={addToCart} type="button">
				Agregar
			</button>
		</>
	);
};
