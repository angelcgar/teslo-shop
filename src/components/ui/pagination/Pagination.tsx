"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
	totalPage: number;
}

export const Pagination = ({ totalPage }: Props) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page") ?? 1);

	const createPageUrl = (page: number | string) => {
		const param = new URLSearchParams(searchParams);
		if (page === "...") {
			return `${pathname}?${param.toString()}`;
		}
		if (+page <= 0) {
			return `${pathname}`;
		}
		if (+page > totalPage) {
			return `${pathname}?${param.toString()}`;
		}
		param.set("page", page.toString());
		return `${pathname}?${param.toString()}`;
	};

	return (
		<div className="flex justify-center mt-10 mb-12 text-center">
			<nav aria-label="Page navigation example">
				<ul className="flex list-style-none">
					<li className="page-item ">
						<Link
							className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
							href={createPageUrl(currentPage - 1)}
						>
							<IoChevronBackOutline size={30} />
						</Link>
					</li>
					<li className="page-item">
						<a
							className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
							href="/"
						>
							1
						</a>
					</li>
					<li className="page-item active">
						<a
							className="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300  text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
							href="/"
						>
							2 <span className="visually-hidden" />
						</a>
					</li>
					<li className="page-item">
						<a
							className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
							href="/"
						>
							3
						</a>
					</li>
					<li className="page-item">
						<Link
							className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
							href={createPageUrl(currentPage + 1)}
						>
							<IoChevronForwardOutline size={30} />
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
