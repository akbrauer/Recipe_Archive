import { z } from 'zod';
import { ParseObject, ErrorDescription } from './definitions';

export const FormSchema = z.object({
    name: z.string().trim().min(1, { message: "Recipe must have a name." }),
    thumbnailFile: z.instanceof(File).refine((file) =>
        [
            'image/png',
            'image/jpeg',
            'image/jpg',
            'image/webp',
        ].includes(file.type),
        { message: "Recipe must have a picture"}),
    thumbnailUrl: z.string().trim().min(1, { message: "Must provide an image link."}),
    sections: z.array(
        z.string().trim().min(1, { message: 'Section must have a name.' }),
    ),
    ingredients: z.array(
        z.array(
            z.object({
                amount: z.string().trim(),
                unit: z.string().trim(),
                name: z.string().trim().min(1, { message: "Ingredient must have a name." }),
                notes: z.string().trim(),
            }),
        ),
    ),
    instructions: z.array(
        z.string().trim().min(1, { message: 'Step cannot be blank.' })
    ),
    servings: z.coerce.number().gt(0, { message: "Must be more than zero." }),
    url: z.string().trim().min(1, { message: "Must provide a link to the original recipe" }),
}).partial({
    thumbnailFile: true,
    thumbnailUrl: true,
    sections: true,
});

export const buildIngredientsArray = (formData: FormData) => {
    let numSections = formData.getAll('recipe[sections]').length;
    console.log("#Sections: ", numSections);
    const numInstructions = formData.getAll('recipe[instructions]').length;
    console.log("#Instructions: ", numInstructions);
    let baseFields = 4;
    if(formData.get('numIng')){
        baseFields = baseFields + 1;
    };
    if(formData.get('numSec')){
        baseFields = baseFields + 1;
    };
    let numFields = 0;
    for(const key of formData.keys()){
        console.log(key);
        numFields++;
    };
    // const numIngredients = (numFields - numSections  - numInstructions - baseFields) / 4;
    const numIngredients = (numFields - numSections  - numInstructions - baseFields) / 6;
        const ingredientSectionsArray = [];
        if(numSections === 0){
            numSections = 1;
        }
        for(let x = 0; x < numSections; x++){
            const ingredients = [];
            for(let y = 0; y < numIngredients; y++){
                const baseString = `recipe[ingredients][${x}][${y}]`;
                if(formData.get(`${baseString}[amount]`) !== null){
                    const ingredient = {amount: formData.get(`${baseString}[amount]`), unit: formData.get(`${baseString}[unit]`), name: formData.get(`${baseString}[name]`), notes: formData.get(`${baseString}[notes]`)};
                    ingredients.push(ingredient);
                } else break;
            };
            ingredientSectionsArray.push(ingredients);
        }
        return ingredientSectionsArray;
}

export const validateForm = (formData: FormData) => {
    const parseObject: ParseObject = {
        name: formData.get('recipe[name]'),
        sections: formData.getAll('recipe[sections]'),
        ingredients: buildIngredientsArray(formData),
        instructions: formData.getAll('recipe[instructions]'),
        servings: formData.get('recipe[servings]'),
        url: formData.get('recipe[url]'),
    }
    if(typeof(formData.get('thumbnail')) !== 'string'){
        parseObject.thumbnailFile = formData.get('thumbnail');
    } else if(typeof(formData.get('thumbnail')) === 'string'){
        parseObject.thumbnailUrl = formData.get('thumbnail');
    }

    const validatedFields = FormSchema.safeParse(parseObject);

    // // If form validation fails, return errors early. Otherwise, continue.
    if(!validatedFields.success) {            
        const issues = validatedFields.error.issues;
        const customErrors: Record<string, Array<ErrorDescription>> = {};
        for(const issue of issues){
            let key = issue?.path[0];
            let cut = 1;
            if(typeof(issue.path[1]) === 'string'){
                key = issue.path[1];
                cut = 2;
            }
            const path = issue.path.filter((_, index) => {
                return index >= cut;
            });
            if(customErrors[key]){
                customErrors[key].push({ message: issue.message, path });
            } else {
                customErrors[key] = [{ message: issue.message, path }];
            }
        }
        return {errors: customErrors, message: 'Missing Fields, Failed to Update Recipe.'};
    } else {
        return null;
    };
};