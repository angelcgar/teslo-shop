// https://tailwindcomponents.com/component/hoverable-table
import {
	getOrderByUser,
	getPaginatedOrders,
	getPaginaterUsers,
} from '@/actions';
import { Pagination, Title } from '@/components';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import UsersTable from './ui/UsersTable';

export default async function OrdersPage() {
	const { ok, users } = await getPaginaterUsers();

	if (!ok) {
		redirect('/auth/login');
	}

	return (
		<>
			<Title title="Mantenimiento de usuarios" />

			<div className="mb-10">
				<UsersTable users={users!} />

				<Pagination totalPages={1} />
			</div>
		</>
	);
}
