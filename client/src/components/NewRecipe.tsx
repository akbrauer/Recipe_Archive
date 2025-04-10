import { ErrorState, validateForm } from "../lib/schema";
import { useState } from "react";
import RecipeForm from "./RecipeForm";

function NewRecipe () {
    const initialState: ErrorState = { message: null, errors: {}};
        const [errorState, setErrorState] = useState(initialState);
        console.log(errorState);
    
        async function newRecipe(event: React.FormEvent<HTMLFormElement>) {
            //Validate Form Using Zod
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            console.log(typeof(formData.get('thumbnail')));
            const errors = validateForm(formData);
            if(!errors){
                console.log("RECIPE UPDATED!");
                event.currentTarget.submit();
            } else {
                setErrorState(errors);
            }
        }

    return(
        <div className="mx-20">
            <h1 className='text-center text-4xl'>New Recipe</h1>
            <RecipeForm submitHandler={newRecipe} endpoint="new" purpose="Add" errorState={errorState}/>
        </div>
    )
}

export default NewRecipe;