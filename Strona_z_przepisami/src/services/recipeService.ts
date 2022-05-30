import mongoose from "mongoose";
import { dbmain } from "./DBContext";
const Recipe = require('../dbSchemas/recipeSchema')


export class RecipeService {

    async AddRecipe(_userId:any,_title:string, _noOfPortions:Number, _cookingTime: number, _ingredients:Array<string>, _instruction:string, _tags:Array<string>) {
        

        try {
                let lowerTags: Array<string> = new Array<string>()

                _tags.forEach(element => {
                lowerTags.push(element.toLocaleLowerCase())
                });
                const newRecipe = new Recipe({
                    UserId: _userId,
                    Title: _title,
                    NoOfPortions: _noOfPortions,
                    CookingTime: _cookingTime,
                    Ingredients: _ingredients,
                    Instruction: _instruction,
                    Tags: lowerTags
            })
    
            const saveRet = await newRecipe.save(); // także .update(), .updateMany(), .validate()
            return newRecipe.id;
        } 
        catch (e) {
            throw e
        }
          
    }

    async AddRate(recipeId:any,userId:any, rating:number)
    {
        try {
            let recipe = await Recipe.findById(recipeId)

            let check: number = 0
            recipe.Rates.forEach((element: { RateUserId: any; Rate: number; }) => {
                if (element.RateUserId == userId) {
                    if (rating == 0) {
                        //Recipe.update({_id: recipeId}, {$pull:{Rates:{RateUserId:userId}}})
                        recipe.Rates.pull({RateUserId: userId})
                        recipe.save()
                        check = 1;
                    }
                    else 
                    {
                        element.Rate = rating
                        check = 1;
                    }   
                    
                }})
            if (check==0) {
                recipe.Rates.push({Rate: rating, RateUserId: userId})
            }
            await recipe.save()

        } 
        catch (error) {
            
        }
    }
    async GetRecipes()
    {
        try{
            let recipes = await Recipe.find()
            return recipes
        }
        catch(e){
            throw e
        }
    }

    async GetRecipeById(id:any)
    {
        try{
            let recipe = await Recipe.findById(id)
            //let recipe = await Recipe.findOne({_id: id})
            return recipe
        }
        catch(e){
            throw e
        }
    }
    async RecipeExistById(id:any)
    {
        return await Recipe.exists({_id:id})
    }

    async GetByTag(tag:string)
    {
        let recipes = await Recipe.find({ Tags: tag })
        return recipes
    }

    async GetByUserId(id:any)
    {
        let recipes = await Recipe.find({ UserId:id })
        return recipes
    }

    async DeleteRecipe(id:any)
    {
        try
        {
            await Recipe.findByIdAndRemove(id)
        }
        catch(e)
        {
            throw e
        }
    }

    async EditRecipe(id:any, _title:string, _noOfPortions:Number, _cookingTime: number, _ingredients:Array<string>, _instruction:string, _tags:Array<string>) {
        

        try {
            let recipe = await Recipe.findById(id)
            if(_title!= null)
            {
                recipe.Title = _title
            }
            if(_noOfPortions!= null)
            {
                recipe.NoOfPortions = _noOfPortions
            }
            if(_cookingTime!=null)
            {
                recipe.CookingTime = _cookingTime
            }
            if(_ingredients!= null)
            {
                recipe.Ingredients = _ingredients
            }
            if(_instruction!= null)
            {
                recipe.Instruction = _instruction
            }
            if(_tags!= null)
            {
                recipe.Tags = _tags
            }
            await Recipe.findByIdAndUpdate(id, recipe)
            console.log(recipe)
    
        } 
        catch (e) {
            
        }
          
    }
    async AddComment(_userId:any, _recipeId:any, _comment:string)
    {
        try 
        {
            let recipe = await Recipe.findById(_recipeId)
            let comment = await recipe.Comments.push({Comment:_comment, CommentUserId:_userId})
            await recipe.save()
            return comment
        } 
        catch (error) 
        {
            throw error
        }
    }

    async DeleteComment(commentId:any, userId:string)
    {

        const ret = await Recipe.collection.updateMany({}, {
            $pull: {
                Comments: {
                    '_id': new mongoose.Types.ObjectId(commentId),
                    'CommentUserId': new mongoose.Types.ObjectId(userId)
                }
            }
        })
        
        return 1
    }

}