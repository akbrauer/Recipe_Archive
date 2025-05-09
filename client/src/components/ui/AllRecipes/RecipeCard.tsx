import { Recipe } from "../../../lib/definitions";

interface Props {
	recipe?: Recipe;
}

function RecipeCard({ recipe }: Props) {
	return (
		<a className="border rounded-lg" href={"/recipes/" + recipe?.recipeid}>
			<img src={recipe?.image} className="rounded-t-lg w-full aspect-square" alt={recipe?.name} />
			<div className="">
				<h5 className="text-center sm:text-lg text-xs font-bold p-1">{recipe?.name}</h5>
			</div>
		</a>
	);
}

export default RecipeCard;
