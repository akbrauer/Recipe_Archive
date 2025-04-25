import { useState, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { ButtonAsLink } from "../Button";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    width?: string;
}

export interface FileInputProps extends InputProps {
    defaultIsFile: boolean;
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label: string;
}

const FormField = ({id, label, width, ...other}: InputProps) => {
    return (
        <div className="my-3">
            <label className="inline-block" htmlFor={ id }>{ label }</label>
            <input className={width ? ("border rounded mt-1 p-1 block " + width) : "border rounded mt-1 p-1 block w-full"} id={ id } {...other}/>
    </div>)
}

export default FormField;

export const FormFileInput = ({id, label, width, ...other }: InputProps) => {
    other.type = "file";
    const baseStyles = "border rounded block file:mr-5 file:py-1 file:px-3 file:border-r-[1px] file:bg-gray-100 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700";
    return (
        <div className="my-3">
            <label className="inline-block" htmlFor={ id }>{ label }</label>
            <input className={width ? `${baseStyles}${width}` : `${baseStyles} w-full`} id={id} {...other}/>
            {/* text-stone-500 */}
        </div>
            
    )
}

export const CustomFileInput = ({id, label, width, defaultIsFile, ...other }: FileInputProps) => {
    const [isFile, setIsFile] = useState(defaultIsFile);
    return (
        <div className="my-3">
            <label className="inline-block" htmlFor={isFile ? `${id}-file` : `${id}-url`}>{ label }</label>
            {isFile ?
                <input type="file" className="
                    border rounded mt-1 block w-full
                    file:mr-5 file:py-1 file:px-3 file:border-r-[1px] file:bg-gray-100
                    hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
                    // text-stone-500
                    id={ `${id}-file` } {...other}
                />
            :
            <input className={width ? ("border rounded mt-1 p-1 block " + width) : "border rounded mt-1 p-1 block w-full"} id={ `${id}-url` } {...other}/>
            }
            <ButtonAsLink customClass="mt-1" text={isFile ? "Or upload an image via URL" : "Or upload an image file"} onClick={() => setIsFile(!isFile)}/>
        </div>
    );
};
export const FormTextarea = ({id, label, ...other}: TextareaProps) => {
    return (
        <div className="my-3">
            <label className="inline-block" htmlFor={ id }>{ label }</label>
            <textarea className="border rounded mt-1 p-1 block w-full" id={ id } {...other}/>
    </div>)
}