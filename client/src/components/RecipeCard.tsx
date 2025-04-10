import { Recipe } from "../lib/definitions";

interface Props {
	recipe?: Recipe;
}

function RecipeCard({ recipe }: Props) {
	return (
		<a className="border rounded-lg" href={"/recipes/" + recipe?.recipeid}>
			<img src={recipe?.image} className="rounded-t-lg" alt={recipe?.name} />
			<div className="">
				<h5 className="text-center text-lg font-bold">{recipe?.name}</h5>
			</div>
		</a>
	);
}

export default RecipeCard;
