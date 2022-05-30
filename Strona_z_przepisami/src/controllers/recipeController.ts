import e, { Request, Response } from 'express';
import { RecipeService } from '../services/recipeService'

const express = require('express');
const router = express.Router();
const app = express()
app.use(express.json())
const auth = require("../middleware/auth")
const _recipeService = new RecipeService();

router.post('/add',auth, async (req: Request, res: Response) => {

    try
    {
        const {Title, NoOfPortions,CookingTime,Ingredients,Instruction,Tags} = req.body;

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

//Edits only given elements
router.put('/edit/:id', async (req: Request, res: Response) => {

    try {
        const id:any = req.params.id
        const {Title, NoOfPortions,CookingTime,Ingredients,Instruction,Tags} = req.body;
        
        await _recipeService.EditRecipe( id,
            Title,
            NoOfPortions,
            CookingTime,
            Ingredients,
            Instruction,
            Tags)
        res.status(200).send("success");

    } catch (error) {
        res.status(400).send(error)
    }
})

//rating 1-5,  0-deletes rate
router.post('/rate/:recipeId/:rating', auth, async (req: Request, res: Response) => {

   try {
        const recipeId:any = req.params.recipeId
        const userId = req.headers.userId
        const rating:any = req.params.rating

        let recipe = await _recipeService.GetRecipeById(recipeId)
        if(!recipe)
        {
            res.status(400).send("Recipe doesn`t exists.")
        }
        else
        {
            await _recipeService.AddRate(recipeId, userId,rating)
            res.status(200).send("success");
        }

   } 
   catch (error) {
    res.status(400).send(error)
   }
})


router.delete('/delete/:id', auth, async (req: Request, res: Response) => {
    
    try
    {
        const id:any = req.params.id

        let recipe = await _recipeService.GetRecipeById(id)
        if(!recipe)
        {
            res.status(400).send("Recipe doesn`t exists.");
        }
        else
        {
            const userIdRecipe = recipe.UserId
            const userIdToken = req.headers.userId
            if(userIdRecipe == userIdToken)
            {
                await _recipeService.DeleteRecipe(id)
                res.status(200).send("Recipe has been deleted.");
            }
            else
            {
                res.status(400).send("Your are not the owner");
            }
        }
        
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
router.get('/getall', async (req: Request, res: Response) => {

    try {
        let recipes = await _recipeService.GetRecipes()
        res.status(200).send(recipes);

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/get/:id', async (req: Request, res: Response) => {

    try {
        let recipe = await _recipeService.GetRecipeById(req.params.id)
        res.status(200).send(recipe);

    } catch (error) {
        res.status(400).send(error)
    }
})

//returns list of recipes with given tag
router.get('/tag/:tag', async (req: Request, res: Response) => {

    try {
        const tag:any = req.params.tag
        let recipes = await _recipeService.GetByTag(tag)
    
        res.status(200).send(recipes);

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/getbyuserid/:id', async (req: Request, res: Response) => {

    try {
        const id:any = req.params.id
        let recipes = await _recipeService.GetByUserId(id)
        res.status(200).send(recipes);

    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/addcomment/:recipeId',auth ,async (req: Request, res: Response) => {

    try 
    {
        const recipeId:any = req.params.recipeId
        const userId = req.headers.userId
        const comment = req.body.Comment
        const addedComment = await _recipeService.AddComment(userId, recipeId, comment)
        res.status(200).send("Comment Added successfully");
    } 
    catch (error) 
    {
        res.status(400).send(error)
    }
})

router.delete('/deletecomment/:commentId',auth ,async (req: Request, res: Response) => {

    try 
    {
        const commentId:any = req.params.commentId
        const userId:any = req.headers.userId
        
        let isSuccess = await _recipeService.DeleteComment(commentId, userId)
        res.status(200).send("success");
    } 
    catch (error) 
    {
        res.status(400).send(error)
    }
})







module.exports = router;