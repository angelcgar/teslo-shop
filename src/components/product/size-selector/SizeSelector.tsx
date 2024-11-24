import clsx from 'clsx';
import React from 'react';
import type { Size } from '@/interfaces';

interface Props {
	selecterSize: Size;
	availableSizes: Size[];

	onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({
	availableSizes,
	selecterSize,
	onSizeChanged,
}: Props) => {
	// console.log('===============>');
	// console.log(availableSizes);

	return (
		<div className="my-5">
			<h3 className="font-bold mb-4">Tallas disponibles</h3>

			<div className="flex">
				{availableSizes.map((size) => (
					<button
						key={size}
						onClick={() => onSizeChanged}
						className={clsx('mx-2 hover:underline text-lg', {
							underline: size === selecterSize,
						})}
						type="button"
					>
						asasssss
					</button>
				))}
			</div>
		</div>
	);
};
