import { FC, Fragment, useState } from "react";
import { FormTextarea } from "./ui/FormField";
import Button from "./ui/Button";
import { ErrorState } from "../lib/schema";

const FormInstructions: FC<{instructionState?: string[], errorState: ErrorState}> = ({ instructionState, errorState }) => {
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
                        {errorState.errors?.instructions?.map((error) => {
                            if(error?.path === index){
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