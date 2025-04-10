import { FC, useState } from "react";
import IngredientInput from "./IngredientInput";
import Button from "./ui/Button";
import { ErrorState } from "../lib/schema";
import { Ingredient } from "../lib/definitions";

const FormIngredients: FC<{ ingredientState?: Ingredient[], errorState: ErrorState }> = ({ ingredientState, errorState }) => {
    const initialIngredients = ingredientState ? ingredientState.length : 1;
    const [ingredients, setIngredients] = useState(initialIngredients);
    const ingErrorState = errorState.errors?.ingredients;

    const addIng = () => {
        setIngredients(ingredients + 1);
    }

    return (
        <div>
            <h3 className="text-xl mb-2">Recipe Ingredients</h3>
            {[...Array(ingredients)].map((ing, i) => {
                ing = i + 1;
                if(ingErrorState){
                    let errorMsg = '';
                    for(const error of ingErrorState){
                        if(error?.path === i){
                            errorMsg = error.message;
                        }
                    }
                    return <IngredientInput ingNum={ ing } ingredient={ingredientState && ingredientState[i]} isError={errorMsg} key={ ing }/>
                } else {
                    return <IngredientInput ingNum={ ing } ingredient={ingredientState && ingredientState[i]} key={ ing }/>
                }
            })}
            <Button text={ "Add Ingredient" } type="button" onClick={ addIng }/>
        </div>
    )
}

export default FormIngredients;