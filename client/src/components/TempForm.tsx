import FormField, { FormFileInput } from "./ui/RecipeForms/FormField";
import IngredientPanel from "./ui/RecipeForms/IngredientPanel";
import InstructionInput from "./ui/RecipeForms/InstructionInput";
import InputGroup from "./ui/RecipeForms/InputGroup";
import { SubmitButton } from "./ui/Button";

interface Props {
	title: string;
}

const TempForm = ({ title }: Props) => {
	return (
		<div className="mx-20">
			<h1 className="text-center text-4xl">{title} Recipe</h1>
			<form className="border p-2" action="">
				<FormField id="RecipeName" label="Recipe Name" type="text" name="recipe[name]" />
				<FormFileInput id="image" label="Recipe Image" name="thumbnail" />
				<IngredientPanel />
				<InstructionInput />
				<InputGroup id="servings" label="Servings" type="number" name="recipe[servings]" width="w-15 text-center" />
				<FormField id="url" label="Recipe Link" type="text" name="recipe[url]" />
				<SubmitButton text="Update Recipe" />
			</form>
		</div>
	);
};

export default TempForm;
