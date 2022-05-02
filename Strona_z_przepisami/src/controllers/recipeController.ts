import { Request, Response } from 'express';
import {RecipeService} from '../services/recipeService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
 
const _recipeService = new RecipeService();

router.post('/add', (req: Request, res: Response) => {
let recipeId = _recipeService.AddRecipe();
res.status(200).send(`RecipeId: ${recipeId}`);
})

router.get('/get/:id', (req: Request, res: Response) => {

res.status(200).send("success");
})

router.put('/edit/:id', (req: Request, res: Response) => {

res.status(200).send("success");
})

router.delete('/delete/:id', (req: Request, res: Response) => {

res.status(200).send("success");
})





module.exports = router;