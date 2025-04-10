import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    customClass?: string;
}

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    text: string;
    customClass?: string;
}

const Button: FC<ButtonProps> = ({text, customClass,  ...props }) => {
    return (
        <button className={customClass ? `border rounded py-1 px-2 mb-2 bg-purple-500 ${customClass}` : "border rounded py-1 px-2 mb-2 bg-purple-500" } {...props}> { text }</button>
    )
}

export default Button;

export const SubmitButton: FC<ButtonProps> = ({text, customClass, ...props }) => {
    props.type = "submit";
    return (
        <button className={customClass ? `border rounded py-1 px-2 bg-green-500 ${customClass}` : "border rounded py-1 px-2 bg-green-500" } {...props}> { text }</button>
    )
}

export const LinkButton: FC<LinkButtonProps> = ({text, customClass, ...props}) => {
    return (
        <a className={customClass ? `border rounded py-1 px-2 mb-2 bg-purple-500 ${customClass}` : "border rounded py-1 px-2 mb-2 bg-purple-500" } {...props}>{ text }</a>
        
    )
}