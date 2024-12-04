import Link from 'next/link';
import Image from 'next/image';

import { QuantitySelector, Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import PlaceOrder from './ui/PlaceOrder';

export default function CheckoutPage() {
	return (
		<div className="flex items-center justify-center px-10 mb-72 sm:px-0">
			<div className="flex flex-col w-[1000px]">
				<Title title="Verificar orden" />

				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
					{/* Carrito */}
					<div className="flex flex-col mt-5">
						<span className="text-xl">Ajustar elementos</span>
						<Link href="/cart" className="mb-5 underline">
							Editar carrito
						</Link>

						{/* Items */}
						<ProductsInCart />
					</div>

					{/* Checkout - Resumen de orden */}
					<PlaceOrder />
				</div>
			</div>
		</div>
	);
}
