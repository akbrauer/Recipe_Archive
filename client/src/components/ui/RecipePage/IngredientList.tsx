import { Ingredient } from "../../../lib/definitions";

interface Props {
    ingredients?: Ingredient[];
    sections?: string[];
}

const IngredientList = ({ ingredients, sections }: Props) => {
    if(sections) {
        return (
        <div className="sections">
            {sections.map((section, index) => {
                return(
                    <div className={`section-${index + 1}`} key={index + 1}>
                        <h6 className="text-lg mb-1">{section}</h6>
                        <ul className="list-disc">
                            {ingredients?.map((ing, i) => {
                                if(ing.section === (index + 1)){
                                return (
                                    <li className="ml-6 mb-1" key={"ingredient-" + i}>
                                        {ing.amount} {ing.unit} <span className="font-bold">{ing.name}</span> {ing.notes && <em>{ing.notes}</em>}
                                    </li>)}
                            })}
                        </ul>
                    </div>)
            })}
        </div>)
    } else {
        return(
            <ul className="list-disc">
                {ingredients?.map((ing, i) => {
                    let spacing = ' ';
                    const convUnit = ing.converted_unit?.toLowerCase();
                    if(convUnit === 'g' || convUnit === 'ml'){
                        spacing = '';
                    }
                    return (
                    <li className="ml-6 mb-1" key={"ingredient-" + i}>
                        {ing.amount} {ing.unit} {(ing.converted_amount || ing.converted_unit) && '(' + ing.converted_amount + spacing + ing.converted_unit + ') '}<span className="font-bold">{ing.name}</span> {ing.notes && <em>{ing.notes}</em>}
                    </li>)
                })}
            </ul>)
    }
}

export default IngredientList;