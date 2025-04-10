import { FC } from "react";
import { InputProps, TextareaProps } from "./FormField";

interface DoubleProps {
    input1: InputProps;
    input2: InputProps;
}

const InputGroup: FC<InputProps> = ({id, label, width, ...other}) => {
    return (
    <div className="flex mb-3">
        <label className="border rounded rounded-r-none p-1 bg-gray-100" htmlFor={ id }>{ label }</label>
        <input className={width ? ("border border-l-0 rounded p-1 rounded-l-none " + width) : "border border-l-0 rounded p-1 rounded-l-none flex-auto"} id={ id } {...other}></input>
    </div>)
}

export default InputGroup;

export const TextareaGroup: FC<TextareaProps> = ({id, label, ...other}) => {
    return (
    <div className="flex mb-3">
        <label className="border rounded rounded-r-none p-1 bg-gray-100" htmlFor={ id }>{ label }</label>
        <textarea className="border border-l-0 rounded p-1 rounded-l-none flex-auto" id={ id } {...other}></textarea>
    </div>)
}

export const DoubleGroup: FC<DoubleProps> = ({input1, input2}) => {
    const { id: id1, label: label1, ...other1 } = input1;
    const { id: id2, label: label2, ...other2 } = input2;
    return (
    <div className="flex mb-3">
        <div className="border rounded rounded-r-none p-1 bg-gray-100">
            <label htmlFor={ id1 }>{ label1 }</label>
            <span> / </span>
            <label htmlFor={ id2 }> { label2 }</label>
        </div>
        <input className="border border-l-0 p-1 flex-auto" id={ id1 } { ...other1 }></input>
        <input className="border border-l-0 rounded p-1 rounded-l-none flex-auto" id={ id2 } {...other2}></input>
    </div>)
}