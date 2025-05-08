import { usePagination } from "../../../hooks/usePagination";

interface PageProps {
	currentPage: number;
	totalCount: number;
	items_per_page: number;
	onPageChange: (currentPage: number) => void;
}

const Pagination = ({ currentPage, totalCount, items_per_page, onPageChange }: PageProps) => {
	const paginationRange = usePagination({ currentPage, totalCount, items_per_page });
	let lastPage = 1;
	if(paginationRange){
		if (currentPage === 0 || paginationRange.length < 2) {
			return null;
		}
		lastPage = Number(paginationRange[paginationRange.length - 1]);
	}

	

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	

	return (
		<ul className="flex justify-between sm:w-2/3 md:w-1/2 mx-auto">
			{currentPage > 1 ? (
				<li className="text-blue-600 visited:text-purple-600 font-medium text-lg cursor-pointer" key="arrow-left" onClick={onPrevious} tabIndex={0}>
					&lt;
				</li>
			) : (
				<li className="text-gray-500 font-medium text-lg" tabIndex={0}>
					&lt;
				</li>
			)}

			{paginationRange?.map(pageNumber => {
				if (pageNumber === "DOTS") {
					return <li className="font-medium text-lg">&#8230;</li>;
				}
				return (
					<li
						className={
							currentPage === pageNumber
								? "underline text-blue-600 visited:text-purple-600 font-medium text-lg cursor-pointer"
								: "text-blue-600 visited:text-purple-600 font-medium text-lg cursor-pointer"
						}
						key={pageNumber}
						onClick={() => onPageChange(Number(pageNumber))}
						tabIndex={0}
					>
						{pageNumber}
					</li>
				);
			})}
			{currentPage < lastPage ? (
				<li className="text-blue-600 visited:text-purple-600 font-medium text-lg cursor-pointer" key="arrow-left" onClick={onNext} tabIndex={0}>
					&gt;
				</li>
			) : (
				<li className="text-gray-500 font-medium text-lg" tabIndex={0}>
					&gt;
				</li>
			)}
		</ul>
	);
};

export default Pagination;
