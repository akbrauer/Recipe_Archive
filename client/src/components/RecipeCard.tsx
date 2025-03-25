
import { Recipe } from "../models/recipe";

interface Props {
    recipe?: Recipe;
}

function RecipeCard ({ recipe }: Props) {
    return (
    <a className="border rounded-lg" href={ recipe?.id }>
        <img src={ recipe?.img } className="rounded-t-lg" alt={recipe?.name}/>
        <div className="">
            <h5 className="text-center text-lg font-bold">{recipe?.name}</h5>
        </div>
    </a>)
}

export default RecipeCard;