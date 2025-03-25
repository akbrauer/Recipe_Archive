import RecipeCard from "./RecipeCard";
import useFetch from "../hooks/useFetch";


function RecipeList () {
    const data = useFetch('/api/all');
    const recipes = data.recipes;

    return (
        <div className="grid grid-cols-3 gap-4">
            {recipes?.map((rec, i) => {
                return <RecipeCard recipe={rec} key={i}/>
            })}
        </div>
    )
}

export default RecipeList;