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
        if(typeof(recipe.instructions) === 'string'){
            recipe.instructions = [recipe.instructions];
        };
        const recipeValues = [recipe.name, recipe.image, recipe.instructions, recipe.servings, recipe.url];
        const recipeRequest = await pool.query(recipeQuery, recipeValues);
        const recipeId = recipeRequest.rows[0].recipeid;
		console.log(`Recipe Added, RecipeId: ${recipeId}`);

        if(ingredients) {
            let ingredientQuery = `
                INSERT INTO Ingredient(Amount, Unit, Name, Notes, RecipeId, Index)
                VALUES`;
            const ingValues = [];
            for(let x = 0; x < ingredients.length; x++) {
                ingredientQuery += ` ($${(x * 6) + 1}, $${(x * 6) + 2}, $${(x * 6) + 3}, $${(x * 6) + 4}, $${(x * 6) + 5}, $${(x * 6) + 6}),`;
                ingValues.push(ingredients[x].amount, ingredients[x].unit, ingredients[x].name, ingredients[x].notes, recipeId, (x + 1));
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
    const initialIngredientCount = Number(req.body.numIng);
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
        if(typeof(recipe.instructions) === 'string'){
            recipe.instructions = [recipe.instructions];
        };
        const recipeValues = [recipe.name, recipe.image, recipe.instructions, recipe.servings, recipe.url];
        const recipeRequest = await pool.query(recipeQuery, recipeValues);

		console.log(`Recipe Updated, RecipeId: ${id}`);

        if(initialIngredientCount <= finalIngredientCount) {
            //Step 1: Update ingredients index 1 through initialCount
            let updateQueries = [];
            const updateValues = [];
            for(let x = 0; x < initialIngredientCount; x++){
                const updateQuery = `UPDATE Ingredient SET Amount = $1, Unit = $2, Name = $3, Notes = $4 WHERE RecipeId = '${id}' AND Index = '${x + 1}';`;
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
            
            if(initialIngredientCount < finalIngredientCount) {
                //Step 2: Add (finalCount - initialCount) remaining ingredients as new
                let insertQuery = `
                    INSERT INTO Ingredient(Amount, Unit, Name, Notes, RecipeId, Index)
                    VALUES`;
                const insertValues = [];
                for(let x = 0; x < (finalIngredientCount - initialIngredientCount); x++) {
                    insertQuery += ` ($${(x * 6) + 1}, $${(x * 6) + 2}, $${(x * 6) + 3}, $${(x * 6) + 4}, $${(x * 6) + 5}, $${(x * 6) + 6}),`;
                    const targetIndex = x + initialIngredientCount;
                    insertValues.push(ingredients[targetIndex].amount, ingredients[targetIndex].unit, ingredients[targetIndex].name, ingredients[targetIndex].notes, id, (targetIndex + 1));
                }
                insertQuery = insertQuery.substring(0, insertQuery.length - 1);
                insertQuery += ";";
                const ingredientRequest = await pool.query(insertQuery, insertValues);
            };
        } else if(initialIngredientCount > finalIngredientCount) {
            //Step 1: Update ingredients index 1 through finalCount
            let updateQueries = [];
            const updateValues = [];
            for(let x = 0; x < finalIngredientCount; x++){
                const updateQuery = `UPDATE Ingredient SET Amount = $1, Unit = $2, Name = $3, Notes = $4 WHERE RecipeId = '${id}' AND Index = '${x + 1}';`;
                updateQueries.push(updateQuery);
                updateValues.push([ingredients[x].amount, ingredients[x].unit, ingredients[x].name, ingredients[x].notes]);
            }
            for(let y = 0; y < updateQueries.length; y++){
                console.log(`Initiating query ${y}...`);
                await pool.query(updateQueries[y], updateValues[y]);
                console.log(`Query ${y} complete.`);
            };
            console.log('All ingredients updated.');

            //Step 2: Delete remaining (initialCount - finalCount) ingredients from database
            await pool.query(`DELETE FROM Ingredient WHERE RecipeId = '${id}' AND Index > ${finalIngredientCount};`);
            console.log("Extra ingredients deleted");
        };
		res.redirect(`/recipes/${id}`);
	} catch (error) {
		console.log(error);
	}
});

apiRouter.post("/recipes/:id/delete", async (req: Request, res: Response) => {
    const id = req.params.id;
    await pool.query(`DELETE FROM Ingredient WHERE RecipeId = '${id}'; DELETE FROM Recipe WHERE RecipeId = '${id}';`);
    console.log(`Recipe ${id} successfully deleted.`);
    res.redirect("/recipes");
})

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