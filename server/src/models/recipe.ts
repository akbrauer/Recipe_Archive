export interface Ingredient {
    id: string;
    amount: string;
    unit: string;
    name: string;
    notes: string;
    converted: {
        amount: string;
        unit: string;
    };
};

export interface Recipe {
    id: string;
    name: string;
    img: string;
    ingredients: Ingredient[];
    instructions: string[];
    servings: number;
    url: string;
}