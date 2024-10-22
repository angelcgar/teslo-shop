export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="bg-gray-400 min-h-screen">{children}</main>;
}
