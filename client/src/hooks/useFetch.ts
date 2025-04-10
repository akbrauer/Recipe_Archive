import { useEffect, useState } from "react";
import { Recipe } from "../lib/definitions";

export interface startState {
	message: string;
	recipes?: Recipe[];
}

export default function useFetch(path: string) {
	const initialState: startState = {
		message: "Loading",
		recipes: undefined,
	};

	const [data, setData] = useState(initialState);
	useEffect(() => {
		console.log("fetch initated");
		fetch(`http://localhost:5173${path}`)
			.then(res => res.json())
			.then(data => {
				setData(data);
			})
			.catch(err => console.error(err));
	}, [path]);
	return data;
}
