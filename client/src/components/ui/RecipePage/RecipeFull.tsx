import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button, { LinkButton, SubmitButton } from "../Button"
import IngredientList from "./IngredientList";
import Modal from "../Modal";
import RecipeFullSkeleton from "../../Skeletons/RecipeFullSkeleton";

function RecipeFull () {
    const { id } = useParams();
    const data = useFetch(`/api/recipes/${id}`);
    const recipe = data.recipes?.[0];
    console.log(recipe);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    
    if(!recipe){
        return <RecipeFullSkeleton />
    }
    return (
        <div className="m-auto border rounded-lg">
            <img src={recipe?.image} className="w-full rounded-t-lg" alt="recipe image"/>
            <div className="card-header border-t border-b text-2xl ">
                <h3 className="px-3 py-5">{recipe?.name}</h3>
            </div>
            <div className="card-body">
                <div className="card-ingredients border-b p-2">
                    <h5 className="text-xl font-medium mb-1">Ingredients</h5>
                    <IngredientList ingredients={recipe?.ingredients} sections={recipe?.sections}/>
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
                <a href={recipe?.url} className="underline text-blue-600 visited:text-purple-600 text-lg font-medium pl-2 my-auto">Full Recipe</a>
                <div className="flex">
                    <LinkButton text="Edit Recipe" href={`/recipes/${recipe?.recipeid}/edit`} customClass="mr-2 bg-yellow-500"/>
                    <Button text="Delete Recipe" customClass="bg-red-500" onClick={() => setModalOpen(true)} />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} hasCloseBtn={true}>
                <h1 className="text-xl mb-3">Are you sure you want to delete this recipe?</h1>
                <form action={`/api/recipes/${recipe?.recipeid}/delete`} method="POST">
                    <SubmitButton text="Delete Recipe" customClass="bg-red-500 mb-3 w-1/2" />
                </form>
            </Modal>
        </div>
    )
}

export default RecipeFull;