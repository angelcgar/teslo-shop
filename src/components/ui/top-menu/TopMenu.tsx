import { titleFont } from "@/config/fonts";
import Link from "next/link";

import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { TopMenuButton } from "./TopMenuButton";

export const TopMenu = () => {
	return (
		<div className="flex px-5 justify-between items-center w-full">
			{/* logo */}
			<div>
				<Link href={"/"}>
					<span className={`${titleFont.className} font-bold antialiased`}>
						Tesla
					</span>
					<span> | shop</span>
				</Link>
			</div>

			{/* Conter Menu */}

			<div className="hidden sm:block">
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href={"/category/men"}
				>
					Hombres
				</Link>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href={"/category/women"}
				>
					Mujeres
				</Link>
				<Link
					className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
					href={"/category/kid"}
				>
					Niños
				</Link>
			</div>

			{/* Search, Cart, Menu */}
			<div className="flex items-center">
				<Link href={"/search"} className="mx-2">
					<IoSearchOutline className="w-5 h-5" />
				</Link>
				<Link href={"/cart"} className="mx-2">
					<div className="relative">
						<span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
							3
						</span>
						<IoCartOutline className="w-5 h-5" />
					</div>
				</Link>

				<TopMenuButton />
			</div>
		</div>
	);
};
