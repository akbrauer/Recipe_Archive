import { useEffect, useState } from "react";
import { Recipe } from "../lib/definitions";

const domain = "https://recipe-archive-theta.vercel.app/";
//const domain = "http://localhost:5173";

export interface startState {
	message: string;
	recipes?: Recipe[];
	recipeCount?: number;
}

export default function useFetch(path: string) {
	const initialState: startState = {
		message: "Loading",
		recipes: undefined,
		recipeCount: undefined
	};

	const [data, setData] = useState(initialState);
	useEffect(() => {
		console.log("fetch initated");
		fetch(`${domain}${path}`)
			.then(res => res.json())
			.then(data => {
				setData(data);
			})
			.catch(err => console.error(err));
	}, [path]);
	return data;
}
