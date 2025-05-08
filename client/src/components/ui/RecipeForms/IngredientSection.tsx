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
	if(ingredientState?.ingredients){
		for(const ing of ingredientState.ingredients){
			if(ing.converted_amount) hasConversions = true;
		}
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
			<h3 className="text-xl mb-1 mt-4">Recipe Ingredients</h3>
			<h4 className="text-lg italic">Options:</h4>
				<ul className="ml-5 list-disc" id="options">
				{!ingSection && (
					<li>
						<ButtonAsLink text="Break Ingredients Up Into Sections" onClick={initSections}/>
						<span> (E.g. Sauce, Side, Main etc.)</span>
					</li>
				)}
				<li className="mt-1 mb-3">
					<ButtonAsLink text={useConversion ? "Remove Unit Conversions" : "Add Unit Conversions"} onClick={() => setUseConversion(!useConversion)}/>
				</li>
			</ul>
			
			{ingSection ? (
				[...Array(ingSection)].map((_, i) => {
					const section = i + 1;
					let errorMsg;
					if (ingErrors?.sections) {
						for (const error of ingErrors.sections) {
							if (error?.path[0] === i) {
								errorMsg = error.message;
							}
						}
					}
					return (
						<div className="mt-3" key={section}>
							<section className="px-2 my-3 border rounded-lg">
								<FormField id={`section-${section}`} label={`Section ${section} Name`} name="recipe[sections]" defaultValue={ingredientState?.sections?.[i]}/>
								{errorMsg && <div>{errorMsg}</div>}
								<div className="my-2">
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
								
							</section>
							{ingSection === section && (
								<div id="section-btns">
									<Button text={"Add Section"} type="button" onClick={addSection} />
									<Button text={"Delete Section"} type="button" customClass="bg-red-500 float-right" onClick={removeSection} />
								</div>
							)}
						</div>
					);
				})
			) : (
				<div className="p-1 my-2">
					<IngredientPanel useConversion={useConversion} ingredientState={ingredientState?.ingredients} itemErrors={ingErrors?.ingredients} />
				</div>
			)}
		</div>
	);
};

export default IngredientSection;
