import { validateForm, ErrorState } from "../lib/schema";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RecipeForm from "./RecipeForm";
import TempForm from "./TempForm";

function EditRecipe () {
    const { id } = useParams();
    const initialErrorState: ErrorState = { message: null, errors: {}};
    const [errorState, setErrorState] = useState(initialErrorState);
    console.log(errorState);

    const data = useFetch(`/api/recipes/${id}`);
    const recipe = data.recipes?.[0];

    const ingredientCount = recipe?.ingredients?.length;
    console.log(ingredientCount);

    console.log(recipe);

    if(!recipe){
        return (
            <TempForm title="Edit"/>
        )
    }

    async function editRecipe(event: React.FormEvent<HTMLFormElement>) {
        //Validate Form Using Zod
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const errors = validateForm(formData);
        if(!errors){
            console.log("RECIPE UPDATED!");
            event.currentTarget.submit();
            return "Success";
        } else {
            setErrorState(errors);
            return "Failure";
        }
    }

    return(
        <div className="mx-20">
            <h1 className='text-center text-4xl'>Edit Recipe</h1>
            <RecipeForm submitHandler={editRecipe} endpoint={`${id}/edit`} purpose="Update" errorState={errorState} defaultIsFile={false} recipe={recipe}/>
        </div>
    )
}

export default EditRecipe;