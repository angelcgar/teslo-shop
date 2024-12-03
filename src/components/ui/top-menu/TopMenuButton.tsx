'use client';

import { useUIStore } from '@/store';

export const TopMenuButton = () => {
	const openMenu = useUIStore((state) => state.openSideMenu);

	return (
		<button
			onClick={() => openMenu()}
			className="p-2 m-2 transition-all rounded-md hover:bg-gray-100"
			type="button"
		>
			Menu
		</button>
	);
};
