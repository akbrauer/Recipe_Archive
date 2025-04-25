import Button, {ButtonAsLink} from "./ui/Button";

const fillForm = () => {
        const rawJson: HTMLTextAreaElement = document.querySelector('#json')!;
        const data = JSON.parse(rawJson.value);
        console.log(data);

        
        
    }

const JsonModal = () => {
  return (
    <div className="modal-content">
        <div className="text-left mb-3">
            <p className="mb-2">Be sure your JSON data conforms to the following format in order to be parsed correctly
                <span className="ml-0.5">(
                <ButtonAsLink text="hide format"/>
                )</span>:
            </p>
            <ul className="ml-3">
                <li>name: string</li>
                <li>image: string</li>
                <li>sections: array of strings (omit if none)</li>
                <li>ingredients: array of objects</li>
                <ul className="list-disc">
                    <li className="ml-6 mb-1">amount: string</li>
                    <li className="ml-6 mb-1">unit: string</li>
                    <li className="ml-6 mb-1">name: string</li>
                    <li className="ml-6 mb-1">notes: string</li>
                    <li className="ml-6 mb-1">section: number</li>
                </ul>
                <li>instructions: array of strings</li>
                <li>servings: number</li>
                <li>url: string</li>
            </ul>
        </div>
        <h1 className="text-xl mb-3">Paste JSON Here:</h1>
        <textarea className="border rounded p-1 w-full" rows={12} name="json" id="json"></textarea>
        <Button text="Fill Form" customClass="w-3/5" onClick={fillForm}/>
    </div>
  )
}

export default JsonModal;