import { UUID } from "crypto";

export interface Ingredient {
    ingredientid: UUID;
    amount?: string;
    unit?: string;
    name: string;
    notes?: string;
    converted_amount?: string;
    converted_unit?: string;
    recipeid: UUID;
    section: number;
    index: number;
};

export type IngredientData = {
    amount?: string;
    unit?: string;
    name: string;
    notes?: string;
    converted_amount?: string;
    converted_unit?: string;
}

export type Recipe = {
    recipeid: UUID;
    name: string;
    image?: string;
    instructions: string[];
    sections: string[];
    ingredients: Ingredient[];
    servings: number;
    url?: string;
}

export type RecipeData = {
    name: string;
    image?: string;
    instructions: string[];
    sections: string[];
    ingredients: IngredientData[][];
    servings: number;
    url?: string;
}