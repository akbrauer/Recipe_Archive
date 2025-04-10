import InputGroup, { TextareaGroup, DoubleGroup } from "./ui/InputGroup";
import { FC } from "react";
import { Ingredient } from "../lib/definitions";

const IngredientInput: FC<{ isError?: string, ingNum: number, ingredient?: Ingredient }> = ({ isError, ingNum, ingredient }) => {
    const submitRoot = `ingredients[${ingNum - 1}]`;

    return(
        <div>
            <h4 className="text-lg mb-2">Ingredient { ingNum }:</h4>
            <DoubleGroup 
                input1={{id: `ing-${ingNum}-amount`, label: "Amount",  type: "text", name: `${submitRoot}[amount]`, defaultValue: `${ingredient?.amount ? ingredient.amount : ''}`}}
                input2={{id:`ing-${ingNum}-unit`, label: "Unit",  type: "text", name: `${submitRoot}[unit]`, defaultValue: `${ingredient?.unit ? ingredient.unit : ''}`}}
            />
            <InputGroup id={"ing-" + ingNum + "-name"} label="Ingredient" type="text" name={submitRoot + "[name]"} defaultValue={ingredient?.name}/>
            {isError && <div>{isError}</div>}
            <TextareaGroup id={"ing-" + ingNum + "-notes"} label="Notes" name={submitRoot + "[notes]"} rows={2} defaultValue={ingredient?.notes}/>
            <input className="border rounded mt-1 p-1 block w-full" id={"ing-" + ingNum + "-id"} name={submitRoot + "[id]"} defaultValue={ingredient?.ingredientid}></input>
        </div>
    )
}

export default IngredientInput;