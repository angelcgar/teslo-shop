// [1,2,3,4...20]
export const generatePagination = (currentPage: number, totalPage: number) => {
	// si el numero total de paginas es 7 o menos
	// mostramos todas las paginas
	if (totalPage <= 7) {
		return Array.from({ length: totalPage }, (_, i) => i + 1);
	}

	// si la pagina actual esta entre las primeras tres paginas
	// mostramos las primeras tres y las ultimas dos
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPage - 1, totalPage];
	}

	// si la pagina actual esta entre las ultimas
	// mostramos la primeras dos,puntos sustencivos, las ultimas dos
	if (currentPage >= totalPage - 2) {
		return [1, 2, "...", totalPage - 2, totalPage - 1, totalPage];
	}
	// si la pagina esta en otro lugar
	// mostrar primera pagina, puntos suspencivos, pagina actual y vecinos
	return [
		1,
		"...",
		currentPage - 1,
		currentPage,
		currentPage + 1,
		"...",
		totalPage,
	];
};
