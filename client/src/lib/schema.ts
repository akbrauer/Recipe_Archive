import { z } from 'zod';

export const FormSchema = z.object({
    name: z.string().trim().min(1, { message: "Recipe must have a name." }),
    servings: z.coerce.number().gt(0, { message: "Must be more than zero." }),
    url: z.string().trim().min(1, { message: "Must provide a link to the original recipe" }),
    thumbnailFile: z.instanceof(File).refine((file) =>
        [
            'image/png',
            'image/jpeg',
            'image/jpg',
        ].includes(file.type),
        { message: "Recipe must have a picture"}),
    thumbnailUrl: z.string().trim().min(1, { message: "Must provide an image link."}),
    instructions: z.array(
        z.string().trim().min(1, { message: 'Step cannot be blank.' })
    ),
    ingredients: z.array(
        z.object({
            amount: z.string(),
            unit: z.string(),
            name: z.string().min(1, { message: "Ingredient must have a name." }),
            notes: z.string(),
        }),
    ),
}).partial({
    thumbnailFile: true,
    thumbnailUrl: true,
});

export type Pairs = {
    message: string;
    path?: number;
}

interface ParseObject {
    name: FormDataEntryValue | null;
    ingredients: {
        amount: FormDataEntryValue | null;
        unit: FormDataEntryValue | null;
        name: FormDataEntryValue | null;
        notes: FormDataEntryValue | null;
    }[];
    instructions: FormDataEntryValue[] | null;
    servings: FormDataEntryValue | null;
    url: FormDataEntryValue | null;
    thumbnailFile?: FormDataEntryValue | null;
    thumbnailUrl?: FormDataEntryValue | null;
}

export type ErrorState = {
    errors?: {
        name?: Array<Pairs | undefined> | undefined;
        ingredients?: Array<Pairs | undefined> | undefined;
        instructions?: Array<Pairs | undefined> | undefined;
        servings?: Array<Pairs | undefined> | undefined;
        url?: Array<Pairs | undefined> | undefined;
        thumbnailFile?: Array<Pairs | undefined> | undefined;
        thumbnailUrl?: Array<Pairs | undefined> | undefined;
    };
    message?: string | null;
};

const countIngredients = (formData: FormData) => {
    const numInstructions = formData.getAll('recipe[instructions]').length;
    const baseFields = 5;
    let numFields = 0;
    for(const key of formData.keys()){
        console.log(key);
        numFields++;
    };
    const numIngredients = (numFields - baseFields - numInstructions) / 5;
    return numIngredients;
}

const buildIngredientsArray = (formData: FormData) => {
        const numIngredients = countIngredients(formData);    
        const ingredientsArray = [];
            for(let x = 0; x < numIngredients; x++){
                const ingredient = {amount: formData.get(`ingredients[${x}][amount]`), unit: formData.get(`ingredients[${x}][unit]`), name: formData.get(`ingredients[${x}][name]`), notes: formData.get(`ingredients[${x}][notes]`)};
                ingredientsArray.push(ingredient);
            }
            return ingredientsArray;
}

export const validateForm = (formData: FormData) => {
    const parseObject: ParseObject = {
        name: formData.get('recipe[name]'),
        ingredients: buildIngredientsArray(formData),
        instructions: formData.getAll('recipe[instructions]'),
        servings: formData.get('recipe[servings]'),
        url: formData.get('recipe[url]'),
    }

    console.log(typeof(formData.get('thumbnail')))
    if(typeof(formData.get('thumbnail')) !== 'string'){
        parseObject.thumbnailFile = formData.get('thumbnail');
    } else if(typeof(formData.get('thumbnail')) === 'string'){
        parseObject.thumbnailUrl = formData.get('thumbnail');
    }

    console.log(parseObject);

    const validatedFields = FormSchema.safeParse(parseObject);

    // If form validation fails, return errors early. Otherwise, continue.
    if(!validatedFields.success) {            
        const issues = validatedFields.error.issues;
    const customErrors: Record<string, Array<Pairs>> = {};
    for(const issue of issues){
        const key = issue?.path[0];
        if(customErrors[key]){
            customErrors[key].push({message: issue.message, path: Number(issue.path[1])});
        } else {
            if(issue.path[1] !== undefined){
                customErrors[key] = [{message: issue.message, path: Number(issue.path[1])}];
            } else {
                customErrors[key] = [{message: issue.message}];
            }
        }
    }
    return {errors: customErrors, message: 'Missing Fields, Failed to Update Recipe.'}
    } else {
        return null;
    }
}