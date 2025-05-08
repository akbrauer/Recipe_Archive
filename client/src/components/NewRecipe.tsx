import { validateForm } from "../lib/schema";
import { ErrorState, Recipe } from "../lib/definitions";
import { useState } from "react";
import RecipeForm from "./ui/RecipeForms/RecipeForm";
import Modal from "./ui/Modal";
import { ButtonAsLink } from "./ui/Button";
import JsonModal from "./ui/RecipeForms/JsonModal";

function NewRecipe() {
	const [recipe, setRecipe] = useState<undefined | Recipe>(undefined);

	const [isModalOpen, setModalOpen] = useState(false);

	const initialState: ErrorState = { message: null, errors: {} };
	const [errorState, setErrorState] = useState(initialState);

	const fillForm = () => {
		const rawJson: HTMLTextAreaElement = document.querySelector("#json")!;
		const data = JSON.parse(rawJson.value);
		if (data.ingredients) {
			for (const ing of data.ingredients) {
				if (!ing.index) ing.index = 1;
			}
		}
		setRecipe(data);
		setModalOpen(false);
	};

	const resetForm = () => {
		setRecipe(undefined);
		setModalOpen(false);
	};

	async function newRecipe(event: React.FormEvent<HTMLFormElement>) {
		//Validate Form Using Zod
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const errors = validateForm(formData);
		if (!errors) {
			console.log("RECIPE UPDATED!");
			event.currentTarget.submit();
		} else {
			setErrorState(errors);
		}
	}

	return (
		<div className="lg:mx-20 md:mx-3 mx-1">
			<h1 className="text-center text-4xl">New Recipe</h1>
			<div className="border flex justify-between">
				<ButtonAsLink text="Fill Recipe from JSON" onClick={() => setModalOpen(true)} />
			</div>
			{!recipe && <RecipeForm submitHandler={newRecipe} endpoint="new" purpose="Add" errorState={errorState} />}
			{recipe && (
				<RecipeForm recipe={recipe} defaultIsFile={!recipe?.image} submitHandler={newRecipe} endpoint="new" purpose="Add" errorState={errorState} />
			)}
			<Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} hasCloseBtn={true}>
				<JsonModal formFiller={fillForm} formResetter={resetForm} />
			</Modal>
		</div>
	);
}

export default NewRecipe;
