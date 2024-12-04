'use client';

import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function PlaceOrder() {
	const [loaded, setLoaded] = useState(false);
	const [isPlacingOrder, setIsPlacingOrder] = useState(false);

	const address = useAddressStore((state) => state.address);

	const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
		state.getSummaryInformation(),
	);

	const cart = useCartStore((state) => state.cart);

	useEffect(() => {
		setLoaded(true);
	}, []);

	const onPlaceholder = async () => {
		setIsPlacingOrder(true);

		const productsToOrder = cart.map((product) => ({
			productId: product.id,
			quantity: product.quantity,
			size: product.size,
		}));

		console.log({ address, productsToOrder });

		// todo: server action

		setIsPlacingOrder(false);
	};

	if (!loaded) {
		return <p>Cargando...</p>;
	}

	return (
		<div className="bg-white shadow-xl rounded-xl p-7">
			<h2 className="mb-2 text-2xl">Dirección de entrega</h2>
			<div className="mb-10">
				<p className="text-xl">
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>{address.address2}</p>
				<p>{address.postalCode}</p>
				<p>
					{address.city}, {address.city}
				</p>
				<p>{address.phone}</p>
			</div>

			{/* Divider */}
			<div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

			<h2 className="mb-2 text-2xl">Resumen de orden</h2>

			<div className="grid grid-cols-2">
				<span>No. Productos</span>
				<span className="text-right">
					{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
				</span>

				<span>Subtotal</span>
				<span className="text-right">{currencyFormat(subTotal)}</span>

				<span>Impuestos (15%)</span>
				<span className="text-right">{currencyFormat(tax)}</span>

				<span className="mt-5 text-2xl">Total:</span>
				<span className="mt-5 text-2xl text-right">
					{currencyFormat(total)}
				</span>
			</div>

			<div className="w-full mt-5 mb-2">
				<p className="mb-5">
					{/* Disclaimer */}
					<span className="text-xs">
						Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{' '}
						<a href="/" className="underline">
							términos y condiciones
						</a>{' '}
						y{' '}
						<a href="/" className="underline">
							política de privacidad
						</a>
					</span>
				</p>

				{/* <p className="text-red-500">Error de creacion</p> */}

				<button
					// href="/orders/123"
					onClick={onPlaceholder}
					type="button"
					className={clsx({
						'btn-primary': !isPlacingOrder,
						'btn-disabled': isPlacingOrder,
					})}
				>
					Colocar orden
				</button>
			</div>
		</div>
	);
}
