import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    customClass?: string;
}

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
    customClass?: string;
}

const Button = ({text, customClass,  ...props }: ButtonProps) => {
    return (
        <button className={ `border rounded py-1 px-2 ${customClass || 'bg-purple-500'}` } {...props}> { text }</button>
    )
}

export default Button;

export const SubmitButton = ({text, customClass, ...props }: ButtonProps) => {
    props.type = "submit";
    return (
        <button className={ `border rounded py-1 px-2 ${customClass || "bg-green-500"}` } { ...props }> { text }</button>
    )
}

export const LinkButton = ({text, customClass, ...props}: LinkButtonProps) => {
    return (
        <a className={ `border rounded py-1 px-2 ${customClass || "bg-purple-500"}` } { ...props }>{ text }</a>
        
    )
}

export const ButtonAsLink = ({text, customClass, ...props}: ButtonProps) => {
    return (
        <button className={ `cursor-pointer underline text-blue-600 visited:text-purple-600 ${customClass}` } type="button" { ...props }>{ text }</button>
    )
}