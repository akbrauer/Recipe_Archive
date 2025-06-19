import { Router } from 'express';
import { getAllRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe } from '../controllers/pg-database';
import { upload, uploadToCloudinary } from "../controllers/cloudinary";

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
    res.send("Api router hit!");
});

apiRouter.post("/test", (req, res) => {
	const body = req.body;
	console.log(body);
	res.send(body);
});

apiRouter.get("/recipes", getAllRecipes);

apiRouter.post("/recipes/new", upload.single("thumbnail"), uploadToCloudinary, addRecipe);

apiRouter.get("/recipes/:id", getRecipe);

apiRouter.post("/recipes/test", upload.single("thumbnail"), uploadToCloudinary, async (req, res) => {
	console.log(req.body.recipe);
	console.log(req.body.recipe.ingredients);
});

apiRouter.post("/recipes/:id/edit", upload.single("thumbnail"), uploadToCloudinary, editRecipe);

apiRouter.post("/recipes/:id/delete", deleteRecipe);

apiRouter.post("/upload", upload.single("thumbnail"), uploadToCloudinary, async (req, res) => {
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