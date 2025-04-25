import { Fragment, useState } from "react";
import { FormTextarea } from "./FormField";
import Button from "../Button";
import { ErrorDescription } from "../../../lib/definitions";

interface Props {
    instructionState?: string[];
    instErrors?: ErrorDescription[];
}

const FormInstructions = ({ instructionState, instErrors }: Props) => {
    const initialInstructions = instructionState ? instructionState.length : 1;
    const [instructions, setInstructions] = useState(initialInstructions);
    
    const addInst = () => {
        setInstructions(instructions + 1);
    }
    
    return(
        <div id="instructions">
            <h3 className="text-xl mb-2">Recipe Instructions</h3>
            {[...Array(instructions)].map((ins, index) => {
                ins = index + 1;
                return (
                    <Fragment key={ ins }>
                        <FormTextarea id={"step-" + ins} label={"Step " + ins + " :"}  name={"recipe[instructions]"} key={ "step-" + ins } defaultValue={instructionState && instructionState[index]}/>
                        {instErrors?.map((error) => {
                            if(error?.path[0] === index){
                                return (
                                    <div key={ "error-" + ins }>{ error.message }</div>
                                )
                            }
                        })}
                    </Fragment>
                )
            })}
            <Button text={"Add Step"} type="button" onClick={addInst}/>
        </div>
    )
}

export default FormInstructions;