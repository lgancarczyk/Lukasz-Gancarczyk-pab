import mongoose from "mongoose";
import { dbmain } from "./DBContext";
const Recipe = require('../dbSchemas/recipeSchema')


export class RecipeService {

    async AddRecipe(_userId:any,_title:string, _noOfPortions:Number, _cookingTime: number, _ingredients:Array<string>, _instruction:string, _tags:Array<string>) {
        

        try {

            const newRecipe = new Recipe({
                UserId: _userId,
                Title: _title,
                NoOfPortions: _noOfPortions,
                CookingTime: _cookingTime,
                Ingredients: _ingredients,
                Instruction: _instruction,
                Tags: _tags
            })
    
            const saveRet = await newRecipe.save(); // także .update(), .updateMany(), .validate()
            return newRecipe.id;
        } 
        catch (e) {
            throw e
        }
          
    }

    async GetRecipe(id:any)
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

    async EditRecipe(_title:string, _noOfPortions:Number, _cookingTime: number, _ingredients:Array<string>, _instruction:string, _tags:Array<string>) {
        

        try {

        } 
        catch (e) {
            throw e
        }
          
    }
}