import { useState } from "react";
import IngredientInput from "./IngredientInput";
import Button from "../Button";
import { ErrorDescription } from "../../../lib/definitions";
import { Ingredient } from "../../../lib/definitions";

interface Props {
	useConversion: boolean;
	sectionNumber?: number;
	ingredientState?: Ingredient[];
	itemErrors?: ErrorDescription[];
}

const IngredientPanel = ({ useConversion, sectionNumber, ingredientState, itemErrors }: Props) => {
	const initialIngredients = ingredientState?.length ? ingredientState?.length : 1;
	const [ingredients, setIngredients] = useState(initialIngredients);
	const addIng = () => {
		setIngredients(ingredients + 1);
	};
	const removeIng = () => {
		setIngredients(ingredients - 1);
	};

	return (
		<div>
			{[...Array(ingredients)].map((ing, i) => {
				ing = i + 1;
				if (itemErrors) {
					let errorMsg = "";
					let sectionNum = 1;
					if (sectionNumber) {
						sectionNum = sectionNumber;
					}
					for (const error of itemErrors) {
						if (error.path[0] === sectionNum - 1 && error.path[1] === i) {
							errorMsg = error.message;
						}
					}
					return (
						<IngredientInput useConversion={useConversion} sectionNumber={sectionNumber} ingNum={ing} ingredient={ingredientState && ingredientState[i]} isError={errorMsg} key={ing} />
					);
				} else {
					return <IngredientInput useConversion={useConversion} sectionNumber={sectionNumber} ingNum={ing} ingredient={ingredientState && ingredientState[i]} key={ing} />;
				}
			})}
			<Button text={"Add Ingredient"} type="button" onClick={addIng} />
			{ingredients > 1 && <Button text={"Delete Ingredient"} type="button" customClass="bg-red-500" onClick={removeIng} />}
		</div>
	);
};

export default IngredientPanel;
