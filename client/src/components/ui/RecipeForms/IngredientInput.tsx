import InputGroup, { TextareaGroup, DoubleGroup } from "./InputGroup";
import { Ingredient } from "../../../lib/definitions";

interface Props {
    useConversion?: boolean;
	sectionNumber?: number;
	isError?: string;
	ingNum: number;
	ingredient?: Ingredient
}

const IngredientInput = ({ useConversion = false, sectionNumber, isError, ingNum, ingredient }: Props) => {
	let sectionNum = sectionNumber;
	if (!sectionNum) {
		sectionNum = 1;
	}
	const submitRoot = `recipe[ingredients][${sectionNum - 1}][${ingNum - 1}]`;
	// console.log("This ingredient section is number:", sectionNumber);

	return (
		<div>
			<h4 className="text-lg mb-2">Ingredient {ingNum}:</h4>
			<DoubleGroup
				input1={{
					id: `ing-${sectionNum}-${ingNum}-amount`,
					label: "Amount",
					type: "text",
					name: `${submitRoot}[amount]`,
					defaultValue: `${ingredient?.amount ? ingredient.amount : ""}`,
				}}
				input2={{
					id: `ing-${sectionNum}-${ingNum}-unit`,
					label: "Unit",
					type: "text",
					name: `${submitRoot}[unit]`,
					defaultValue: `${ingredient?.unit ? ingredient.unit : ""}`,
				}}
			/>
			{useConversion && <DoubleGroup
				input1={{
					id: `ing-${sectionNum}-${ingNum}-conv-amount`,
					label: "Converted Amount",
					type: "text",
					name: `${submitRoot}[converted_amount]`,
					defaultValue: `${ingredient?.converted_amount ? ingredient.converted_amount : ""}`,
				}}
				input2={{
					id: `ing-${sectionNum}-${ingNum}-conv-unit`,
					label: "Unit",
					type: "text",
					name: `${submitRoot}[converted_unit]`,
					defaultValue: `${ingredient?.converted_unit ? ingredient.converted_unit : ""}`,
				}}
			/>}
			<InputGroup
				id={"ing-" + sectionNum + "-" + ingNum + "-name"}
				label="Ingredient"
				type="text"
				name={submitRoot + "[name]"}
				defaultValue={ingredient?.name}
			/>
			{isError && <div>{isError}</div>}
			<TextareaGroup id={"ing-" + sectionNum + "-" + ingNum + "-notes"} label="Notes" name={submitRoot + "[notes]"} rows={2} defaultValue={ingredient?.notes} />
		</div>
	);
};

export default IngredientInput;
