'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { createUpdateProduct, deleteProductImage } from '@/actions';
import { ProductImage } from '@/components';
import clsx from 'clsx';

import type {
	Category,
	Product,
	ProductImage as ProductWithImage,
} from '@/interfaces';
import Image from 'next/image';

interface Props {
	product: Partial<Product> & { ProductImage?: ProductWithImage[] };

	categories: Category[];
}

interface FormInputs {
	title: string;
	slug: string;
	description: string;
	price: number;
	inStock: number;
	sizes: string[];
	tags: string;
	gender: 'men' | 'woman' | 'kid' | 'unisex';
	categoryId: string;

	// todo: images
	images?: FileList;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const ProductForm = ({ product, categories }: Props) => {
	const router = useRouter();

	const {
		handleSubmit,
		register,
		formState: { isValid },
		getValues,
		setValue,
		watch,
	} = useForm<FormInputs>({
		defaultValues: {
			...product,
			tags: product.tags?.join(', '),
			sizes: product.sizes ?? [],
			// ! bug: gender no es compatible
			gender: 'kid',
			images: undefined,
		},
	});

	watch('sizes');

	const onSizeChange = (size: string) => {
		const sizes = new Set(getValues('sizes'));
		sizes.has(size) ? sizes.delete(size) : sizes.add(size);
		setValue('sizes', Array.from(sizes));
	};

	const onSumit = async (data: FormInputs) => {
		const formData = new FormData();

		const { images, ...productToSave } = data;

		if (product.id) {
			formData.append('id', product.id ?? '');
		}

		formData.append('title', data.title);
		formData.append('slug', data.slug);
		formData.append('description', data.description);
		formData.append('price', data.price.toString());
		formData.append('inStock', data.inStock.toString());
		formData.append('sizes', data.sizes.toString());
		formData.append('tags', data.tags);
		formData.append('categoryId', data.categoryId);
		formData.append('gender', data.gender);

		if (images) {
			for (let i = 0; i < images.length; i++) {
				formData.append('images', images[i]);
			}
		}

		const { ok, product: updateProduct } = await createUpdateProduct(formData);

		if (!ok) {
			alert('Producto no se pudo actualizar');
			return;
		}

		router.replace(`/admin/product/${updateProduct?.slug}`);
	};

	return (
		<form
			onSubmit={handleSubmit(onSumit)}
			className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
		>
			{/* Textos */}
			<div className="w-full">
				<div className="flex flex-col mb-2">
					<span>Título</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register('title', { required: true })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Slug</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register('slug', { required: true })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Descripción</span>
					<textarea
						rows={5}
						className="p-2 border rounded-md bg-gray-200"
						{...register('description', { required: true })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Price</span>
					<input
						type="number"
						className="p-2 border rounded-md bg-gray-200"
						{...register('price', { required: true, min: 0 })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Tags</span>
					<input
						type="text"
						className="p-2 border rounded-md bg-gray-200"
						{...register('tags', { required: true })}
					/>
				</div>

				<div className="flex flex-col mb-2">
					<span>Gender</span>
					<select
						className="p-2 border rounded-md bg-gray-200"
						{...register('gender', { required: true })}
					>
						<option value="">[Seleccione]</option>
						<option value="men">Men</option>
						<option value="women">Women</option>
						<option value="kid">Kid</option>
						<option value="unisex">Unisex</option>
					</select>
				</div>

				<div className="flex flex-col mb-2">
					<span>Categoria</span>
					<select
						className="p-2 border rounded-md bg-gray-200"
						{...register('categoryId', { required: true })}
					>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</select>
				</div>

				<button className="btn-primary w-full" type="submit">
					Guardar
				</button>
			</div>

			{/* Selector de tallas y fotos */}
			<div className="w-full">
				<div className="flex flex-col mb-2">
					<span>Inventario</span>
					<input
						type="number"
						className="p-2 border rounded-md bg-gray-200"
						{...register('inStock', { required: true, min: 0 })}
					/>
				</div>

				{/* As checkboxes */}
				<div className="flex flex-col">
					<span>Tallas</span>
					<div className="flex flex-wrap">
						{sizes.map((size) => (
							// bg-blue-500 text-white <--- si está seleccionado
							<button
								key={size}
								type="button"
								onClick={() => onSizeChange(size)}
								className={clsx(
									'p-2 border rounded-md mr-2 mb-2 w-14 transition-all text-center cursor-pointer',
									{
										'bg-blue-500 text-white': getValues('sizes').includes(size),
									},
								)}
							>
								<span>{size}</span>
							</button>
						))}
					</div>

					<div className="flex flex-col mb-2">
						<span>Fotos</span>
						<input
							type="file"
							{...register('images')}
							multiple
							className="p-2 border rounded-md bg-gray-200"
							accept="image/png, image/jpeg, image/avif"
						/>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
						{product.ProductImage?.map((image) => (
							<div key={image.id}>
								<ProductImage
									alt=""
									src={image.url}
									width={300}
									height={300}
									className="rounded-t shadow-md"
								/>
								<button
									className="btn-delete w-full rounded"
									type="button"
									onClick={() => deleteProductImage(image.id, image.url)}
								>
									Eliminar
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</form>
	);
};
