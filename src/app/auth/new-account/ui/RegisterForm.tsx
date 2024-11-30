'use client';

import { login, registerUser } from '@/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { type SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
	name: string;
	email: string;
	password: string;
};

export const RegisterForm = () => {
	const router = useRouter();

	const [errorMessge, setErrorMessge] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInputs>();

	const onSumit: SubmitHandler<FormInputs> = async (data) => {
		const { email, name, password } = data;
		// server action
		const resp = await registerUser({ email, name, password });

		if (!resp.ok) {
			setErrorMessge(resp.message);
			return;
		}

		await login(email.toLowerCase(), password);
		window.location.replace('/');
	};

	return (
		<form onSubmit={handleSubmit(onSumit)} className="flex flex-col">
			{/* {errors.name?.type === 'required' && (
				<span className="text-red-500">Nombre es requirido</span>
			)} */}

			<label htmlFor="email">Nombre completo</label>
			<input
				className={clsx('px-5 py-2 mb-5 bg-gray-200 border rounded', {
					'border-red-500': errors.name,
				})}
				type="text"
				// biome-ignore lint/a11y/noAutofocus: <explanation>
				autoFocus
				{...register('name', { required: true })}
			/>

			<label htmlFor="email">Correo electrónico</label>
			<input
				className={clsx('px-5 py-2 mb-5 bg-gray-200 border rounded', {
					'border-red-500': errors.email,
				})}
				type="email"
				{...register('email', {
					required: true,
					pattern:
						/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
				})}
			/>

			<label htmlFor="email">Contraseña</label>
			<input
				className={clsx('px-5 py-2 mb-5 bg-gray-200 border rounded', {
					'border-red-500': errors.password,
				})}
				type="password"
				{...register('password', { required: true })}
			/>

			<span className="text-red-500">{errorMessge}</span>

			<button className="btn-primary" type="submit">
				Crear cuenta
			</button>

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500" />
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500" />
			</div>

			<Link href="/auth/login" className="text-center btn-secondary">
				Ingresar
			</Link>
		</form>
	);
};
