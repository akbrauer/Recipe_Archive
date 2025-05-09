import Button, { LinkButton } from "../ui/Button";

const RecipeFullSkeleton = () => {
    
    
    return (
<div className="m-auto border rounded-lg">
            <div className="w-full aspect-square rounded-t-lg bg-gray-200 animate-pulse"></div>
            <div className="card-header border-t border-b text-2xl">
            <div className="my-5 ml-3 w-8/10 h-8 border rounded-2xl animate-pulse bg-gray-200"></div>
                {/* <h3 className=" px-3 py-5">Name</h3> */}
            </div>
            <div className="card-body">
                <div className="card-ingredients border-b p-2">
                    <h5 className="text-xl font-medium mb-1">Ingredients</h5>
                    <ul>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                        <li className="my-2 animate-pulse bg-gray-200 sm:w-2/5 w-9/10 border rounded-2xl h-6"></li>
                    </ul>
                    {/* <IngredientList ingredients={recipe?.ingredients} sections={recipe?.sections}/> */}
                </div>
                <div className="card-instructions border-b p-2">
                    <h5 className="text-xl font-medium mb-1">Steps</h5>
                    <ul>
                        <li className="my-2 sm:w-3/4 w-full h-12 border rounded-xl animate-pulse bg-gray-200"></li>
                        <li className="my-2 sm:w-3/4 w-full h-12 border rounded-xl animate-pulse bg-gray-200"></li>
                        <li className="my-2 sm:w-3/4 w-full h-12 border rounded-xl animate-pulse bg-gray-200"></li>
                    </ul>
                </div>
            </div>
            <div className="card-footer p-2 flex justify-between">
                <a className="underline text-blue-600 visited:text-purple-600 text-lg font-medium pl-2 my-auto">Full Recipe</a>
                <div className="flex">
                    <LinkButton text="Edit Recipe" customClass="mr-2 bg-yellow-500"/>
                    <Button text="Delete Recipe" customClass="bg-red-500" />
                </div>
            </div>
        </div>
    )
}

export default RecipeFullSkeleton;