import Button, { ButtonAsLink } from "../Button";

interface Props {
	formFiller: () => void;
	formResetter: () => void;
}

const JsonModal = ({ formFiller, formResetter }: Props) => {
	const toggleClass = () => {
		document.querySelector("#json-format")?.classList.toggle("hidden");
		const button: HTMLButtonElement = document.querySelector("#json-btn")!;
		if (button.innerText == "hide format") button.innerText = "show format";
		else button.innerText = "hide format";
	};

	return (
		<div id="modal-content">
			<div className="text-left">
				<p className="sm:text-left text-center">
					Be sure your JSON data conforms to the following format in order to be parsed correctly
					<span className="ml-0.5">
						(
						<ButtonAsLink text="hide format" id="json-btn" onClick={toggleClass} />)
					</span>
					:
				</p>
				<ul className="ml-3 hidden" id="json-format">
					<li>name: string</li>
					<li>image: string</li>
					<li>sections: array of strings (omit if none)</li>
					<li>ingredients: array of objects</li>
					<ul className="list-disc">
						<li className="ml-6 mb-1">amount: string</li>
						<li className="ml-6 mb-1">unit: string</li>
						<li className="ml-6 mb-1">name: string</li>
						<li className="ml-6 mb-1">notes: string</li>
						<li className="ml-6 mb-1">converted_amount: string</li>
						<li className="ml-6 mb-1">converted_unit: string</li>
						<li className="ml-6 mb-1">section: number</li>
					</ul>
					<li>instructions: array of strings</li>
					<li>servings: number</li>
					<li>url: string</li>
				</ul>
			</div>
			<h1 className="text-xl mb-1">Paste JSON Here:</h1>
			<textarea className="border rounded p-1 mb-1 w-full" rows={12} name="json" id="json"></textarea>
			<Button text="Fill Form" customClass="w-3/5 bg-purple-500 mb-2" onClick={formFiller} />
			<Button text="Reset Form" customClass="w-3/5 bg-red-500 mb-2" onClick={formResetter} />
			<div className="sm:text-left mb-2">Note: If making changes to previously submitted JSON, first reset the form contents.</div>
		</div>
	);
};

export default JsonModal;
