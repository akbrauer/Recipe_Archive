import express, { Router, Request, Response, NextFunction } from "express";
import { Pool, Query } from "pg";
import dotenv from "dotenv";
import { Ingredient, Recipe } from "../../lib/definitions";
import { QueryResult } from "pg";
import { upload, uploadToCloudinary } from "../../lib/cloudinary";

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

const apiRouter: Router = Router();

apiRouter.get("/recipes", async (req: Request, res: Response) => {
	try {
		const recipes: QueryResult<Recipe[]> = await pool.query(`SELECT * FROM Recipe`);
		res.send({ message: "All Recipe Data from Express", recipes: recipes.rows });
	} catch (error) {
		console.log(error);
	}
});

apiRouter.post("/recipes/new", upload.single("thumbnail"), uploadToCloudinary, async (req: Request, res: Response) => {
	const recipe: Recipe = req.body.recipe;
	const ingredients: Ingredient[] = req.body.ingredients;

    if(req.body.thumbnail){
        console.log("Entering form URL block");
        recipe.image = req.body.thumbnail;
    } else {
        console.log("Entering cloudinary URL block.");
        try {
            const cloudinaryUrl = req.body.cloudinaryUrl;
            if (!cloudinaryUrl) {
                console.error("No Cloudinary URLs found.");
                res.status(500).send("Internal Server Error");
            }
            recipe.image = cloudinaryUrl;
        } catch (error) {
            res.status(500).json({ error });
        }
    }
	console.log(recipe);
	try {
        const recipeQuery = `
            INSERT INTO Recipe(Name, Image, Instructions, Servings, Url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING RecipeId;
        `
        const recipeValues = [recipe.name, recipe.image, recipe.instructions, recipe.servings, recipe.url];
        const recipeRequest = await pool.query(recipeQuery, recipeValues);
        const recipeId = recipeRequest.rows[0].recipeid;
		console.log(`Recipe Added, RecipeId: ${recipeId}`);

        if(ingredients) {
            let ingredientQuery = `
                INSERT INTO Ingredient(Amount, Unit, Name, Notes, RecipeId)
                VALUES`;
            const ingValues = [];
            for(let x = 0; x < ingredients.length; x++) {
                ingredientQuery += ` ($${(x * 5) + 1}, $${(x * 5) + 2}, $${(x * 5) + 3}, $${(x * 5) + 4}, $${(x * 5) + 5}),`;
                ingValues.push(ingredients[x].amount, ingredients[x].unit, ingredients[x].name, ingredients[x].notes, recipeId);
            }
            ingredientQuery = ingredientQuery.substring(0, ingredientQuery.length - 1);
			ingredientQuery += ";";
            const ingredientRequest = await pool.query(ingredientQuery, ingValues)
        }
		res.redirect(`/recipes/${recipeId}`);
	} catch (error) {
		console.log(error);
	}
});

apiRouter.get("/recipes/:id", async (req: Request, res: Response) => {
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
	}
});

apiRouter.post("/recipes/:id/edit", upload.single("thumbnail"), uploadToCloudinary, async (req: Request, res: Response) => {
    const id = req.params.id;
    const recipe: Recipe = req.body.recipe;
	const ingredients: Ingredient[] = req.body.ingredients;
    const initialIngredientCount = req.body.numIng;
    const finalIngredientCount = ingredients.length;

    if(req.body.thumbnail){
        console.log("Entering form URL block");
        recipe.image = req.body.thumbnail;
    } else {
        console.log("Entering cloudinary URL block.");
        try {
            const cloudinaryUrl = req.body.cloudinaryUrl;
            if (!cloudinaryUrl) {
                console.error("No Cloudinary URLs found.");
                res.status(500).send("Internal Server Error");
            }
            recipe.image = cloudinaryUrl;
        } catch (error) {
            res.status(500).json({ error });
        }
    }
	console.log(recipe);
    console.log(ingredients);

	try {
        const recipeQuery = `
            UPDATE Recipe
            SET Name = $1,
                Image = $2,
                Instructions = $3,
                Servings = $4,
                Url = $5
            WHERE RecipeId = '${id}';
        `;
        const recipeValues = [recipe.name, recipe.image, recipe.instructions, recipe.servings, recipe.url];
        const recipeRequest = await pool.query(recipeQuery, recipeValues);

		console.log(`Recipe Updated, RecipeId: ${id}`);

        if(initialIngredientCount <= finalIngredientCount) {
            //Step 1: Update ingredients index 1 through initialCount
            let updateQueries = [];
            const updateValues = [];
            //e.g. initial = 5, final = 9;
            for(let x = 0; x < initialIngredientCount; x++){
                const updateQuery = `UPDATE ingredient SET Amount = $1, Unit = $2, Name = $3, Notes = $4 WHERE RecipeId = '${id}' AND Index = '${x + 1}';`;
                updateQueries.push(updateQuery);
                updateValues.push([ingredients[x].amount, ingredients[x].unit, ingredients[x].name, ingredients[x].notes]);
            }
            console.log(updateQueries);
            console.log(updateValues);
            for(let y = 0; y < updateQueries.length; y++){
                console.log(`Initiating query ${y}...`);
                await pool.query(updateQueries[y], updateValues[y]);
                console.log(`Query ${y} complete.`);
            };
            console.log('All ingredients updated.');
            
            
            
            if(initialIngredientCount < finalIngredientCount){
                //Step 2: Add (finalCount - initialCount) remaining ingredients as new
            };
        
        
        
        
        
        } else if(initialIngredientCount > finalIngredientCount) {
            //Step 1: Update ingredients index 1 through finalCount
            //Step 2: Delete remaining (initialCount - finalCount) ingredients from database
        };





        // if(ingredients) {
        //     let ingredientQuery = `
        //         INSERT INTO Ingredient(Amount, Unit, Name, Notes, RecipeId)
        //         VALUES`;
        //     const ingValues = [];
        //     for(let x = 0; x < ingredients.length; x++) {
        //         ingredientQuery += ` ($${(x * 5) + 1}, $${(x * 5) + 2}, $${(x * 5) + 3}, $${(x * 5) + 4}, $${(x * 5) + 5}),`;
        //         ingValues.push(ingredients[x].amount, ingredients[x].unit, ingredients[x].name, ingredients[x].notes, recipeId);
        //     }
        //     ingredientQuery = ingredientQuery.substring(0, ingredientQuery.length - 1);
		// 	ingredientQuery += ";";
        //     const ingredientRequest = await pool.query(ingredientQuery, ingValues)
        // }
		res.redirect(`/recipes/${id}`);
	} catch (error) {
		console.log(error);
	}
});

apiRouter.post("/upload", upload.single("thumbnail"), uploadToCloudinary, async (req: Request, res: Response) => {
	try {
		const cloudinaryUrl = req.body.cloudinaryUrl;
		if (!cloudinaryUrl) {
			console.error("No Cloudinary URLs found.");
			res.status(500).send("Internal Server Error");
		}
		const image = cloudinaryUrl;
		res.send(image);
	} catch (error) {
		res.status(500).json({ error });
	}
});

export default apiRouter;


//e.g. Start w/ 5 ingredients, end with 9 ingredients init = 5, final = 9;
    //First update ingredients index 1 - 5(initialCount);
    //Then add 4(finalCount - initialCount) remaining ingredients as new.

    //e.g. Start w/ 5 ingredients, end with 3 ingredients init = 5, final = 3;
    //First update ingredients index 1-3(finalCount);
    //Then delete 2 removed ingredients from databasae