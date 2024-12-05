'use client';

import Link from 'next/link';
import clsx from 'clsx';
import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from 'react-icons/io5';

import { useUIStore } from '@/store';
import { useEffect } from 'react';
import { logout } from '@/actions';
import { useSession } from 'next-auth/react';

export const Sidebar = () => {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeMenu = useUIStore((state) => state.closeSideMenu);

	const { data: session } = useSession();
	const isAuthenticated = !!session?.user;
	const isAdmin = session?.user.role === 'admin';

	// todo: Sacar es useEffect a un customHook como ejercisio
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleKeyDown = (event: { key: string }) => {
			if (event.key === 'Escape') {
				closeMenu();
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<div>
			{/* Background black */}
			{isSideMenuOpen && (
				<div className="fixed top-0 left-0 z-10 w-screen h-screen bg-black opacity-30" />
			)}

			{/* Blur */}
			{isSideMenuOpen && (
				<div
					className="fixed top-0 left-0 z-10 w-screen h-screen fade-in backdrop-filter backdrop-blur-sm"
					onClick={closeMenu}
					onKeyDown={closeMenu}
				/>
			)}

			{/* Sidemenu */}
			<nav
				className={clsx(
					'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
					{
						'translate-x-full': !isSideMenuOpen,
					},
				)}
			>
				<IoCloseOutline
					size={50}
					className="absolute cursor-pointer top-5 right-5"
					onClick={() => closeMenu()}
				/>

				{/* Input */}
				<div className="relative mt-14">
					<IoSearchOutline size={20} className="absolute top-2 left-2" />
					<input
						type="text"
						placeholder="Buscar"
						className="w-full py-1 pl-10 pr-10 text-xl border-b-2 border-gray-200 rounded bg-gray-50 focus:outline-none focus:border-blue-500"
					/>
				</div>

				{/* Menú */}

				{isAuthenticated && (
					<>
						<Link
							href="/profile"
							onClick={() => closeMenu()}
							className="flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100"
						>
							<IoPersonOutline size={30} />
							<span className="ml-3 text-xl">Perfil</span>
						</Link>

						<Link
							href="/orders"
							onClick={() => closeMenu()}
							className="flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100"
						>
							<IoTicketOutline size={30} />
							<span className="ml-3 text-xl">Ordenes</span>
						</Link>
					</>
				)}

				{!isAuthenticated && (
					<Link
						href="/auth/login"
						className="flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100"
						onClick={() => closeMenu()}
					>
						<IoLogInOutline size={30} />
						<span className="ml-3 text-xl">Ingresar</span>
					</Link>
				)}

				{isAuthenticated && (
					<button
						className="flex items-center w-full p-2 mt-10 transition-all rounded hover:bg-gray-100"
						// ! bug: logout no esta refrescando la pagina
						onClick={() => logout()}
						type="button"
					>
						<IoLogOutOutline size={30} />
						<span className="ml-3 text-xl">Salir</span>
					</button>
				)}

				{/* Line Separator */}
				{isAdmin && (
					<>
						<div className="w-full h-px my-10 bg-gray-200" />

						<Link
							href="/"
							className="flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100"
						>
							<IoShirtOutline size={30} />
							<span className="ml-3 text-xl">Productos</span>
						</Link>

						<Link
							href="/"
							className="flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100"
						>
							<IoTicketOutline size={30} />
							<span className="ml-3 text-xl">Ordenes</span>
						</Link>

						<Link
							href="/"
							className="flex items-center p-2 mt-10 transition-all rounded hover:bg-gray-100"
						>
							<IoPeopleOutline size={30} />
							<span className="ml-3 text-xl">Usuarios</span>
						</Link>
					</>
				)}
			</nav>
		</div>
	);
};
