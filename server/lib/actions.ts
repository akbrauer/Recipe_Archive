import { Request, Response, NextFunction } from "express";
import { Pool, Query, QueryResult } from "pg";
import {Ingredient, Recipe, RecipeData, IngredientData} from "./definitions";
import dotenv from "dotenv";

dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pgConfig = {
	user: PGUSER,
	password: PGPASSWORD,
	host: PGHOST,
	database: PGDATABASE,
	port: 5432,
	ssl: true,
};

const pool = new Pool(pgConfig);

export const getAllRecipes = async (req: Request, res: Response) => {
    try {
        const recipes: QueryResult<Recipe[]> = await pool.query(`SELECT * FROM Recipe`);
        res.send({ message: "All Recipe Data from Express", recipes: recipes.rows });
    } catch (error) {
        console.log(error);
    };
};

export const getRecipe = async (req: Request, res: Response) => {
    const id = req.params.id;
        try {
            const recipeResult: QueryResult = await pool.query(`SELECT * FROM Recipe WHERE RecipeId = '${id}';`);
            const recipes: Recipe[] = recipeResult.rows;
            const ingredientResult: QueryResult = await pool.query(`SELECT * FROM Ingredient WHERE RecipeId = '${id}' ORDER BY index ASC;`);
            const ingredients: Ingredient[] = ingredientResult.rows;
            recipes[0].ingredients = ingredients;
            res.send({ message: "Target Recipe Data from Express!", recipes });
        } catch (error) {
            console.log(error);
        };
};

const cloudinaryCheck = (req: Request, res: Response) => {
    if(req.body.thumbnail){
        console.log("Entering form URL block");
        req.body.recipe.image = req.body.thumbnail;
    } else {
        console.log("Entering cloudinary URL block.");
        try {
            const cloudinaryUrl = req.body.cloudinaryUrl;
            if (!cloudinaryUrl) {
                console.error("No Cloudinary URLs found.");
                res.status(500).send("Internal Server Error");
            }
            req.body.recipe.image = cloudinaryUrl;
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}

export const addRecipe = async (req: Request, res: Response) => {
    const recipe: RecipeData = req.body.recipe;

    cloudinaryCheck(req, res);
	console.log(recipe);
	try {
        const recipeQuery = `
            INSERT INTO Recipe(Name, Image, Sections, Instructions, Servings, Url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING RecipeId;
        `;

        if(typeof(recipe.sections) === 'string'){
            recipe.sections = [recipe.sections];
        };
        if(typeof(recipe.instructions) === 'string'){
            recipe.instructions = [recipe.instructions];
        };

        const recipeValues = [recipe.name, recipe.image, recipe.sections, recipe.instructions, recipe.servings, recipe.url];
        const recipeRequest = await pool.query(recipeQuery, recipeValues);
        const recipeId = recipeRequest.rows[0].recipeid;
		console.log(`Recipe Added, RecipeId: ${recipeId}`);

        let ingredientQuery = `
                INSERT INTO Ingredient(Amount, Unit, Name, Notes, Converted_Amount, Converted_Unit, RecipeId, Section, Index)
                VALUES`;
        const ingValues = [];
        const sectionArray = recipe.ingredients;
        for(let section = 0; section < sectionArray.length; section++){
            const ingArray = sectionArray[section];

            for(let ingIdx = 0; ingIdx < ingArray.length; ingIdx++) {
                ingredientQuery += ` ($${(ingValues.length) + 1}, $${(ingValues.length) + 2}, $${(ingValues.length) + 3}, $${(ingValues.length) + 4}, $${(ingValues.length) + 5}, $${(ingValues.length) + 6}, $${(ingValues.length) + 7}, $${(ingValues.length) + 8}, $${(ingValues.length) + 9}),`;

                ingValues.push(ingArray[ingIdx].amount, ingArray[ingIdx].unit, ingArray[ingIdx].name, ingArray[ingIdx].notes, ingArray[ingIdx].converted_amount, ingArray[ingIdx].converted_unit, recipeId, (section + 1), (ingIdx + 1));
            }
        }
        ingredientQuery = ingredientQuery.substring(0, ingredientQuery.length - 1);
        ingredientQuery += ";";
        console.log(ingredientQuery);
        console.log(ingValues);
        const ingredientRequest = await pool.query(ingredientQuery, ingValues);
		res.redirect(`/recipes/${recipeId}`);
	} catch (error) {
		console.log(error);
	}
}

const updateIngredients = async (id: string, ingredients: IngredientData[], section: number, initialIngredientCount: number) => {
    const finalIngredientCount = ingredients.length;
    console.log(`Initial Ings: ${initialIngredientCount} & Final Ings: ${finalIngredientCount}`);

    if(initialIngredientCount <= finalIngredientCount) {
        console.log("There are more than or equal the number of ingredients in the final verison.");

        //Step 1: Update ingredients index 1 through initialCount
        let updateQueries = [];
        const updateValues = [];
        for(let x = 0; x < initialIngredientCount; x++){
            const updateQuery = `UPDATE Ingredient SET Amount = $1, Unit = $2, Name = $3, Notes = $4, Converted_Amount = $5, Converted_Unit = $6 WHERE RecipeId = '${id}' AND Section = '${section + 1}' AND Index = '${x + 1}';`;
            updateQueries.push(updateQuery);
            updateValues.push([ingredients[x].amount, ingredients[x].unit, ingredients[x].name, ingredients[x].notes, ingredients[x].converted_amount, ingredients[x].converted_unit]);
        }
        console.log(updateQueries);
        console.log(updateValues);

        for(let y = 0; y < updateQueries.length; y++){
            console.log(`Initiating query ${y}...`);
            await pool.query(updateQueries[y], updateValues[y]);
            console.log(`Query ${y} complete.`);
        };
        console.log('All ingredients updated.');
        
        if(initialIngredientCount < finalIngredientCount) {
            console.log("There are more ingredients in the final version.");

            //Step 2: Add (finalCount - initialCount) remaining ingredients as new
            let insertQuery = `
                INSERT INTO Ingredient(Amount, Unit, Name, Notes, Converted_Amount, Converted_Unit, RecipeId, Section, Index)
                VALUES`;
            const insertValues = [];
            let ingCount = 0;
            for(let x = initialIngredientCount; x < finalIngredientCount; x++) {
                const latestIndex = ingCount * 9;
                insertQuery += ` ($${latestIndex + 1}, $${latestIndex + 2}, $${latestIndex + 3}, $${latestIndex + 4}, $${latestIndex + 5}, $${latestIndex + 6}, $${latestIndex + 7}, $${latestIndex + 8}, $${latestIndex + 9}),`;
                insertValues.push(ingredients[x].amount, ingredients[x].unit, ingredients[x].name, ingredients[x].notes, ingredients[x].converted_amount, ingredients[x].converted_unit, id, (section + 1), (x + 1));
                ingCount++;
            }
            insertQuery = insertQuery.substring(0, insertQuery.length - 1);
            insertQuery += ";";
            const ingredientRequest = await pool.query(insertQuery, insertValues);
            console.log(insertQuery);
            console.log(insertValues);
        };
    } else if(initialIngredientCount > finalIngredientCount) {
        console.log("There are less ingredients in the final version.");

        //Step 1: Update ingredients index 1 through finalCount
        let updateQueries = [];
        const updateValues = [];
        for(let x = 0; x < finalIngredientCount; x++){
            const updateQuery = `UPDATE Ingredient SET Amount = $1, Unit = $2, Name = $3, Notes = $4, Converted_Amount = $5, Converted_Unit = $6 WHERE RecipeId = '${id}' AND Section = '${section + 1}' AND Index = '${x + 1}';`;
            updateQueries.push(updateQuery);
            updateValues.push([ingredients[x].amount, ingredients[x].unit, ingredients[x].name, ingredients[x].notes, ingredients[x].converted_amount, ingredients[x].converted_unit]);
        }
        for(let y = 0; y < updateQueries.length; y++){
            console.log(`Initiating query ${y}...`);
            await pool.query(updateQueries[y], updateValues[y]);
            console.log(`Query ${y} complete.`);
        };
        console.log('All ingredients updated.');

        //Step 2: Delete remaining (initialCount - finalCount) ingredients from database
        await pool.query(`DELETE FROM Ingredient WHERE RecipeId = '${id}' AND Section = '${section + 1}' AND Index > ${finalIngredientCount};`);
        console.log("Extra ingredients deleted");
    };
}

export const editRecipe = async (req: Request, res: Response) => {
    const id = req.params.id;
    const recipe: RecipeData = req.body.recipe;
    const ingredientArrays = recipe.ingredients;
    let initialIngredientCounts: number[] = req.body.numIng || [1];
    if(typeof(initialIngredientCounts) === 'string') initialIngredientCounts = [initialIngredientCounts];
    if(typeof(recipe.sections) === 'string') recipe.sections = [recipe.sections];
    if(typeof(recipe.instructions) === 'string') recipe.instructions = [recipe.instructions];
    const initialSectionCount = initialIngredientCounts.length;
    const finalSectionCount = recipe.ingredients.length;

    cloudinaryCheck(req, res);
	console.log(recipe);

	try {
        const recipeQuery = `
            UPDATE Recipe
            SET Name = $1,
                Image = $2,
                Sections = $3,
                Instructions = $4,
                Servings = $5,
                Url = $6
            WHERE RecipeId = '${id}';
        `;
        const recipeValues = [recipe.name, recipe.image, recipe.sections, recipe.instructions, recipe.servings, recipe.url];
        const recipeRequest = await pool.query(recipeQuery, recipeValues);

		console.log(`Recipe Updated, RecipeId: ${id}`);

        if(initialSectionCount <= finalSectionCount){
            console.log("Number of sections are equal or greater.");

            //Step 1 Update Ingredients In Matching Sections
            for(let section = 0; section < initialSectionCount; section++){
                const ingredients = ingredientArrays[section];
                const initialIngredientCount = Number(initialIngredientCounts[section]);
                updateIngredients(id, ingredients, section, initialIngredientCount);
            }

            if(initialSectionCount < finalSectionCount){
                console.log("There are more sections in the final version.");

                //Step 2: Add Ingredients in remaining sections as new
                let insertQuery = `
                        INSERT INTO Ingredient(Amount, Unit, Name, Notes, Converted_Amount, Converted_Unit, RecipeId, Section, Index)
                        VALUES`;
                const insertValues = [];
                let ingCount = 0;
                for(let section = initialSectionCount; section < finalSectionCount; section++){
                    const sectionIngredients = ingredientArrays[section];
                    for(let x = 0; x < sectionIngredients.length; x++) {
                        const latestIndex = ingCount * 9;
                        insertQuery += ` ($${latestIndex + 1}, $${latestIndex + 2}, $${latestIndex + 3}, $${latestIndex + 4}, $${latestIndex + 5}, $${latestIndex + 6}, $${latestIndex + 7}, $${latestIndex + 8}, $${latestIndex + 9}),`;
                        ingCount++;
                        insertValues.push(sectionIngredients[x].amount, sectionIngredients[x].unit, sectionIngredients[x].name, sectionIngredients[x].notes, sectionIngredients[x].converted_amount, sectionIngredients[x].converted_unit, id, (section + 1), (x + 1));
                    }
                }
                insertQuery = insertQuery.substring(0, insertQuery.length - 1);
                insertQuery += ";";
                const ingredientRequest = await pool.query(insertQuery, insertValues);
                console.log(ingCount);
                console.log(insertQuery);
                console.log(insertValues);
            }
        } else if(initialSectionCount > finalSectionCount){
            console.log("There are less sections in the final version.");

            //Step 1 Update Ingredients In Matching Sections
            for(let section = 0; section < finalSectionCount; section++){
                const ingredients = ingredientArrays[section];
                const initialIngredientCount = Number(initialIngredientCounts[section]);
                updateIngredients(id, ingredients, section, initialIngredientCount);
            }

            // Step 2: Delete remaining (initialCount - finalCount) sections from database
            await pool.query(`DELETE FROM Ingredient WHERE RecipeId = '${id}' AND Section > '${finalSectionCount}';`);
        }
        res.redirect(`/recipes/${id}`);
	} catch (error) {
		console.log(error);
	}
}

export const deleteRecipe = async (req: Request, res: Response) => {
    const id = req.params.id;
    await pool.query(`DELETE FROM Ingredient WHERE RecipeId = '${id}'; DELETE FROM Recipe WHERE RecipeId = '${id}';`);
    console.log(`Recipe ${id} successfully deleted.`);
    res.redirect("/recipes");
}