import FormField, { CustomFileInput } from "../ui/RecipeForms/FormField";
import IngredientPanel from "../ui/RecipeForms/IngredientPanel";
import InstructionInput from "../ui/RecipeForms/InstructionInput";
import InputGroup from "../ui/RecipeForms/InputGroup";
import { ButtonAsLink, SubmitButton } from "../ui/Button";
interface Props {
	title: string;
}

const TempForm = ({ title }: Props) => {
	return (
		<div className="lg:mx-20 md:mx-3 mx-1">
			<h1 className="text-center text-4xl">{title} Recipe</h1>
			<form className="border p-2">
				<FormField id="RecipeName" label="Recipe Name" type="text" name="recipe[name]" />
				<CustomFileInput id="image" label="Recipe Image" name="thumbnail" defaultIsFile={false}/>
				<div>
					<h3 className="text-xl mb-1 mt-4">Recipe Ingredients</h3>
					<h4 className="text-lg italic">Options:</h4>
						<ul className="ml-5 list-disc" id="options">
							<li>
								<ButtonAsLink text="Break Ingredients Up Into Sections"/>
								<span> (E.g. Sauce, Side, Main etc.)</span>
							</li>
							<li className="mt-1 mb-3">
								<ButtonAsLink text={"Add Unit Conversions"} />
							</li>
						</ul>
						<div className="p-1 my-2">
							<IngredientPanel ingredientState={ Array(6)} useConversion={false}  />
						</div>
				</div>
				<InstructionInput instructionState={ Array(3) } />
				<InputGroup id="servings" label="Servings" type="number" name="recipe[servings]" width="w-15 text-center" />
				<FormField id="url" label="Recipe Link" type="text" name="recipe[url]" />
				<SubmitButton text="Update Recipe" />
			</form>
		</div>
	);
};

export default TempForm;
