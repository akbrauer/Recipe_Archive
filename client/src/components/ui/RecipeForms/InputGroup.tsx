import { InputProps, TextareaProps } from "./FormField";
import { useState } from "react";

interface DoubleProps {
	input1: InputProps;
	input2: InputProps;
}

const InputGroup = ({ id, label, width, ...other }: InputProps) => {
	return (
		<div className="flex mb-3">
			<label className="border rounded rounded-r-none p-1 bg-gray-100" htmlFor={id}>
				{label}
			</label>
			<input
				className={width ? "border border-l-0 rounded p-1 rounded-l-none " + width : "border border-l-0 rounded p-1 rounded-l-none w-full"}
				id={id}
				{...other}
			></input>
		</div>
	);
};

export default InputGroup;

export const TextareaGroup = ({ id, label, ...other }: TextareaProps) => {
	return (
		<div className="flex mb-3">
			<label className="border rounded rounded-r-none p-1 bg-gray-100" htmlFor={id}>
				{label}
			</label>
			<textarea className="border border-l-0 rounded p-1 rounded-l-none flex-auto" id={id} {...other}></textarea>
		</div>
	);
};

export const DoubleGroup = ({ input1, input2 }: DoubleProps) => {
	const { id: id1, label: label1, ...other1 } = input1;
	const { id: id2, label: label2, ...other2 } = input2;

	const [isDouble, setIsDouble] = useState(window.innerWidth > 550);

	addEventListener("resize", () => {
		if(isDouble && window.innerWidth < 550) setIsDouble(false);
		else if (!isDouble && window.innerWidth > 550) {
			setIsDouble(true);
		}
	});
	
	if(isDouble){
		return (
			<div className="mb-3 flex w-full">
				<div className="border rounded rounded-r-none p-1 bg-gray-100">
					<label htmlFor={id1}>{label1}</label>
					<span> / </span>
					<label htmlFor={id2}> {label2}</label>
				</div>
				<input className="border border-l-0 p-1 flex-auto" id={id1} {...other1}></input>
				<input className="border border-l-0 rounded p-1 rounded-l-none flex-auto" id={id2} {...other2}></input>
		</div>)
	} else {
		return (
			<>
			<InputGroup label={label1} id={id1} {...other1}/>
			<InputGroup label={label2} id={id2} {...other2}/>
		</>)
	};
};
