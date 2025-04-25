import { validateForm } from "../lib/schema";
import { ErrorState, Recipe } from "../lib/definitions";
import { useState } from "react";
import RecipeForm from "./ui/RecipeForms/RecipeForm";
import Modal from "./ui/Modal";
import Button, { ButtonAsLink } from "./ui/Button";

function NewRecipe() {
	const [recipe, setRecipe] = useState<undefined | Recipe>(undefined);

	const [isModalOpen, setModalOpen] = useState(false);

	const initialState: ErrorState = { message: null, errors: {} };
	const [errorState, setErrorState] = useState(initialState);

	const fillForm = () => {
		const rawJson: HTMLTextAreaElement = document.querySelector('#json')!;
		const data = JSON.parse(rawJson.value);
		if(data.ingredients){
			for(const ing of data.ingredients){
				if(!ing.index) ing.index = 1;
			}
		}
		setRecipe(data);
		setModalOpen(false);
	}

	const resetForm = () => {
		setRecipe(undefined);
		setModalOpen(false);
	}

	function toggleClass () {
		document.querySelector('#json-format')?.classList.toggle('hidden');
		const button: HTMLButtonElement = document.querySelector('#json-btn')!;
		if(button.innerText == 'hide format') button.innerText = 'show format';
		else button.innerText = 'hide format';
	}

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
				<ButtonAsLink text="Autofill Recipe from JSON" onClick={() => setModalOpen(true)}/>
			</div>
			{!recipe && <RecipeForm submitHandler={newRecipe} endpoint="new" purpose="Add" errorState={errorState} />}
			{recipe && <RecipeForm recipe={recipe} defaultIsFile={!(recipe?.image)} submitHandler={newRecipe} endpoint="new" purpose="Add" errorState={errorState} />}
			<Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} hasCloseBtn={true}>
				<div className="text-left">
					<p className="sm:text-left text-center">Be sure your JSON data conforms to the following format in order to be parsed correctly
						<span className="ml-0.5">(
						<ButtonAsLink text="hide format" id="json-btn" onClick={toggleClass}/>
						)</span>:
					</p>
					<ul className="ml-3 hidden" id="json-format">
						<li>name: string</li>
						<li>image: string</li>
						<li>sections: array of strings (omit if none)</li>
						<li>ingredients: array of objects</li>
						<ul className="list-disc">
							<li className="ml-6 mb-1">amount: string</li>
							<li className="ml-6 mb-1">unit: string</li>
							<li className="ml-6 mb-1">name: string</li>
							<li className="ml-6 mb-1">notes: string</li>
							<li className="ml-6 mb-1">converted_amount: string</li>
							<li className="ml-6 mb-1">converted_unit: string</li>
							<li className="ml-6 mb-1">section: number</li>
						</ul>
						<li>instructions: array of strings</li>
						<li>servings: number</li>
						<li>url: string</li>
					</ul>
				</div>
				<h1 className="text-xl mb-1">Paste JSON Here:</h1>
                <textarea className="border rounded p-1 w-full" rows={12} name="json" id="json"></textarea>
				<Button text="Fill Form" customClass="w-3/5" onClick={fillForm}/>
				<Button text="Reset Form" customClass="w-3/5" onClick={resetForm}/>
				<div className="sm:text-left mb-2">Note: If making changes to previously submitted JSON, first reset the form contents.</div>
            </Modal>
		</div>
	);
}

export default NewRecipe;
