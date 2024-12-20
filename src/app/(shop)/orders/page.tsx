// https://tailwindcomponents.com/component/hoverable-table
import { getOrderByUser } from '@/actions';
import { Title } from '@/components';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {
	const { ok, order = [] } = await getOrderByUser();

	if (!ok) {
		redirect('/auth/login');
	}

	return (
		<>
			<Title title="Orders" />

			<div className="mb-10">
				<table className="min-w-full">
					<thead className="bg-gray-200 border-b">
						<tr>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
							>
								#ID
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
							>
								Nombre completo
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
							>
								Estado
							</th>
							<th
								scope="col"
								className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
							>
								Opciones
							</th>
						</tr>
					</thead>
					<tbody>
						{order.map((orde) => (
							<tr
								key={orde.id}
								className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
							>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									{orde.id.split('-').at(-1)}
								</td>
								<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{orde.OrderAddress?.firstName} {orde.OrderAddress?.lastName}
								</td>
								<td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
									{orde.isPaid ? (
										<>
											<IoCardOutline className="text-green-800" />
											<span className="mx-2 text-green-800">Pagada</span>
										</>
									) : (
										<>
											<IoCardOutline className="text-red-800" />
											<span className="mx-2 text-red-800">No Pagada</span>
										</>
									)}
								</td>
								<td className="text-sm text-gray-900 font-light px-6 ">
									<Link href={`/orders/${orde.id}`} className="hover:underline">
										Ver orden
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
