'use client';

import Link from 'next/link';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { TopMenuButton } from './TopMenuButton';
import { useCartStore, useUIStore } from '@/store';
import { useEffect, useState } from 'react';

export const TopMenu = () => {
	const openSideMenu = useUIStore((state) => state.openSideMenu);
	const totalItemsInCart = useCartStore((state) => state.getTotalItem());

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, []);

	return (
		<div className="flex items-center justify-between w-full px-5">
			{/* logo */}
			<div>
				<Link href={'/'}>
					<span className={`${titleFont.className} font-bold antialiased`}>
						Tesla
					</span>
					<span> | shop</span>
				</Link>
			</div>

			{/* Conter Menu */}

			<div className="hidden sm:block">
				<Link
					className="p-2 m-2 transition-all rounded-md hover:bg-gray-100"
					href={'/gender/men'}
				>
					Hombres
				</Link>
				<Link
					className="p-2 m-2 transition-all rounded-md hover:bg-gray-100"
					href={'/gender/women'}
				>
					Mujeres
				</Link>
				<Link
					className="p-2 m-2 transition-all rounded-md hover:bg-gray-100"
					href={'/gender/kid'}
				>
					Niños
				</Link>
			</div>

			{/* Search, Cart, Menu */}
			<div className="flex items-center">
				<Link href={'/search'} className="mx-2">
					<IoSearchOutline className="w-5 h-5" />
				</Link>
				<Link
					href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
					className="mx-2"
				>
					<div className="relative">
						{loaded && totalItemsInCart > 0 && (
							<span className="absolute px-1 text-xs font-bold text-white bg-blue-700 rounded-full fade-in -top-2 -right-2">
								{totalItemsInCart}
							</span>
						)}
						<IoCartOutline className="w-5 h-5" />
					</div>
				</Link>

				<TopMenuButton />
			</div>
		</div>
	);
};
