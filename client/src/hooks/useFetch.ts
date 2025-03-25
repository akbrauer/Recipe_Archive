import { useEffect, useState } from 'react';
import { Recipe } from "../models/recipe";

export interface startState {
    message: string;
    recipe?: Recipe;
    recipes?: Recipe[];
};

export default function useFetch(path: string) {
    const initialState: startState = {
        message: "Loading",
        recipe: undefined,
        recipes: undefined,
    }
    
    const [data, setData] = useState(initialState);
    useEffect(() => {
        console.log('fetch initated');
        fetch(`http://localhost:5173${path}`)
        .then(res => res.json())
        .then(data => {setData(data)})
        .catch(err => console.error(err));
    }, [path]);
    console.log(data);
    return data;
}