import Pagination from "../ui/AllRecipes/Pagination";

function RecipeListSkeleton() {
  const arr = [...Array(9)];
	return (
		<div>
			<div className="grid grid-cols-3 lg:gap-4 sm:gap-2 gap-1">
				{arr.map((_, i) => {
          console.log(i);
					return (
            <a className="border rounded-lg bg-gray-200" key={i}>
              <img className="rounded-t-lg w-full aspect-square animate-pulse bg-gray-200"/>
              <div className="">
                <div className="my-1 mx-auto w-8/10 h-7 border rounded-2xl bg-gray-200 animate-pulse"></div>
                <div className="my-1 mx-auto w-8/10 h-7 border rounded-2xl bg-gray-200 animate-pulse"></div>
              </div>
            </a>
          );
				})}
			</div>
			<Pagination currentPage={1} totalCount={56} items_per_page={9} onPageChange={() => console.log("WHAT?")}/>
		</div>
	);
}

export default RecipeListSkeleton;
