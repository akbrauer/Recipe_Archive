import FormField, { CustomFileInput } from "./ui/FormField";
import FormIngredients from "./FormIngredients";
import FormInstructions from "./FormInstructions";
import InputGroup from "./ui/InputGroup";
import { SubmitButton } from "./ui/Button";
import { ErrorState } from "../lib/schema";
import { Recipe } from "../lib/definitions";

import { EventHandler } from 'react';

interface Props {
    submitHandler: EventHandler<React.FormEvent<HTMLFormElement>>;
    endpoint: string;
    purpose: string;
    errorState: ErrorState;
    defaultIsFile?: boolean;
    recipe?: Recipe;
}

const RecipeForm = ({submitHandler, endpoint, purpose, errorState, defaultIsFile = true, recipe}: Props) => {
    
    
    return (
        <form className="border p-2" method="POST" action={`/api/recipes/${endpoint}`} encType="multipart/form-data" onSubmit={submitHandler}>
            <FormField id="RecipeName" label="Recipe Name" name="recipe[name]" defaultValue={recipe?.name}/>
            {errorState?.errors?.name && <div>{errorState.errors?.name[0]?.message}</div>}
            <CustomFileInput id="thumbnail" label="Recipe Image" name="thumbnail" defaultIsFile={defaultIsFile} defaultValue={recipe?.image}/>
            {errorState?.errors?.thumbnailFile && <div>{errorState.errors?.thumbnailFile[0]?.message}</div>}
            {errorState?.errors?.thumbnailUrl && <div>{errorState.errors?.thumbnailUrl[0]?.message}</div>}
            <FormIngredients ingredientState={recipe?.ingredients} errorState={ errorState }/>
            <FormInstructions instructionState={recipe?.instructions} errorState={ errorState }/>
            <InputGroup id="servings" label="Servings"  type="number" name="recipe[servings]" width="w-15 text-center" defaultValue={recipe?.servings}/>
            {errorState?.errors?.servings && <div>{errorState.errors?.servings[0]?.message}</div>}
            <FormField id="url" label="Recipe Link" type="text" name="recipe[url]" defaultValue={recipe?.url}/>
            {errorState?.errors?.url && <div>{errorState.errors?.url[0]?.message}</div>}
            {recipe && <input className="border rounded mt-1 p-1 block w-full" id="numIng" name="numIng" defaultValue={recipe?.ingredients?.length}></input>}
            <SubmitButton text={`${purpose} Recipe`} />
        </form>)
}

export default RecipeForm;