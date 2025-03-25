import { Router, Request, Response } from 'express';
import testRecipe from "../models/testRecipe";

const apiRouter: Router = Router();

apiRouter.get("/home", (req: Request, res: Response) => {
    res.send({message: 'Home page data from Express!'});
})

apiRouter.get('/show', (req: Request, res: Response) => {
    res.send({message: "Recipe found", recipe: testRecipe});
})

apiRouter.get('/contact', (req: Request, res: Response) => {
    res.send({message: 'This is Express! Here are the contacts!'});
});

apiRouter.get('/all', (req: Request, res: Response) => {
    res.send({message: "Recipe found", recipes: [testRecipe, testRecipe, testRecipe, testRecipe, testRecipe, testRecipe]});
});



export default apiRouter;