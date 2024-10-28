import { SideBar, TopMenu } from "@/components";

import { Footer } from "@/components/index";

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="min-h-screen">
			{" "}
			<TopMenu />
			<SideBar />
			<div className="px-0 sm:px-5">{children}</div>
			<Footer />
		</main>
	);
}
