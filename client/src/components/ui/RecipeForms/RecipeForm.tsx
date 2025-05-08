import FormField, { CustomFileInput } from "./FormField";
import InstructionInput from "./InstructionInput";
import InputGroup from "./InputGroup";
import { SubmitButton } from "../Button";
import { ErrorState } from "../../../lib/definitions";
import { Recipe } from "../../../lib/definitions";
import IngredientSection from "./IngredientSection";
import { EventHandler } from "react";

interface Props {
	submitHandler: EventHandler<React.FormEvent<HTMLFormElement>>;
	endpoint: string;
	purpose: string;
	errorState: ErrorState;
	defaultIsFile?: boolean;
	recipe?: Recipe;
}

const RecipeForm = ({ submitHandler, endpoint, purpose, errorState, defaultIsFile = true, recipe }: Props) => {
	const errors = errorState?.errors;
	return (
		<form className="border p-2" method="POST" action={`/api/recipes/${endpoint}`} encType="multipart/form-data" onSubmit={submitHandler}>
			<FormField id="RecipeName" label="Recipe Name" name="recipe[name]" defaultValue={recipe?.name} />
			{errors?.name && <div>{errors?.name[0]?.message}</div>}

			<CustomFileInput id="thumbnail" label="Recipe Image" name="thumbnail" defaultIsFile={defaultIsFile} defaultValue={recipe?.image} />
			{errors?.thumbnailFile && <div>{errors?.thumbnailFile[0]?.message}</div>}
			{errors?.thumbnailUrl && <div>{errors?.thumbnailUrl[0]?.message}</div>}

			<IngredientSection ingredientState={{ingredients: recipe?.ingredients, sections: recipe?.sections}} ingErrors={{ sections: errors?.sections, ingredients: errors?.ingredients }} />

			<InstructionInput instructionState={recipe?.instructions} instErrors={errors?.instructions} />

			<InputGroup id="servings" label="Servings" type="number" name="recipe[servings]" width="w-15 text-center" defaultValue={recipe?.servings} />
			{errors?.servings && <div>{errors?.servings[0]?.message}</div>}

			<FormField id="url" label="Recipe Link" type="text" name="recipe[url]" defaultValue={recipe?.url} />
			{errors?.url && <div>{errors?.url[0]?.message}</div>}

			{recipe?.sections ?
				recipe.sections.map((section, sectionNum) => {
					const sectionIngredients = recipe.ingredients.filter((ing) => {
						if(ing.section === (sectionNum + 1)){
							return ing;
						}
					})
					return (
							<input
							className="hidden"
							id={`section-${sectionNum}-ingNum`}
							name="numIng"
							type="number"
							defaultValue={sectionIngredients.length}
							key={sectionNum}
						></input>)
			})
			: (recipe && (
				<input
				className="hidden"
				id="numIng"
				name="numIng"
				type="number"
				defaultValue={recipe?.ingredients?.length}
			></input>))
			}
			<SubmitButton customClass="mt-2 bg-green-500" text={`${purpose} Recipe`} />
		</form>
	);
};

export default RecipeForm;
