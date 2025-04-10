import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { LinkButton } from "./ui/Button";

function RecipeFull () {
    const { id } = useParams();
    const data = useFetch(`/api/recipes/${id}`);
    const recipe = data.recipes?.[0];
    console.log(recipe);
    return (
        <div className="m-auto border rounded-lg">
            <img src={recipe?.image} className="w-full rounded-t-lg" alt="recipe image"/>
            <div className="card-header">
                <h3 className="border-t border-b text-2xl px-3 py-5">{recipe?.name}</h3>
            </div>
            <div className="card-body">
                <div className="card-ingredients border-b p-2">
                    <h5 className="text-xl font-medium mb-1">Ingredients</h5>
                    <ul className="list-disc">
                        {recipe?.ingredients?.map((ing, i) => {
                            return <li className="ml-6 mb-1" key={"ingredient-" + i}>
                                {ing.amount} {ing.unit} <span className="font-bold">{ing.name}</span> {ing.notes && <em>{ing.notes}</em>}
                            </li>
                        })}
                    </ul>
                </div>
                <div className="card-instructions border-b p-2">
                    <h5 className="text-xl font-medium mb-1">Steps</h5>
                    <ol className="list-decimal">
                        {recipe?.instructions.map((ins, i) => {
                            return <li className="ml-6 mb-1" key={"step-" + i}>{ins}</li>
                        })}
                    </ol>
                </div>
            </div>
            <div className="card-footer p-2 flex justify-between">
                <a href={recipe?.url} className="underline text-blue-600 visited:text-purple-600 text-lg font-medium pl-2">Full Recipe</a>
                <div>
                    <LinkButton text="Edit Recipe" href={`/recipes/${recipe?.recipeid}/edit`} customClass="mr-2"/>
                    <LinkButton text="Delete Recipe" customClass="bg-red-500"/>
                </div>
                
            </div>
        </div>
    )
}

export default RecipeFull;