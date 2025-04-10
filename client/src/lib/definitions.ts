import { UUID } from "crypto";

export interface Ingredient {
    ingredientid: UUID;
    amount?: string;
    unit?: string;
    name: string;
    notes?: string;
    converted?: {
        amount: string;
        unit: string;
    };
    recipeid: UUID;
};

export interface Recipe {
    recipeid: UUID;
    name: string;
    image?: string;
    ingredients?: Ingredient[];
    instructions: string[];
    servings: number;
    url?: string;
}