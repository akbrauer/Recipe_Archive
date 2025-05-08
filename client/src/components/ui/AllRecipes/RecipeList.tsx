import RecipeCard from "./RecipeCard";
import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import Pagination from "./Pagination";
import RecipeListSkeleton from "../../Skeletons/RecipeListSkeleton";

function RecipeList() {
	console.log("RECIPE PAGE");
	const [currentPage, setCurrentPage] = useState(1);

	const query = `?page=${currentPage}`;
	const data = useFetch(`/api/recipes${query}`);

	const recipes = data.recipes;
	const totalCount = data.recipeCount;

	const changePage = (newPage: number) => {
		setCurrentPage(newPage);
	};

	if(!recipes){
		console.log("NO DATA");
		return <RecipeListSkeleton />
	}

	return (
		<div>
			<div className="grid grid-cols-3 lg:gap-4 sm:gap-2 gap-1">
				{recipes?.map((rec, i) => {
					return <RecipeCard recipe={rec} key={i} />;
				})}
			</div>
			<Pagination currentPage={currentPage} totalCount={totalCount!} items_per_page={9} onPageChange={changePage} />
		</div>
	);
}

export default RecipeList;
