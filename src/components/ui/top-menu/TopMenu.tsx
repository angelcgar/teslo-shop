import { titleFont } from "@/config/fonts";
import Link from "next/link";

import { IoSearchOutline, IoCartOutline } from "react-icons/io5";
import { TopMenuButton } from "./TopMenuButton";

export const TopMenu = () => {
	return (
		<div className="flex items-center justify-between w-full px-5">
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
					className="p-2 m-2 transition-all rounded-md hover:bg-gray-100"
					href={"/gender/men"}
				>
					Hombres
				</Link>
				<Link
					className="p-2 m-2 transition-all rounded-md hover:bg-gray-100"
					href={"/gender/women"}
				>
					Mujeres
				</Link>
				<Link
					className="p-2 m-2 transition-all rounded-md hover:bg-gray-100"
					href={"/gender/kid"}
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
						<span className="absolute px-1 text-xs font-bold text-white bg-blue-700 rounded-full -top-2 -right-2">
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
