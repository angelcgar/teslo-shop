import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AdmindLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	if (session?.user.role !== 'admin') {
		redirect('/login');
	}

	console.log('hola administrador');

	return <>{children}</>;
}
