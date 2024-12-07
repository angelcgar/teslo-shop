'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { IoInformationOutline } from 'react-icons/io5';
import clsx from 'clsx';

import { authenticate } from '@/actions';

export const LoginForm = () => {
	// const router = useRouter();
	const [state, dispatch] = useFormState(authenticate, undefined);

	console.log(state);

	useEffect(() => {
		if (state === 'Success') {
			// redireccionar
			// router.replace('/');
			window.location.replace('/');
		}
	}, [state]);

	return (
		<form action={dispatch} className="flex flex-col">
			<label htmlFor="email">Correo electrónico</label>
			<input
				className="px-5 py-2 mb-5 bg-gray-200 border rounded"
				type="email"
				name="email"
			/>

			<label htmlFor="email">Contraseña</label>
			<input
				className="px-5 py-2 mb-5 bg-gray-200 border rounded"
				type="password"
				name="password"
			/>

			<div
				className="flex items-end h-8 space-x-1"
				aria-live="polite"
				aria-atomic="true"
			>
				{state === 'Invalid credentials.' && (
					<div className="flex flex-row mb-2">
						<IoInformationOutline className="w-5 h-5 text-red-500" />
						<p className="text-sm text-red-500">
							Credenciales no son correctas
						</p>
					</div>
				)}
			</div>

			<LoginButton />
			{/* <button type="submit" className="btn-primary">
        Ingresar
      </button> */}

			{/* divisor l ine */}
			<div className="flex items-center my-5">
				<div className="flex-1 border-t border-gray-500" />
				<div className="px-2 text-gray-800">O</div>
				<div className="flex-1 border-t border-gray-500" />
			</div>

			<Link href="/auth/new-account" className="text-center btn-secondary">
				Crear una nueva cuenta
			</Link>
		</form>
	);
};

function LoginButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className={clsx({
				'btn-primary': !pending,
				'btn-disabled': pending,
			})}
			disabled={pending}
		>
			Ingresar
		</button>
	);
}
