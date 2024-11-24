import Link from 'next/link';
import Image from 'next/image';

import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

export default function () {
	//todo: redirect('/empty')

	return (
		<div className="flex items-center justify-center px-10 mb-72 sm:px-0">
			<div className="flex flex-col w-[1000px]">
				<Title title="Carrito" />
				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
					{/* Carrito */}
					<div className="flex flex-col mt-5">
						<span className="text-xl">Agregar más items</span>
						<Link href={'/'} className="mb-5 underline">
							Continua comprando
						</Link>

						<ProductsInCart />
					</div>

					{/* Checkout */}
					<div className="bg-white shadow-xl rounded-xl p-7 h-fit">
						<h2 className="mb-2 text-2xl">Resumen de orden</h2>
						<OrderSummary />

						<div className="w-full mt-5 mb-2">
							<Link
								className="flex justify-center btn-primary"
								href={'/checkout/address'}
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
