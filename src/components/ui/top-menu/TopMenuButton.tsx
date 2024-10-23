"use client";

import { useStore } from "@/store";

export const TopMenuButton = () => {
	const openMenu = useStore((state) => state.openSideMenu);

	return (
		<button
			onClick={() => openMenu()}
			className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
			type="button"
		>
			Menu
		</button>
	);
};
