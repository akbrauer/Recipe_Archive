import IngredientPanel from "./IngredientPanel";
import { useState } from "react";
import { Ingredient } from "../../../lib/definitions";
import { ErrorDescription } from "../../../lib/definitions";
import FormField from "./FormField";
import Button, { ButtonAsLink } from "../Button";

interface Props {
	ingredientState?: {
		ingredients?: Ingredient[];
		sections?: string[];
	};
	ingErrors?: {
		ingredients?: ErrorDescription[];
		sections?: ErrorDescription[];
	};
}

const IngredientSection = ({ ingredientState, ingErrors }: Props) => {
	const initialSections = ingredientState?.sections?.length || 0;

	let hasConversions = false;
	if(ingredientState?.ingredients && ingredientState.ingredients[0].converted_amount){
		hasConversions = true;
	}
	const [ingSection, setIngSection] = useState(initialSections);
	const [useConversion, setUseConversion] = useState(hasConversions);

	const initSections = () => {
		setIngSection(1);
		if(ingredientState && !ingredientState.sections){
			ingredientState.sections = [''];
		}
	}

	const addSection = () => {
		setIngSection(ingSection + 1);
	};
	const removeSection = () => {
		setIngSection(ingSection - 1);
	};

	return (
		<div>
			<h3 className="text-xl mb-1">Recipe Ingredients</h3>
			<h4 className="text-lg italic">Options:</h4>
			{!ingSection && (
				<div>
					<ButtonAsLink text="Break Ingredients Up Into Sections" onClick={initSections}/>
					<span> (E.g. Sauce, Side, Main etc.)</span>
				</div>
			)}
			<ButtonAsLink text="Add Unit Conversions" onClick={() => setUseConversion(!useConversion)}/>
			{ingSection ? (
				[...Array(ingSection)].map((section, i) => {
					section = i + 1;
					let errorMsg;
					if (ingErrors?.sections) {
						for (const error of ingErrors.sections) {
							if (error?.path[0] === i) {
								errorMsg = error.message;
							}
						}
					}
					return (
						<div className="p-1 my-5 border" key={section}>
							<FormField id={`section-${section}`} label={`Section ${section} Name`} name="recipe[sections]" defaultValue={ingredientState?.sections?.[i]}/>
							{errorMsg && <div>{errorMsg}</div>}
							<div className="p-1 my-2 border">
								<IngredientPanel
								useConversion={useConversion}
								sectionNumber={section}
								ingredientState={ingredientState?.sections && 
									ingredientState.ingredients?.filter(ingt => {
										if(ingt.section === section){
											return ingt;
										}
								})}
								itemErrors={ingErrors?.ingredients} key={section} />
							</div>
							{ingSection === section && (
								<div>
									<Button text={"Add Section"} type="button" onClick={addSection} />
									<Button text={"Delete Section"} type="button" customClass="bg-red-500" onClick={removeSection} />
								</div>
							)}
						</div>
					);
				})
			) : (
				<IngredientPanel useConversion={useConversion} ingredientState={ingredientState?.ingredients} itemErrors={ingErrors?.ingredients} />
			)}
		</div>
	);
};

export default IngredientSection;
