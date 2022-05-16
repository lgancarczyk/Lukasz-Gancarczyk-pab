import e, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { title } from 'process';
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

router.put('/edit/:id', async (req: Request, res: Response) => {

    res.status(200).send("success");
})

router.post('/rate/:recipeId/:rating', auth, async (req: Request, res: Response) => {

   try {
        const recipeId:any = req.params.recipeId
        const userId = req.headers.userId
        const rating:any = req.params.rating

        let recipe = await _recipeService.GetRecipe(recipeId)
        if(!recipe)
        {
            res.status(400).send("Recipe doesn`t exists.");
        }
        _recipeService.AddRate(recipeId, userId,rating)


    
        res.status(200).send("success");
   } catch (error) {
       throw e;
   }
})



router.delete('/delete/:id', auth, async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let recipe = await _recipeService.GetRecipe(id)
        if(!recipe)
        {
            res.status(400).send("Recipe doesn`t exists.");
        }
        const userIdRecipe = recipe.UserId
        const userIdToken = req.headers.userId
        if(userIdRecipe == userIdToken)
        {
            _recipeService.DeleteRecipe(id)
            res.status(200).send("Recipe has been deleted.");
        }
        else
        {
            res.status(400).send("Your are not the owner");
        }
    }
    catch(e)
    {
        
    }
})

router.get('/get/:id', async (req: Request, res: Response) => {

    let recipe = await _recipeService.GetRecipe(req.params.id)
    res.status(200).send(recipe);
})

//returns list of recipes with given tag
router.get('/tag/:tag', async (req: Request, res: Response) => {

    const tag:any = req.params.tag
    let recipes = await _recipeService.GetByTag(tag)
    
    res.status(200).send(recipes);
})





module.exports = router;