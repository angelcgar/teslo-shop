'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type {
	CreateOrderData,
	CreateOrderActions,
	OnApproveData,
	OnApproveActions,
} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
	orderId: string;
	amount: number;
}

export default function PayPalButton({ amount, orderId }: Props) {
	const [{ isPending }] = usePayPalScriptReducer();

	const roundedAmount = Math.round(amount * 100) / 100;

	if (isPending) {
		return (
			<div className="animate-pulse mb-16">
				<div className="h-11 bg-gray-300 rounded" />
				<div className="h-11 bg-gray-300 rounded mt-2" />
			</div>
		);
	}

	const createOrder = async (
		data: CreateOrderData,
		actions: CreateOrderActions,
	): Promise<string> => {
		const transactionId = await actions.order.create({
			intent: 'CAPTURE',
			purchase_units: [
				{
					invoice_id: orderId,
					amount: {
						value: `${roundedAmount}`,
						currency_code: 'USD',
					},
				},
			],
		});

		// console.log({ transactionId });
		// TODO; guardar el ID en la base de datos
		const { ok } = await setTransactionId(transactionId, orderId);

		if (!ok) {
			throw new Error('No se pudo actualizar la orden');
		}

		return transactionId;
	};

	const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
		const details = await actions.order?.capture();
		if (!details) return;

		await paypalCheckPayment(details.id ?? '');
	};

	return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
}
