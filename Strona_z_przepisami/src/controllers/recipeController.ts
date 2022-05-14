import { Request, Response } from 'express';
import { RecipeService } from '../services/recipeService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
const auth = require("../middleware/auth")
const _recipeService = new RecipeService();

router.post('/add',auth, async (req: Request, res: Response) => {
    // let recipeId = await _recipeService.AddRecipe();
    // res.status(200).send(`RecipeId: ${recipeId}`);
    const {Title, NoOfPortions,CookingTime,Ingredients,Instruction,Tags} = req.body;
    try
    {
        const userId = req.headers.userId
        let recipeId = await _recipeService.AddRecipe(  userId,
                                                        Title,
                                                        NoOfPortions,
                                                        CookingTime,
                                                        Ingredients,
                                                        Instruction,
                                                        Tags);
        res.status(200).send(`RecipeId: ${recipeId}`);
    }
    catch(error)
    {
        res.status(400).send(error);
    }


})

router.get('/get/:id', (req: Request, res: Response) => {

    res.status(200).send("success");
})

router.put('/edit/:id', async (req: Request, res: Response) => {
    let id = req.params.id
    let recipeId = await _recipeService.UpdateRecipe(id)
    res.status(200).send("success");
})



router.delete('/delete/:id', (req: Request, res: Response) => {

    res.status(200).send("success");
})





module.exports = router;