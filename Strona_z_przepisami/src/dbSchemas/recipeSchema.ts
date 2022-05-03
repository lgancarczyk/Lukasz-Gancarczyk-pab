import mongoose from "mongoose";


export const recipeSchema = new mongoose.Schema({
    //ReicpeId: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
    //UserId: 
    Title: { type: String, required: true },
    NoOfPortions: { type: Number },
    CookingTime: { type: Number, required: true },
    Ingredients: { type: [String], required: true },
    Instruction: { type: String, required: true },
    Tags: { type: [String], required: true }
},
    {
        timestamps: true
    })