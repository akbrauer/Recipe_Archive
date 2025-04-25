import { UUID } from "crypto";

export type Ingredient = {
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

export type ParseObject = {
    name: FormDataEntryValue | null;
    thumbnailFile?: FormDataEntryValue | null;
    thumbnailUrl?: FormDataEntryValue | null;
    sections: FormDataEntryValue[] | null;
    ingredients: {
        amount: FormDataEntryValue | null;
        unit: FormDataEntryValue | null;
        name: FormDataEntryValue | null;
        notes: FormDataEntryValue | null;
        converted_amount?: string;
        converted_unit?: string;
    }[][];
    instructions: FormDataEntryValue[] | null;
    servings: FormDataEntryValue | null;
    url: FormDataEntryValue | null;
}

export type ErrorDescription = {
    message: string;
    path: (string | number)[];
}

export type ErrorState = {
    errors?: {
        name?: Array<ErrorDescription>;
        thumbnailFile?: Array<ErrorDescription>;
        thumbnailUrl?: Array<ErrorDescription>;
        sections?: Array<ErrorDescription>;
        ingredients?: Array<ErrorDescription>;
        instructions?: Array<ErrorDescription>;
        servings?: Array<ErrorDescription>;
        url?: Array<ErrorDescription>;
    };
    message?: string | null;
};