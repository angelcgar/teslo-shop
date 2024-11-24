'use client';

import Image from 'next/image';

import { useCartStore } from '@/store';
import { QuantitySelector } from '@/components';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const ProductsInCart = () => {
	const [loaded, setLoaded] = useState(false);

	const productsInCart = useCartStore((store) => store.cart);
	const updateProductQuantity = useCartStore(
		(store) => store.updateProductQuantity,
	);
	const removeProduct = useCartStore((store) => store.removeProduct);

	useEffect(() => {
		setLoaded(true);
	}, []);

	if (!loaded) {
		return <p>Cargando...</p>;
	}

	return (
		<>
			{/* Items */}
			{productsInCart.map((product) => (
				<div key={`${product.slug}-${product.size}`} className="flex mb-5">
					<Image
						src={`/products/${product.image}`}
						width={100}
						height={100}
						style={{
							width: '100px',
							height: '100px',
						}}
						alt={product.title}
						className="mr-5 rounded"
					/>

					<div>
						<Link
							className="cursor-pointer hover:underline"
							href={`/product/${product.slug}`}
						>
							{product.size} - {product.title}
						</Link>
						<p>{product.price}</p>
						<QuantitySelector
							quantity={product.quantity}
							onQuantityChange={(quantity) =>
								updateProductQuantity(product, quantity)
							}
						/>
						<button
							onClick={() => removeProduct(product)}
							className="mt-3 underline"
							type="button"
						>
							Remover
						</button>
					</div>
				</div>
			))}
		</>
	);
};
