import express, { Router, Request, Response, NextFunction } from "express";
import { Pool, Query } from "pg";
import dotenv from "dotenv";
import { Ingredient, Recipe, RecipeData } from "../../lib/definitions";
import { QueryResult } from "pg";
import { upload, uploadToCloudinary } from "../../lib/cloudinary";
import { getAllRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, getRecipeCount } from "../../lib/actions";

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

apiRouter.get("/recipes", getAllRecipes);

apiRouter.post("/recipes/new", upload.single("thumbnail"), uploadToCloudinary, addRecipe);

apiRouter.get("/recipes/:id", getRecipe);

apiRouter.post("/recipes/test", upload.single("thumbnail"), uploadToCloudinary, async (req: Request, res: Response) => {
    console.log(req.body.recipe);
    console.log(req.body.recipe.ingredients);
})

apiRouter.post("/recipes/:id/edit", upload.single("thumbnail"), uploadToCloudinary, editRecipe);

apiRouter.post("/recipes/:id/delete", deleteRecipe)

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