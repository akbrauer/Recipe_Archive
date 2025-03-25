import useFetch from "../hooks/useFetch";

interface Props {
    id: string,
}

function RecipeFull ({id}: Props) {
    // const data = useFetch(`/api/recipes/${id}`);
    const data = useFetch('/api/show');
    const recipe = data.recipe;
    
    return (
        <div className="m-auto border rounded-lg">
            <img src={recipe?.img} className="w-full rounded-t-lg" alt="recipe image"/>
            <div className="card-header">
                <h3 className="border-t border-b text-2xl px-3 py-5">{recipe?.name}</h3>
            </div>
            <div className="card-body">
                <div className="card-ingredients border-b p-2">
                    <h5 className="text-xl font-medium mb-1">Ingredients</h5>
                    <ul className="list-disc">
                        {recipe?.ingredients.map(ing => {
                            return <li className="ml-6 mb-1">
                                {ing.amount} {ing.unit} <span className="font-bold">{ing.name}</span> {ing.notes && <em>{ing.notes}</em>}
                            </li>
                        })}
                    </ul>
                </div>
                <div className="card-instructions border-b p-2">
                    <h5 className="text-xl font-medium mb-1">Steps</h5>
                    <ol className="list-decimal">
                        {recipe?.instructions.map(ins => {
                            return <li className="ml-6 mb-1">{ins}</li>
                        })}
                    </ol>
                </div>
            </div>
            <div className="card-footer p-2">
                <a href={recipe?.url} className="underline text-blue-600 visited:text-purple-600 text-lg font-medium">Full Recipe</a>
            </div>
        </div>
    )
}

export default RecipeFull;