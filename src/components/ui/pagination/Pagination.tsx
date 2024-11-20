"use client";

import { generatePagination } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
	totalPage: number;
}

export const Pagination = ({ totalPage }: Props) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const pageString = searchParams.get("page") ?? 1;
	const currentPage = Number.isNaN(+pageString) ? 1 : +pageString;

	if (currentPage < 1 || Number.isNaN(+pageString)) {
		redirect(pathname);
	}

	const allPages = generatePagination(currentPage, totalPage);

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

					{allPages.map((page, i) => (
						<li className="page-item" key={`${page}-${1}`}>
							<a
								className={clsx(
									"page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
									{
										"bg-blue-600 shadow-sm text-white hover:bg-blue-700 hover:text-white":
											page === currentPage,
									},
								)}
								href={createPageUrl(page)}
							>
								{page}
							</a>
						</li>
					))}

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
