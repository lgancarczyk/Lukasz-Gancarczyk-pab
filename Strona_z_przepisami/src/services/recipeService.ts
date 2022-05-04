import mongoose from "mongoose";
import { dbmain } from "./DBContext";
const Recipe = require('../dbSchemas/recipeSchema')


export class RecipeService {

    async AddRecipe(_title:string, _noOfPortions:Number, _cookingTime: number, _ingredients:Array<string>, _instruction:string, _tags:Array<string>) {
        

        try {

            const newRecipe = new Recipe({
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

    async UpdateRecipe(id:string)
    {
        return id;
    }
}