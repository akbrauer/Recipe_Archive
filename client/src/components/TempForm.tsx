import FormField, { FormFileInput } from "./ui/FormField";
import FormIngredients from "./FormIngredients";
import FormInstructions from "./FormInstructions";
import InputGroup from "./ui/InputGroup";
import { SubmitButton } from "./ui/Button";
import { FC } from "react";

const TempForm: FC<{title: string}> = ({title}) => {
    return(
        <div className="mx-20">
            <h1 className='text-center text-4xl'>{title} Recipe</h1>
            <form className="border p-2" action="">
                <FormField id="RecipeName" label="Recipe Name"  type="text" name="recipe[name]"/>
                <FormFileInput id="image" label="Recipe Image" name="thumbnail"/>
                <FormIngredients errorState={{message: null, errors: {}}}/>
                <FormInstructions errorState={{message: null, errors: {}}}/>
                <InputGroup id="servings" label="Servings"  type="number" name="recipe[servings]" width="w-15 text-center"/>
                <FormField id="url" label="Recipe Link" type="text" name="recipe[url]"/>
                <SubmitButton text="Update Recipe" />
            </form>
        </div>
        )
};

export default TempForm;